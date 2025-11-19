import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Home, PlusCircle } from 'lucide-react';
import { ServiceOrdersTable } from '@/components/ServiceOrdersTable';
import { EditServiceOrderForm } from '@/components/EditServiceOrderForm';
import { SmartServiceOrderForm } from '@/components/SmartServiceOrderForm';
import { CallLogForm } from '@/components/CallLogForm';
import { CompleteOrderDialog } from '@/components/CompleteOrderDialog';
import { showError, showSuccess } from '@/utils/toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const fetchCustomerDetails = async (id: string) => {
  const { data, error } = await supabase.from('customers').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
};

const fetchCustomerServiceOrders = async (id: string) => {
  const { data, error } = await supabase.from('service_orders').select('*, customers(first_name, last_name)').eq('customer_id', id).order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const fetchAllCustomers = async () => {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) throw new Error(error.message);
    return data;
};

const fetchCallLogs = async (customerId: string) => {
  const { data, error } = await supabase.from('call_logs').select('*').eq('customer_id', customerId).order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isNewOrderFormOpen, setIsNewOrderFormOpen] = useState(false);
  const [isEditOrderFormOpen, setIsEditOrderFormOpen] = useState(false);
  const [isCallLogFormOpen, setIsCallLogFormOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data: customer, isLoading: isLoadingCustomer, isError: isErrorCustomer } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => fetchCustomerDetails(id!),
    enabled: !!id,
  });

  const { data: serviceOrders, isLoading: isLoadingOrders, isError: isErrorOrders } = useQuery({
    queryKey: ['customerServiceOrders', id],
    queryFn: () => fetchCustomerServiceOrders(id!),
    enabled: !!id,
  });

  const { data: callLogs, isLoading: isLoadingCallLogs } = useQuery({
    queryKey: ['callLogs', id],
    queryFn: () => fetchCallLogs(id!),
    enabled: !!id,
  });

  const { data: allCustomers, isLoading: isLoadingAllCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchAllCustomers,
  });

  const handleEditServiceClick = (order: any) => {
    setSelectedOrder(order);
    setIsEditOrderFormOpen(true);
  };

  const handleMarkCompleteClick = (order: any) => {
    setSelectedOrder(order);
    setIsCompleteDialogOpen(true);
  };

  const handleDeleteServiceClick = async (orderId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta orden?")) return;
    try {
      const { error } = await supabase.from('service_orders').delete().eq('id', orderId);
      if (error) throw error;
      showSuccess("Orden eliminada correctamente.");
      queryClient.invalidateQueries({ queryKey: ['customerServiceOrders', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    } catch (error) {
      showError((error as Error).message);
    }
  };

  const handleConfirmComplete = async (orderId: string, finalCost: number) => {
    try {
        const { error } = await supabase.from('service_orders').update({ status: 'Completado', cost: finalCost }).eq('id', orderId);
        if (error) throw error;
        showSuccess(`Orden completada.`);
        queryClient.invalidateQueries({ queryKey: ['customerServiceOrders', id] });
        queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    } catch (error) {
        showError((error as Error).message);
    }
  };

  const handleServiceSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['customerServiceOrders', id] });
    queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    queryClient.invalidateQueries({ queryKey: ['customers'] });
  };

  const handleCallLogSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['callLogs', id] });
  };

  if (isLoadingCustomer) {
    return <Layout><Skeleton className="h-screen w-full" /></Layout>;
  }

  if (isErrorCustomer || !customer) {
    return <Layout><div className="text-red-500">Error: No se pudo encontrar al cliente.</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" asChild>
          <Link to="/customers"><ArrowLeft className="mr-2 h-4 w-4" /> Volver a Clientes</Link>
        </Button>
        <Button onClick={() => setIsNewOrderFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nueva Orden para este Cliente
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{customer.first_name} {customer.last_name}</CardTitle>
              <CardDescription>Información de Contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {customer.email && <div className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" /> {customer.email}</div>}
              {customer.phone && <div className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground" /> {customer.phone}</div>}
              {customer.address && <div className="flex items-center"><Home className="mr-2 h-4 w-4 text-muted-foreground" /> {customer.address}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Registro de Llamadas</CardTitle>
                <CardDescription>Historial de conversaciones.</CardDescription>
              </div>
              <Button size="sm" onClick={() => setIsCallLogFormOpen(true)}>
                <PlusCircle className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingCallLogs ? <Skeleton className="h-24 w-full" /> : (
                callLogs && callLogs.length > 0 ? (
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {callLogs.map(log => (
                      <div key={log.id} className="text-sm">
                        <p className="font-medium">{format(new Date(log.created_at), "PPP p", { locale: es })}</p>
                        <p className="text-muted-foreground whitespace-pre-wrap">{log.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground text-center py-4">No hay registros de llamadas.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Servicios</CardTitle>
              <CardDescription>Todas las órdenes de servicio asociadas a este cliente.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? <Skeleton className="h-48 w-full" /> : isErrorOrders ? (
                <div className="text-red-500">Error al cargar el historial.</div>
              ) : serviceOrders && serviceOrders.length > 0 ? (
                <ServiceOrdersTable serviceOrders={serviceOrders} onEdit={handleEditServiceClick} onDelete={handleDeleteServiceClick} onMarkComplete={handleMarkCompleteClick} />
              ) : (
                <div className="text-center text-muted-foreground py-8">No hay órdenes de servicio.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {allCustomers && (
        <SmartServiceOrderForm isOpen={isNewOrderFormOpen} onOpenChange={setIsNewOrderFormOpen} onSuccess={handleServiceSuccess} customers={allCustomers} preselectedCustomerId={customer.id} />
      )}
      {selectedOrder && (
        <EditServiceOrderForm isOpen={isEditOrderFormOpen} onOpenChange={setIsEditOrderFormOpen} onSuccess={handleServiceSuccess} serviceOrder={selectedOrder} />
      )}
      {selectedOrder && (
        <CompleteOrderDialog isOpen={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen} onConfirm={handleConfirmComplete} serviceOrder={selectedOrder} />
      )}
      <CallLogForm isOpen={isCallLogFormOpen} onOpenChange={setIsCallLogFormOpen} onSuccess={handleCallLogSuccess} customerId={customer.id} />
    </Layout>
  );
};

export default CustomerDetail;