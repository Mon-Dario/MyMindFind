"use client"

import { useState } from "react"
import { DollarSign, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PriceFilterProps {
  maxPrice: number | null
  onMaxPriceChange: (price: number | null) => void
}

const PRESET_PRICES = [50, 100, 200, 500, 1000, 2000]

export function PriceFilter({ maxPrice, onMaxPriceChange }: PriceFilterProps) {
  const [expanded, setExpanded] = useState(false)
  const [customPrice, setCustomPrice] = useState("")

  const handlePresetClick = (price: number) => {
    onMaxPriceChange(price === maxPrice ? null : price)
  }

  const handleCustomPriceSubmit = () => {
    const price = Number.parseInt(customPrice)
    if (!isNaN(price) && price > 0) {
      onMaxPriceChange(price)
    }
  }

  const handleClear = () => {
    onMaxPriceChange(null)
    setCustomPrice("")
  }

  return (
    <div className="w-full max-w-xl">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="gap-2 bg-transparent"
      >
        <DollarSign className="h-4 w-4" />
        {maxPrice ? `Até R$ ${maxPrice.toLocaleString("pt-BR")}` : "Filtrar por preço"}
        <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </Button>

      {expanded && (
        <div className="mt-3 rounded-lg border border-border bg-card p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-3 flex items-center justify-between">
            <Label className="text-sm font-medium">Preço máximo</Label>
            {maxPrice && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Limpar filtro
              </button>
            )}
          </div>

          {/* Preset prices */}
          <div className="mb-4 flex flex-wrap gap-2">
            {PRESET_PRICES.map((price) => (
              <button
                key={price}
                type="button"
                onClick={() => handlePresetClick(price)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  maxPrice === price
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                R$ {price.toLocaleString("pt-BR")}
              </button>
            ))}
          </div>

          {/* Custom price input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                R$
              </span>
              <Input
                type="number"
                placeholder="Valor personalizado"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomPriceSubmit()}
                className="pl-9"
                min={1}
              />
            </div>
            <Button type="button" size="sm" onClick={handleCustomPriceSubmit}>
              Aplicar
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            * Algumas lojas podem não suportar filtro de preço na URL
          </p>
        </div>
      )}
    </div>
  )
}
