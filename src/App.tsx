import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login.tsx'
import Carteira from './pages/Carteira'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/carteira' element={<Carteira />} />
    </Routes>
  )
}

export default App
