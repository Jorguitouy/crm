import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, CheckCircle, FileDown } from "lucide-react";
import { format } from "date-fns";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ServiceReportPDF } from './ServiceReportPDF';

interface ServiceOrder {
  id: string;
  description: string;
  status: string;
  service_date: string;
  cost: number;
  customers: any;
}

interface ServiceOrdersTableProps {
  serviceOrders: ServiceOrder[];
  userProfile: any;
  onEdit: (serviceOrder: ServiceOrder) => void;
  onDelete: (serviceOrderId: string) => void;
  onMarkComplete: (serviceOrder: ServiceOrder) => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Completado': return 'default';
    case 'En Progreso': return 'secondary';
    case 'Cancelado': return 'destructive';
    case 'Pendiente': default: return 'outline';
  }
};

export const ServiceOrdersTable = ({ serviceOrders, userProfile, onEdit, onDelete, onMarkComplete }: ServiceOrdersTableProps) => {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha Visita</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Costo</TableHead>
            <TableHead><span className="sr-only">Acciones</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.customers ? `${order.customers.first_name} ${order.customers.last_name}` : 'Cliente no asignado'}
              </TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>{order.service_date ? format(new Date(order.service_date), "dd/MM/yyyy") : 'N/A'}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </TableCell>
              <TableCell className="text-right">${order.cost ? order.cost.toLocaleString('es-UY') : '0'}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    {order.status !== 'Completado' && (
                        <DropdownMenuItem onClick={() => onMarkComplete(order)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marcar como Completado
                        </DropdownMenuItem>
                    )}
                    {order.status === 'Completado' && (
                      <PDFDownloadLink
                        document={<ServiceReportPDF serviceOrder={order} userProfile={userProfile} />}
                        fileName={`reporte-${order.customers?.first_name || 'cliente'}-${order.id.substring(0, 4)}.pdf`}
                        style={{ textDecoration: 'none' }}
                      >
                        {({ loading }) => (
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <FileDown className="mr-2 h-4 w-4" />
                            {loading ? 'Generando...' : 'Descargar PDF'}
                          </DropdownMenuItem>
                        )}
                      </PDFDownloadLink>
                    )}
                    <DropdownMenuItem onClick={() => onEdit(order)}>Editar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(order.id)} className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};