
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
      pilot_users: {
        Row: {
          id: string
          full_name: string
          email: string
          age: number
          gender: string
          password_hash: string
          created_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          age: number
          gender: string
          password_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          age?: number
          gender?: string
          password_hash?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pilot_users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      onboarding_data: {
        Row: {
          id: string
          user_id: string
          goal: string
          amount: number
          timeline: string
          saving_style: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          goal: string
          amount: number
          timeline: string
          saving_style: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          goal?: string
          amount?: number
          timeline?: string
          saving_style?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_data_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          id: string
          user_id: string
          email: string
          amount: number
          transaction_id: string | null
          screenshot_url: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          amount: number
          transaction_id?: string | null
          screenshot_url?: string | null
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          amount?: number
          transaction_id?: string | null
          screenshot_url?: string | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      investments: {
        Row: {
          id: string
          user_id: string
          payment_id: string
          principal_amount: number
          current_value: number
          interest_earned: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          payment_id: string
          principal_amount: number
          current_value: number
          interest_earned: number
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          payment_id?: string
          principal_amount?: number
          current_value?: number
          interest_earned?: number
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_payment_id_fkey"
            columns: ["payment_id"]
            referencedRelation: "payments"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          investment_id: string
          type: string
          amount: number
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          investment_id: string
          type: string
          amount: number
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          investment_id?: string
          type?: string
          amount?: number
          description?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_investment_id_fkey"
            columns: ["investment_id"]
            referencedRelation: "investments"
            referencedColumns: ["id"]
          }
        ]
      }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
