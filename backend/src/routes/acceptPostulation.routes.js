"use strict";
import { Router } from "express";
import { getPendingUsers, acceptUser, deleteUser } from "../controllers/acceptPostulation.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

// Ruta para obtener usuarios pendientes
router.get("/",isAdmin, getPendingUsers);

// Ruta para aceptar usuarios pendientes
router.patch("/", isAdmin, acceptUser);

// Ruta para eliminar usuarios pendientes o aceptados
router.delete("/", isAdmin, deleteUser);

export default router;