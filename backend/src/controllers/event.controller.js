"use strict";
import Event from "../models/event.model.js";
//Para cambiar el status del evento, compara con la fecha actual y actualiza el status
const updateEventStatus = (event) => {
    const now = new Date();
    if (now < event.startDate) {
      event.status = 'pending';
    } else if (now >= event.startDate && now <= event.endDate) {
      event.status = 'in-progress';
    } else if (now > event.endDate) {
      event.status = 'completed';
    }
    return event;
  };
  
// Se crea un nuevo evento
export const createEvent = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();


    // Verificar que la fecha de inicio no sea mayor que la fecha de termino
    if (start > end) {
      return res.status(400).json({ message: "La fecha de inicio no puede ser mayor que la fecha de término" });
    }
    console.log(start < now);
    if(start < now){ // valida que la fecha de inicio sea mayor a la fecha actual
      console.log("entro al if");
      return res.status(400).json({ message: "La fecha de inicio no puede ser menor a la fecha actual" });    
    }

    const newEvent = new Event({
      name,
      description,
      startDate: start,
      endDate: end,
    });
    await newEvent.save();
    res.status(201).json({ message: "Evento creado exitosamente", data: newEvent });
  } catch (error) {
    console.error("Error en event.controller.js -> createEvent(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Listar todos los eventos
export const listEvents = async (req, res) => {
  try {
    const events = await Event.find();
    const updatedEvents = events.map(event => updateEventStatus(event));
    await Promise.all(updatedEvents.map(event => event.save())); //giarda los eventos actualizados, en caso de qque haya alguna modificacion previa
    res.status(200).json({ data: updatedEvents });
  } catch (error) {
    console.error("Error en event.controller.js -> listEvents(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Modificar un evento
export const updateEvent = async (req, res) => {
 
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    const now = new Date(); // ..................
    const newEndDate = new Date(req.body.endDate);  // Convierte la fecha de termino a un objeto Date

    if (event.status === "in-progress" && event.endDate < now) { // nueva validacion
      return res.status(400).json({ message: "No se puede modificar un evento en curso" });
    }
    console.log( now < newEndDate );
    if(now < newEndDate){ // valido que la nueva fecha de termino sea mayor a la actual para que pueda entrar a modificar
      console.log("entro al if");
      Object.assign(event, req.body);
      await event.save();
      res.status(200).json({ message: "Evento actualizado exitosamente", data: event });
    }else {
      res.status(400).json({ message: "La nueva fecha de termino debe ser mayor a la fecha actual" });
    }
  } catch (error) {
    console.error("Error en event.controller.js -> updateEvent(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }

};

// Eliminar un evento
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    if (event.status === "in-progress") {
      return res.status(400).json({ message: "No se puede eliminar un evento en curso" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Evento eliminado exitosamente" });
  } catch (error) {
    console.error("Error en event.controller.js -> deleteEvent(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
