export interface ListItem {
  name: string;
  rute: string;
  icon?: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export interface Loan {
  id: number;
  customerName: string;
  amount: number;
  type: 'semanal' | 'mensual';
  status: 'activo' | 'finalizado';
}
