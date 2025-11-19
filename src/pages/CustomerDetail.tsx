import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Home } from 'lucide-react';
import { ServiceOrdersTable } from '@/components/ServiceOrdersTable';
import { ServiceOrderForm } from '@/components/ServiceOrderForm';
import { showError, showSuccess } from '@/utils/toast';

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

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  // Necesitamos la lista de todos los clientes para el formulario de edición
  const { data: allCustomers, isLoading: isLoadingAllCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchAllCustomers,
  });

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
      queryClient.invalidateQueries({ queryKey: ['customerServiceOrders', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] }); // Actualizar dashboard
    } catch (error) {
      showError((error as Error).message);
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['customerServiceOrders', id] });
    queryClient.invalidateQueries({ queryKey: ['dashboardStats'] }); // Actualizar dashboard
  };

  if (isLoadingCustomer) {
    return (
      <Layout>
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (isErrorCustomer || !customer) {
    return <Layout><div className="text-red-500">Error: No se pudo encontrar al cliente.</div></Layout>;
  }

  return (
    <Layout>
      <div className="mb-4">
        <Button variant="outline" asChild>
          <Link to="/customers">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Clientes
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
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

      <h2 className="text-xl font-semibold mb-4">Historial de Servicios</h2>
      {isLoadingOrders ? (
        <div className="space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
      ) : isErrorOrders ? (
        <div className="text-red-500">Error al cargar el historial de servicios.</div>
      ) : serviceOrders && serviceOrders.length > 0 ? (
        <ServiceOrdersTable serviceOrders={serviceOrders} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      ) : (
        <div className="text-center text-muted-foreground p-8 border border-dashed rounded-lg">
          Este cliente no tiene órdenes de servicio registradas.
        </div>
      )}

      {!isLoadingAllCustomers && allCustomers && (
        <ServiceOrderForm
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSuccess={handleSuccess}
            customers={allCustomers}
            serviceOrder={selectedOrder}
        />
      )}
    </Layout>
  );
};

export default CustomerDetail;