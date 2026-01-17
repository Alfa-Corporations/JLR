import type React from 'react';
import { useState } from 'react';
import { Container, Form, Modal, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import type { Loan, Customer } from '../interface/interfaces';
import { useNavigate } from 'react-router-dom';

const Loans: React.FC = () => {
  /* =======================
     STATE
  ======================= */
  const [loans, setLoans] = useState<Loan[]>(() => {
    const stored = localStorage.getItem('loans');
    return stored ? JSON.parse(stored) : [];
  });

  const [customers] = useState<Customer[]>(() => {
    const stored = localStorage.getItem('customers');
    return stored ? JSON.parse(stored) : [];
  });

  const [activeTab, setActiveTab] = useState<'activo' | 'finalizado'>('activo');
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [amount, setAmount] = useState('');
  const [loanType, setLoanType] = useState<'semanal' | 'mensual'>('semanal');

  const navigate = useNavigate();
  /* =======================
     HELPERS
  ======================= */
  const saveLoans = (data: Loan[]) => {
    setLoans(data);
    localStorage.setItem('loans', JSON.stringify(data));
  };

  /* =======================
     ADD LOAN
  ======================= */
  const handleAddLoan = () => {
    if (!customerId || !amount) return;

    const selectedCustomer = customers.find(c => c.id === customerId);
    if (!selectedCustomer) return;

    const newLoan: Loan = {
      id: Date.now(),
      customerName: selectedCustomer.name,
      amount: Number(amount),
      type: loanType,
      status: 'activo'
    };

    saveLoans([...loans, newLoan]);

    setCustomerId('');
    setAmount('');
    setLoanType('semanal');
    setShowModal(false);
  };

  /* =======================
     FILTER
  ======================= */
  const filteredLoans = loans.filter(loan => loan.status === activeTab && loan.customerName.toLowerCase().includes(search.toLowerCase()));

  /* =======================
     RENDER
  ======================= */
  return (
    <Container className='p-3'>
      <div className='d-flex gap-4 mb-4 align-items-center'>
        <button className='btn shadow' style={{ width: '3.5rem', height: '2.5rem' }} onClick={() => navigate(-1)}>
          <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#1f1f1f'>
            <path d='m382-480 294 294q15 15 14.5 35T675-116q-15 15-35 15t-35-15L297-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T676-844q15 15 15 35t-15 35L382-480Z' />
          </svg>
        </button>
        <h3>Préstamos</h3>
      </div>

      {/* BUSCADOR */}
      <Form.Control className='mb-3' placeholder='Buscar por nombre...' value={search} onChange={e => setSearch(e.target.value)} />

      {/* TABS */}
      <div className='mb-3 tab'>
        <button className={`btn ${activeTab === 'activo' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setActiveTab('activo')}>
          Activos
        </button>

        <button className={`btn ${activeTab === 'finalizado' ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={() => setActiveTab('finalizado')}>
          Finalizados
        </button>
      </div>

      {/* LISTA ANIMADA */}
      <AnimatePresence mode='wait'>
        <motion.ul key={activeTab} className='list-group' initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
          {filteredLoans.length === 0 && <li className='list-group-item text-muted'>No hay préstamos</li>}

          {filteredLoans.map(loan => (
            <li key={loan.id} className='list-group-item shadow-sm'>
              <strong>{loan.customerName}</strong>
              <br />
              <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#157347'>
                <path d='M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z' />
              </svg>{' '}
              ${loan.amount.toFixed(2)}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {/* BOTÓN FLOTANTE */}
      {activeTab === 'activo' && (
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#157347'
          }}
          className='btn shadow d-flex align-items-center justify-content-center p-0'
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>
        </button>
      )}

      {/* MODAL NUEVO PRÉSTAMO */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Préstamo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Cliente</Form.Label>
              <Form.Select value={customerId} onChange={e => setCustomerId(e.target.value ? Number(e.target.value) : '')}>
                <option value=''>Selecciona un cliente</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Monto</Form.Label>
              <Form.Control type='number' value={amount} onChange={e => setAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Tipo de Préstamo</Form.Label>
              <Form.Select value={loanType} onChange={e => setLoanType(e.target.value as 'semanal' | 'mensual')}>
                <option value='semanal'>Semanal</option>
                <option value='mensual'>Mensual</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={handleAddLoan}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Loans;
