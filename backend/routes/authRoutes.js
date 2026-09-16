import express from 'express';
import { register, resendRigister,verifyRegister } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/resend-register', resendRigister);
router.post('/verify-register', verifyRegister); 
router.post('/login', login);

// to access these routes user must be logged in

authRouter.get(_'/me', requireAuth);