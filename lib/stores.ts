export interface Store {
  name: string
  description: string
  urlPattern: string
  priceParam?: string
  logo: string
  color: string
}

export const STORES: Store[] = [
  {
    name: "Shopee",
    description: "Marketplace geral, muitos vendedores do Brasil e exterior",
    urlPattern: "https://shopee.com.br/search?keyword=TERMO",
    priceParam: "&maxPrice=PRICE",
    logo: "/logos/shopee.jpg",
    color: "#EE4D2D",
  },
  {
    name: "Mercado Livre",
    description: "Maior marketplace da América Latina, vendedores locais e internacionais",
    urlPattern: "https://lista.mercadolivre.com.br/TERMO",
    priceParam: "_PriceRange_0-PRICE",
    logo: "/logos/mercadolivre.jpg",
    color: "#FFE600",
  },
  {
    name: "Amazon",
    description: "Gigante do e-commerce com entrega rápida e produtos originais",
    urlPattern: "https://www.amazon.com.br/s?k=TERMO",
    priceParam: "&rh=p_36%3A-PRICE00",
    logo: "/logos/amazon.jpg",
    color: "#FF9900",
  },
  {
    name: "AliExpress",
    description: "Produtos direto da China com preços competitivos",
    urlPattern: "https://www.aliexpress.com/wholesale?SearchText=TERMO",
    priceParam: "&maxPrice=PRICE",
    logo: "/logos/aliexpress.jpg",
    color: "#E62E04",
  },
  {
    name: "Magalu",
    description: "Varejista brasileiro com ampla variedade de produtos",
    urlPattern: "https://www.magazineluiza.com.br/busca/TERMO",
    priceParam: "/?price=-PRICE",
    logo: "/logos/magalu.jpg",
    color: "#0086FF",
  },
  {
    name: "Americanas",
    description: "Grande variedade de produtos com promoções frequentes",
    urlPattern: "https://www.americanas.com.br/busca/TERMO",
    priceParam: "?filter=%7B%22price%22%3A%7B%22max%22%3APRICE%7D%7D",
    logo: "/logos/americanas.jpg",
    color: "#E60014",
  },
  {
    name: "Carrefour",
    description: "Hipermercado com eletrônicos, alimentos e mais",
    urlPattern: "https://www.carrefour.com.br/s?q=TERMO",
    priceParam: "&facets=price%3A0%3APRICE",
    logo: "/logos/carrefour.jpg",
    color: "#004E9A",
  },
  {
    name: "TEMU",
    description: "Novidade no Brasil com produtos super baratos da China",
    urlPattern: "https://www.temu.com/br/search_result.html?search_key=TERMO",
    logo: "/logos/temu.jpg",
    color: "#FB7701",
  },
  {
    name: "SHEIN",
    description: "Moda, acessórios e itens de casa com preços acessíveis",
    urlPattern: "https://br.shein.com/pdsearch/TERMO/",
    priceParam: "?max_price=PRICE",
    logo: "/logos/shein.jpg",
    color: "#222222",
  },
  {
    name: "Wish",
    description: "Produtos variados com envio internacional",
    urlPattern: "https://www.wish.com/search/TERMO",
    logo: "/logos/wish.jpg",
    color: "#2FB7EC",
  },
  {
    name: "eBay",
    description: "Marketplace global com produtos novos e usados",
    urlPattern: "https://www.ebay.com/sch/i.html?_nkw=TERMO",
    priceParam: "&_udhi=PRICE",
    logo: "/logos/ebay.jpg",
    color: "#E53238",
  },
  {
    name: "Submarino",
    description: "Eletrônicos, livros e variedades com bons preços",
    urlPattern: "https://www.submarino.com.br/busca/TERMO",
    priceParam: "?filter=%7B%22price%22%3A%7B%22max%22%3APRICE%7D%7D",
    logo: "/logos/submarino.jpg",
    color: "#FFD000",
  },
  {
    name: "KaBuM!",
    description: "Especialista em tecnologia, games e hardware",
    urlPattern: "https://www.kabum.com.br/busca/TERMO",
    priceParam: "?facet_filters=eyJwcmljZSI6eyJtYXgiOlBSSUNFfX0=",
    logo: "/logos/kabum.jpg",
    color: "#FF6500",
  },
  {
    name: "Ponto Frio",
    description: "Eletrônicos e eletrodomésticos, tradicional varejista brasileiro",
    urlPattern: "https://www.pontofrio.com.br/busca/TERMO",
    logo: "/logos/pontofrio.jpg",
    color: "#0066CC",
  },
  {
    name: "Alibaba",
    description: "Ideal para compras em atacado e importação B2B",
    urlPattern: "https://www.alibaba.com/trade/search?SearchText=TERMO",
    logo: "/logos/alibaba.jpg",
    color: "#FF6A00",
  },
  {
    name: "Made-in-China",
    description: "Fornecedores chineses para atacado e fabricação",
    urlPattern: "https://www.made-in-china.com/products-search/hot-china-products/TERMO.html",
    logo: "/logos/madeinchina.jpg",
    color: "#D32F2F",
  },
  {
    name: "Pernambucanas",
    description: "Moda, casa e eletrônicos com tradição brasileira",
    urlPattern: "https://www.pernambucanas.com.br/busca?q=TERMO",
    logo: "/logos/pernambucanas.jpg",
    color: "#FFD700",
  },
]

export function getSearchUrl(urlPattern: string, searchTerm: string, maxPrice?: number, priceParam?: string): string {
  let url = urlPattern.replace("TERMO", encodeURIComponent(searchTerm))

  if (maxPrice && priceParam) {
    url += priceParam.replace("PRICE", String(maxPrice))
  }

  return url
}

const HISTORY_KEY = "search_history"
const MAX_HISTORY = 20

export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return []
  const history = localStorage.getItem(HISTORY_KEY)
  return history ? JSON.parse(history) : []
}

export function addToSearchHistory(term: string): void {
  if (typeof window === "undefined" || !term.trim()) return
  const history = getSearchHistory()
  const filtered = history.filter((item) => item !== term)
  const updated = [term, ...filtered].slice(0, MAX_HISTORY)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

export function clearSearchHistory(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(HISTORY_KEY)
}

const FAVORITES_KEY = "favorite_stores"

export function getFavoriteStores(): string[] {
  if (typeof window === "undefined") return []
  const favorites = localStorage.getItem(FAVORITES_KEY)
  return favorites ? JSON.parse(favorites) : []
}

export function toggleFavoriteStore(storeName: string): boolean {
  if (typeof window === "undefined") return false
  const favorites = getFavoriteStores()
  const isFavorite = favorites.includes(storeName)
  const updated = isFavorite ? favorites.filter((name) => name !== storeName) : [...favorites, storeName]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  return !isFavorite
}
