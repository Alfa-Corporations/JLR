import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Loans from './pages/Loans';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/customer' element={<Customers />} />
        <Route path='/loans' element={<Loans />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
