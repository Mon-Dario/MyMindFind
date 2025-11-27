import { Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShareApp } from "@/components/share-app"

export function Header() {
  return (
    <header className="w-full border-b border-border bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Search className="h-7 w-7 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground md:text-xl">MyMindFind</h1>
            <span className="text-xs text-muted-foreground">Tudo em um só lugar</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-muted-foreground lg:block">Busque em várias lojas de uma vez</p>
          <ShareApp />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
