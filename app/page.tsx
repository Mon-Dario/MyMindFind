"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchForm } from "@/components/search-form"
import { SearchOptions } from "@/components/search-options"
import { PriceFilter } from "@/components/price-filter"
import { SearchHistoryPanel } from "@/components/search-history-panel"
import { StoreFilter } from "@/components/store-filter"
import { StoreGrid } from "@/components/store-grid"
import { addToSearchHistory, STORES, getSearchUrl } from "@/lib/stores"

export default function HomePage() {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStores, setSelectedStores] = useState<string[]>(STORES.map((s) => s.name))
  const [openAllTabs, setOpenAllTabs] = useState(false)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const handleSearch = () => {
    const term = inputValue.trim()
    if (term) {
      addToSearchHistory(term)
      setSearchTerm(term)

      if (openAllTabs) {
        const storesToOpen = STORES.filter((s) => selectedStores.includes(s.name))
        // Open each store with a small delay to prevent popup blockers
        storesToOpen.forEach((store, index) => {
          setTimeout(() => {
            window.open(getSearchUrl(store.urlPattern, term, maxPrice ?? undefined, store.priceParam), "_blank")
          }, index * 100)
        })
      }
    } else {
      setSearchTerm(term)
    }
  }

  const handleOpenRandom = () => {
    const term = inputValue.trim()
    if (!term) return

    addToSearchHistory(term)
    setSearchTerm(term)
    const available = STORES.filter((s) => selectedStores.includes(s.name))
    const count = Math.min(Math.floor(Math.random() * 3) + 2, available.length)
    const shuffled = [...available].sort(() => Math.random() - 0.5)
    const randomStores = shuffled.slice(0, count)

    randomStores.forEach((store, index) => {
      setTimeout(() => {
        window.open(getSearchUrl(store.urlPattern, term, maxPrice ?? undefined, store.priceParam), "_blank")
      }, index * 100)
    })
  }

  const handleSelectFromHistory = (term: string) => {
    setInputValue(term)
    setSearchTerm(term)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col items-center px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 flex max-w-2xl flex-col items-center text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Encontre onde comprar em segundos
          </h2>
          <p className="mb-8 text-pretty text-lg text-muted-foreground">
            Digite o nome do produto e veja resultados em {STORES.length} lojas ao mesmo tempo.
          </p>

          <SearchForm searchTerm={inputValue} onSearchTermChange={setInputValue} onSearch={handleSearch} />

          <div className="mt-6 flex flex-col items-center gap-4">
            <PriceFilter maxPrice={maxPrice} onMaxPriceChange={setMaxPrice} />

            <SearchOptions
              selectedStores={selectedStores}
              onSelectedStoresChange={setSelectedStores}
              openAllTabs={openAllTabs}
              onOpenAllTabsChange={setOpenAllTabs}
              onOpenRandom={handleOpenRandom}
            />

            <StoreFilter selectedStores={selectedStores} onSelectedStoresChange={setSelectedStores} />

            <SearchHistoryPanel onSelectTerm={handleSelectFromHistory} />
          </div>
        </section>

        {/* Store Results */}
        <div className="container mx-auto max-w-6xl">
          <StoreGrid searchTerm={searchTerm} selectedStores={selectedStores} maxPrice={maxPrice} />
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        Criado e produzido por Mon
      </footer>
    </div>
  )
}
