"use client"

import { useState } from "react"
import { Shuffle, Layers, Store } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { STORES } from "@/lib/stores"

interface SearchOptionsProps {
  selectedStores: string[]
  onSelectedStoresChange: (stores: string[]) => void
  openAllTabs: boolean
  onOpenAllTabsChange: (value: boolean) => void
  onOpenRandom: () => void
}

export function SearchOptions({
  selectedStores,
  onSelectedStoresChange,
  openAllTabs,
  onOpenAllTabsChange,
  onOpenRandom,
}: SearchOptionsProps) {
  const [expanded, setExpanded] = useState(false)

  const handleStoreToggle = (storeName: string) => {
    if (selectedStores.includes(storeName)) {
      onSelectedStoresChange(selectedStores.filter((s) => s !== storeName))
    } else {
      onSelectedStoresChange([...selectedStores, storeName])
    }
  }

  const handleSelectAll = () => {
    if (selectedStores.length === STORES.length) {
      onSelectedStoresChange([])
    } else {
      onSelectedStoresChange(STORES.map((s) => s.name))
    }
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      {/* Main Options Row */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Open All Tabs */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Checkbox
            id="open-all"
            checked={openAllTabs}
            onCheckedChange={(checked) => onOpenAllTabsChange(checked === true)}
          />
          <Label
            htmlFor="open-all"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Layers className="h-4 w-4" />
            Abrir todas em abas
          </Label>
        </div>

        {/* Open Random */}
        <Button type="button" variant="outline" size="sm" onClick={onOpenRandom} className="gap-1.5 bg-transparent">
          <Shuffle className="h-4 w-4" />
          Abrir aleatórias
        </Button>

        {/* Select Stores Toggle */}
        <Button type="button" variant="outline" size="sm" onClick={() => setExpanded(!expanded)} className="gap-1.5">
          <Store className="h-4 w-4" />
          Lojas ({selectedStores.length}/{STORES.length})
        </Button>
      </div>

      {/* Store Selection Grid */}
      {expanded && (
        <div className="rounded-lg border border-border bg-card p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Escolha as lojas</span>
            <Button type="button" variant="link" size="sm" onClick={handleSelectAll} className="h-auto p-0 text-xs">
              {selectedStores.length === STORES.length ? "Desmarcar todas" : "Selecionar todas"}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {STORES.map((store) => (
              <label
                key={store.name}
                className={`flex cursor-pointer items-center gap-2 rounded-md border-2 p-2 transition-all ${
                  selectedStores.includes(store.name)
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-muted/50 hover:bg-accent"
                }`}
              >
                <Checkbox
                  checked={selectedStores.includes(store.name)}
                  onCheckedChange={() => handleStoreToggle(store.name)}
                />
                <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: store.color }} />
                <span className="truncate text-xs font-medium">{store.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
