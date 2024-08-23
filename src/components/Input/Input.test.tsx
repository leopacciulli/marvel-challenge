import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Input } from './Input'

describe('Input Component', () => {
  it('should render the input with the correct type', () => {
    render(
      <Input
        placeholder="placeholder"
        type="text"
        value=""
        onChange={() => {}}
      />
    )

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'text')
  })

  it('should render the input with the correct placeholder', () => {
    render(
      <Input
        type="text"
        placeholder="Enter text"
        value=""
        onChange={() => {}}
      />
    )

    const inputElement = screen.getByPlaceholderText(/enter text/i)
    expect(inputElement).toBeInTheDocument()
  })

  it('should render the input with the correct value', () => {
    render(
      <Input
        placeholder="placeholder"
        type="text"
        value="test value"
        onChange={() => {}}
      />
    )

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveValue('test value')
  })

  it('should call onChange when the input value changes', () => {
    const handleChange = jest.fn()
    render(
      <Input
        placeholder="placeholder"
        type="text"
        value=""
        onChange={handleChange}
      />
    )

    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'new value' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
