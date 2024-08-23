import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { Character } from '../../components/Character/types'
import { Loader } from '../../components/Loader/Loader'
import { EmptyState } from '../../components/EmptyState/EmptyState'
import { CharacterInfoTable } from '../../components/CharacterInfoTable/CharacterInfoTable'
import { Comic, Series } from './types'
import { Button } from '../../components/Button/Button'
import { useTranslation } from 'react-i18next'
import '../../i18n'

import './CharacterDetail.css'

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [character, setCharacter] = React.useState<Character | null>(null)
  const [comics, setComics] = React.useState<Comic[]>([])
  const [series, setSeries] = React.useState<Series[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`/characters/${id}`)

        //qtde
        // setComics(response.data.data.results[0].comics.available)
        setCharacter(response.data.data.results[0])
        setComics(response.data.data.results[0].comics.items)
        setSeries(response.data.data.results[0].series.items)
        setIsLoading(false)
      } catch (error) {
        setError(true)
      }
    }

    fetchCharacter()
  }, [id])

  if (error) {
    return <EmptyState type="ERROR" text={t('error-label')} />
  }

  if (isLoading || !character) {
    return <Loader />
  }

  return (
    <div className="character-detail-page">
      <div className="top-header">
        <Button label={t('back-button')} onClick={() => navigate(-1)} />
        <div className="details-header">
          <div className="shadow" />
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="details-image"
          />
          <div className="details-character-name">{character.name}</div>
        </div>
      </div>

      <div className="details-content">
        <div className="details-character-description">
          <div className="title">{t('biography-label')}</div>
          <div className="description">
            {character.description || t('no-description-label')}
          </div>
        </div>

        {comics.length > 0 && (
          <div className="section-info">
            <CharacterInfoTable title={t('comics-label')} items={comics} />
          </div>
        )}

        {series.length > 0 && (
          <div className="section-info">
            <CharacterInfoTable title={t('series-label')} items={series} />
          </div>
        )}
      </div>
    </div>
  )
}
