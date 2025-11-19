import { useForm, Controller } from "react-hook-form";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showError, showSuccess } from "@/utils/toast";
import { useEffect, useState } from "react";

const formSchema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  brand: z.string().optional(),
  model: z.string().optional(),
  status: z.string().default('Pendiente'),
  notes: z.string().optional(), // Campo añadido
  customerSelection: z.enum(['existing', 'new']),
  existing_customer_id: z.string().optional(),
  new_customer_name: z.string().optional(),
  new_customer_phone: z.string().optional(),
}).refine(data => {
    if (data.customerSelection === 'existing') return !!data.existing_customer_id;
    if (data.customerSelection === 'new') return !!data.new_customer_name && !!data.new_customer_phone;
    return false;
}, {
    message: "Debes seleccionar un cliente existente o crear uno nuevo con nombre y teléfono.",
    path: ["customerSelection"],
});

type FormValues = z.infer<typeof formSchema>;

interface SmartFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  customers: any[];
  preselectedCustomerId?: string;
}

export const SmartServiceOrderForm = ({ isOpen, onOpenChange, onSuccess, customers, preselectedCustomerId }: SmartFormProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(preselectedCustomerId ? 'existing' : 'new');

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerSelection: preselectedCustomerId ? 'existing' : 'new',
      existing_customer_id: preselectedCustomerId || undefined,
    }
  });

  useEffect(() => {
    const newTab = preselectedCustomerId ? 'existing' : 'new';
    setActiveTab(newTab);
    reset({
        description: "",
        brand: "",
        model: "",
        status: "Pendiente",
        notes: "",
        customerSelection: newTab,
        existing_customer_id: preselectedCustomerId || undefined,
        new_customer_name: "",
        new_customer_phone: "",
    });
  }, [isOpen, preselectedCustomerId, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    try {
      let customerId = data.existing_customer_id;

      if (data.customerSelection === 'new' && data.new_customer_phone) {
        const { data: existingCustomer, error: findError } = await supabase.from('customers').select('id').eq('phone', data.new_customer_phone).single();
        if (findError && findError.code !== 'PGRST116') throw findError;

        if (existingCustomer) {
          customerId = existingCustomer.id;
          showSuccess("Cliente existente encontrado. La orden se asignará a su historial.");
        } else {
          const [firstName, ...lastNameParts] = data.new_customer_name?.split(' ') || [];
          const { data: newCustomer, error: createError } = await supabase.from('customers').insert({ first_name: firstName, last_name: lastNameParts.join(' '), phone: data.new_customer_phone, user_id: user.id, }).select('id').single();
          if (createError) throw createError;
          customerId = newCustomer.id;
        }
      }

      if (!customerId) {
        showError("No se pudo determinar el cliente.");
        return;
      }

      const { error: orderServiceError } = await supabase.from('service_orders').insert({
        description: data.description,
        brand: data.brand,
        model: data.model,
        status: data.status,
        notes: data.notes,
        customer_id: customerId,
        user_id: user.id,
      });

      if (orderServiceError) throw orderServiceError;

      showSuccess("Orden de servicio creada exitosamente.");
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
          <DialogTitle>Nueva Orden de Servicio</DialogTitle>
          <DialogDescription>Selecciona un cliente existente o crea uno nuevo al instante.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 space-y-4">
            <Controller name="customerSelection" control={control} render={({ field }) => (
                <Tabs value={activeTab} onValueChange={(value) => { field.onChange(value as 'existing' | 'new'); setActiveTab(value); }}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="existing" disabled={!!preselectedCustomerId}>Cliente Existente</TabsTrigger>
                    <TabsTrigger value="new" disabled={!!preselectedCustomerId}>Nuevo Cliente</TabsTrigger>
                  </TabsList>
                  <TabsContent value="existing" className="mt-4">
                    <Label htmlFor="existing_customer_id">Seleccionar Cliente</Label>
                    <Controller name="existing_customer_id" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={!!preselectedCustomerId}>
                          <SelectTrigger><SelectValue placeholder="Busca un cliente..." /></SelectTrigger>
                          <SelectContent>{customers.map(c => <SelectItem key={c.id} value={c.id}>{c.first_name} {c.last_name}</SelectItem>)}</SelectContent>
                        </Select>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="new" className="mt-4 space-y-2">
                    <div><Label htmlFor="new_customer_name">Nombre y Apellido</Label><Input id="new_customer_name" {...register("new_customer_name")} placeholder="Ej: Juan Pérez" /></div>
                    <div><Label htmlFor="new_customer_phone">Teléfono</Label><Input id="new_customer_phone" {...register("new_customer_phone")} placeholder="Ej: 099123456" /></div>
                  </TabsContent>
                </Tabs>
              )}
            />
            {errors.customerSelection && <p className="text-red-500 text-sm">{errors.customerSelection.message}</p>}
            <hr/>
            <div>
              <Label htmlFor="description">Falla Reportada / Descripción del Trabajo</Label>
              <Textarea id="description" {...register("description")} placeholder="Ej: El calefón no enciende..." />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="brand">Marca</Label><Input id="brand" {...register("brand")} /></div>
              <div><Label htmlFor="model">Modelo</Label><Input id="model" {...register("model")} /></div>
            </div>
            <div>
              <Label htmlFor="notes">Notas Internas / Diagnóstico</Label>
              <Textarea id="notes" {...register("notes")} placeholder="Ej: Se revisó la resistencia, parece estar quemada. Presupuestar cambio." />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Crear Orden'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};