import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  phone: z.string().min(6, 'El teléfono es requerido'),
  address: z.string().optional(),
  problem: z.string().min(10, 'Por favor, describe el problema con más detalle'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // La misma lógica inteligente que usamos en el CRM
      let customerId;
      const { data: existingCustomer } = await supabase.from('customers').select('id').eq('phone', data.phone).single();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const [firstName, ...lastNameParts] = data.name.split(' ');
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            first_name: firstName,
            last_name: lastNameParts.join(' '),
            phone: data.phone,
            address: data.address,
            // user_id se asignará por trigger o política si es necesario, o se puede omitir si la tabla lo permite
          })
          .select('id')
          .single();
        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // Crear la orden de servicio con estado 'Lead'
      const { error: serviceError } = await supabase.from('service_orders').insert({
        customer_id: customerId,
        description: data.problem,
        status: 'Lead',
        // Asignar al primer usuario/admin por defecto. Esto puede necesitar ajuste.
        // Por ahora, asumimos una política de base de datos o un trigger que asigna el user_id.
      });

      if (serviceError) throw serviceError;

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Hubo un error al enviar su solicitud. Por favor, intente contactarnos por WhatsApp.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-brand-blue">¡Gracias por su mensaje!</h3>
        <p className="text-slate-600 mt-2">Nos pondremos en contacto con usted a la brevedad.</p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-16 bg-slate-100">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-brand-blue">Solicite un Presupuesto</CardTitle>
            <CardDescription>Complete el formulario y nos pondremos en contacto a la brevedad.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input placeholder="Su Nombre" {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Su Teléfono" {...register('phone')} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Input placeholder="Su Dirección (Opcional)" {...register('address')} />
                </div>
              </div>
              <div>
                <Textarea placeholder="Describa brevemente el problema de su calefón..." {...register('problem')} rows={4} />
                {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-yellow text-brand-blue font-bold text-lg hover:bg-yellow-400">
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};