-- Crear la tabla para perfiles de usuario
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  address TEXT
);

-- Habilitar Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad: Los usuarios solo pueden ver y gestionar su propio perfil.
CREATE POLICY "Los usuarios pueden ver su propio perfil"
ON public.user_profiles FOR SELECT
TO authenticated USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
ON public.user_profiles FOR INSERT
TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
ON public.user_profiles FOR UPDATE
TO authenticated USING (auth.uid() = id);