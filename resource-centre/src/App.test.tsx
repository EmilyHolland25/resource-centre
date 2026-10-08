import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('displays the Resource Centre heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Resource Centre' })
    ).toBeInTheDocument()
  })

  it('displays a card for each resource', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Mindful Moments' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'The Science of Sleep' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Wellness Weekly' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Energy Boost Smoothie' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: '10-Minute Morning Stretch' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Guided Meditation for Stress Relief',
      })
    ).toBeInTheDocument()
  })
  it('displays resources grouped by category', () => {
  render(<App />)

  expect(
    screen.getByRole('heading', { name: 'Podcasts' })
  ).toBeInTheDocument()

  expect(
    screen.getByRole('heading', { name: 'Articles' })
  ).toBeInTheDocument()

  expect(
    screen.getByRole('heading', { name: 'Newsletters' })
  ).toBeInTheDocument()

  expect(
    screen.getByRole('heading', { name: 'Recipes' })
  ).toBeInTheDocument()

  expect(
    screen.getByRole('heading', { name: 'Fitness' })
  ).toBeInTheDocument()

  expect(
    screen.getByRole('heading', { name: 'Meditation' })
  ).toBeInTheDocument()
})
})