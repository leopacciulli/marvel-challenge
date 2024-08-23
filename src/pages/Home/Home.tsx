import React from 'react'
import { CharacterList } from '../../components/CharacterList/CharacterList'

export const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <CharacterList currentPage={currentPage} setCurrentPage={setCurrentPage} />
  )
}
