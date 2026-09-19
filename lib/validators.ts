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