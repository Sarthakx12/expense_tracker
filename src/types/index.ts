import { Database } from './database'

export type Tables = Database['public']['Tables']

export type Profile = Tables['profiles']['Row']
export type ProfileInsert = Tables['profiles']['Insert']
export type ProfileUpdate = Tables['profiles']['Update']

export type Category = Tables['categories']['Row']
export type CategoryInsert = Tables['categories']['Insert']
export type CategoryUpdate = Tables['categories']['Update']

export type Transaction = Tables['transactions']['Row']
export type TransactionInsert = Tables['transactions']['Insert']
export type TransactionUpdate = Tables['transactions']['Update']

export interface TransactionWithCategory extends Transaction {
  category: {
    name: string
    color: string | null
    icon: string | null
  } | null
}
