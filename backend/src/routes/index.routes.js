"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

// Enrutador de Eventos
import eventRoutes from "./event.routes.js";
//genesis...............
import productRoutes from "./product.routes.js";
//genesis...............
import acceptPostulationRoutes from "./acceptPostulation.routes.js";//Leonardo


// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user",  userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los eventos /api/events
router.use("/events", eventRoutes);
//genesis...............
router.use("/products", productRoutes);
//genesis...............
router.use("/postulations", acceptPostulationRoutes);//Leonardo

export default router;
