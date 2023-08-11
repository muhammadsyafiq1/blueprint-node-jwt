import express  from "express"
import { getProduct, saveProduct } from "../controllers/ProductController.js"
const router = express.Router()

router.get('/products', getProduct);
router.post('/product', saveProduct)

export default router