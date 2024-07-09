"use strict";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export async function createProduct(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    console.log("User from session:", user); //  esta línea es para verificar el usuario si esta aceptado o no
    if (!user || user.status !== "aceptado") {
      return res.status(403).json({ message: "No tienes permiso para crear productos" });
    }

    const { price } = req.body;
    if (price <= 0) {
      return res.status(400).json({ message: "El precio no puede ser menor que 0" });
    }

    const newProduct = new Product({
      ...req.body,
      entrepreneur: user._id
    });


    await newProduct.save();
    res.status(201).json({ message: "Producto creado exitosamente", data: newProduct });
  } catch (error) {
    console.log("Error en product.controller.js -> createProduct(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getProducts(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    console.log("User from session:", user); // esta línea es para verificar el usuario
    if (!user || user.status !== "aceptado") {
      return res.status(403).json({ message: "No tienes permiso para ver listado de productos" });
    }
    const products = await Product.find().populate("entrepreneur", "username");
    res.status(200).json({ message: "Lista de productos", data: products });
  } catch (error) {
    console.log("Error en product.controller.js -> getProducts(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function updateProduct(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    console.log("User from session:", user); //esta línea es para verificar el usuario aceptado o no
    if (!user || user.status !== "aceptado") {
      return res.status(403).json({ message: "No tienes permiso para modificar productos" });
    }
    const { price } = req.body;
    if (price !== undefined && price <= 0) {
      return res.status(400).json({ message: "El precio no puede ser menor que 0" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto actualizado correctamente", data: updatedProduct });
  } catch (error) {
    console.log("Error en product.controller.js -> updateProduct(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    console.log("User from session:", user); // Añadir esta línea para verificar el usuario
    if (!user || user.status !== "aceptado") {
      return res.status(403).json({ message: "No tienes permiso para eliminar productos" });
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente", data: deletedProduct });
  } catch (error) {
    console.log("Error en product.controller.js -> deleteProduct(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
