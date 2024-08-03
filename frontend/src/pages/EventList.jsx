import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEvents, deleteEvent } from '../services/events.service';
import TableEvents from '../components/Table';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const columns = ['Nombre', 'Descripción', 'Fecha de Inicio', 'Fecha de Finalización', 'Estado', 'Acción'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        const formattedData = response.data.map(event => ({
          Nombre: event.name,
          Descripción: event.description,
          'Fecha de Inicio': new Date(event.startDate).toLocaleString(),
          'Fecha de Finalización': new Date(event.endDate).toLocaleString(),
          Estado: event.status,
          Id: event._id // Asegúrate de incluir el id para poder editar/eliminar
        }));
        setEvents(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id) => {
    console.log("bamos biendo:", id); 
    navigate(`/events/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este evento?");
    if (confirmed) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event.Id !== id));
        alert("Evento eliminado exitosamente");
      } catch (error) {
        console.error("Error eliminando evento:", error);
      }
    }
  };

  return (
    <div className="event-list">
      <h2>Lista de Eventos</h2>
      <TableEvents
        columns={columns} 
        data={events} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </div>
  );
};

export default EventList;
