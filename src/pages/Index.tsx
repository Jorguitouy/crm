import Layout from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Users, Clock, Wrench, DollarSign, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Error 1: Importación añadida
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const fetchDashboardStats = async () => {
  const { data: totalCustomers, error: error1 } = await supabase.rpc('get_total_customers');
  if (error1) throw new Error(error1.message);

  const { data: pendingOrders, error: error2 } = await supabase.rpc('get_pending_orders_count');
  if (error2) throw new Error(error2.message);

  const { data: monthlyRevenue, error: error3 } = await supabase.rpc('get_monthly_revenue');
  if (error3) throw new Error(error3.message);

  const { data: monthlyServices, error: error4 } = await supabase.rpc('get_monthly_completed_services');
  if (error4) throw new Error(error4.message);

  return { totalCustomers, pendingOrders, monthlyRevenue, monthlyServices };
};

const fetchPendingServiceOrders = async () => {
    const { data, error } = await supabase
      .from('service_orders')
      // Errors 2, 3, 4: Cambiado a '*' para asegurar la estructura de datos correcta
      .select('*, customers(id, first_name, last_name)')
      .in('status', ['Pendiente', 'En Progreso'])
      .order('created_at', { ascending: true })
      .limit(5);
    if (error) throw new Error(error.message);
    return data;
};

const Index = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  const { data: pendingOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['pendingServiceOrders'],
    queryFn: fetchPendingServiceOrders,
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate('/customers')}>
                <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Cliente
            </Button>
            <Button size="sm" onClick={() => navigate('/services')}>
                <PlusCircle className="mr-2 h-4 w-4" /> Nueva Orden
            </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total de Clientes" value={stats?.totalCustomers ?? 0} icon={<Users className="h-4 w-4 text-muted-foreground" />} isLoading={isLoadingStats} />
        <StatCard title="Servicios Pendientes" value={stats?.pendingOrders ?? 0} icon={<Clock className="h-4 w-4 text-muted-foreground" />} isLoading={isLoadingStats} />
        <StatCard title="Servicios Completados (Mes)" value={stats?.monthlyServices ?? 0} icon={<Wrench className="h-4 w-4 text-muted-foreground" />} isLoading={isLoadingStats} />
        <StatCard title="Ingresos del Mes" value={`$${(stats?.monthlyRevenue ?? 0).toLocaleString('es-UY')}`} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} isLoading={isLoadingStats} />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Trabajos Pendientes y En Progreso</CardTitle>
                <CardDescription>Los 5 trabajos más antiguos que necesitan atención.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoadingOrders ? <Skeleton className="h-40 w-full" /> : (
                    pendingOrders && pendingOrders.length > 0 ? (
                        <div className="space-y-4">
                            {pendingOrders.map(order => (
                                <div key={order.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{order.description}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Cliente: <Link to={`/customers/${order.customers?.id}`} className="text-primary hover:underline">{order.customers?.first_name} {order.customers?.last_name}</Link>
                                        </p>
                                    </div>
                                    <Button variant="secondary" size="sm" asChild>
                                        <Link to="/services">Ver</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-muted-foreground text-center py-4">¡Excelente! No hay trabajos pendientes.</p>
                )}
            </CardContent>
        </Card>
        {/* Aquí podría ir otra tarjeta en el futuro, como "Actividad Reciente" */}
      </div>
    </Layout>
  );
};

export default Index;