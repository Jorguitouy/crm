import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { useEffect } from 'react';

const profileSchema = z.object({
  company_name: z.string().optional(),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().email("Email inválido").optional().or(z.literal('')),
  address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Settings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.from('user_profiles').select('*').eq('id', user.id).single();
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!user,
  });

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    try {
      const { error } = await supabase.from('user_profiles').upsert({ id: user.id, ...data });
      if (error) throw error;
      showSuccess('Perfil actualizado correctamente.');
      queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
    } catch (error) {
      showError((error as Error).message);
    }
  };

  return (
    <Layout>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">Ajustes del Perfil</h1>
      <Card>
        <CardHeader>
          <CardTitle>Información del Administrador</CardTitle>
          <CardDescription>
            Estos datos se podrán usar en futuras funcionalidades como la generación de reportes o facturas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company_name">Nombre de la Empresa</Label>
                  <Input id="company_name" {...register('company_name')} placeholder="Mi Servicio Técnico" />
                </div>
                <div>
                  <Label htmlFor="contact_name">Tu Nombre</Label>
                  <Input id="contact_name" {...register('contact_name')} placeholder="Juan Pérez" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_phone">Teléfono de Contacto</Label>
                  <Input id="contact_phone" {...register('contact_phone')} placeholder="099 123 456" />
                </div>
                <div>
                  <Label htmlFor="contact_email">Email de Contacto</Label>
                  <Input id="contact_email" type="email" {...register('contact_email')} placeholder="contacto@miservicio.com" />
                  {errors.contact_email && <p className="text-red-500 text-sm mt-1">{errors.contact_email.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" {...register('address')} placeholder="Av. 18 de Julio 1234, Montevideo" />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Settings;