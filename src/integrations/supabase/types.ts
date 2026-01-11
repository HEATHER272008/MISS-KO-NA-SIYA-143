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
      about_content: {
        Row: {
          campus_map_url: string | null
          core_values: Json | null
          history: string | null
          id: string
          jhs_principal_history: string | null
          mission_new: string | null
          mission_old: string | null
          shs_principal_history: string | null
          updated_at: string | null
          vision_new: string | null
          vision_old: string | null
        }
        Insert: {
          campus_map_url?: string | null
          core_values?: Json | null
          history?: string | null
          id?: string
          jhs_principal_history?: string | null
          mission_new?: string | null
          mission_old?: string | null
          shs_principal_history?: string | null
          updated_at?: string | null
          vision_new?: string | null
          vision_old?: string | null
        }
        Update: {
          campus_map_url?: string | null
          core_values?: Json | null
          history?: string | null
          id?: string
          jhs_principal_history?: string | null
          mission_new?: string | null
          mission_old?: string | null
          shs_principal_history?: string | null
          updated_at?: string | null
          vision_new?: string | null
          vision_old?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          content: string
          created_at: string | null
          date: string
          id: string
          is_active: boolean | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          date: string
          id?: string
          is_active?: boolean | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          date?: string
          id?: string
          is_active?: boolean | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string | null
          email: string | null
          google_maps_embed: string | null
          id: string
          office_hours: string | null
          phone: string | null
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          email?: string | null
          google_maps_embed?: string | null
          id?: string
          office_hours?: string | null
          phone?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          email?: string | null
          google_maps_embed?: string | null
          id?: string
          office_hours?: string | null
          phone?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollment_content: {
        Row: {
          contact_number: string | null
          enrollment_dates: string | null
          entrance_exam_schedule: string | null
          id: string
          incoming_students_steps: Json | null
          new_students_steps: Json | null
          notes: string | null
          start_of_classes: string | null
          transferees_steps: Json | null
          updated_at: string | null
        }
        Insert: {
          contact_number?: string | null
          enrollment_dates?: string | null
          entrance_exam_schedule?: string | null
          id?: string
          incoming_students_steps?: Json | null
          new_students_steps?: Json | null
          notes?: string | null
          start_of_classes?: string | null
          transferees_steps?: Json | null
          updated_at?: string | null
        }
        Update: {
          contact_number?: string | null
          enrollment_dates?: string | null
          entrance_exam_schedule?: string | null
          id?: string
          incoming_students_steps?: Json | null
          new_students_steps?: Json | null
          notes?: string | null
          start_of_classes?: string | null
          transferees_steps?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      historical_personnel: {
        Row: {
          category: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          photo_url: string | null
          position: string
          updated_at: string | null
          years: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          photo_url?: string | null
          position: string
          updated_at?: string | null
          years?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          photo_url?: string | null
          position?: string
          updated_at?: string | null
          years?: string | null
        }
        Relationships: []
      }
      home_content: {
        Row: {
          hero_image_url: string | null
          hero_subtitle: string | null
          hero_title: string
          id: string
          updated_at: string | null
          why_choose_items: Json | null
          why_choose_title: string
        }
        Insert: {
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title: string
          id?: string
          updated_at?: string | null
          why_choose_items?: Json | null
          why_choose_title?: string
        }
        Update: {
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string
          id?: string
          updated_at?: string | null
          why_choose_items?: Json | null
          why_choose_title?: string
        }
        Relationships: []
      }
      important_dates: {
        Row: {
          created_at: string | null
          date: string
          display_order: number | null
          event: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          created_at?: string | null
          date: string
          display_order?: number | null
          event: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          created_at?: string | null
          date?: string
          display_order?: number | null
          event?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          name: string
          organization_id: string
          photo_url: string | null
          position: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name: string
          organization_id: string
          photo_url?: string | null
          position?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name?: string
          organization_id?: string
          photo_url?: string | null
          position?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_photos: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          id: string
          organization_id: string
          photo_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          organization_id: string
          photo_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          organization_id?: string
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_photos_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          teacher_in_charge: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          teacher_in_charge?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          teacher_in_charge?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      personnel: {
        Row: {
          created_at: string | null
          department: string | null
          description: string | null
          display_order: number | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          photo_url: string | null
          position: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          photo_url?: string | null
          position: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          photo_url?: string | null
          position?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string | null
          description: string | null
          details: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          details?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          details?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      scholarship_application_info: {
        Row: {
          contact_info: string | null
          deadline_info: string | null
          how_to_apply: string | null
          id: string
          requirements: string | null
          updated_at: string | null
        }
        Insert: {
          contact_info?: string | null
          deadline_info?: string | null
          how_to_apply?: string | null
          id?: string
          requirements?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_info?: string | null
          deadline_info?: string | null
          how_to_apply?: string | null
          id?: string
          requirements?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          created_at: string | null
          description: string | null
          discount_amount: string | null
          display_order: number | null
          eligibility: string | null
          id: string
          is_active: boolean | null
          name: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discount_amount?: string | null
          display_order?: number | null
          eligibility?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discount_amount?: string | null
          display_order?: number | null
          eligibility?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
