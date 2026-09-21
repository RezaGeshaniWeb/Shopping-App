'use client'

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { updateUserPaymentMethod } from "@/lib/actions/user.actions"
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants"
import { paymentMethodSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
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

    async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
        const response = await updateUserPaymentMethod(values)
        if (!response.success) {
            return
        }
        router.push('/place-order')
    }

    return (
        <div>
            <div className="max-w-md mx-auto space-4">
                <h1 className="bold mt-4">روش پرداخت</h1>
                <p className="text-sm text-muted-foreground">لطفا یک روش را انتخاب کنید</p>
                <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-5">
                        <Controller
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <Field className="space-y-3">
                                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col space-y-2">
                                        {PAYMENT_METHODS.map((paymentMethod) => (
                                            <Field key={paymentMethod} orientation="horizontal" className="flex items-center space-x-3 space-y-0">
                                                <RadioGroupItem value={paymentMethod} checked={field.value === paymentMethod} id={paymentMethod} />
                                                <FieldLabel htmlFor={paymentMethod} className="font-normal">{paymentMethod}</FieldLabel>
                                            </Field>
                                        ))}
                                    </RadioGroup>
                                </Field>
                            )}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit">ادامه</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
