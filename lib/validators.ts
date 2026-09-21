import z from "zod";
import { PAYMENT_METHODS } from "./constants";

export const insertProductSchema = z.object({
    name: z.string(),
    slug: z.string(),
    category: z.string(),
    brand: z.string(),
    description: z.string(),
    stock: z.number(),
    image: z.string(),
    price: z.number()
})

export const signInFormSchema = z.object({
    email: z.string().email('ایمیل اشتباه است'),
    password: z.string().min(5, 'رمز عبور باید حداقل 5 کاراکتر باشد'),
})

export const signUpFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    mobile: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
})

export const cartItemSchema = z.object({
    productId: z.string(),
    name: z.string(),
    slug: z.string(),
    qty: z.number().int(),
    image: z.string(),
    price: z.number(),
})

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: z.string(),
    totalPrice: z.string(),
    shippingPrice: z.string(),
    sessionCartId: z.string(),
    userId: z.string().optional().nullable(),
})

export const shippingAddressSchema = z.object({
    fullName: z.string(),
    city: z.string(),
    streetAddress: z.string(),
    postalCode: z.string(),
})

export const paymentMethodSchema = z.object({ type: z.string() }).refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
})

export const insertOrderSchema = z.object({
    userId: z.string(),
    itemsPrice: z.string(),
    shippingPrice: z.string(),
    totalPrice: z.string(),
    paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
        message: 'invalid payment method'
    }),
    shippingAddress: shippingAddressSchema,
})

export const insertOrderItemSchema = z.object({
    productId: z.string(),
    slug: z.string(),
    image: z.string(),
    name: z.string(),
    price: z.number(),
    qty: z.number(),
})
