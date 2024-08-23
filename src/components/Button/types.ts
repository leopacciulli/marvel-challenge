export interface ButtonProps {
  label: string
  disabled?: boolean
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'tertiary'
}