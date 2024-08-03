import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import EventList from './EventList';


const Home = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/events/create');
  };
  return (
    <>
      <Navbar />
      <div className="home-container"> 
        <h1>probando</h1> 
        <button onClick={handleCreateEvent} className="create-event-button">
          Crear Nuevo Evento
        </button>
        <EventList />
      </div>
    </>
  );
};

export default Home;
