-- Función para obtener el total de clientes del usuario actual
CREATE OR REPLACE FUNCTION get_total_customers()
RETURNS INT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT count(*)::INT FROM public.customers WHERE user_id = auth.uid();
$$;

-- Función para obtener el número de órdenes pendientes
CREATE OR REPLACE FUNCTION get_pending_orders_count()
RETURNS INT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT count(*)::INT FROM public.service_orders WHERE user_id = auth.uid() AND status = 'Pendiente';
$$;

-- Función para obtener los ingresos totales de órdenes completadas este mes
CREATE OR REPLACE FUNCTION get_monthly_revenue()
RETURNS NUMERIC
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(sum(cost), 0) FROM public.service_orders 
  WHERE user_id = auth.uid() 
  AND status = 'Completado' 
  AND service_date >= date_trunc('month', current_date);
$$;

-- Función para obtener el número de servicios completados este mes
CREATE OR REPLACE FUNCTION get_monthly_completed_services()
RETURNS INT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT count(*)::INT FROM public.service_orders 
  WHERE user_id = auth.uid() 
  AND status = 'Completado' 
  AND service_date >= date_trunc('month', current_date);
$$;