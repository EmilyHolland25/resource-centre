import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

it('opens resource details when a resource is clicked', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(
    screen.getByRole('button', { name: 'Mindful Moments' })
  )

  const dialog = screen.getByRole('dialog')

  expect(dialog).toBeInTheDocument()

  expect(
    within(dialog).getByRole('heading', { name: 'Mindful Moments' })
  ).toBeInTheDocument()

  expect(
    within(dialog).getByText(
      'A calming podcast focused on mindfulness techniques for daily life.'
    )
  ).toBeInTheDocument()
})
it('returns focus to the resource card when the details dialog closes', async () => {
  const user = userEvent.setup()

  render(<App />)

  const resourceCard = screen.getByRole('button', {
    name: 'Mindful Moments',
  })

  await user.click(resourceCard)

  expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()

  await user.click(screen.getByRole('button', { name: 'Close' }))

  expect(resourceCard).toHaveFocus()
})
})