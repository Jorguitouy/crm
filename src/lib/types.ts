export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
}

export interface ServiceOrder {
  id: string;
  description: string;
  service_date: string;
  status: string;
  customers: Customer[] | null;
}