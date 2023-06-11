export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string | null
          id: number
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contacts: {
        Row: {
          created_at: string | null
          date_met: string | null
          dob: string | null
          email: string | null
          how_met: string | null
          id: number
          linkedin: string | null
          name: string | null
          phone: string | null
          user: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date_met?: string | null
          dob?: string | null
          email?: string | null
          how_met?: string | null
          id?: number
          linkedin?: string | null
          name?: string | null
          phone?: string | null
          user?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date_met?: string | null
          dob?: string | null
          email?: string | null
          how_met?: string | null
          id?: number
          linkedin?: string | null
          name?: string | null
          phone?: string | null
          user?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      conversation: {
        Row: {
          contact: number | null
          created_at: string | null
          id: number
          notes: string | null
          user_id: string
        }
        Insert: {
          contact?: number | null
          created_at?: string | null
          id?: number
          notes?: string | null
          user_id: string
        }
        Update: {
          contact?: number | null
          created_at?: string | null
          id?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_contact_fkey"
            columns: ["contact"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      positions: {
        Row: {
          created_at: string | null
          id: number
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "positions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reminders: {
        Row: {
          acknowledged: boolean | null
          contact: number | null
          created_at: string | null
          delivered: boolean | null
          id: number
          message: string | null
          reminder_date: string | null
          user_id: string | null
        }
        Insert: {
          acknowledged?: boolean | null
          contact?: number | null
          created_at?: string | null
          delivered?: boolean | null
          id?: number
          message?: string | null
          reminder_date?: string | null
          user_id?: string | null
        }
        Update: {
          acknowledged?: boolean | null
          contact?: number | null
          created_at?: string | null
          delivered?: boolean | null
          id?: number
          message?: string | null
          reminder_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reminders_contact_fkey"
            columns: ["contact"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
