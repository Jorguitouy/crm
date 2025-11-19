import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { showError, showSuccess } from '@/utils/toast';

const formSchema = z.object({
  notes: z.string().min(1, 'Debes agregar una nota sobre la llamada.'),
});

type CallLogFormValues = z.infer<typeof formSchema>;

interface CallLogFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  customerId: string;
}

export const CallLogForm = ({ isOpen, onOpenChange, onSuccess, customerId }: CallLogFormProps) => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CallLogFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: CallLogFormValues) => {
    if (!user) {
      showError('Debes iniciar sesión.');
      return;
    }

    try {
      const { error } = await supabase.from('call_logs').insert([
        {
          notes: data.notes,
          customer_id: customerId,
          user_id: user.id,
        },
      ]);
      if (error) throw error;
      showSuccess('Registro de llamada guardado.');
      onSuccess();
      onOpenChange(false);
      reset();
    } catch (error) {
      showError((error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Nueva Llamada</DialogTitle>
          <DialogDescription>
            Añade un resumen o notas sobre la conversación con el cliente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <Label htmlFor="notes">Notas de la llamada</Label>
            <Textarea id="notes" {...register('notes')} placeholder="Ej: El cliente llamó para consultar sobre el costo de la reparación. Se le informó el presupuesto..." rows={5} />
            {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Registro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};