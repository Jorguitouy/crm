import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

const formSchema = z.object({
  cost: z.coerce.number().min(0, "El costo no puede ser negativo."),
});

type FormValues = z.infer<typeof formSchema>;

interface CompleteOrderDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: (orderId: string, finalCost: number) => void;
  serviceOrder: any;
}

export const CompleteOrderDialog = ({ isOpen, onOpenChange, onConfirm, serviceOrder }: CompleteOrderDialogProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (serviceOrder) {
      reset({ cost: serviceOrder.cost || 0 });
    }
  }, [serviceOrder, reset]);

  const onSubmit = (data: FormValues) => {
    onConfirm(serviceOrder.id, data.cost);
    onOpenChange(false);
  };

  if (!serviceOrder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Completar Orden de Servicio</DialogTitle>
          <DialogDescription>
            Confirma o actualiza el costo final del servicio antes de marcarlo como completado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <Label htmlFor="cost">Costo Final (UYU)</Label>
            <Input id="cost" type="number" step="0.01" {...register('cost')} />
            {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Confirmar y Completar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};