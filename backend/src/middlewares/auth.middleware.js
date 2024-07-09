/**
 * Middleware para verificar si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función de middleware
 */

"use strict";
import User from "../models/user.model.js";

// Middleware para verificar si el usuario está autenticado
async function isAuthenticated(req, res, next) {
  try {
    console.log("=== Debug Info ===");
    console.log("Cookies: ", req.cookies);
    console.log("Session: ", req.session);

    if (!req.session.user) {
      console.log("No estás autenticado - Session User:", req.session.user);
      return res.status(401).json({ message: "No estás autenticado" });
    }
    
    const userId = req.session.user._id;
    console.log("User ID from session: ", userId);

    const user = await User.findById(userId).exec();
    console.log("Authenticated User: ", user);
    console.log("User Status: ", user ? user.status : null);

    if (!user || user.status !== 'aceptado') {
      console.log("No tienes permisos para realizar esta acción - User Status:", user ? user.status : null);
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }
    
    next();
  } catch (error) {
    console.log("Error en auth.middleware.js -> isAuthenticated(): ", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export { isAuthenticated };

// Middleware para verificar si el usuario es administrador
async function isAdmin(req, res, next) {
  try {
    // Verifica si hay un usuario autenticado en la sesión
    if (!req.session.user) {
      return res.status(401).json({ message: 'No estás autenticado' });
    }
    
    // Obtiene el rol del usuario de la sesión
    const userRole = req.session.user.rolName;

    // Verifica si el usuario tiene el rol de administrador
    if (userRole === 'administrador') {
      // El usuario tiene el rol adecuado, continua con la siguiente función de middleware
      next();
      return;
    } else {
      // El usuario no tiene el rol adecuado, devuelve un error de acceso denegado
      return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
    }
  } catch (error) {
    console.log("Error en auth.middleware.js -> isAdmin(): ", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export { isAdmin };
