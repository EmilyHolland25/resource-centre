import ResourceCard from './components/ResourceCard/ResourceCard'
import { resources } from './data/resources'
import { groupResourcesByCategory } from './utils/groupResourcesByCategory'

function App() {
  const groupedResources = groupResourcesByCategory(resources)

  return (
    <main>
      <h1>Resource Centre</h1>

      {Object.entries(groupedResources).map(([category, categoryResources]) => (
        <section key={category}>
          <h2>{category}</h2>

          {categoryResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </section>
      ))}
    </main>
  )
}

export default App