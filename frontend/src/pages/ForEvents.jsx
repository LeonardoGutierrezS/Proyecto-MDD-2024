import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/events.service";

const ForEvents = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEvent(event);
      console.log(response.data);
      setEvent({
        name: "",
        description: "",
        startDate: "",
        endDate: ""
      });
      setSuccessMessage("Evento creado exitosamente");

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Registro de evento</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Nombre del Evento:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={event.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <input
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Fecha de Inicio:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={event.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Fecha de Finalización:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={event.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Crear Evento</button>
        </form>
        <button onClick={goToHome}>Volver a Inicio</button>
      </div>
    </div>
  );
};

export default ForEvents;
