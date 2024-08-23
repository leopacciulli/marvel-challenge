export interface Items<T = string> {
  name: T
}

export interface CharacterInfoTableProps {
  title: string
  items: Items[]
}