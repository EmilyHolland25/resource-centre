export type ResourceCategory =
  | 'Podcasts'
  | 'Articles'
  | 'Newsletters'
  | 'Recipes'
  | 'Fitness'
  | 'Meditation'

export interface Resource {
  id: string
  category: ResourceCategory
  title: string
  thumbnail: string
  tags: string[]
  duration: number
  description: string
  dateUploaded: string
}