import express from "express";
import { createProduct, deleteProdduct, getProduct, updatedProduct } from "../controllers/productController.js";
const router = express.Router();

//api routes
router.get("/",getProduct);
router.post("/",createProduct );
router.put("/:id", updatedProduct);
router.delete("/:id",deleteProdduct );

export default router;