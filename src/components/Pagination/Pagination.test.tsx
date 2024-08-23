import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Pagination } from './Pagination'

jest.mock('../Button/Button', () => ({
  Button: ({ label, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  ),
}))

describe('Pagination Component', () => {
  it('should render the current page number', () => {
    render(
      <Pagination
        currentPage={1}
        handlePreviousPage={() => {}}
        handleNextPage={() => {}}
      />
    )

    const pageSpan = screen.getByText(/Page 1/i)
    expect(pageSpan).toBeInTheDocument()
  })

  it('should disable the "Previous" button when on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        handlePreviousPage={() => {}}
        handleNextPage={() => {}}
      />
    )

    const previousButton = screen.getByText(/Previous/i)
    expect(previousButton).toBeDisabled()
  })

  it('should enable the "Previous" button when not on the first page', () => {
    render(
      <Pagination
        currentPage={2}
        handlePreviousPage={() => {}}
        handleNextPage={() => {}}
      />
    )

    const previousButton = screen.getByText(/Previous/i)
    expect(previousButton).not.toBeDisabled()
  })

  it('should call handlePreviousPage when the "Previous" button is clicked', () => {
    const handlePreviousPage = jest.fn()
    render(
      <Pagination
        currentPage={2}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={() => {}}
      />
    )

    const previousButton = screen.getByText(/Previous/i)
    fireEvent.click(previousButton)

    expect(handlePreviousPage).toHaveBeenCalledTimes(1)
  })

  it('should call handleNextPage when the "Next" button is clicked', () => {
    const handleNextPage = jest.fn()
    render(
      <Pagination
        currentPage={1}
        handlePreviousPage={() => {}}
        handleNextPage={handleNextPage}
      />
    )

    const nextButton = screen.getByText(/Next/i)
    fireEvent.click(nextButton)

    expect(handleNextPage).toHaveBeenCalledTimes(1)
  })
})
