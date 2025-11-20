-- No es necesario alterar la tabla, ya que el campo de estado es de tipo TEXT.
-- Simplemente usaremos 'Lead' como un nuevo valor posible.
-- Por seguridad, añadimos un comentario para documentarlo.
COMMENT ON COLUMN public.service_orders.status IS 'Puede ser: Pendiente, En Progreso, Completado, Cancelado, Lead';