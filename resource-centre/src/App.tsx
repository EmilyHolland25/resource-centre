import { useState, useRef } from 'react'
import ResourceCard from './components/ResourceCard/ResourceCard'
import ResourceDetails from './components/ResourceDetails/ResourceDetails'
import { resources } from './data/resources'
import { groupResourcesByCategory } from './utils/groupResourcesByCategory'
import type { Resource } from './types/resource'

function App() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  )
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)
function closeResourceDetails() {
  setSelectedResource(null)
  previouslyFocusedElement.current?.focus()
}

 const [searchTerm, setSearchTerm] = useState('')
const [sortBy, setSortBy] = useState('category')
const filteredResources = resources.filter((resource) => {
  const query = searchTerm.trim().toLowerCase()

  const matchesTitle = resource.title.toLowerCase().includes(query)

  const matchesTags = resource.tags.some((tag) =>
    tag.toLowerCase().includes(query)
  )

  return matchesTitle || matchesTags
})
const sortedResources = [...filteredResources].sort((a, b) => {
  if (sortBy === 'category') {
    return a.category.localeCompare(b.category)
  }

  const dateA = new Date(a.dateUploaded).getTime()
  const dateB = new Date(b.dateUploaded).getTime()

  if (sortBy === 'date-newest') {
    return dateB - dateA
  }

  if (sortBy === 'date-oldest') {
    return dateA - dateB
  }

  return 0
})

const groupedResources = groupResourcesByCategory(sortedResources)

 

  return (
    <main>
      <h1>Resource Centre</h1>
      <label htmlFor="resource-search">Search resources</label>
      <input
        id="resource-search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by title..."
      />
    <label htmlFor="resource-sort">Sort by</label>
    <select
      id="resource-sort"
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
    >
      <option value="category">Category (A–Z)</option>
      <option value="date-newest">Date (newest first)</option>
      <option value="date-oldest">Date (oldest first)</option>
    </select>

    {sortBy === 'category' ? (
  Object.entries(groupedResources)
    .sort(([categoryA], [categoryB]) =>
      categoryA.localeCompare(categoryB)
    )
    .map(([category, categoryResources]) => (
      <section key={category}>
        <h2>{category}</h2>

        {categoryResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={(event) => {
              previouslyFocusedElement.current = event.currentTarget
              setSelectedResource(resource)
            }}
          />
        ))}
      </section>
    ))
) : (
  <section aria-label="Filtered resources">
    {sortedResources.map((resource) => (
      <ResourceCard
        key={resource.id}
        resource={resource}
        onClick={(event) => {
          previouslyFocusedElement.current = event.currentTarget
          setSelectedResource(resource)
        }}
      />
    ))}
  </section>
)}

      {selectedResource && (
        <ResourceDetails
          resource={selectedResource}
         onClose={closeResourceDetails}
        />
      )}
    </main>
  )
}

export default App