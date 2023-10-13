import express  from "express"
import { categoryById, createCategory, deleteCategory, getCategory } from "../controllers/CategoryController.js"
const router = express.Router()

router.get('/all-categories', getCategory);
router.post('/create-category', createCategory);
router.delete('/category/:id', deleteCategory);
router.get('/category/:id', categoryById);

export default router
