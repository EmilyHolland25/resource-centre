import { describe, expect, it } from 'vitest'
import { groupResourcesByCategory } from './groupResourcesByCategory'
import type { Resource } from '../types/resource'

const testResources: Resource[] = [
  {
    id: '001',
    category: 'Podcasts',
    title: 'Mindful Moments',
    thumbnail: 'image.jpg',
    tags: ['mindfulness'],
    duration: 25,
    description: 'A mindfulness podcast.',
    dateUploaded: '2025-07-10',
  },
  {
    id: '002',
    category: 'Articles',
    title: 'The Science of Sleep',
    thumbnail: 'image.jpg',
    tags: ['sleep'],
    duration: 8,
    description: 'An article about sleep.',
    dateUploaded: '2025-06-22',
  },
  {
    id: '003',
    category: 'Podcasts',
    title: 'Another Podcast',
    thumbnail: 'image.jpg',
    tags: ['wellbeing'],
    duration: 20,
    description: 'Another podcast.',
    dateUploaded: '2025-07-20',
  },
]

describe('groupResourcesByCategory', () => {
  it('groups resources under their category', () => {
    const grouped = groupResourcesByCategory(testResources)

    expect(grouped.Podcasts).toHaveLength(2)
    expect(grouped.Articles).toHaveLength(1)
  })

  it('places the correct resources in each category', () => {
    const grouped = groupResourcesByCategory(testResources)

    expect(grouped.Podcasts[0].title).toBe('Mindful Moments')
    expect(grouped.Podcasts[1].title).toBe('Another Podcast')
    expect(grouped.Articles[0].title).toBe('The Science of Sleep')
  })

  
})