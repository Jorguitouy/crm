import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceOrdersTable } from '@/components/ServiceOrdersTable';
import { showError, showSuccess } from '@/utils/toast';
import { SmartServiceOrderForm } from '@/components/SmartServiceOrderForm';
import { EditServiceOrderForm } from '@/components/EditServiceOrderForm';
import { CompleteOrderDialog } from '@/components/CompleteOrderDialog';

const fetchServiceOrders = async (statusFilter: string) => {
  let query = supabase.from('service_orders').select('*, customers(first_name, last_name)').order('created_at', { ascending: false });
  if (statusFilter !== 'Todos') { query = query.eq('status', statusFilter); }
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

const fetchCustomers = async () => {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) throw new Error(error.message);
    return data;
};

const Services = () => {
  const queryClient = useQueryClient();
  const [isNewOrderFormOpen, setIsNewOrderFormOpen] = useState(false);
  const [isEditOrderFormOpen, setIsEditOrderFormOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('Todos');
  const statuses = ['Todos', 'Pendiente', 'En Progreso', 'Completado', 'Cancelado'];

  const { data: serviceOrders, isLoading: isLoadingOrders, isError: isErrorOrders } = useQuery({
    queryKey: ['serviceOrders', statusFilter],
    queryFn: () => fetchServiceOrders(statusFilter),
  });

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const handleAddClick = () => { setIsNewOrderFormOpen(true); };
  const handleEditClick = (order: any) => { setSelectedOrder(order); setIsEditOrderFormOpen(true); };
  const handleMarkCompleteClick = (order: any) => { setSelectedOrder(order); setIsCompleteDialogOpen(true); };

  const handleDeleteClick = async (orderId: string) => {
    if (!window.confirm("¿Estás seguro?")) return;
    try {
      const { error } = await supabase.from('service_orders').delete().eq('id', orderId);
      if (error) throw error;
      showSuccess("Orden eliminada.");
      queryClient.invalidateQueries({ queryKey: ['serviceOrders', statusFilter] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    } catch (error) { showError((error as Error).message); }
  };

  const handleConfirmComplete = async (orderId: string, finalCost: number) => {
    try {
        const { error } = await supabase.from('service_orders').update({ status: 'Completado', cost: finalCost }).eq('id', orderId);
        if (error) throw error;
        showSuccess(`Orden completada.`);
        queryClient.invalidateQueries({ queryKey: ['serviceOrders', statusFilter] });
        queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    } catch (error) { showError((error as Error).message); }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['serviceOrders', statusFilter] });
    queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    queryClient.invalidateQueries({ queryKey: ['customers'] });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Órdenes de Servicio</h1>
        <Button onClick={handleAddClick} disabled={isLoadingCustomers}>Agregar Orden</Button>
      </div>
      <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
        {statuses.map(status => (<Button key={status} variant={statusFilter === status ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter(status)}>{status}</Button>))}
      </div>
      <div className="mt-4">
        {isLoadingOrders ? <div className="space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
         : isErrorOrders ? <div className="text-red-500">Error al cargar las órdenes.</div>
         : serviceOrders && serviceOrders.length > 0 ? <ServiceOrdersTable serviceOrders={serviceOrders} onEdit={handleEditClick} onDelete={handleDeleteClick} onMarkComplete={handleMarkCompleteClick} />
         : <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">No hay órdenes con este estado</h3>
              <p className="text-sm text-muted-foreground">Intenta con otro filtro o agrega una nueva orden de servicio.</p>
              <Button className="mt-4" onClick={handleAddClick}>Agregar Orden</Button>
            </div>
          </div>}
      </div>
      {customers && <SmartServiceOrderForm isOpen={isNewOrderFormOpen} onOpenChange={setIsNewOrderFormOpen} onSuccess={handleSuccess} customers={customers} />}
      {selectedOrder && <EditServiceOrderForm isOpen={isEditOrderFormOpen} onOpenChange={setIsEditOrderFormOpen} onSuccess={handleSuccess} serviceOrder={selectedOrder} />}
      {selectedOrder && <CompleteOrderDialog isOpen={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen} onConfirm={handleConfirmComplete} serviceOrder={selectedOrder} />}
    </Layout>
  );
};
export default Services;