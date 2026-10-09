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
