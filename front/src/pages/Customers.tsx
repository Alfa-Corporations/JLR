import type React from 'react';
import { useState } from 'react';
import { Container, Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Customer } from '../interface/interfaces';

const Customers: React.FC = () => {
  const navigate = useNavigate();

  /* =======================
     STATE
  ======================= */
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const stored = localStorage.getItem('customers');
    return stored ? JSON.parse(stored) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  /* =======================
     HELPERS
  ======================= */
  const saveCustomers = (data: Customer[]) => {
    setCustomers(data);
    localStorage.setItem('customers', JSON.stringify(data));
  };

  /* =======================
     ADD CUSTOMER
  ======================= */
  const handleAddCustomer = () => {
    if (!name || !phone || !address) return;

    const newCustomer: Customer = {
      id: Date.now(),
      name,
      phone,
      address
    };

    saveCustomers([...customers, newCustomer]);

    setName('');
    setPhone('');
    setAddress('');
    setShowModal(false);
  };

  /* =======================
     DELETE CUSTOMER
  ======================= */
  const openDeleteModal = (customer: Customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDeleteCustomer = () => {
    if (!customerToDelete) return;

    const updatedCustomers = customers.filter(c => c.id !== customerToDelete.id);

    saveCustomers(updatedCustomers);
    setCustomerToDelete(null);
    setShowDeleteModal(false);
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <Container className='d-flex flex-column p-3 gap-4'>
      {/* HEADER */}
      <div className='d-flex gap-4 align-items-center'>
        <button className='btn shadow' style={{ width: '3.5rem', height: '2.5rem' }} onClick={() => navigate(-1)}>
          <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#1f1f1f'>
            <path d='m382-480 294 294q15 15 14.5 35T675-116q-15 15-35 15t-35-15L297-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T676-844q15 15 15 35t-15 35L382-480Z' />
          </svg>
        </button>
        <h3>Lista de Clientes</h3>
      </div>

      {/* LISTA */}
      <ul className='list-group gap-2'>
        {customers.length === 0 && <li className='list-group-item text-muted'>No hay clientes registrados</li>}

        {customers.map(customer => (
          <li key={customer.id} className='list-group-item shadow'>
            <strong>{customer.name}</strong>
            <br />
            <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#48752C'>
              <path d='M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z' />
            </svg>{' '}
            {customer.phone}
            <br />
            <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#8B1A10'>
              <path d='M480-301q99-80 149.5-154T680-594q0-90-56-148t-144-58q-88 0-144 58t-56 148q0 65 50.5 139T480-301Zm0 82q-12 0-24-4t-22-12q-118-94-176-183.5T200-594q0-125 78-205.5T480-880q124 0 202 80.5T760-594q0 86-58 175.5T526-235q-10 8-22 12t-24 4Zm0-301q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520ZM240-80q-17 0-28.5-11.5T200-120q0-17 11.5-28.5T240-160h480q17 0 28.5 11.5T760-120q0 17-11.5 28.5T720-80H240Zm240-520Z' />
            </svg>{' '}
            {customer.address}
            <div className='d-flex justify-content-end mt-2'>
              <button className='btn btn-sm btn-outline-danger' onClick={() => openDeleteModal(customer)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#228822'
        }}
        className='btn shadow p-0 d-flex align-items-center justify-content-center'
      >
        <svg xmlns='http://www.w3.org/2000/svg' height='40px' viewBox='0 -960 960 960' width='40px' fill='#ffffff'>
          <path d='M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z' />
        </svg>
      </button>

      {/* MODAL NUEVO CLIENTE */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Cliente</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control value={phone} onChange={e => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Dirección</Form.Label>
              <Form.Control value={address} onChange={e => setAddress(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={handleAddCustomer}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ELIMINAR */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            ¿Estás seguro que deseas eliminar a:
            <br />
            <strong>{customerToDelete?.name}</strong>?
          </p>
          <p className='text-danger mb-0'>Esta acción no se puede deshacer.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant='danger' onClick={confirmDeleteCustomer}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Customers;
