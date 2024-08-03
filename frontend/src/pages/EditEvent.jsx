import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, updateEvent } from '../services/events.service';
import Navbar from '../components/Navbar';
import Form from '../components/Form';

const EditEvent = () => {
  const { id } = useParams();  // Obtiene el id de los parámetros de la URL
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log(" iiiid:", id);  // Log para verificar el id
        const response = await getEvent(id);  // Usa el id obtenido de los parámetros
        console.log("aber:", response.data);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (data) => {
    try {
      console.log("id otea vez:", id);  // Log para verificar el id al actualizar
      console.log("aber 2.0:", data); 
      await updateEvent(id, data);  // Usa el id obtenido de los parámetros
      setSuccessMessage("Evento actualizado exitosamente");
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/events');
      }, 3000);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="form-wrapper">
          <h1>Modificar Evento</h1>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <Form
            title="Modificar Evento"
            fields={[
              {
                label: "Nombre del Evento",
                name: "name",
                type: "text",
                value: event.name,
                onChange: handleChange,
                required: true
              },
              {
                label: "Descripción",
                name: "description",
                type: "text",
                value: event.description,
                onChange: handleChange,
                required: true
              },
              {
                label: "Fecha de Inicio",
                name: "startDate",
                type: "date",
                value: event.startDate ? event.startDate.split('T')[0] : '',
                onChange: handleChange,
                required: true
              },
              {
                label: "Fecha de Finalización",
                name: "endDate",
                type: "date",
                value: event.endDate ? event.endDate.split('T')[0] : '',
                onChange: handleChange,
                required: true
              }
            ]}
            buttonText="Actualizar Evento"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default EditEvent;
