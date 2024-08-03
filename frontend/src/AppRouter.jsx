import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import EditUser from './pages/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import ListProducts from './pages/ListProducts';
import Navbar from './components/Navbar';
import Formproducts from './pages/Formproducts';
import Prueba from './pages/Prueba';

const AppRouter = () => {
  return (
    <>
    <Navbar />
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/accept" 
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <AcceptUsers />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute >
            <ListProducts />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/createproducts" 
        element={
          <ProtectedRoute allowedRoles={['usuario']}>
            <Formproducts />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/prueba"
        element={
          <ProtectedRoute>
            <Prueba/>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-user/:rut" 
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Error404 />} />
    </Routes>
    </>
  );
};


export default AppRouter;
