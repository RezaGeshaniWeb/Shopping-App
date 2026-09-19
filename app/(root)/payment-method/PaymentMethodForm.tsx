'use client'

import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants"
import { paymentMethodSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"

export default function PaymentMethodForm({ preferredPaymentMethod }: {
    preferredPaymentMethod: string | null
}) {
    const router = useRouter()
    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD
        }
    })

    return (
        <div>
            Form
        </div>
    )
}
