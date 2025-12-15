import express from "express";
import RegisterController from "../controllers/users/RegisterController";
import loginController from "../controllers/users/loginController";

const usersRoutes = express.Router();

usersRoutes.post("/register", RegisterController);
usersRoutes.post("/login", loginController);

export default usersRoutes;
