import { Command } from 'lucide-react'
import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import { SITE_METADATA } from '~/data/site-metadata'

export function SearchButton() {
  const { search } = SITE_METADATA
  if (search && ['kbar', 'algolia'].includes(search.provider)) {
    const SearchButton = search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButton
        aria-label="Search"
        className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Command size={20} strokeWidth={1.5} />
      </SearchButton>
    )
  }
}
