export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          currency: string
          monthly_income: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          currency?: string
          monthly_income?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          currency?: string
          monthly_income?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'expense' | 'income'
          icon: string | null
          color: string | null
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'expense' | 'income'
          icon?: string | null
          color?: string | null
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'expense' | 'income'
          icon?: string | null
          color?: string | null
          is_default?: boolean
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'expense' | 'income'
          category_id: string | null
          merchant: string | null
          description: string | null
          date: string
          notes: string | null
          source: 'manual' | 'import' | 'recurring'
          is_recurring: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'expense' | 'income'
          category_id?: string | null
          merchant?: string | null
          description?: string | null
          date: string
          notes?: string | null
          source?: 'manual' | 'import' | 'recurring'
          is_recurring?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'expense' | 'income'
          category_id?: string | null
          merchant?: string | null
          description?: string | null
          date?: string
          notes?: string | null
          source?: 'manual' | 'import' | 'recurring'
          is_recurring?: boolean
          created_at?: string
        }
      }
      [key: string]: unknown
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
