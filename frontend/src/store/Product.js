import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  
  createProduct: async (newProduct) => {
    
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return { success: false, message: "Please fill all the fields." };
    }
    const res = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        return { success: false, message: errorData.message || "Something went wrong." };
    }

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully!" };
},
  fetchProducts: async () =>{
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products : data.data});
  },
  deleteProduct: async (productId) =>{
    const res = await fetch(`/api/products/${productId}`,{
        method:"DELETE",
    });
    const data = await res.json();
    if(!data.success) return {success:false,message:data.message};

    //updating the ui immediately// qucikly
    set((state)=> ({products:state.products.filter((product )=> product._id !== productId)}));
    return { success:true , message : data.message}
  },
  updateProduct: async ( productId , updatedProduct ) => {
    try {
      const res = await fetch(`/api/products/${productId}`,{
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
      const data = await res.json();
      if(!data.success) return {success:false,message:data.message || "Updated Failed ?"};

      // immediate update 
      set(state => ({
        products: state.products.map(product => product._id === productId ? data.data : product)
      }))
      return { success: true , message : "Product Updated Successfully !"};
    } catch (error) {
      console.log("Update error:", error);
      return {success:false, message:"Error while updating produt."}; 
    }
  }
}));
