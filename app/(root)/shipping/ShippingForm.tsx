'use client'

import { type ShippingAddress } from "@/types"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { shippingAddressSchema } from "@/lib/validators"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function ShippingForm({ address }: { address: ShippingAddress }) {
    const router = useRouter()

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address,
    })

    return (
        <>
            <div className="max-w-md mx-auto space-y-4">
                <h1 className="font-bold mt-4">آدرس</h1>
                <p className="text-sm text-muted bg-foreground">لطفا آدرس را وارد کنید</p>
                <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                </form>
            </div>
        </>
    )
}
