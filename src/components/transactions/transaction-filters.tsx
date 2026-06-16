'use client'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Category } from '@/types'
import { cn } from '@/lib/utils'
import { Search, X, ChevronDown, Check } from 'lucide-react'

interface TransactionFiltersProps {
  categories: Category[]
}

export function TransactionFilters({ categories }: TransactionFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize state from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [type, setType] = useState(searchParams.get('type') || 'all')
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '')
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '')
  const [selectedCatIds, setSelectedCatIds] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  )

  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCatDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Apply filters to URL
  const applyFilters = (updates: {
    search?: string
    type?: string
    startDate?: string
    endDate?: string
    categories?: string[]
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Set or delete page (reset page to 1 when changing filters)
    params.set('page', '1')

    const newSearch = updates.search !== undefined ? updates.search : search
    const newType = updates.type !== undefined ? updates.type : type
    const newStart = updates.startDate !== undefined ? updates.startDate : startDate
    const newEnd = updates.endDate !== undefined ? updates.endDate : endDate
    const newCats = updates.categories !== undefined ? updates.categories : selectedCatIds

    if (newSearch.trim()) params.set('search', newSearch.trim())
    else params.delete('search')

    if (newType && newType !== 'all') params.set('type', newType)
    else params.delete('type')

    if (newStart) params.set('startDate', newStart)
    else params.delete('startDate')

    if (newEnd) params.set('endDate', newEnd)
    else params.delete('endDate')

    if (newCats.length > 0) params.set('categories', newCats.join(','))
    else params.delete('categories')

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleReset = () => {
    setSearch('')
    setType('all')
    setStartDate('')
    setEndDate('')
    setSelectedCatIds([])
    setIsCatDropdownOpen(false)
    router.push(pathname)
  }

  const toggleCategory = (catId: string) => {
    let nextCats: string[]
    if (selectedCatIds.includes(catId)) {
      nextCats = selectedCatIds.filter((id) => id !== catId)
    } else {
      nextCats = [...selectedCatIds, catId]
    }
    setSelectedCatIds(nextCats)
    applyFilters({ categories: nextCats })
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters({ search })
    }
  }

  const handleSearchBlur = () => {
    applyFilters({ search })
  }

  const handleTypeChange = (newType: string) => {
    setType(newType)
    applyFilters({ type: newType })
  }

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
    applyFilters({ startDate: start, endDate: end })
  }

  const hasActiveFilters = search || type !== 'all' || startDate || endDate || selectedCatIds.length > 0

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4 space-y-4 backdrop-blur-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search merchant or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onBlur={handleSearchBlur}
            className="pl-9 bg-zinc-900/60 border-zinc-850 focus:border-zinc-700 text-zinc-200"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 h-8 gap-1 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-zinc-900/60">
        {/* Filter: Type Toggle */}
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-400 font-medium">Type</Label>
          <div className="grid grid-cols-3 gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-850 h-8">
            {['all', 'expense', 'income'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className={cn(
                  "text-xs font-semibold rounded-md transition-all capitalize cursor-pointer",
                  type === t
                    ? t === 'expense'
                      ? "bg-red-500/10 text-red-400 border border-red-500/10"
                      : t === 'income'
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                      : "bg-zinc-850 text-zinc-200 border border-zinc-700"
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Filter: Categories Multi-Select */}
        <div className="space-y-1.5" ref={dropdownRef}>
          <Label className="text-xs text-zinc-400 font-medium">Categories</Label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              className="flex h-8 w-full items-center justify-between rounded-lg border border-zinc-850 bg-zinc-900/30 px-3 py-1 text-sm text-zinc-200 hover:border-zinc-750 transition-colors text-left"
            >
              <span className="truncate">
                {selectedCatIds.length === 0
                  ? 'All Categories'
                  : selectedCatIds.length === 1
                  ? categories.find((c) => c.id === selectedCatIds[0])?.name || '1 Selected'
                  : `${selectedCatIds.length} Categories`}
              </span>
              <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0 ml-2" />
            </button>

            {isCatDropdownOpen && (
              <div className="absolute left-0 mt-1.5 z-20 max-h-60 w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-1.5 shadow-xl shadow-black/80">
                <div className="space-y-0.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCatIds.includes(cat.id)
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs text-left cursor-pointer transition-colors",
                          isSelected
                            ? "bg-zinc-900 text-zinc-100"
                            : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: cat.color || '#71717a' }}
                          />
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider">
                            ({cat.type})
                          </span>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                      </button>
                    )
                  })}
                  {categories.length === 0 && (
                    <div className="px-2 py-1.5 text-xs text-zinc-500 italic">No categories found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter: Start Date */}
        <div className="space-y-1.5">
          <Label htmlFor="startDate" className="text-xs text-zinc-400 font-medium">From Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e.target.value, endDate)}
            className="h-8 bg-zinc-900/30 border-zinc-850 focus:border-zinc-700 text-zinc-200 px-3"
          />
        </div>

        {/* Filter: End Date */}
        <div className="space-y-1.5">
          <Label htmlFor="endDate" className="text-xs text-zinc-400 font-medium">To Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(startDate, e.target.value)}
            className="h-8 bg-zinc-900/30 border-zinc-850 focus:border-zinc-700 text-zinc-200 px-3"
          />
        </div>
      </div>
    </div>
  )
}
