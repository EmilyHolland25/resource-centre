import { useEffect, useRef } from 'react'
import type { Resource } from '../../types/resource'

interface ResourceDetailsProps {
  resource: Resource
  onClose: () => void
}

function ResourceDetails({ resource, onClose }: ResourceDetailsProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
  closeButtonRef.current?.focus()
}, [])

 useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) {
      event.preventDefault()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}, [onClose])

const dialogRef = useRef<HTMLDivElement>(null)

 return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-title"
      onClick={(event) => event.stopPropagation()}
      className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-semibold text-[rgb(36,73,104)] shadow-sm transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(50,161,179)]"
      >
        <span aria-hidden="true">×</span>
      </button>

      <img
        src={resource.thumbnail}
        alt={resource.title}
        className="mb-6 aspect-[16/9] w-full rounded-xl object-cover"
      />

      <span className="inline-block rounded-full bg-[#e5f4f5] px-3 py-1 text-sm font-semibold text-[rgb(36,73,104)]">
        {resource.category}
      </span>

      <h2
        id="resource-title"
        className="mb-4 mt-4 text-2xl font-bold text-[rgb(36,73,104)] sm:text-3xl"
      >
        {resource.title}
      </h2>

      <p className="mb-6 leading-7 text-slate-600">
        {resource.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-6 border-y border-[#dce5ea] py-4 text-sm text-[rgb(36,73,104)]">
        <p className="mb-0">
          <span className="font-semibold">Duration:</span>{' '}
          {resource.duration} minutes
        </p>

        <p className="mb-0">
          <span className="font-semibold">Added:</span>{' '}
          {new Date(resource.dateUploaded).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-[rgb(36,73,104)]">
        Topics
      </h3>

      <div className="flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
)
}

export default ResourceDetails