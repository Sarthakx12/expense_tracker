import { getTransactions, getCategories } from '@/app/(protected)/transactions/actions'
import { TransactionsClient } from '@/components/transactions/transactions-client'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TransactionsPage(props: PageProps) {
  const searchParams = await props.searchParams

  // Parse filters
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const typeStr = searchParams.type
  const type = (typeStr === 'income' || typeStr === 'expense') ? typeStr : 'all'
  const startDate = typeof searchParams.startDate === 'string' ? searchParams.startDate : undefined
  const endDate = typeof searchParams.endDate === 'string' ? searchParams.endDate : undefined
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
  
  // Categories multi-select parsing
  let categoriesFilter: string[] = []
  if (typeof searchParams.categories === 'string') {
    categoriesFilter = searchParams.categories.split(',').filter(Boolean)
  }

  // Fetch data in parallel
  const [transactionsData, categories] = await Promise.all([
    getTransactions({
      page,
      pageSize: 20,
      type,
      startDate,
      endDate,
      search,
      categories: categoriesFilter,
    }),
    getCategories(),
  ])

  return (
    <TransactionsClient
      initialData={transactionsData}
      categories={categories}
    />
  )
}
