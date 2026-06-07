import { Router } from "express";

const router = Router()
import { register, login } from '../controllers/auth.controller.js'
import { validate } from '../utils/validate.js'
import authValidator from '../validator/auth.validator.js'

router.post('/register', authValidator.registerValidator, validate, register)
router.post('/login', authValidator.loginValidator, validate, login)

export default router;

