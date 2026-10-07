import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('displays the Resource Centre heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /resource centre/i })
    ).toBeInTheDocument()
  })
})