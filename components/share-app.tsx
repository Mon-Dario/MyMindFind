"use client"

import { useState } from "react"
import { Share2, Copy, Check, QrCode, X, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ShareApp() {
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const appUrl = typeof window !== "undefined" ? window.location.origin : ""

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(appUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = appUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "MyMindFind - Tudo em um só lugar",
          text: "Encontre o melhor preço em várias lojas de uma vez!",
          url: appUrl,
        })
      } catch {
        setShowModal(true)
      }
    } else {
      setShowModal(true)
    }
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}`

  return (
    <>
      <Button onClick={handleShare} variant="outline" size="sm" className="gap-2 bg-transparent">
        <Share2 className="h-4 w-4" />
        Compartilhar App
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
              <Share2 className="h-5 w-5 text-primary" />
              Compartilhar MyMindFind
            </h3>

            <div className="mb-6 flex flex-col items-center gap-4">
              <div className="rounded-lg border border-border bg-white p-3">
                <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code do App" className="h-48 w-48" />
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <QrCode className="h-4 w-4" />
                Escaneie o QR Code para abrir no celular
              </p>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-foreground">Link do App</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={appUrl}
                  readOnly
                  className="flex-1 rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
                />
                <Button onClick={handleCopy} variant="outline" size="sm" className="gap-1 bg-transparent">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
              <h4 className="mb-2 flex items-center gap-2 font-medium text-blue-800 dark:text-blue-300">
                <Smartphone className="h-4 w-4" />
                Instalar no Celular
              </h4>
              <ol className="ml-4 list-decimal space-y-1 text-sm text-blue-700 dark:text-blue-400">
                <li>Abra o link no navegador do celular</li>
                <li>Toque no menu do navegador (3 pontinhos)</li>
                <li>Selecione &quot;Adicionar à tela inicial&quot;</li>
                <li>Pronto! O app ficará como um ícone</li>
              </ol>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowModal(false)} variant="default">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
