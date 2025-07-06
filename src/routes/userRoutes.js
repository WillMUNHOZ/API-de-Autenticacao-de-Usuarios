import express from "express";
import { userControllers } from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/auth.js";

export const router = express.Router();

router.get("/", (req, res) => {
    res.send("🚀 Servidor inicializado!")
});

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);

router.get("/users", authMiddleware, userControllers.getAll);

router.route("/users/auth")
    .get(authMiddleware, userControllers.get)
    .put(authMiddleware, userControllers.update)
    .delete(authMiddleware, userControllers.delete)