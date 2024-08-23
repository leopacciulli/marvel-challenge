import { ButtonProps } from './types'

import './Button.css'

export const Button = ({
  label,
  onClick,
  disabled,
  variant = 'primary',
}: ButtonProps) => {
  const buttonClassName = `btn ${variant}`

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
