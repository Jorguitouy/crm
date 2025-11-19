-- Crear la tabla para las órdenes de servicio
CREATE TABLE public.service_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  status TEXT DEFAULT 'Pendiente' NOT NULL,
  service_date DATE,
  technician TEXT,
  notes TEXT,
  cost NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad para cada operación
CREATE POLICY "Los usuarios pueden ver sus propias órdenes de servicio" ON public.service_orders
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden crear órdenes de servicio" ON public.service_orders
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias órdenes de servicio" ON public.service_orders
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propias órdenes de servicio" ON public.service_orders
FOR DELETE TO authenticated USING (auth.uid() = user_id);