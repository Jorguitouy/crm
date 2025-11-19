import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Registrar una fuente que soporte caracteres latinos como tildes
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 11,
    padding: 40,
    flexDirection: 'column',
    color: '#333',
  },
  header: {
    textAlign: 'right',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: '1px solid #eee',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    padding: 5,
    borderRadius: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: 'grey',
  },
  costSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: '1px solid #ccc',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  costLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});

export const ServiceReportPDF = ({ serviceOrder, userProfile }: { serviceOrder: any, userProfile: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{userProfile?.company_name || 'Reporte de Servicio'}</Text>
        <Text>{new Date().toLocaleDateString('es-UY')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información del Cliente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{serviceOrder.customers?.first_name} {serviceOrder.customers?.last_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{serviceOrder.customers?.phone || 'No especificado'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>{serviceOrder.customers?.address || 'No especificada'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalles del Servicio</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha de Visita:</Text>
          <Text style={styles.value}>{serviceOrder.service_date ? new Date(serviceOrder.service_date).toLocaleDateString('es-UY') : 'No especificada'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Falla Reportada:</Text>
          <Text style={styles.value}>{serviceOrder.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Diagnóstico/Notas:</Text>
          <Text style={styles.value}>{serviceOrder.notes || 'Sin notas adicionales.'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Técnico:</Text>
          <Text style={styles.value}>{serviceOrder.technician || 'No especificado'}</Text>
        </View>
      </View>

      <View style={styles.costSection}>
        <Text style={styles.costLabel}>Costo Total:</Text>
        <Text style={styles.costValue}>${(serviceOrder.cost || 0).toLocaleString('es-UY')}</Text>
      </View>

      <View style={styles.footer}>
        <Text>Gracias por confiar en {userProfile?.company_name || 'nosotros'}.</Text>
        <Text>{userProfile?.contact_phone} - {userProfile?.contact_email}</Text>
      </View>
    </Page>
  </Document>
);