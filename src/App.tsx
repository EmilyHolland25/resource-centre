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
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <header className="mb-10">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[rgb(50,161,179)]">
        Discover something new
      </p>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-[rgb(36,73,104)] sm:text-5xl">
        Resource Centre
      </h1>
      <p className="max-w-2xl text-base leading-7 text-[rgb(36,73,104)]/80">
        Explore resources to support your wellbeing, from mindful moments to
        practical tips for everyday life.
      </p>
    </header>
     <div className="mb-10 grid grid-cols-1 gap-5 rounded-2xl border border-[#dce5ea] bg-white p-5 shadow-sm sm:grid-cols-[minmax(0,1fr)_240px] sm:items-end sm:p-6">
  <div>
    <label
      htmlFor="resource-search"
      className="mb-2 block text-sm font-semibold text-[rgb(36,73,104)]"
    >
      Search resources
    </label>
    <input
      id="resource-search"
      type="search"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      placeholder="Search by title or tag..."
      className="w-full rounded-lg border border-[#cbd8e0] bg-white px-4 py-3 text-[rgb(36,73,104)] placeholder:text-gray-400 focus:border-[rgb(50,161,179)] focus:outline-none focus:ring-2 focus:ring-[rgb(50,161,179)]/20"
    />
  </div>

  <div>
    <label
      htmlFor="resource-sort"
      className="mb-2 block text-sm font-semibold text-[rgb(36,73,104)]"
    >
      Sort by
    </label>
    <select
      id="resource-sort"
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
      className="w-full rounded-lg border border-[#cbd8e0] bg-white px-4 py-3 text-[rgb(36,73,104)] focus:border-[rgb(50,161,179)] focus:outline-none focus:ring-2 focus:ring-[rgb(50,161,179)]/20"
    >
      <option value="category">Category (A–Z)</option>
      <option value="date-newest">Date (newest first)</option>
      <option value="date-oldest">Date (oldest first)</option>
    </select>
  </div>
</div>

    {filteredResources.length === 0 ? (
  <section
    aria-live="polite"
    className="rounded-2xl border border-dashed border-[#cbd8e0] bg-white px-6 py-16 text-center"
  >
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f4f5] text-3xl">
      <span aria-hidden="true">🔎</span>
    </div>

    <h2 className="mb-3 text-2xl font-bold text-[rgb(36,73,104)]">
      No resources found
    </h2>

    <p className="mx-auto mb-6 max-w-md text-[rgb(36,73,104)]/75">
      We couldn't find any resources matching your search.
      Try a different title or tag.
    </p>

    <button
      type="button"
      onClick={() => setSearchTerm('')}
      className="rounded-lg bg-[rgb(239,119,38)] px-5 py-3 font-semibold text-white transition hover:bg-[rgb(211,96,24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(50,161,179)]"
    >
      Clear search
    </button>
  </section>
) : sortBy === 'category' ? (
  Object.entries(groupedResources)
    .sort(([categoryA], [categoryB]) =>
      categoryA.localeCompare(categoryB)
    )
   .map(([category, categoryResources]) => (
  <section key={category} className="mb-12">
    <div className="mb-5 flex items-center gap-3">
      <h2 className="mb-0 text-2xl font-bold text-[rgb(50,161,179)]">
        {category}
      </h2>
      <span className="rounded-full bg-[#e5f4f5] px-3 py-1 text-sm font-medium text-[rgb(36,73,104)]">
        {categoryResources.length}
      </span>
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  </section>
))
) : (
  <section aria-label="Filtered resources" 
  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" > 
  {sortedResources.map((resource) => ( 
    <ResourceCard key={resource.id} 
    resource={resource} 
    onClick={(event) => { 
      previouslyFocusedElement.current = event.currentTarget 
      setSelectedResource(resource)
     }} /> ))} 
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