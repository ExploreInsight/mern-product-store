import React, { useState } from 'react'
import "../styles/UpdateProductModal.css";


const UpdateProductModal = ({show,onClose, onUpdate, product}) => {
  const [name,setName] = useState(product?.name || "");
  const [price,setPrice] = useState(product?.price || "");
  const [image,setImage] = useState(product?.image || "");

  if ( !show ) {
    return null
  }
  
  const handleUpdate = async () => {
    const updatedProduct = {...product,name,price,image};
    try {
      const result = await onUpdate(updatedProduct);
  
      // Check if result is defined before destructuring
      if (result && result.success) {
        onClose(); // Close modal only if update was successful
      } else {
        console.error("Update failed:", result?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during update:", error);
      // Optionally, you can add a toast here to show the error message to the user
    }
  }
    
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <div className="modal-header">
                <h2> Update Product </h2>

            </div>
            <div className="modal-body">

                <input type="text" 
                placeholder='Enter product name'
                value={name}
                onChange={(e)=> setName(e.target.value)}/>

                <input type="number"
                placeholder='Enter price' 
                value={price}
                onChange={(e)=> setPrice(e.target.value)} />
                <input type="text"
                placeholder='Enter image url'
                value={image}
                onChange={(e)=> setImage(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className='update-button' onClick={handleUpdate}> Update </button>
              <button className='cancel-button' onClick={onClose}> Cancel </button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProductModal