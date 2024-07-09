// modulo genesis.............
"use strict";
import { Router } from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", isAuthenticated, createProduct);
router.get("/", getProducts);
router.put("/:id", isAuthenticated, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

export default router;
