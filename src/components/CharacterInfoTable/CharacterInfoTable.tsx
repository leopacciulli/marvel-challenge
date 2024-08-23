import { CharacterInfoTableProps } from './types'

import './CharacterInfoTable.css'

export const CharacterInfoTable = ({
  title,
  items,
}: CharacterInfoTableProps) => {
  return (
    <>
      <div className="title">{title}</div>
      <ul>
        {items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}
