
-- Add RLS policies for supplier_onboarding table
CREATE POLICY "Suppliers can manage their own onboarding" 
ON public.supplier_onboarding 
FOR ALL 
USING (supplier_id = auth.uid());

-- Add RLS policies for supplier_categories table
CREATE POLICY "Suppliers can manage their own categories" 
ON public.supplier_categories 
FOR ALL 
USING (supplier_id = auth.uid());

-- Add RLS policies for supplier_agreements table
CREATE POLICY "Suppliers can manage their own agreements" 
ON public.supplier_agreements 
FOR ALL 
USING (supplier_id = auth.uid());

-- Add RLS policies for supplier_documents table
CREATE POLICY "Suppliers can manage their own documents" 
ON public.supplier_documents 
FOR ALL 
USING (supplier_id = auth.uid());

-- Add RLS policies for supplier_verifications table
CREATE POLICY "Suppliers can manage their own verifications" 
ON public.supplier_verifications 
FOR ALL 
USING (supplier_id = auth.uid());

-- Update function search paths for security (where missing)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, display_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email);
  RETURN new;
END;
$function$;
