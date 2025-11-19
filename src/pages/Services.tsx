import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceOrderForm } from '@/components/ServiceOrderForm';
import { ServiceOrdersTable } from '@/components/ServiceOrdersTable';
import { showError, showSuccess } from '@/utils/toast';

const fetchServiceOrders = async () => {
  const { data, error } = await supabase
    .from('service_orders')
    .select('*, customers(first_name, last_name)')
    .order('created_at', { ascending: false });
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data: serviceOrders, isLoading: isLoadingOrders, isError: isErrorOrders } = useQuery({
    queryKey: ['serviceOrders'],
    queryFn: fetchServiceOrders,
  });

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const handleAddClick = () => {
    setSelectedOrder(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (order: any) => {
    setSelectedOrder(order);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (orderId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta orden?")) return;
    try {
      const { error } = await supabase.from('service_orders').delete().eq('id', orderId);
      if (error) throw error;
      showSuccess("Orden eliminada correctamente.");
      queryClient.invalidateQueries({ queryKey: ['serviceOrders'] });
    } catch (error) {
      showError((error as Error).message);
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['serviceOrders'] });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Órdenes de Servicio</h1>
        <Button onClick={handleAddClick} disabled={isLoadingCustomers}>Agregar Orden</Button>
      </div>

      {isLoadingOrders ? (
        <div className="space-y-2 mt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : isErrorOrders ? (
        <div className="text-red-500">Error al cargar las órdenes de servicio.</div>
      ) : serviceOrders && serviceOrders.length > 0 ? (
        <ServiceOrdersTable serviceOrders={serviceOrders} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No hay órdenes de servicio
            </h3>
            <p className="text-sm text-muted-foreground">
              Crea tu primera orden de servicio para empezar a gestionar tus trabajos.
            </p>
          </div>
        </div>
      )}

      {customers && <ServiceOrderForm 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSuccess={handleSuccess}
        customers={customers}
        serviceOrder={selectedOrder}
      />}
    </Layout>
  );
};

export default Services;