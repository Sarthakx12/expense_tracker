import {
  Utensils,
  ShoppingCart,
  Car,
  Receipt,
  ShoppingBag,
  Film,
  HeartPulse,
  Home,
  BookOpen,
  CreditCard,
  CircleEllipsis,
  Banknote,
  Briefcase,
  HelpCircle,
  LucideIcon
} from 'lucide-react'

export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  'utensils': Utensils,
  'shopping-cart': ShoppingCart,
  'car': Car,
  'receipt': Receipt,
  'shopping-bag': ShoppingBag,
  'film': Film,
  'heart-pulse': HeartPulse,
  'home': Home,
  'book-open': BookOpen,
  'credit-card': CreditCard,
  'circle-ellipsis': CircleEllipsis,
  'banknote': Banknote,
  'briefcase': Briefcase,
}

export function getCategoryIcon(iconName: string | null | undefined): LucideIcon {
  if (!iconName) return HelpCircle
  return CATEGORY_ICON_MAP[iconName] || HelpCircle
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  // Use Indian Digit grouping for INR (en-IN), standard (en-US) for others
  const locale = currency === 'INR' ? 'en-IN' : 'en-US'
  
  // Clean up currency name
  const cleanCurrency = (currency || 'INR').toUpperCase()
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: cleanCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  } catch {
    // Fallback if currency code is invalid or not supported
    return `${cleanCurrency} ${amount.toFixed(2)}`
  }
}

export function formatDate(dateStr: string | Date): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return String(dateStr)
  
  // Format as "dd MMM yyyy" e.g. "16 Jun 2026"
  const day = date.getDate().toString().padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  
  return `${day} ${month} ${year}`
}
