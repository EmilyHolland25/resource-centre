import { useState } from 'react'
import ResourceCard from './components/ResourceCard/ResourceCard'
import ResourceDetails from './components/ResourceDetails/ResourceDetails'
import { resources } from './data/resources'
import { groupResourcesByCategory } from './utils/groupResourcesByCategory'
import type { Resource } from './types/resource'

function App() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  )

  const groupedResources = groupResourcesByCategory(resources)

  return (
    <main>
      <h1>Resource Centre</h1>

      {Object.entries(groupedResources).map(
        ([category, categoryResources]) => (
          <section key={category}>
            <h2>{category}</h2>

            {categoryResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onClick={() => setSelectedResource(resource)}
              />
            ))}
          </section>
        )
      )}

      {selectedResource && (
        <ResourceDetails
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </main>
  )
}

export default App