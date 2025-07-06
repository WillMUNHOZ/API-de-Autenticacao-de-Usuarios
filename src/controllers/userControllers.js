import mongoose from "mongoose";
import { User } from "../models/User.js";
import { loginSchema, registerSchema, updateSchema } from "../schemas/userSchemas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userControllers = {
    register: async (req, res) => {
        try {
            const { name, email, password } = registerSchema.parse(req.body);

            const exists = await User.findOne({ email });

            if (exists) return res.status(400).json({ message: "Email ja cadastrado." });

            const passwordHash = await bcrypt.hash(password, 10);

            const user = new User({
                name,
                email,
                passwordHash
            });

            await user.save();

            res.status(201).json({ message: "Usuário criado com sucesso." })

        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = loginSchema.parse(req.body);

            const user = await User.findOne({ email });

            if (!user) return res.status(400).json({ erro: 'Email ou senha inválidos' });

            const validPassword = await bcrypt.compare(password, user.passwordHash);

            if (!validPassword) return res.status(400).json({ erro: 'Email ou senha inválidos' });

            const JWT_SECRET = process.env.JWT_SECRET;

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "5m" });

            res.json(token);

        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }

    },

    get: async (req, res) => {
        try {
            const id = req.userId;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido." });
            }

            const user = await User.findById(id).select("-passwordHash");

            res.status(200).json(user)

        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await User.find().select("-passwordHash");

            res.status(200).json(users)

        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.userId;
            const { name, email, password } = updateSchema.parse(req.body);

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido." });
            }

            const exists = await User.findById(id);

            if (!exists) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            if (!name && !email && !password) {
                return res.status(400).json({ message: "Envie ao menos um campo para atualizar." });
            }

            const data = {};

            if (name) data.name = name;
            if (email) data.email = email;
            if (password) {
                data.passwordHash = await bcrypt.hash(password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).select("-passwordHash");

            res.status(200).json({ message: "Usuário atualizado com sucesso.", user: updatedUser });

        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.userId;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido." });
            }

            const user = await User.findById(id).select("-passwordHash");

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            await User.findByIdAndDelete(id);

            res.status(200).json({
                message: "Usuário excluido com sucesso.",
                user: user
            });

        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },
}