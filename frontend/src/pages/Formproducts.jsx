import  { useState } from "react";
import { createProduct } from "../services/products.service";

const Formproducts = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: ""
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
        ...product,
        [name]: value
    });

};

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createProduct(product);
            console.log(response.data);
            setProduct({
            name: "",
            description: "",
            price: ""
            });
            setSuccessMessage("Producto creado exitosamente");
            setTimeout(() => {
            setSuccessMessage("");
            }, 3000); // Oculta el mensaje después de 3 segundos, pueden modificarlo si lo desean
        } catch (error) {
            console.error("Error:", error);
        }
    };

return (
    <div className="form-container">
        <div className="form-wrapper">
        <h1>Registro de producto</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <input
                type="text"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit">Crear Producto</button>
        </form>
        </div>
    </div>
    );
};

export default Formproducts;
