import { EmptyProps } from './types'

import './EmptyState.css'

export const EmptyState = ({ text, type }: EmptyProps) => {
  return (
    <div className={`empty-state ${type === 'ERROR' ? 'error' : 'not-found'}`}>
      {text}
    </div>
  )
}
