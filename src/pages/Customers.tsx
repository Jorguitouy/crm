import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { CustomerForm } from '@/components/CustomerForm';
import { CustomersTable } from '@/components/CustomersTable';
import { showError, showSuccess } from '@/utils/toast';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

const fetchCustomers = async (searchTerm: string) => {
  let query = supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    query = query.or(`first_name.ilike.${searchPattern},last_name.ilike.${searchPattern},email.ilike.${searchPattern},phone.ilike.${searchPattern}`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const Customers = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: customers, isLoading, isError } = useQuery({
    queryKey: ['customers', debouncedSearchTerm],
    queryFn: () => fetchCustomers(debouncedSearchTerm),
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
    queryClient.invalidateQueries({ queryKey: ['customers', debouncedSearchTerm] });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
        <Button onClick={handleAddClick}>Agregar Cliente</Button>
      </div>

      <div className="mt-4">
        <Input
          placeholder="Buscar cliente por nombre, email o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
          </div>
        ) : isError ? (
          <div className="text-red-500">Error al cargar los clientes.</div>
        ) : customers && customers.length > 0 ? (
          <CustomersTable customers={customers} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                No se encontraron clientes
              </h3>
              <p className="text-sm text-muted-foreground">
                Intenta con otra búsqueda o agrega un nuevo cliente.
              </p>
            </div>
          </div>
        )}
      </div>

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