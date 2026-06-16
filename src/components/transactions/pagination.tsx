'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalCount: number
  pageSize: number
}

export function Pagination({ page, totalCount, pageSize }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(totalCount, page * pageSize)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t border-zinc-900/60 bg-transparent">
      {/* Stats */}
      <div className="text-xs text-zinc-500 font-medium">
        Showing <span className="text-zinc-350">{start}</span> to <span className="text-zinc-350">{end}</span> of{' '}
        <span className="text-zinc-350">{totalCount}</span> results
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="border-zinc-850 bg-zinc-900/10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 h-8 cursor-pointer gap-1 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center justify-center min-w-16 text-xs text-zinc-400 font-semibold bg-zinc-900/30 border border-zinc-850 h-8 px-3 rounded-lg">
          Page {page} of {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="border-zinc-850 bg-zinc-900/10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 h-8 cursor-pointer gap-1 disabled:opacity-30"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
