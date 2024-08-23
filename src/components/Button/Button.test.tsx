import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render the button with the correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />)

    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button label="Click me" onClick={handleClick} />)

    const buttonElement = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when the disabled prop is true', () => {
    render(<Button label="Click me" disabled onClick={() => {}} />)

    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeDisabled()
  })
})
