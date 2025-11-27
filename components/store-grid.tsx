"use client"

import { useEffect, useState } from "react"
import { StoreCard } from "@/components/store-card"
import { STORES, getFavoriteStores } from "@/lib/stores"

interface StoreGridProps {
  searchTerm: string
  selectedStores?: string[]
  maxPrice?: number | null
}

export function StoreGrid({ searchTerm, selectedStores, maxPrice }: StoreGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(getFavoriteStores())
    const handleStorage = () => setFavorites(getFavoriteStores())
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const filteredStores = selectedStores ? STORES.filter((store) => selectedStores.includes(store.name)) : STORES

  const sortedStores = [...filteredStores].sort((a, b) => {
    const aFav = favorites.includes(a.name) ? 0 : 1
    const bFav = favorites.includes(b.name) ? 0 : 1
    return aFav - bFav
  })

  return (
    <section className="w-full">
      <div className="mb-6 text-center">
        {searchTerm.trim() ? (
          <h2 className="text-xl font-semibold text-foreground">
            Resultados para: <span className="text-primary">"{searchTerm}"</span>
            {maxPrice && (
              <span className="ml-2 text-base font-normal text-muted-foreground">
                (até R$ {maxPrice.toLocaleString("pt-BR")})
              </span>
            )}
          </h2>
        ) : (
          <h2 className="text-xl font-semibold text-foreground">Escolha uma loja para buscar</h2>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          {sortedStores.length} {sortedStores.length === 1 ? "loja disponível" : "lojas disponíveis"}
        </p>
      </div>

      {sortedStores.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Nenhuma loja selecionada. Selecione pelo menos uma loja acima.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedStores.map((store, index) => (
            <StoreCard key={store.name} store={store} searchTerm={searchTerm} index={index} maxPrice={maxPrice} />
          ))}
        </div>
      )}
    </section>
  )
}
