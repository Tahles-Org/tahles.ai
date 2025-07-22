
-- Drop the existing view
DROP VIEW IF EXISTS public.supplier_onboarding_progress;

-- Recreate the view with security_invoker explicitly set
CREATE VIEW public.supplier_onboarding_progress 
WITH (security_invoker=on) AS
SELECT
  so.supplier_id,
  so.current_stage,
  CASE
    WHEN so.current_stage = 'identity'::onboarding_stage THEN 5
    WHEN so.current_stage = 'business'::onboarding_stage THEN 10
    WHEN so.current_stage = 'docs'::onboarding_stage THEN 20
    WHEN so.current_stage = 'agreements'::onboarding_stage THEN 40
    WHEN so.current_stage = 'calendar'::onboarding_stage THEN 60
    WHEN so.current_stage = 'first_product'::onboarding_stage THEN 80
    WHEN so.current_stage = 'done'::onboarding_stage THEN 100
    ELSE 0
  END AS completion_percent
FROM supplier_onboarding so;

-- Add RLS policy for the view (views inherit from underlying tables but we can be explicit)
-- Since this is a view based on supplier_onboarding, it will use the RLS policies from that table
