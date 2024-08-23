export interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    available: number
  }
}

export interface CharacterProps {
  character: Character
  handleClickCharacter: (character: Character) => void
}