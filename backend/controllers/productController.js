import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProduct = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log(message.error)
        res.status(500).json({success:false,message:"server error"})
        
    }
}

export const createProduct = async(req,res)=>{
    console.log("Received product data:", req.body);
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"please provide all the data"})
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({data:newProduct,success:true})
    }catch(e){
        console.error("Error in createing the product",e.message);
        res.status(500).json({success:false,message:"server Error"})
    }
}

export const updatedProduct = async (req, res) => {
    const { id } = req.params; // Extracting id from params, not body
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        // Use $set to update only the fields passed in the request body
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { $set: product },  // $set ensures that only the passed fields are updated
            { new: true } // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteProdduct = async (req,res)=>{
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"prodcut deleted"})
    } catch (error) {
        res.status(400).json({success:false,message:"product not found"})
    }
}