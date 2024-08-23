/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import debounce from 'lodash/debounce'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import { Filters } from '../Filters/Filters'
import { Pagination } from '../Pagination/Pagination'
import { CharacterListProps } from './types'
import { Character as CharacterCard } from '../Character/Character'
import { Character } from '../Character/types'
import { EmptyState } from '../EmptyState/EmptyState'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import api from '../../services/api'

import './CharacterList.css'

export const CharacterList = ({
  currentPage,
  setCurrentPage,
}: CharacterListProps) => {
  const [characters, setCharacters] = React.useState<Character[]>([])
  const [nameFilter, setNameFilter] = React.useState('')
  const [seriesFilter, setSeriesFilter] = React.useState('')
  const [comics, setComics] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const navigate = useNavigate()

  const loadCharacters = React.useCallback(
    debounce(async (page: number, name: string, movie: string) => {
      const offset = (page - 1) * 20

      try {
        const params: any = {
          limit: 20,
          offset,
        }

        if (name) {
          params.nameStartsWith = name
        }

        setIsLoading(true)
        const response = await api.get('/characters', { params })
        let filteredCharacters = response.data.data.results

        if (movie) {
          const filteredByMovie = await Promise.all(
            filteredCharacters.map(async (character: Character) => {
              const movieResponse = await api.get(
                `/characters/${character.id}/series`
              )
              const series = movieResponse.data.data.results

              const movieMatch = series.some((serie: { title: string }) =>
                serie.title.toLowerCase().includes(movie.toLowerCase())
              )

              return movieMatch ? character : null
            })
          )

          filteredCharacters = filteredByMovie.filter(
            (character) => character !== null
          )
        }

        console.log('filteredCharacters')
        const comicsByCharacter = filteredCharacters.map(
          (character: Character) => {
            return {
              name: character.name,
              comics: character.comics.available,
            }
          }
        )

        setCharacters(filteredCharacters)
        setComics(comicsByCharacter)
        setIsLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
      }
    }, 500),
    []
  )

  React.useEffect(() => {
    loadCharacters(currentPage, nameFilter, seriesFilter)
  }, [currentPage, nameFilter, seriesFilter, loadCharacters])

  const handleClickCharacter = (character: Character) => {
    navigate(`/character/${character.id}`)
  }

  const handleClearFilters = () => {
    setNameFilter('')
    setSeriesFilter('')
    loadCharacters(currentPage, '', '')
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  if (error) {
    return (
      <EmptyState type="ERROR" text="Whoops! Something is wrong. Try again!" />
    )
  }

  return (
    <>
      <Filters
        nameFilter={nameFilter}
        seriesFilter={seriesFilter}
        setNameFilter={setNameFilter}
        setSeriesFilter={setSeriesFilter}
        handleClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!characters.length && !isLoading ? (
            <EmptyState type="NOT_FOUND" text="No characters found" />
          ) : (
            <>
              <div className="character-grid">
                {characters.map((character) => {
                  if (!character.thumbnail.path.includes('not_available')) {
                    return (
                      <CharacterCard
                        key={character.id}
                        character={character}
                        handleClickCharacter={handleClickCharacter}
                      />
                    )
                  }
                })}
              </div>

              <Pagination
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
              />

              <div className="section-comics">
                <div className="title">Comics by character</div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={comics}
                    margin={{ top: 24, right: 16, left: 16, bottom: 8 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="comics" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
