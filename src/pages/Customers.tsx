import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { CustomerForm } from '@/components/CustomerForm';
import { CustomersTable } from '@/components/CustomersTable';
import { showError, showSuccess } from '@/utils/toast';

const fetchCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const Customers = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const { data: customers, isLoading, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const handleAddClick = () => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (customer: any) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (customerId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
        return;
    }
    try {
        const { error } = await supabase.from('customers').delete().eq('id', customerId);
        if (error) throw error;
        showSuccess("Cliente eliminado correctamente.");
        queryClient.invalidateQueries({ queryKey: ['customers'] });
    } catch (error) {
        showError((error as Error).message);
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['customers'] });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
        <Button onClick={handleAddClick}>Agregar Cliente</Button>
      </div>

      {isLoading ? (
        <div className="space-y-2 mt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      ) : isError ? (
        <div className="text-red-500">Error al cargar los clientes.</div>
      ) : customers && customers.length > 0 ? (
        <CustomersTable customers={customers} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No hay clientes todavía
            </h3>
            <p className="text-sm text-muted-foreground">
              Comienza agregando tu primer cliente.
            </p>
          </div>
        </div>
      )}

      <CustomerForm 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSuccess={handleSuccess}
        customer={selectedCustomer}
      />
    </Layout>
  );
};

export default Customers;