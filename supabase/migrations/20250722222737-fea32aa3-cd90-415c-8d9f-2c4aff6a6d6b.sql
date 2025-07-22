-- Drop the existing view
DROP VIEW IF EXISTS public.supplier_onboarding_progress;

-- Recreate the view as a regular view (without SECURITY DEFINER)
CREATE VIEW public.supplier_onboarding_progress AS
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