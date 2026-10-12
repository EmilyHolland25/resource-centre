import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { resources } from './data/resources'

const resourceTitles = new Set(resources.map((resource) => resource.title))

function getResourceCardButtons() {
return screen.getAllByRole('button').filter((button) =>
resourceTitles.has(button.getAttribute('aria-label') ?? '')
)
}

describe('App', () => {
it('displays the Resource Centre heading', () => {
render(<App />)


expect(
  screen.getByRole('heading', { name: 'Resource Centre' })
).toBeInTheDocument()


})

it('displays a card for each resource', () => {
render(<App />)


expect(getResourceCardButtons()).toHaveLength(resources.length)

for (const title of resourceTitles) {
  expect(
    screen.getAllByRole('heading', { name: title, level: 3 })
  ).toHaveLength(
    resources.filter((resource) => resource.title === title).length
  )
}


})

it('displays resources grouped by category', () => {
render(<App />)


const categories = [
  'Podcasts',
  'Articles',
  'Newsletters',
  'Recipes',
  'Fitness',
  'Meditation',
]

for (const category of categories) {
  expect(
    screen.getByRole('heading', { name: category })
  ).toBeInTheDocument()
}


})

it('opens resource details when a resource is clicked', async () => {
const user = userEvent.setup()


render(<App />)

await user.click(
  screen.getAllByRole('button', { name: 'Mindful Moments' })[0]
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

const resourceCard = screen.getAllByRole('button', {
  name: 'Mindful Moments',
})[0]

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

await user.type(searchInput, 'science')

expect(
  screen.getAllByRole('button', { name: 'The Science of Sleep' })
).toHaveLength(
  resources.filter((resource) =>
    resource.title.toLowerCase().includes('science')
  ).length
)

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
  screen.getAllByRole('button', { name: 'Mindful Moments' })
).toHaveLength(
  resources.filter((resource) =>
    resource.tags.some((tag) =>
      tag.toLowerCase().includes('mindfulness')
    ) && resource.title === 'Mindful Moments'
  ).length
)

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

const resourceButtons = within(
  screen.getByRole('region', { name: 'Filtered resources' })
).getAllByRole('button')

const expectedTitles = [...resources]
  .sort((a, b) => b.dateUploaded.localeCompare(a.dateUploaded))
  .map((resource) => resource.title)

expect(
  resourceButtons.map((button) => button.getAttribute('aria-label'))
).toEqual(expectedTitles)


})

it('displays resources by date with the oldest first', async () => {
const user = userEvent.setup()


render(<App />)

await user.selectOptions(
  screen.getByRole('combobox', { name: /sort by/i }),
  'date-oldest'
)

const resourceButtons = within(
  screen.getByRole('region', { name: 'Filtered resources' })
).getAllByRole('button')

const expectedTitles = [...resources]
  .sort((a, b) => a.dateUploaded.localeCompare(b.dateUploaded))
  .map((resource) => resource.title)

expect(
  resourceButtons.map((button) => button.getAttribute('aria-label'))
).toEqual(expectedTitles)


})

it('searches resources and sorts the matching results by newest first', async () => {
const user = userEvent.setup()


render(<App />)

await user.type(
  screen.getByRole('searchbox', { name: /search resources/i }),
  'science'
)

await user.selectOptions(
  screen.getByRole('combobox', { name: /sort by/i }),
  'date-newest'
)

expect(
  screen.getAllByRole('button', { name: 'The Science of Sleep' })
).toHaveLength(
  resources.filter((resource) =>
    resource.title.toLowerCase().includes('science')
  ).length
)

expect(
  screen.queryByRole('button', { name: 'Mindful Moments' })
).not.toBeInTheDocument()

})

it('shows an empty state when no resources match the search', async () => {
const user = userEvent.setup()

render(<App />)

await user.type(
  screen.getByRole('searchbox', { name: /search resources/i }),
  'xyz123'
)

expect(
  screen.getByRole('heading', { name: 'No resources found' })
).toBeInTheDocument()

expect(
  screen.getByRole('button', { name: 'Clear search' })
).toBeInTheDocument()

})

it('clears the search when the clear search button is clicked', async () => {
const user = userEvent.setup()

render(<App />)

await user.type(
  screen.getByRole('searchbox', { name: /search resources/i }),
  'xyz123'
)

await user.click(
  screen.getByRole('button', { name: 'Clear search' })
)

expect(
  screen.getByRole('searchbox', { name: /search resources/i })
).toHaveValue('')

expect(
  screen.getByRole('heading', { name: 'Resource Centre' })
).toBeInTheDocument()

expect(getResourceCardButtons()).toHaveLength(resources.length)

})
})