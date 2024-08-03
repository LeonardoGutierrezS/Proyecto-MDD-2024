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
import FormEvents from './pages/ForEvents';
import EditEvent from './pages/EditEvent';
import EventList from './pages/EventList';


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
      <Route 
        path="/events/create" 
        element={
          <ProtectedRoute>
            <FormEvents />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/events/edit/:id" 
        element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/events" 
        element={
          <ProtectedRoute>
            <EventList />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Error404 />} />
    </Routes>
    </>
  );
};


export default AppRouter;
