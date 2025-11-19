import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const Services = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Órdenes de Servicio</h1>
        <Button>Agregar Orden</Button>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No hay órdenes de servicio
          </h3>
          <p className="text-sm text-muted-foreground">
            Crea tu primera orden de servicio.
          </p>
          {/* TODO: Add services table */}
        </div>
      </div>
    </Layout>
  );
};

export default Services;