import express from "express"
import { Login, Logout, Register, getUser } from "../controllers/auth.js"
import { refreshToken } from "../controllers/RefreshToken.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.post('/login' , Login)
router.get('/users',verifyToken, getUser)
router.post('/register', Register)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

export default router
