import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/products.service";
import Table from "../components/Table";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  const columns = ['Nombre', 'Descripción', 'Precio', 'Acción'];

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      // Aquí asumimos que response.data es el array de productos
      const data = response.map(product => ({
        Nombre: product.name,
        Descripción: product.description,
        Precio: product.price,
        Id: product.id, // Asegúrate de incluir el ID si es necesario para eliminar o editar
      }));
      setProducts(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.Id !== id));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = () => {
    // Implementa la lógica para editar un producto
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <div className='main-container'>
      <div className='table-container'>
        <Table columns={columns} data={products} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default ListProducts;
