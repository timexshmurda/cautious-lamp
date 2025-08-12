import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock next/link
jest.mock('next/link', () => {
    return ({children, href}) => {
        return <a href={href}>{children}</a>
    }
})

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /recipe finder/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
