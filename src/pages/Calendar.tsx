import { useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { EventContentArg } from '@fullcalendar/core';
import { Badge } from '@/components/ui/badge';
import { ServiceOrderDialog } from '@/components/ServiceOrderDialog';
import { ServiceOrder } from '@/lib/types';
import { es } from 'date-fns/locale/es';
import Layout from '@/components/Layout'; // Importamos el Layout
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CalendarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<ServiceOrder | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: services, isLoading, error } = useQuery<ServiceOrder[]>({
    queryKey: ['servicesForCalendar'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_orders')
        .select(`
          id,
          description,
          service_date,
          status,
          customers (
            id,
            first_name,
            last_name,
            phone,
            address
          )
        `)
        .neq('status', 'Completado');

      if (error) throw new Error(error.message);
      return data;
    },
  });

  const events = useMemo(() => {
    if (!services) return [];
    return services.map(service => ({
      id: service.id,
      title: `${service.customers?.[0]?.first_name || 'Cliente'} - ${service.description}`,
      start: service.service_date,
      end: service.service_date,
      allDay: true,
      extendedProps: {
        customerId: service.customers?.[0]?.id,
        status: service.status,
        description: service.description,
        customer: service.customers?.[0]
      },
      backgroundColor: getStatusColor(service.status),
      borderColor: getStatusColor(service.status),
    }));
  }, [services]);

  const handleEventClick = (clickInfo: any) => {
    const serviceId = clickInfo.event.id;
    const service = services?.find(s => s.id.toString() === serviceId.toString());
    if (service) {
      setSelectedEvent(service);
      setIsDialogOpen(true);
    }
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="p-1">
        <p className="font-semibold text-white truncate">{eventInfo.event.title}</p>
        <Badge variant="secondary" className="text-xs">{eventInfo.event.extendedProps.status}</Badge>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">Calendario de Servicios</h1>
      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : error ? (
            <div className="text-red-500">Error al cargar los servicios: {error.message}</div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              locale={es}
              height="auto"
            />
          )}
        </CardContent>
      </Card>
      {selectedEvent && (
        <ServiceOrderDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          serviceOrder={selectedEvent}
        />
      )}
    </Layout>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pendiente':
      return '#f59e0b'; // amber-500
    case 'En progreso':
      return '#3b82f6'; // blue-500
    case 'Cancelado':
      return '#ef4444'; // red-500
    default:
      return '#6b7280'; // gray-500
  }
};

export default CalendarPage;