import z from "zod";

export const registerSchema = z.object({
    name: z
        .string({ required_error: "O nome é obrigatório" })
        .min(2, { message: "O nome deve ter no mínimo 2 caracteres." }),
    email: z
        .string({ required_error: "O e-mail é obrigatório" })
        .email({ message: "Formato do e-mail inválido." }),
    password: z
        .string({ required_error: "A senha é obrigatório" })
        .min(6, { message: "A senha deve ter no mínimo 5 caracteres." })
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: "O e-mail é obrigatório" })
        .email({ message: "Formato de e-mail inválido." }),
    password: z
        .string({ required_error: "A senha é obrigatório" })
        .min(6, { message: "A senha deve ter no mínimo 5 caracteres." })
});

export const updateSchema = z.object({
    name: z
        .string()
        .min(2, { message: "O nome deve ter no mínimo 2 caracteres." })
        .optional(),
    email: z
        .string()
        .email({ message: "Formato do e-mail inválido." })
        .optional(),
    password: z
        .string()
        .min(6, { message: "A senha deve ter no mínimo 5 caracteres." })
        .optional(),
});