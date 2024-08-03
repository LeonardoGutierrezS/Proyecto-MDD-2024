import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TableAccept from '../components/TableAccept';
import { getPostulations, acceptPostulation, rejectPostulation } from '../services/accept.service';
import Toast from '../components/Toast'; // Importar el componente Toast
import searchIcon from '../assets/searchIcon.svg';

const AcceptUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', show: false });

  const columns = ['Nombre', 'Rut', 'Correo', 'Estado', 'Acción'];

  const dataUser = async () => {
    try {
      const response = await getPostulations();
      const formattedData = response.data.map(user => ({
        id: user._id,
        Nombre: user.username,
        Rut: user.rut,
        Correo: user.email,
        Estado: user.status
      }));
      setUsers(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  
  const handleAccept = async (id) => {
    try {
      await acceptPostulation(id);
      setToast({ message: 'Usuario aceptado exitosamente', type: 'toast-success', show: true });
      setTimeout(() => setToast({ ...toast, show: false }), 3000); // Mensaje desaparece después de 3 segundos
      dataUser(); // Actualiza la lista de usuarios después de aceptar
    } catch (error) {
      console.error("Error al aceptar usuario:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectPostulation(id);
      setToast({ message: `El usuario ${id} ha sido eliminado`, type: 'toast-error', show: true });
      setTimeout(() => setToast({ ...toast, show: false }), 3000); // Mensaje desaparece después de 3 segundos
      dataUser(); // Actualiza la lista de usuarios después de rechazar
    } catch (error) {
      console.error("Error al rechazar usuario:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dataUser();
  }, []);

  const filteredUsers = users.filter(user =>
    user.Rut.includes(searchTerm)
  );

  return (
    <>
      <Navbar />
      <div className='main-container'>
        <div className='table-container'>
          <div className='search-container'>
            <div className='search-input-wrapper'>
              <img src={searchIcon} alt="Buscar" className='search-icon' />
              <input
                type="text"
                placeholder="Buscar usuario por rut"
                value={searchTerm}
                onChange={handleSearch}
                className='search-input'
              />
            </div>
          </div>
          <TableAccept 
            columns={columns} 
            data={filteredUsers} 
            onAccept={(id) => handleAccept(id)} 
            onReject={(id) => handleReject(id)} 
          />
          {toast.show && (
            <Toast message={toast.message} type={toast.type} />
          )}
        </div>
      </div>
    </>
  );
};

export default AcceptUsers;