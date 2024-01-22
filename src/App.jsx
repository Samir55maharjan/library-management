import { Routes } from 'react-router-dom'
import './App.css'
import { Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import AdminSignup from './pages/auth/AdminSignup'
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/dashboard/Dashboard'
import Books from './pages/books/Books'
import AddBook from './pages/books/AddBook'
import EditBook from './pages/books/EditBook'
import History from './pages/history/History'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-signup' element={<AdminSignup />}></Route>
        <Route path='/reset-password' element={<ResetPassword />}></Route>

        <Route path='/dashboard' element={<Dashboard />}></Route>

        <Route path='/books' element={<Books />}></Route>
        <Route path='/books/add' element={<AddBook />}></Route>
        <Route path='/books/edit' element={<EditBook />}></Route>

        <Route path='/history' element={<History />}></Route>
      </Routes>
    </>
  )
}

export default App
