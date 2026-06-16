'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Transaction, Category, TransactionWithCategory } from '@/types'

// Revalidation helper
function revalidateAppPaths() {
  revalidatePath('/dashboard')
  revalidatePath('/transactions')
}

// 1. Get Categories for the user
export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }

  return data || []
}

// 2. Create Transaction
export async function createTransaction(payload: {
  amount: number
  type: 'expense' | 'income'
  category_id: string | null
  merchant: string | null
  date: string
  notes: string | null
}): Promise<Transaction> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      amount: payload.amount,
      type: payload.type,
      category_id: payload.category_id || null,
      merchant: payload.merchant || null,
      date: payload.date,
      notes: payload.notes || null,
      source: 'manual',
      is_recurring: false
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating transaction:', error)
    throw new Error('Failed to create transaction')
  }

  revalidateAppPaths()
  return data
}

// 3. Update Transaction
export async function updateTransaction(
  id: string,
  payload: {
    amount: number
    type: 'expense' | 'income'
    category_id: string | null
    merchant: string | null
    date: string
    notes: string | null
  }
): Promise<Transaction> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Unauthorized')
  }

  // Update ensures RLS is checked (users can only update their own rows)
  const { data, error } = await supabase
    .from('transactions')
    .update({
      amount: payload.amount,
      type: payload.type,
      category_id: payload.category_id || null,
      merchant: payload.merchant || null,
      date: payload.date,
      notes: payload.notes || null,
    })
    .eq('id', id)
    .eq('user_id', user.id) // security check
    .select()
    .single()

  if (error) {
    console.error('Error updating transaction:', error)
    throw new Error('Failed to update transaction')
  }

  revalidateAppPaths()
  return data
}

// 4. Delete Transaction
export async function deleteTransaction(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // security check

  if (error) {
    console.error('Error deleting transaction:', error)
    throw new Error('Failed to delete transaction')
  }

  revalidateAppPaths()
  return true
}

// 5. Get Filtered and Paginated Transactions
export interface TransactionFilters {
  page?: number
  pageSize?: number
  startDate?: string
  endDate?: string
  categories?: string[]
  type?: 'all' | 'income' | 'expense'
  search?: string
}

export async function getTransactions(filters: TransactionFilters = {}): Promise<{
  data: TransactionWithCategory[]
  count: number
  page: number
  pageSize: number
}> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Unauthorized')
  }

  const page = filters.page || 1
  const pageSize = filters.pageSize || 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('transactions')
    .select(`
      *,
      category:categories(name, icon, color)
    `, { count: 'exact' })
    .eq('user_id', user.id)

  // Filter: Type
  if (filters.type && filters.type !== 'all') {
    query = query.eq('type', filters.type)
  }

  // Filter: Date Range
  if (filters.startDate) {
    query = query.gte('date', filters.startDate)
  }
  if (filters.endDate) {
    query = query.lte('date', filters.endDate)
  }

  // Filter: Categories
  if (filters.categories && filters.categories.length > 0) {
    query = query.in('category_id', filters.categories)
  }

  // Filter: Free text search on merchant or description (notes)
  if (filters.search && filters.search.trim() !== '') {
    const searchVal = filters.search.trim()
    // Using or filters in supabase
    query = query.or(`merchant.ilike.%${searchVal}%,notes.ilike.%${searchVal}%`)
  }

  // Sorting: Most recent date first, then created_at
  query = query
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })
    // Pagination
    .range(from, to)

  const { data, count, error } = await query

  if (error) {
    console.error('Error querying transactions:', error)
    throw new Error('Failed to retrieve transactions')
  }

  return {
    data: (data as unknown as TransactionWithCategory[]) || [],
    count: count || 0,
    page,
    pageSize
  }
}
