import type React from 'react';
import type { ListItem } from '../interface/interfaces';
import { Container } from 'react-bootstrap';



const list: Array<ListItem> = [
  { name: 'Clientes', rute: '/customer' },
  { name: 'Prestamos', rute: '/loans' },
  { name: 'Pagos', rute: '/payments' }
];

const Home: React.FC = () => {
  return (
    <Container>
      <ul className='list-home'>
        {list.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </Container>
  );
};
export default Home;
