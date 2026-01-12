import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Home from './pages/Home'


function App() {
  
  return (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </HashRouter>
  )
}

export default App
