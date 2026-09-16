import z, { email } from "zod";

export const insertProductSchema = z.object({
    name: z.string(),
    slug: z.string(),
    category: z.string(),
    brand: z.string(),
    description: z.string(),
    stock: z.number(),
    image: z.string(),
    price: z.string()
})

export const signInFormSchema = z.object({
    email: z.string().email('ایمیل اشتباه است'),
    password: z.string().min(5, 'رمز عبور باید حداقل 5 کاراکتر باشد'),
})

export const signUpFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
})