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
it('filters resources by title as the user types', async () => {
  const user = userEvent.setup()

  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: /search resources/i,
  })

  await user.type(searchInput, 'sleep')

  expect(
    screen.getByRole('button', { name: 'The Science of Sleep' })
  ).toBeInTheDocument()

  expect(
    screen.queryByRole('button', { name: 'Mindful Moments' })
  ).not.toBeInTheDocument()
})
it('filters resources by tag as the user types', async () => {
  const user = userEvent.setup()

  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: /search resources/i,
  })

  await user.type(searchInput, 'mindfulness')

  expect(
    screen.getByRole('button', { name: 'Mindful Moments' })
  ).toBeInTheDocument()

  expect(
    screen.queryByRole('button', { name: 'The Science of Sleep' })
  ).not.toBeInTheDocument()
})

it('sorts resources alphabetically by category', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.selectOptions(
    screen.getByRole('combobox', { name: /sort by/i }),
    'category'
  )

const categoryHeadings = screen
  .getAllByRole('heading', { level: 2 })
  .filter((heading) =>
    [
      'Articles',
      'Fitness',
      'Meditation',
      'Newsletters',
      'Podcasts',
      'Recipes',
    ].includes(heading.textContent ?? '')
  )
  .map((heading) => heading.textContent)

expect(categoryHeadings).toEqual([
  'Articles',
  'Fitness',
  'Meditation',
  'Newsletters',
  'Podcasts',
  'Recipes',
])
})
it('displays resources by date with the newest first', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.selectOptions(
    screen.getByRole('combobox', { name: /sort by/i }),
    'date-newest'
  )

  const resourceButtons = screen
    .getAllByRole('button')
    .filter((button) =>
      [
        'Mindful Moments',
        'The Science of Sleep',
        'Wellness Weekly',
        'Energy Boost Smoothie',
        '10-Minute Morning Stretch',
        'Guided Meditation for Stress Relief',
      ].includes(button.getAttribute('aria-label') ?? '')
    )

  expect(resourceButtons.map((button) => button.getAttribute('aria-label'))).toEqual([
    '10-Minute Morning Stretch',
    'Wellness Weekly',
    'Guided Meditation for Stress Relief',
    'Energy Boost Smoothie',
    'Mindful Moments',
    'The Science of Sleep',
  ])
})
it('displays resources by date with the oldest first', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.selectOptions(
    screen.getByRole('combobox', { name: /sort by/i }),
    'date-oldest'
  )

  const resourceButtons = screen
    .getAllByRole('button')
    .filter((button) =>
      [
        'Mindful Moments',
        'The Science of Sleep',
        'Wellness Weekly',
        'Energy Boost Smoothie',
        '10-Minute Morning Stretch',
        'Guided Meditation for Stress Relief',
      ].includes(button.getAttribute('aria-label') ?? '')
    )

  expect(
    resourceButtons.map((button) => button.getAttribute('aria-label'))
  ).toEqual([
    'The Science of Sleep',
    'Mindful Moments',
    'Energy Boost Smoothie',
    'Guided Meditation for Stress Relief',
    'Wellness Weekly',
    '10-Minute Morning Stretch',
  ])
})
it('searches resources and sorts the matching results by newest first', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.type(
    screen.getByRole('searchbox', { name: /search resources/i }),
    'sleep'
  )

  await user.selectOptions(
    screen.getByRole('combobox', { name: /sort by/i }),
    'date-newest'
  )

  expect(
    screen.getByRole('button', {
      name: 'The Science of Sleep',
    })
  ).toBeInTheDocument()

  expect(
    screen.queryByRole('button', {
      name: 'Mindful Moments',
    })
  ).not.toBeInTheDocument()
})
})