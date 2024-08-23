import React from 'react'
import { CharacterProps } from './types'

import './Character.css'

export const Character = ({
  character,
  handleClickCharacter,
}: CharacterProps) => {
  return (
    <div
      className="character-card"
      onClick={() => handleClickCharacter(character)}
    >
      <div className="character-image-wrapper">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="character-image"
        />
      </div>
      <div className="character-content">
        <p>{character.name}</p>
        <div className="character-footer">
          <span>ID: {character.id}</span>
        </div>
      </div>
    </div>
  )
}
