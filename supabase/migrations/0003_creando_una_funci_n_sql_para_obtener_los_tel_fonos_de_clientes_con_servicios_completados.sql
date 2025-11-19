CREATE OR REPLACE FUNCTION get_completed_service_customer_phones()
RETURNS TABLE(phone TEXT)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT DISTINCT c.phone
  FROM public.customers AS c
  JOIN public.service_orders AS so ON c.id = so.customer_id
  WHERE so.user_id = auth.uid()
    AND so.status = 'Completado'
    AND c.phone IS NOT NULL
    AND c.phone <> '';
$$;