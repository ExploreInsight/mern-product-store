import React, { useState } from 'react';
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../store/Product';
import { toast } from 'react-toastify';
import UpdateProductModal from './UpdateProductModal';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toast.error("Failed to Delete Product: " + (message || "Error Detected!"), {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success("Product Deleted Successfully: " + (message || "Successfully deleted"), {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleUpdate = async (updatedProduct) => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (success) {
      toast.success("Product Updated Successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsModalOpen(false); // Close the modal
    } else {
      toast.error(`Failed to Update Product: ${message || "Error detected!"}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <article className={isModalOpen ? 'no-hover' : ''} >
      <img src={product.image || "/path/to/placeholder.jpg"} alt={product.name} height={100} width={100} />
      <div>
        <h3>{product.name}</h3>
        <p>{product.price ? `$${product.price}` : "Price not available"}</p>
        <div className="buttons">
          <button onClick={() => setIsModalOpen(true)} aria-label="Edit Product"><IoCreate /></button>
          <button onClick={() => handleDelete(product._id)} aria-label="Delete Product"><MdDelete /></button>
        </div>
      </div>

      {/* Update Product Modal */}
      <UpdateProductModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate} // Pass handleUpdate to the modal
        product={product}
      />
    </article>
  );
};

export default ProductCard;
