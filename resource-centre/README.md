# Resource Centre - Frontend Tech Task for Junior and Middleweight Developer Role

A responsive React application for browsing wellbeing resources, with search, sorting and an accessible details modal.

The Resource Centre can be viewed here https://emilyholland25.github.io/recource-centre

## Features

- **Browse by category** — resources grouped alphabetically on first load.
- **Resource details** — click a resource card to open a modal with more information.
- **Search** — filter resources by title or tags.
- **Sorting** — sort resources by category, newest first or oldest first.
- **Empty search state** — helpful message and clear-search button when no results match.
- **Responsive design** — layouts adapt to mobile, tablet and desktop screens.

## Tech Stack

- **React** — component-based user interface.
- **TypeScript** — type safety and more reliable code.
- **Vite** — fast development server and build tooling.
- **Tailwind CSS** — responsive styling and consistent design.
- **Vitest** — unit and component testing.
- **React Testing Library** — testing components through user interactions.

## Getting Started

Clone the repository, navigate to the project directory and install the dependencies.

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the tests:

```bash
npm test
```

## Production Build

Create an optimised production build:

```bash
npm run build
```

The generated files are saved in the `dist` directory.

## Key Decisions

- **Component-based architecture** — separate components for resource cards and the details modal to improve maintainability and reusability.
- **Typed resource data** — TypeScript interfaces and category types help maintain consistent data structures.
- **Separation of concerns** — resource grouping and data-processing logic are kept separate from the UI where appropriate.
- **Accessible interactions** — keyboard navigation, visible focus indicators, modal focus management and Escape-to-close behaviour.
- **Consistent design system** — a shared colour palette and reusable Tailwind CSS styling.
- **Test-driven development** — tests help verify expected behaviour and reduce regressions as features are added.

## Testing

Tests cover key functionality, including:

- Resource cards and displayed information.
- Searching resources by title and tag.
- Sorting and category grouping.
- Empty search results and clearing the search.
- Modal interactions and keyboard accessibility.

## Accessibility

- Labelled search and sorting controls.
- Semantic HTML and visible keyboard focus indicators.
- Keyboard-accessible resource cards.
- Accessible modal with focus trapping, focus restoration and Escape-to-close.
- Live announcement for empty search results.

## Future Improvements

With more time, I would:

- Lock background scrolling while the modal is open.
- Add image loading states and fallback images.
- Carry out further accessibility and cross-browser testing.
  > > > > > > > Stashed changes
