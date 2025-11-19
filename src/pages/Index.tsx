import Layout from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Users, Clock, Wrench, DollarSign, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

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

const fetchRecentServiceOrders = async () => {
    const { data, error } = await supabase
      .from('service_orders')
      .select('*, customers(first_name, last_name)')
      .order('created_at', { ascending: false })
      .limit(5);
    if (error) throw new Error(error.message);
    return data;
};

const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completado': return 'default';
      case 'En Progreso': return 'secondary';
      case 'Cancelado': return 'destructive';
      case 'Pendiente': default: return 'outline';
    }
};

const Index = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  const { data: recentOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['recentServiceOrders'],
    queryFn: fetchRecentServiceOrders,
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate('/customers')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Cliente
            </Button>
            <Button size="sm" onClick={() => navigate('/services')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Orden
            </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Clientes"
          value={stats?.totalCustomers ?? 0}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Servicios Pendientes"
          value={stats?.pendingOrders ?? 0}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Servicios Completados (Mes)"
          value={stats?.monthlyServices ?? 0}
          icon={<Wrench className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Ingresos del Mes"
          value={`$${(stats?.monthlyRevenue ?? 0).toLocaleString('es-UY')}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingStats}
        />
      </div>
      <div className="mt-6">
        <Card>
            <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Las últimas 5 órdenes de servicio creadas.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Fecha Creación</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoadingOrders ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={4} className="h-12"></TableCell>
                                </TableRow>
                            ))
                        ) : recentOrders && recentOrders.length > 0 ? (
                            recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        {order.customers ? `${order.customers.first_name} ${order.customers.last_name}` : 'N/A'}
                                    </TableCell>
                                    <TableCell>{order.description}</TableCell>
                                    <TableCell>{format(new Date(order.created_at), "dd/MM/yyyy")}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No hay órdenes de servicio recientes.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;