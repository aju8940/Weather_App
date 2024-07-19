import express from "express";
import {signIn} from '../controllers/authControllers.js'
import {signUp} from '../controllers/authControllers.js'



const router = express.Router();

router.route("/sign-in").post(signIn);

router.route("/sign-up").post(signUp);

export default router;
