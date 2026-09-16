'use server'

import { signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcryptjs";
import { prisma } from "../prisma";

export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        await signIn('credentials', user)

        return { success: true, message: 'ورود با موفقیت انجام شد' };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return { success: false, message: 'ایمیل یا رمز عبور اشتباه است' };
    }
}

export async function signOutUser() {
    await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            mobile: formData.get('mobile'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        })

        const plainPassword = user.password
        user.password = hashSync(user.password, 10)
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                password: user.password,
            }
        })

        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
        })

        return { success: true, message: 'ثبت نام با موفقیت انجام شد' }
    } catch (error) {
        if (isRedirectError(error)) throw error

        return { success: false, message: 'ثبت نام انجام نشد' }
    }
}