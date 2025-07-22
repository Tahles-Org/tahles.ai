export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      audiences: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bank_account_verifications: {
        Row: {
          created_at: string
          email_sent_to: string
          expires_at: string
          id: string
          is_used: boolean | null
          pending_data: Json | null
          supplier_id: string | null
          updated_at: string | null
          verification_code: string
          verification_type: string
        }
        Insert: {
          created_at?: string
          email_sent_to: string
          expires_at: string
          id?: string
          is_used?: boolean | null
          pending_data?: Json | null
          supplier_id?: string | null
          updated_at?: string | null
          verification_code: string
          verification_type: string
        }
        Update: {
          created_at?: string
          email_sent_to?: string
          expires_at?: string
          id?: string
          is_used?: boolean | null
          pending_data?: Json | null
          supplier_id?: string | null
          updated_at?: string | null
          verification_code?: string
          verification_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_account_verifications_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      category_fields: {
        Row: {
          category: string
          created_at: string | null
          field_key: string
          id: string
          is_filterable: boolean | null
          is_required: boolean | null
          label: string | null
          test_field_x: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          field_key: string
          id?: string
          is_filterable?: boolean | null
          is_required?: boolean | null
          label?: string | null
          test_field_x?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          field_key?: string
          id?: string
          is_filterable?: boolean | null
          is_required?: boolean | null
          label?: string | null
          test_field_x?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      concepts: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      empowerment_products: {
        Row: {
          created_at: string
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          product_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          product_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          product_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_name: string
          event_date: string
          id: string
          product_id: string | null
          quantity: number
          status: string | null
          total_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_name: string
          event_date: string
          id?: string
          product_id?: string | null
          quantity?: number
          status?: string | null
          total_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          event_date?: string
          id?: string
          product_id?: string | null
          quantity?: number
          status?: string | null
          total_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string | null
          id: string
          price: number
          product_id: string | null
          updated_at: string | null
          variant_name: string
          variant_value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          price: number
          product_id?: string | null
          updated_at?: string | null
          variant_name: string
          variant_value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          price?: number
          product_id?: string | null
          updated_at?: string | null
          variant_name?: string
          variant_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          subcategory_id: string | null
          supplier_id: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subcategory_id?: string | null
          supplier_id?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subcategory_id?: string | null
          supplier_id?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_availability_slots: {
        Row: {
          created_at: string | null
          current_bookings: number | null
          date: string | null
          end_time: string | null
          id: string
          is_available: boolean | null
          max_concurrent_bookings: number | null
          service_id: string | null
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_bookings?: number | null
          date?: string | null
          end_time?: string | null
          id?: string
          is_available?: boolean | null
          max_concurrent_bookings?: number | null
          service_id?: string | null
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_bookings?: number | null
          date?: string | null
          end_time?: string | null
          id?: string
          is_available?: boolean | null
          max_concurrent_bookings?: number | null
          service_id?: string | null
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_availability_slots_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          calendar_active: boolean | null
          calendar_connected: boolean | null
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          calendar_active?: boolean | null
          calendar_connected?: boolean | null
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          calendar_active?: boolean | null
          calendar_connected?: boolean | null
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          id: string
          is_staged: boolean | null
          rating: number
          response_text: string | null
          review_text: string
          status: string
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          id?: string
          is_staged?: boolean | null
          rating: number
          response_text?: string | null
          review_text: string
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          id?: string
          is_staged?: boolean | null
          rating?: number
          response_text?: string | null
          review_text?: string
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          base_price: number | null
          created_at: string | null
          has_calendar_integration: boolean | null
          id: string
          is_visible: boolean | null
          name: string | null
          provider_id: string | null
          service_areas: string[] | null
          setup_time_minutes: number | null
          teardown_time_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          created_at?: string | null
          has_calendar_integration?: boolean | null
          id?: string
          is_visible?: boolean | null
          name?: string | null
          provider_id?: string | null
          service_areas?: string[] | null
          setup_time_minutes?: number | null
          teardown_time_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          created_at?: string | null
          has_calendar_integration?: boolean | null
          id?: string
          is_visible?: boolean | null
          name?: string | null
          provider_id?: string | null
          service_areas?: string[] | null
          setup_time_minutes?: number | null
          teardown_time_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategories: {
        Row: {
          category_id: string | null
          created_at: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategory_custom_fields: {
        Row: {
          created_at: string | null
          display_order: number | null
          field_key: string
          field_type: string | null
          id: string
          is_filter: boolean | null
          is_required: boolean | null
          label: string
          options: string[] | null
          priority: number | null
          subcategory_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          field_key: string
          field_type?: string | null
          id?: string
          is_filter?: boolean | null
          is_required?: boolean | null
          label: string
          options?: string[] | null
          priority?: number | null
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          field_key?: string
          field_type?: string | null
          id?: string
          is_filter?: boolean | null
          is_required?: boolean | null
          label?: string
          options?: string[] | null
          priority?: number | null
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategory_custom_fields_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      subconcepts: {
        Row: {
          concept_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          concept_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          concept_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subconcepts_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_agreements: {
        Row: {
          agreement_type: string
          created_at: string | null
          id: string
          ip_address: string | null
          signature_data: Json | null
          signed_at: string | null
          supplier_id: string
          updated_at: string | null
        }
        Insert: {
          agreement_type: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          signature_data?: Json | null
          signed_at?: string | null
          supplier_id: string
          updated_at?: string | null
        }
        Update: {
          agreement_type?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          signature_data?: Json | null
          signed_at?: string | null
          supplier_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      supplier_bank_accounts: {
        Row: {
          account_holder_name: string
          account_number: string
          bank_code: string
          bank_document_url: string | null
          bank_name: string
          branch_number: string
          created_at: string
          iban: string | null
          id: string
          requires_2fa_verification: boolean | null
          supplier_id: string | null
          swift_code: string | null
          updated_at: string
          verification_notes: string | null
          verification_status: string | null
        }
        Insert: {
          account_holder_name: string
          account_number: string
          bank_code: string
          bank_document_url?: string | null
          bank_name: string
          branch_number: string
          created_at?: string
          iban?: string | null
          id?: string
          requires_2fa_verification?: boolean | null
          supplier_id?: string | null
          swift_code?: string | null
          updated_at?: string
          verification_notes?: string | null
          verification_status?: string | null
        }
        Update: {
          account_holder_name?: string
          account_number?: string
          bank_code?: string
          bank_document_url?: string | null
          bank_name?: string
          branch_number?: string
          created_at?: string
          iban?: string | null
          id?: string
          requires_2fa_verification?: boolean | null
          supplier_id?: string | null
          swift_code?: string | null
          updated_at?: string
          verification_notes?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_bank_accounts_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: true
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_categories: {
        Row: {
          category_id: string
          created_at: string | null
          id: string
          is_primary: boolean | null
          subcategory_id: string
          supplier_id: string
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          subcategory_id: string
          supplier_id: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          subcategory_id?: string
          supplier_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      supplier_documents: {
        Row: {
          created_at: string | null
          document_name: string | null
          document_type: string
          document_url: string
          expiry_date: string | null
          id: string
          is_required: boolean | null
          supplier_id: string
          updated_at: string | null
          upload_date: string | null
        }
        Insert: {
          created_at?: string | null
          document_name?: string | null
          document_type: string
          document_url: string
          expiry_date?: string | null
          id?: string
          is_required?: boolean | null
          supplier_id: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Update: {
          created_at?: string | null
          document_name?: string | null
          document_type?: string
          document_url?: string
          expiry_date?: string | null
          id?: string
          is_required?: boolean | null
          supplier_id?: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Relationships: []
      }
      supplier_onboarding: {
        Row: {
          completed_stages: Json | null
          created_at: string | null
          current_stage: Database["public"]["Enums"]["onboarding_stage"]
          id: string
          supplier_id: string
          updated_at: string | null
          verification_data: Json | null
        }
        Insert: {
          completed_stages?: Json | null
          created_at?: string | null
          current_stage: Database["public"]["Enums"]["onboarding_stage"]
          id?: string
          supplier_id: string
          updated_at?: string | null
          verification_data?: Json | null
        }
        Update: {
          completed_stages?: Json | null
          created_at?: string | null
          current_stage?: Database["public"]["Enums"]["onboarding_stage"]
          id?: string
          supplier_id?: string
          updated_at?: string | null
          verification_data?: Json | null
        }
        Relationships: []
      }
      supplier_verifications: {
        Row: {
          created_at: string | null
          document_url: string
          id: string
          status: Database["public"]["Enums"]["verification_status"]
          supplier_id: string
          updated_at: string | null
          verification_notes: string | null
          verification_type: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_url: string
          id?: string
          status?: Database["public"]["Enums"]["verification_status"]
          supplier_id: string
          updated_at?: string | null
          verification_notes?: string | null
          verification_type: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_url?: string
          id?: string
          status?: Database["public"]["Enums"]["verification_status"]
          supplier_id?: string
          updated_at?: string | null
          verification_notes?: string | null
          verification_type?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          business_name: string
          business_type: string
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean
          is_suspended: boolean
          profile_image: string | null
          tax_id: string
          updated_at: string | null
        }
        Insert: {
          business_name: string
          business_type: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_suspended?: boolean
          profile_image?: string | null
          tax_id: string
          updated_at?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_suspended?: boolean
          profile_image?: string | null
          tax_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      test_force_migration: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      test_sync: {
        Row: {
          created_at: string | null
          id: string
          label: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      upsell_products: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          updated_at: string | null
          upsell_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          updated_at?: string | null
          upsell_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          updated_at?: string | null
          upsell_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "upsell_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upsell_products_upsell_id_fkey"
            columns: ["upsell_id"]
            isOneToOne: false
            referencedRelation: "upsells"
            referencedColumns: ["id"]
          },
        ]
      }
      upsells: {
        Row: {
          created_at: string
          current_uses: number | null
          description: string | null
          discount_percentage: number | null
          discounted_price: number | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          original_price: number
          supplier_id: string | null
          terms_and_conditions: string | null
          title: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_percentage?: number | null
          discounted_price?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          original_price: number
          supplier_id?: string | null
          terms_and_conditions?: string | null
          title: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_percentage?: number | null
          discounted_price?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          original_price?: number
          supplier_id?: string | null
          terms_and_conditions?: string | null
          title?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "upsells_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      supplier_onboarding_progress: {
        Row: {
          completion_percent: number | null
          current_stage: Database["public"]["Enums"]["onboarding_stage"] | null
          supplier_id: string | null
        }
        Insert: {
          completion_percent?: never
          current_stage?: Database["public"]["Enums"]["onboarding_stage"] | null
          supplier_id?: string | null
        }
        Update: {
          completion_percent?: never
          current_stage?: Database["public"]["Enums"]["onboarding_stage"] | null
          supplier_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_service_availability: {
        Args: {
          p_service_id: string
          p_date: string
          p_start_time: string
          p_duration_minutes?: number
          p_location?: string
        }
        Returns: boolean
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_service_active: {
        Args: { service_id: string }
        Returns: boolean
      }
    }
    Enums: {
      business_type: "sole_proprietor" | "company" | "partnership" | "nonprofit"
      onboarding_stage:
        | "identity"
        | "business"
        | "docs"
        | "agreements"
        | "calendar"
        | "first_product"
        | "done"
      verification_status: "pending" | "approved" | "rejected"
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
      business_type: ["sole_proprietor", "company", "partnership", "nonprofit"],
      onboarding_stage: [
        "identity",
        "business",
        "docs",
        "agreements",
        "calendar",
        "first_product",
        "done",
      ],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
