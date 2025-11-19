-- Crear la tabla para almacenar clientes
CREATE TABLE public.customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) para proteger los datos
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver sus propios clientes
CREATE POLICY "Users can view their own customers"
ON public.customers FOR SELECT
TO authenticated USING (auth.uid() = user_id);

-- Política: Los usuarios pueden insertar clientes para sí mismos
CREATE POLICY "Users can insert their own customers"
ON public.customers FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar sus propios clientes
CREATE POLICY "Users can update their own customers"
ON public.customers FOR UPDATE
TO authenticated USING (auth.uid() = user_id);

-- Política: Los usuarios pueden eliminar sus propios clientes
CREATE POLICY "Users can delete their own customers"
ON public.customers FOR DELETE
TO authenticated USING (auth.uid() = user_id);