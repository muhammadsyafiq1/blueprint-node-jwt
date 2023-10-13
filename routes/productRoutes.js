import express  from "express"
import { deleteProduct, getProduct, saveProduct } from "../controllers/ProductController.js"
const router = express.Router()

router.get('/products', getProduct);
router.post('/product', saveProduct)
router.delete('/product/:id', deleteProduct)

export default router