import React, { useState } from "react";
import { useProductStore } from "../store/Product";
import { toast } from 'react-toastify';
import "../styles/Product.css"

function Product({isDarkMode}) {
  const [val, setVal] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  function handleChange(e) {
    const { name, value } = e.target;
    setVal((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const { success, message } = await createProduct(val); 
    console.log("Submitted Product:", val);
    console.log("Success:", success);
    console.log("Message:", message);

    //notification setup
    if(success){
      toast.success("Product is Added, Congratulations : " + message ,
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    }
    else{
    toast.error("Failed to Add Product:" + message,{
      position: "bottom-left",                       // Changes position
      autoClose: 5000,                               // Displays for 5 seconds
      hideProgressBar: false,                        // Shows progress bar
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    }

    // Resetting the value
    setVal({
      name: "",
      price: "",
      image: "",
    });
  }

  return (
    <>
      <div className={`container ${isDarkMode ? 'dark' : ""}`}>
        <form onSubmit={handleSubmit}>
          <label> Product Items </label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={val.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={val.price}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={val.image}
            onChange={handleChange}
          />
          <br />
          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  );
}

export default Product;
