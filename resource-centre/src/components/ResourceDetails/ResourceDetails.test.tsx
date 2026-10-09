import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResourceDetails from './ResourceDetails'
import type { Resource } from '../../types/resource'

const testResource: Resource = {
  id: '001',
  category: 'Podcasts',
  title: 'Mindful Moments',
  thumbnail: 'https://example.com/mindful-moments.jpg',
  tags: ['wellbeing', 'mindfulness', 'relaxation'],
  duration: 25,
  description:
    'A calming podcast focused on mindfulness techniques for daily life.',
  dateUploaded: '2025-07-10',
}

describe('ResourceDetails', () => {
  it('displays the resource details', () => {
    render(
      <ResourceDetails
        resource={testResource}
        onClose={() => {}}
      />
    )

    expect(
      screen.getByRole('heading', { name: 'Mindful Moments' })
    ).toBeInTheDocument()

    expect(screen.getByText('Podcasts')).toBeInTheDocument()

    expect(
      screen.getByText(
        'A calming podcast focused on mindfulness techniques for daily life.'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('25 minutes')).toBeInTheDocument()
    expect(screen.getByText('10 July 2025')).toBeInTheDocument()

    expect(screen.getByText('wellbeing')).toBeInTheDocument()
    expect(screen.getByText('mindfulness')).toBeInTheDocument()
    expect(screen.getByText('relaxation')).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <ResourceDetails
        resource={testResource}
        onClose={onClose}
      />
    )

    await user.click(
      screen.getByRole('button', { name: 'Close' })
    )

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the Escape key is pressed', async () => { 
    const user = userEvent.setup() 
    const onClose = vi.fn() 
    render( 
    <ResourceDetails resource={testResource} 
    onClose={onClose} 
    /> 
  ) 
  await user.keyboard('{Escape}') 
  expect(onClose).toHaveBeenCalledTimes(1) 
})
it('moves focus to the Close button when the dialog opens', () => {
  const onClose = vi.fn()

  render(
    <ResourceDetails
      resource={testResource}
      onClose={onClose}
    />
  )

  expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
})
it('keeps keyboard focus within the dialog when tabbing from the Close button', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()

  render(
    <ResourceDetails
      resource={testResource}
      onClose={onClose}
    />
  )

  const closeButton = screen.getByRole('button', { name: 'Close' })

  closeButton.focus()
  await user.tab()

  expect(
  screen.getByRole('dialog').contains(document.activeElement)
).toBe(true)
})
it('keeps focus on Close when Shift+Tab is pressed and it is the only focusable element', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()

  render(
    <ResourceDetails
      resource={testResource}
      onClose={onClose}
    />
  )

  const closeButton = screen.getByRole('button', { name: 'Close' })

  closeButton.focus()
  await user.keyboard('{Shift>}{Tab}{/Shift}')

  expect(closeButton).toHaveFocus()
})
})