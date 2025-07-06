import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

    const token = authHeader.split(" ")[1];

    try {
        const JWT_SECRET = process.env.JWT_SECRET;

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.id;

        next();

    } catch (error) {
        res.status(401).json({ erro: 'Token inválido' });
    }
};