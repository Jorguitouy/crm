import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";
import { useEffect } from "react";

const formSchema = z.object({
  first_name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().optional(),
  email: z.string().email("Correo electrónico inválido").optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof formSchema>;

interface CustomerFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  customer?: any; // Customer data for editing
}

export const CustomerForm = ({ isOpen, onOpenChange, onSuccess, customer }: CustomerFormProps) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (customer) {
      reset(customer);
    } else {
      reset({ first_name: "", last_name: "", email: "", phone: "", address: "" });
    }
  }, [customer, reset]);

  const onSubmit = async (data: CustomerFormValues) => {
    if (!user) {
      showError("Debes iniciar sesión para realizar esta acción.");
      return;
    }

    try {
      if (customer) {
        // Update existing customer
        const { error } = await supabase
          .from("customers")
          .update({ ...data })
          .eq("id", customer.id);
        if (error) throw error;
        showSuccess("Cliente actualizado correctamente.");
      } else {
        // Create new customer
        const { error } = await supabase
          .from("customers")
          .insert([{ ...data, user_id: user.id }]);
        if (error) throw error;
        showSuccess("Cliente agregado correctamente.");
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      showError((error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{customer ? "Editar Cliente" : "Agregar Cliente"}</DialogTitle>
          <DialogDescription>
            {customer ? "Actualiza los datos del cliente." : "Completa los datos del nuevo cliente."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                Nombre
              </Label>
              <Input id="first_name" {...register("first_name")} className="col-span-3" />
              {errors.first_name && <p className="col-span-4 text-red-500 text-sm text-right">{errors.first_name.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Apellido
              </Label>
              <Input id="last_name" {...register("last_name")} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" {...register("email")} className="col-span-3" />
               {errors.email && <p className="col-span-4 text-red-500 text-sm text-right">{errors.email.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <Input id="phone" {...register("phone")} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Dirección
              </Label>
              <Input id="address" {...register("address")} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};