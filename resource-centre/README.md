<<<<<<< Updated upstream
# Resource Centre - Frontend Tech Task for Junior and Middleweight Developer Role

A responsive React app for browsing wellbeing resources, with:
- Browse by category — resources grouped alphabetically on first load
- Resource details — click a card to open an accessible modal
- Search — filter resources by title or tags
- Sorting — order resources by category, newest first or oldest first
- Empty search state — helpful message and clear-search button when no results match

## Stack & rationale
- Vite + React + TypeScript — fast development and type-safe components
- Tailwind CSS — responsive layouts and consistent styling
- Vitest + React Testing Library — test components and user interactions

## Getting started
- npm install
- npm run dev # Start the development server
- npm test # Run tests in watch mode
- Build
- npm run build # Create the production build in /dist

## Key decisions
- Component-based structure — separate resource cards, details modal and grouping utility for maintainability
- Typed resource data — shared interfaces and category types for consistency
- Search and sorting — derived from the resource data to avoid unnecessary state
- Responsive grid — adapts to mobile, tablet and desktop layouts
- Modal accessibility — dialog semantics, initial focus, Escape-to-close, focus trapping and focus restoration
- Consistent design system — Tailwind utilities and a shared colour palette

## Tests
- App.test.tsx — resource rendering, search, sorting and empty search state
- ResourceCard.test.tsx — resource information displayed on each card
- ResourceDetails.test.tsx — modal behaviour and keyboard accessibility
- Grouping utility tests — resources grouped correctly by category

## Accessibility
- Labelled search and sorting controls
- Semantic HTML and visible keyboard focus indicators
- Keyboard-accessible resource cards
- Modal with Escape-to-close, focus trapping and focus restoration
- Live announcement for empty search results

### What I'd do with more time
- Lock background scrolling while the modal is open
- Add image loading states and fallback images
- Carry out further accessibility and cross-browser testing
=======
# Resource Centre

A responsive React application for browsing wellbeing resources, with search, sorting and an accessible details modal.

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
- Add category and duration filters.
- Connect the resource library to a CMS or API.
- Set up automated deployment and continuous integration.
- Carry out further accessibility and cross-browser testing.
>>>>>>> Stashed changes
