import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';
import { Copy } from 'lucide-react';

const fetchAudienceCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('phone')
    .not('phone', 'is', null)
    .neq('phone', '');

  if (error) {
    throw new Error(error.message);
  }
  return data.map(c => c.phone);
};

const Audiences = () => {
  const { data: phoneNumbers, isLoading, isError } = useQuery({
    queryKey: ['audienceCustomers'],
    queryFn: fetchAudienceCustomers,
  });

  const phoneList = phoneNumbers?.join('\n') || '';

  const handleCopyToClipboard = () => {
    if (phoneList) {
      navigator.clipboard.writeText(phoneList)
        .then(() => {
          showSuccess('¡Números de teléfono copiados al portapapeles!');
        })
        .catch(err => {
          showError('No se pudo copiar al portapapeles.');
          console.error('Error copying to clipboard:', err);
        });
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Audiencias para Google Ads</h1>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Lista de Teléfonos de Clientes</CardTitle>
          <CardDescription>
            Aquí se listan los números de teléfono de tus clientes. Puedes copiar esta lista para crear audiencias similares en Google Ads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-48" />
            </div>
          ) : isError ? (
            <div className="text-red-500">Error al cargar la lista de teléfonos.</div>
          ) : phoneNumbers && phoneNumbers.length > 0 ? (
            <div className="space-y-4">
              <Textarea
                readOnly
                value={phoneList}
                rows={10}
                placeholder="No hay números de teléfono para mostrar."
              />
              <Button onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copiar al Portapapeles
              </Button>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No hay clientes con teléfono
                </h3>
                <p className="text-sm text-muted-foreground">
                  Agrega clientes con números de teléfono para generar una audiencia.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Audiences;