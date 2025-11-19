import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { showError, showSuccess } from "@/utils/toast";
import { useEffect } from "react";

const formSchema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  brand: z.string().optional(),
  model: z.string().optional(),
  status: z.string().min(1, "El estado es requerido"),
  service_date: z.date().optional().nullable(),
  technician: z.string().optional(),
  notes: z.string().optional(),
  cost: z.coerce.number().optional(),
});

type EditFormValues = z.infer<typeof formSchema>;

interface EditFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  serviceOrder: any;
}

export const EditServiceOrderForm = ({ isOpen, onOpenChange, onSuccess, serviceOrder }: EditFormProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue, watch } = useForm<EditFormValues>({
    resolver: zodResolver(formSchema),
  });

  const serviceDate = watch("service_date");

  useEffect(() => {
    if (serviceOrder) {
      reset({
        ...serviceOrder,
        service_date: serviceOrder.service_date ? new Date(serviceOrder.service_date) : null,
      });
    }
  }, [serviceOrder, reset]);

  const onSubmit = async (data: EditFormValues) => {
    try {
      const submissionData = {
        ...data,
        service_date: data.service_date ? format(data.service_date, 'yyyy-MM-dd') : null,
      };
      const { error } = await supabase.from("service_orders").update(submissionData).eq("id", serviceOrder.id);
      if (error) throw error;
      showSuccess("Orden de servicio actualizada.");
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      showError((error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Orden de Servicio</DialogTitle>
          <DialogDescription>Actualiza los detalles de la orden.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="description">Falla Reportada</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="brand">Marca</Label><Input id="brand" {...register("brand")} /></div>
            <div><Label htmlFor="model">Modelo</Label><Input id="model" {...register("model")} /></div>
          </div>
          <div>
            <Label htmlFor="service_date">Fecha de Visita</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !serviceDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {serviceDate ? format(serviceDate, "PPP") : <span>Selecciona una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={serviceDate || undefined} onSelect={(date) => setValue('service_date', date || null)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select onValueChange={(value) => setValue('status', value)} value={watch('status')}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="technician">Técnico Asignado</Label><Input id="technician" {...register("technician")} /></div>
          <div>
            <Label htmlFor="notes">Notas Internas / Diagnóstico</Label>
            <Textarea id="notes" {...register("notes")} placeholder="Ej: Se revisó la resistencia, parece estar quemada. Presupuestar cambio." />
          </div>
          <div><Label htmlFor="cost">Costo Total (UYU)</Label><Input id="cost" type="number" step="0.01" {...register("cost")} /></div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Guardar Cambios"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};