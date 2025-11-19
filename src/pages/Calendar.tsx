import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Skeleton } from '@/components/ui/skeleton';

const fetchScheduledServices = async () => {
  const { data, error } = await supabase
    .from('service_orders')
    .select('id, description, service_date, status, customers(id, first_name, last_name)')
    .not('service_date', 'is', null);

  if (error) throw new Error(error.message);
  return data;
};

const CalendarPage = () => {
  const navigate = useNavigate();
  const { data: services, isLoading } = useQuery({
    queryKey: ['scheduledServices'],
    queryFn: fetchScheduledServices,
  });

  const events = services?.map(service => ({
    id: service.id,
    title: `${service.customers?.first_name || 'Cliente'} - ${service.description}`,
    start: service.service_date,
    allDay: true,
    extendedProps: {
      customerId: service.customers?.id,
      status: service.status,
    },
    // Asignar colores según el estado
    backgroundColor: service.status === 'Completado' ? '#16a34a' // green-600
                   : service.status === 'Cancelado' ? '#dc2626' // red-600
                   : service.status === 'En Progreso' ? '#2563eb' // blue-600
                   : '#f97316', // orange-500 for Pendiente
    borderColor: service.status === 'Completado' ? '#16a34a'
                 : service.status === 'Cancelado' ? '#dc2626'
                 : service.status === 'En Progreso' ? '#2563eb'
                 : '#f97316',
  })) || [];

  const handleEventClick = (clickInfo: any) => {
    const customerId = clickInfo.event.extendedProps.customerId;
    if (customerId) {
      navigate(`/customers/${customerId}`);
    }
  };

  return (
    <Layout>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">Calendario de Servicios</h1>
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        {isLoading ? (
          <Skeleton className="h-[600px] w-full" />
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
            eventClick={handleEventClick}
            height="auto"
            locale="es"
            buttonText={{
                today:    'hoy',
                month:    'mes',
                week:     'semana',
                day:      'día',
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default CalendarPage;