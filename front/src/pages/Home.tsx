import type React from 'react';
import type { ListItem } from '../interface/interfaces';
import { Container } from 'react-bootstrap';

import IconUsers from '../assets/users.svg';
import IconLoans from '../assets/balance.svg'; // Asumiendo para 'Prestamos'
import IconPayments from '../assets/pay.svg'; // Asumiendo para 'Pagos'
import IconResume from '../assets/resume.svg'; // Asumiendo para 'Resumen'
import IconInvoices from '../assets/invoices.svg'; // Asumiendo para 'Resumen'
import { useNavigate } from 'react-router-dom';

const list: Array<ListItem> = [
  {
    name: 'Clientes',
    rute: '/customer',
    icon: IconUsers
  },
  {
    name: 'Prestamos',
    rute: '/loans',
    icon: IconLoans
  },
  {
    name: 'Pagos',
    rute: '/payments',
    icon: IconPayments
  },
  {
    name: 'Resumen',
    rute: '/resume',
    icon: IconResume
  },
  {
    name: 'Facturas',
    rute: '/invoices',
    icon: IconInvoices
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ul className='list-home'>
        {list.map((item, index) => (
          <li key={index} className='shadow' onClick={() => navigate(item.rute)}>
            <span>{item.name}</span>
            <img src={item.icon} alt='' />
          </li>
        ))}
      </ul>
    </Container>
  );
};
export default Home;
