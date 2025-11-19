-- Crear la tabla para almacenar los registros de llamadas
CREATE TABLE public.call_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para que los usuarios gestionen sus propios registros
CREATE POLICY "Los usuarios pueden ver sus propios registros de llamadas"
ON public.call_logs FOR SELECT
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden crear registros de llamadas"
ON public.call_logs FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propios registros"
ON public.call_logs FOR UPDATE
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propios registros"
ON public.call_logs FOR DELETE
TO authenticated USING (auth.uid() = user_id);