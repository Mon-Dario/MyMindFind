"use client"

import { useState, useEffect } from "react"
import { History, Clock, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSearchHistory, clearSearchHistory } from "@/lib/stores"

interface SearchHistoryPanelProps {
  onSelectTerm: (term: string) => void
}

export function SearchHistoryPanel({ onSelectTerm }: SearchHistoryPanelProps) {
  const [expanded, setExpanded] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  const refreshHistory = () => {
    setHistory(getSearchHistory())
  }

  const handleClear = () => {
    clearSearchHistory()
    setHistory([])
  }

  const handleSelect = (term: string) => {
    onSelectTerm(term)
    setExpanded(false)
  }

  if (history.length === 0) return null

  return (
    <div className="w-full max-w-xl">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          refreshHistory()
          setExpanded(!expanded)
        }}
        className="gap-2"
      >
        <History className="h-4 w-4" />
        Histórico de buscas ({history.length})
      </Button>

      {expanded && (
        <div className="mt-3 rounded-lg border border-border bg-card animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-medium">Buscas recentes</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
                Limpar tudo
              </button>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {history.map((term, i) => (
              <li key={i} className="border-b border-border last:border-0">
                <button
                  type="button"
                  onClick={() => handleSelect(term)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-accent"
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{term}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
