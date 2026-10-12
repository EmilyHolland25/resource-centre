import type { Resource, ResourceCategory } from '../types/resource'

export function groupResourcesByCategory(
  resources: Resource[]
): Record<ResourceCategory, Resource[]> {
  return resources.reduce(
    (grouped, resource) => {
      grouped[resource.category].push(resource)

      return grouped
    },
    {
      Podcasts: [],
      Articles: [],
      Newsletters: [],
      Recipes: [],
      Fitness: [],
      Meditation: [],
    } as Record<ResourceCategory, Resource[]>
  )
}