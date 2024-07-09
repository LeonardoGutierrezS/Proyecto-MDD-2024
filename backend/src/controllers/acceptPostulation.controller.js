"use strict";
import User from "../models/user.model.js";

// Obtener usuarios con estado pendiente
export const getPendingUsers = async (req, res) => {
    try {
      const pendingUsers = await User.find({ status: 'pendiente' }, 'username rut');
      if (pendingUsers.length === 0) {
        return res.status(404).json({ message: "No hay usuarios pendientes" });
      }
      res.status(200).json({ data: pendingUsers });
    } catch (error) {
      console.error("Error en acceptPostulation.controller.js -> getPendingUsers(): ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };


// Modificar estado del usuario a aceptado
export const acceptUser = async (req, res) => {
    try {
      const { rut } = req.body;
      const user = await User.findOne({ rut, status: 'pendiente' });
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado o no está pendiente" });
      }
  
      user.status = 'aceptado';
      await user.save();
      res.status(200).json({ message: "Usuario aceptado exitosamente", data: user });
    } catch (error) {
      console.error("Error en acceptPostulation.controller.js -> acceptUser(): ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  // Eliminar usuario pendiente o aceptado
  export const deleteUser = async (req, res) => {
    try {
      const { rut } = req.body;
      const user = await User.findOneAndDelete({ rut, status: { $in: ['pendiente', 'aceptado'] } });
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error("Error en acceptPostulation.controller.js -> deleteUser(): ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };