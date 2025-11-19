import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ServiceOrder } from "@/lib/types";
import { User, Phone, Home, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceOrder: ServiceOrder | null;
}

export const ServiceOrderDialog = ({ isOpen, onClose, serviceOrder }: ServiceOrderDialogProps) => {
  if (!serviceOrder) return null;

  const customer = serviceOrder.customers?.[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles de la Visita</DialogTitle>
          <DialogDescription>
            Información sobre el servicio programado.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {customer && (
            <div className="space-y-2 p-4 border rounded-lg">
              <h3 className="font-semibold flex items-center"><User className="mr-2 h-4 w-4" /> Cliente</h3>
              <p className="text-sm text-muted-foreground">{customer.first_name} {customer.last_name}</p>
              {customer.phone && <p className="text-sm text-muted-foreground flex items-center"><Phone className="mr-2 h-4 w-4" /> {customer.phone}</p>}
              {customer.address && <p className="text-sm text-muted-foreground flex items-center"><Home className="mr-2 h-4 w-4" /> {customer.address}</p>}
            </div>
          )}
          <div className="space-y-2 p-4 border rounded-lg">
            <h3 className="font-semibold flex items-center"><Wrench className="mr-2 h-4 w-4" /> Servicio</h3>
            <p className="text-sm text-muted-foreground">{serviceOrder.description}</p>
            <p className="text-sm text-muted-foreground"><strong>Estado:</strong> {serviceOrder.status}</p>
          </div>
        </div>
        <DialogFooter>
          {customer && (
            <Button asChild>
              <Link to={`/customers/${customer.id}`}>Ver Historial Completo</Link>
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};