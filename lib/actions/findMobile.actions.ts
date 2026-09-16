'use server'

import { prisma } from "../prisma"

export async function findMobile(mobile: string) {
    const user = await prisma.user.findUnique({
        where: { mobile }
    })

    if(user) {
        return true
    }
    return null
}