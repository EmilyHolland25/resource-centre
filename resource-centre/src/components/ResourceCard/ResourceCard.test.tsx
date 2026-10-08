import { render, screen } from '@testing-library/react'
import ResourceCard from './ResourceCard'
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

describe('ResourceCard', () => {
  it('displays the resource information', () => {
    render(<ResourceCard resource={testResource} />)

    expect(
      screen.getByRole('heading', { name: 'Mindful Moments' })
    ).toBeInTheDocument()

    expect(screen.getByText('Podcasts')).toBeInTheDocument()
    expect(screen.getByText('25 minutes')).toBeInTheDocument()
    expect(screen.getByText('10 July 2025')).toBeInTheDocument()

    expect(
  screen.getByRole('img', { name: 'Mindful Moments' })
).toBeInTheDocument()

expect(screen.getByText('wellbeing')).toBeInTheDocument()
expect(screen.getByText('mindfulness')).toBeInTheDocument()
expect(screen.getByText('relaxation')).toBeInTheDocument()
    
  })
})