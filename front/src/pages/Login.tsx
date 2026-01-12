import type React from 'react';
import { Button, Form, FormControl, Container } from 'react-bootstrap';

const Login: React.FC = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center vh-100'>
      <Form className='d-flex flex-column p-4 gap-3 shadow rounded' style={{ width: '320px' }}>
        <h2 className='text-center'>Entrar</h2>
        <FormControl type='text' placeholder='Usuario' />
        <FormControl type='password' placeholder='Contraseña' />
        <Button variant='success'>Entrar</Button>
      </Form>
    </Container>
  );
};

export default Login;
