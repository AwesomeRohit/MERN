import express from "express"
import bodyParser from "body-parser";
import {login, logout, signup} from "../controllers/auth.controllers.js";
const router = express.Router();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/signup',signup)

router.post('/login', login)

router.post('/logout', logout)

export default router;