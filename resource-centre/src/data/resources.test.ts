import { resources } from './resources'

describe('Resource data', () => {
  it('contains all six resource categories', () => {
    const categories = resources.map((resource) => resource.category)

    expect(categories).toHaveLength(6)

    expect(categories).toEqual(
      expect.arrayContaining([
        'Podcasts',
        'Articles',
        'Newsletters',
        'Recipes',
        'Fitness',
        'Meditation',
      ])
    )
  })
})