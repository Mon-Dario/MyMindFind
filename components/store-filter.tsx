"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { STORES } from "@/lib/stores"

interface StoreFilterProps {
  selectedStores: string[]
  onSelectedStoresChange: (stores: string[]) => void
}

export function StoreFilter({ selectedStores, onSelectedStoresChange }: StoreFilterProps) {
  const [filterText, setFilterText] = useState("")
  const [showFilter, setShowFilter] = useState(false)

  const filteredStores = STORES.filter((store) => store.name.toLowerCase().includes(filterText.toLowerCase()))

  const handleToggleStore = (storeName: string) => {
    if (selectedStores.includes(storeName)) {
      onSelectedStoresChange(selectedStores.filter((s) => s !== storeName))
    } else {
      onSelectedStoresChange([...selectedStores, storeName])
    }
  }

  const handleSelectFiltered = () => {
    const filteredNames = filteredStores.map((s) => s.name)
    onSelectedStoresChange(filteredNames)
  }

  const handleClearFilter = () => {
    setFilterText("")
  }

  return (
    <div className="w-full max-w-xl">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setShowFilter(!showFilter)}
        className="mb-2 gap-1.5"
      >
        <Filter className="h-4 w-4" />
        Filtrar por loja
      </Button>

      {showFilter && (
        <div className="rounded-lg border border-border bg-card p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-3 flex items-center gap-2">
            <Input
              type="text"
              placeholder="Digite o nome da loja..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="flex-1"
            />
            {filterText && (
              <Button type="button" variant="ghost" size="icon" onClick={handleClearFilter} className="h-9 w-9">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {filterText && (
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{filteredStores.length} loja(s) encontrada(s)</span>
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={handleSelectFiltered}
                className="h-auto p-0 text-xs"
              >
                Selecionar apenas estas
              </Button>
            </div>
          )}

          <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto">
            {filteredStores.map((store) => (
              <button
                key={store.name}
                type="button"
                onClick={() => handleToggleStore(store.name)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all ${
                  selectedStores.includes(store.name)
                    ? "border-transparent text-white"
                    : "border-border bg-background text-foreground hover:bg-accent"
                }`}
                style={{
                  backgroundColor: selectedStores.includes(store.name) ? store.color : undefined,
                }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: selectedStores.includes(store.name) ? "#fff" : store.color }}
                />
                {store.name}
              </button>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">Nenhuma loja encontrada com "{filterText}"</p>
          )}
        </div>
      )}
    </div>
  )
}
