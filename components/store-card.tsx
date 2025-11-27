"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import type { Store } from "@/lib/stores"
import { getSearchUrl, getFavoriteStores, toggleFavoriteStore } from "@/lib/stores"

interface StoreCardProps {
  store: Store
  searchTerm: string
  index: number
  maxPrice?: number | null
}

export function StoreCard({ store, searchTerm, index, maxPrice }: StoreCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(getFavoriteStores().includes(store.name))
  }, [store.name])

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newState = toggleFavoriteStore(store.name)
    setIsFavorite(newState)
  }

  const handleOpenStore = () => {
    const url = searchTerm.trim()
      ? getSearchUrl(store.urlPattern, searchTerm, maxPrice ?? undefined, store.priceParam)
      : store.urlPattern
          .replace("TERMO", "")
          .replace("?keyword=", "")
          .replace("?SearchText=", "")
          .replace("?k=", "")
          .replace("?q=", "")
          .replace("/search/", "/")
          .replace("/busca/", "/")
          .replace("/pdsearch//", "/")
          .replace("/s?", "")
          .split("TERMO")[0]
    window.open(url, "_blank")
  }

  const supportsPriceFilter = !!store.priceParam

  return (
    <Card
      className="group relative flex flex-col overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        animationDelay: `${index * 50}ms`,
        borderColor: "transparent",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: store.color }}
      />

      <button
        onClick={handleToggleFavorite}
        className="absolute right-3 top-4 z-10 rounded-full p-1.5 transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: isFavorite ? store.color : "transparent" }}
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Star
          className={`h-4 w-4 transition-colors ${isFavorite ? "fill-white text-white" : "text-muted-foreground hover:text-foreground"}`}
        />
      </button>

      <CardHeader className="pb-3 pt-5">
        <div
          className="mb-4 flex h-20 w-full items-center justify-center rounded-lg p-3"
          style={{ backgroundColor: store.color }}
        >
          <img
            src={store.logo || "/placeholder.svg"}
            alt={store.name}
            className="h-full max-h-14 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {maxPrice && supportsPriceFilter && (
          <div className="mb-2">
            <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Filtrando até R${maxPrice}
            </span>
          </div>
        )}

        <CardDescription className="line-clamp-2 text-sm">{store.description}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto pt-0">
        <Button
          onClick={handleOpenStore}
          className="w-full gap-2 transition-all duration-300 text-white"
          style={{
            backgroundColor: store.color,
            borderColor: store.color,
          }}
        >
          {searchTerm.trim() ? `Buscar` : `Ir para loja`}
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
