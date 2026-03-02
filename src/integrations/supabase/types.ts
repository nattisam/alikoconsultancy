export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      application_documents: {
        Row: {
          application_id: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_by: string | null
        }
        Insert: {
          application_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      application_status_log: {
        Row: {
          application_id: string
          changed_by: string | null
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["application_status"]
          notes: string | null
          old_status: Database["public"]["Enums"]["application_status"] | null
        }
        Insert: {
          application_id: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status: Database["public"]["Enums"]["application_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["application_status"] | null
        }
        Update: {
          application_id?: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["application_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["application_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "application_status_log_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          admin_notes: string | null
          application_code: string
          consultation_type: Database["public"]["Enums"]["consultation_type"]
          created_at: string
          email: string
          form_data: Json
          full_name: string
          id: string
          phone: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          application_code: string
          consultation_type: Database["public"]["Enums"]["consultation_type"]
          created_at?: string
          email: string
          form_data?: Json
          full_name: string
          id?: string
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          application_code?: string
          consultation_type?: Database["public"]["Enums"]["consultation_type"]
          created_at?: string
          email?: string
          form_data?: Json
          full_name?: string
          id?: string
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      availability_rules: {
        Row: {
          buffer_minutes: number
          consultation_type: Database["public"]["Enums"]["consultation_type"]
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean
          slot_duration_minutes: number
          start_time: string
          updated_at: string
        }
        Insert: {
          buffer_minutes?: number
          consultation_type?: Database["public"]["Enums"]["consultation_type"]
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean
          slot_duration_minutes?: number
          start_time: string
          updated_at?: string
        }
        Update: {
          buffer_minutes?: number
          consultation_type?: Database["public"]["Enums"]["consultation_type"]
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean
          slot_duration_minutes?: number
          start_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          admin_notes: string | null
          booking_code: string
          booking_date: string
          consultation_type: Database["public"]["Enums"]["consultation_type"]
          created_at: string
          email: string
          end_time: string
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          start_time: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          booking_code: string
          booking_date: string
          consultation_type: Database["public"]["Enums"]["consultation_type"]
          created_at?: string
          email: string
          end_time: string
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          booking_code?: string
          booking_date?: string
          consultation_type?: Database["public"]["Enums"]["consultation_type"]
          created_at?: string
          email?: string
          end_time?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          consultation_type:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          created_at: string
          email: string
          full_name: string
          id: string
          is_read: boolean
          message: string
          phone: string | null
          subject: string
        }
        Insert: {
          consultation_type?:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_read?: boolean
          message: string
          phone?: string | null
          subject: string
        }
        Update: {
          consultation_type?:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_read?: boolean
          message?: string
          phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json
          created_at: string
          created_by: string | null
          id: string
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          consultation_type:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          content: Json
          created_at: string
          created_by: string | null
          description: string | null
          file_url: string | null
          id: string
          is_published: boolean
          resource_type: Database["public"]["Enums"]["resource_type"]
          slug: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          consultation_type?:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          content?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          is_published?: boolean
          resource_type?: Database["public"]["Enums"]["resource_type"]
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          consultation_type?:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          content?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          is_published?: boolean
          resource_type?: Database["public"]["Enums"]["resource_type"]
          slug?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_image_url: string | null
          author_name: string
          author_role: string | null
          consultation_type:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          created_at: string
          display_order: number
          id: string
          is_published: boolean
          quote: string
          rating: number | null
          updated_at: string
        }
        Insert: {
          author_image_url?: string | null
          author_name: string
          author_role?: string | null
          consultation_type?:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          quote: string
          rating?: number | null
          updated_at?: string
        }
        Update: {
          author_image_url?: string | null
          author_name?: string
          author_role?: string | null
          consultation_type?:
            | Database["public"]["Enums"]["consultation_type"]
            | null
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          quote?: string
          rating?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      time_blocks: {
        Row: {
          created_at: string
          created_by: string | null
          end_datetime: string
          id: string
          reason: string | null
          start_datetime: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_datetime: string
          id?: string
          reason?: string | null
          start_datetime: string
          title?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_datetime?: string
          id?: string
          reason?: string | null
          start_datetime?: string
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webinars: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_free: boolean
          is_published: boolean
          scheduled_at: string | null
          slug: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          webinar_url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_free?: boolean
          is_published?: boolean
          scheduled_at?: string | null
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          webinar_url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_free?: boolean
          is_published?: boolean
          scheduled_at?: string | null
          slug?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          webinar_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_application_status: { Args: { app_code: string }; Returns: Json }
      generate_application_code: { Args: never; Returns: string }
      generate_booking_code: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "waitlisted"
      booking_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "completed"
        | "no_show"
      consultation_type: "business" | "career" | "travel"
      resource_type: "article" | "guide" | "checklist" | "template"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "waitlisted",
      ],
      booking_status: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
        "no_show",
      ],
      consultation_type: ["business", "career", "travel"],
      resource_type: ["article", "guide", "checklist", "template"],
    },
  },
} as const
