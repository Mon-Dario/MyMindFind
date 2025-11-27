"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSearchHistory, clearSearchHistory } from "@/lib/stores"

interface SearchFormProps {
  searchTerm: string
  onSearchTermChange: (term: string) => void
  onSearch: () => void
}

export function SearchForm({ searchTerm, onSearchTermChange, onSearch }: SearchFormProps) {
  const [history, setHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowHistory(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
    setShowHistory(false)
  }

  const handleHistoryClick = (term: string) => {
    onSearchTermChange(term)
    setShowHistory(false)
    inputRef.current?.focus()
  }

  const handleClearHistory = () => {
    clearSearchHistory()
    setHistory([])
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <div ref={containerRef} className="relative flex-1">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ex: interruptores digitais"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          onFocus={() => history.length > 0 && setShowHistory(true)}
          className="h-12 text-base pr-10"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchTermChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {showHistory && history.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <span className="text-xs font-medium text-muted-foreground">Buscas recentes</span>
              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Limpar
              </button>
            </div>
            <ul>
              {history.map((term, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleHistoryClick(term)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                  >
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Button type="submit" size="lg" className="h-12 gap-2">
        <Search className="h-4 w-4" />
        Buscar
      </Button>
    </form>
  )
}
