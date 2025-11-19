import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthProvider";
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
  customer_id: z.string().uuid("Debes seleccionar un cliente"),
  description: z.string().min(1, "La descripción es requerida"),
  brand: z.string().optional(),
  model: z.string().optional(),
  status: z.string().min(1, "El estado es requerido"),
  service_date: z.date().optional(),
  technician: z.string().optional(),
  notes: z.string().optional(),
  cost: z.coerce.number().optional(),
});

type ServiceOrderFormValues = z.infer<typeof formSchema>;

interface ServiceOrderFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  customers: any[];
  serviceOrder?: any;
}

export const ServiceOrderForm = ({ isOpen, onOpenChange, onSuccess, customers, serviceOrder }: ServiceOrderFormProps) => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control, setValue, watch } = useForm<ServiceOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        status: 'Pendiente'
    }
  });

  const serviceDate = watch("service_date");

  useEffect(() => {
    if (serviceOrder) {
      reset({
        ...serviceOrder,
        service_date: serviceOrder.service_date ? new Date(serviceOrder.service_date) : undefined,
      });
    } else {
      reset({
        customer_id: undefined,
        description: "",
        brand: "",
        model: "",
        status: "Pendiente",
        service_date: undefined,
        technician: "",
        notes: "",
        cost: 0,
      });
    }
  }, [serviceOrder, reset]);

  const onSubmit = async (data: ServiceOrderFormValues) => {
    if (!user) {
      showError("Debes iniciar sesión para realizar esta acción.");
      return;
    }

    try {
      const submissionData = {
        ...data,
        user_id: user.id,
        service_date: data.service_date ? format(data.service_date, 'yyyy-MM-dd') : null,
      };

      if (serviceOrder) {
        const { error } = await supabase.from("service_orders").update(submissionData).eq("id", serviceOrder.id);
        if (error) throw error;
        showSuccess("Orden de servicio actualizada.");
      } else {
        const { error } = await supabase.from("service_orders").insert([submissionData]);
        if (error) throw error;
        showSuccess("Orden de servicio creada.");
      }
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
          <DialogTitle>{serviceOrder ? "Editar Orden de Servicio" : "Nueva Orden de Servicio"}</DialogTitle>
          <DialogDescription>
            {serviceOrder ? "Actualiza los detalles de la orden." : "Completa los datos para una nueva orden."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="customer_id">Cliente</Label>
            <Select onValueChange={(value) => setValue('customer_id', value)} value={watch('customer_id')}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un cliente" />
              </SelectTrigger>
              <SelectContent>
                {customers.map(c => <SelectItem key={c.id} value={c.id}>{c.first_name} {c.last_name}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.customer_id && <p className="text-red-500 text-sm mt-1">{errors.customer_id.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Falla Reportada</Label>
            <Textarea id="description" {...register("description")} placeholder="Ej: El calefón no enciende, pierde agua..." />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input id="brand" {...register("brand")} placeholder="Ej: James, Orbis" />
            </div>
            <div>
              <Label htmlFor="model">Modelo</Label>
              <Input id="model" {...register("model")} placeholder="Ej: 30L, C-140" />
            </div>
          </div>
          <div>
            <Label htmlFor="service_date">Fecha de Visita</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !serviceDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {serviceDate ? format(serviceDate, "PPP") : <span>Selecciona una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={serviceDate} onSelect={(date) => setValue('service_date', date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select onValueChange={(value) => setValue('status', value)} defaultValue="Pendiente" value={watch('status')}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="technician">Técnico Asignado</Label>
            <Input id="technician" {...register("technician")} placeholder="Nombre del técnico" />
          </div>
          <div>
            <Label htmlFor="cost">Costo Total (UYU)</Label>
            <Input id="cost" type="number" step="0.01" {...register("cost")} placeholder="Ej: 1500" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Guardar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};