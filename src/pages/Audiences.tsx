import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showError, showSuccess } from '@/utils/toast';
import { Copy } from 'lucide-react';

// Componente reutilizable para mostrar la lista
const AudienceDisplay = ({ title, description, queryKey, queryFn }: { title: string, description: string, queryKey: string[], queryFn: () => Promise<string[]> }) => {
  const { data: phoneNumbers, isLoading, isError } = useQuery({ queryKey, queryFn });

  const phoneList = phoneNumbers?.join('\n') || '';

  const handleCopyToClipboard = () => {
    if (phoneList) {
      navigator.clipboard.writeText(phoneList)
        .then(() => showSuccess('¡Lista copiada al portapapeles!'))
        .catch(() => showError('No se pudo copiar al portapapeles.'));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-48" />
          </div>
        ) : isError ? (
          <div className="text-red-500">Error al cargar la lista.</div>
        ) : phoneNumbers && phoneNumbers.length > 0 ? (
          <div className="space-y-4">
            <Textarea readOnly value={phoneList} rows={10} />
            <Button onClick={handleCopyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Copiar Lista
            </Button>
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8">No hay clientes que cumplan los criterios.</div>
        )}
      </CardContent>
    </Card>
  );
};

// Funciones para obtener los datos
const fetchAllCustomerPhones = async () => {
  const { data, error } = await supabase.from('customers').select('phone').not('phone', 'is', null).neq('phone', '');
  if (error) throw new Error(error.message);
  return data.map(c => c.phone);
};

const fetchCompletedServiceCustomerPhones = async () => {
  const { data, error } = await supabase.rpc('get_completed_service_customer_phones');
  if (error) throw new Error(error.message);
  return data.map((item: { phone: string }) => item.phone);
};

const Audiences = () => {
  return (
    <Layout>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">Audiencias para Marketing</h1>
      <Tabs defaultValue="completed">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="completed">Clientes con Servicios Completados</TabsTrigger>
          <TabsTrigger value="all">Todos los Clientes</TabsTrigger>
        </TabsList>
        <TabsContent value="completed" className="mt-4">
          <AudienceDisplay
            title="Lista de Clientes Recurrentes"
            description="Usa esta lista para crear audiencias de alta calidad basadas en clientes que ya han completado un servicio."
            queryKey={['completedServiceCustomers']}
            queryFn={fetchCompletedServiceCustomerPhones}
          />
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <AudienceDisplay
            title="Lista General de Clientes"
            description="Esta lista contiene los números de teléfono de todos los clientes registrados en el sistema."
            queryKey={['allCustomerPhones']}
            queryFn={fetchAllCustomerPhones}
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Audiences;