'use client'

import { type ShippingAddress } from "@/types"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { shippingAddressSchema } from "@/lib/validators"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

type ShippingFormValues = z.infer<typeof shippingAddressSchema>

export default function ShippingForm({ address }: { address: ShippingAddress }) {
    const router = useRouter()

    const form = useForm<ShippingFormValues>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: {
            fullName: address?.fullName || '',
            city: address?.city || '',
            streetAddress: address?.streetAddress || '',
            postalCode: address?.postalCode || '',
            country: address?.country || '',
        },
    })

    function onSubmit(_data: ShippingFormValues) {

    }

    return (
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="font-bold mt-4">آدرس</h1>
            <p className="text-sm text-muted-foreground">لطفا آدرس را وارد کنید</p>
            <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="fullName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>نام</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="نام خود را وارد کنید"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="streetAddress"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>آدرس</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="آدرس خود را وارد کنید"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>شهر</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="شهر خود را وارد کنید"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="postalCode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>کد پستی</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="کد پستی خود را وارد کنید"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="country"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>کشور</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="کشور خود را وارد کنید"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                <div className="flex gap-2">
                    <Button type="submit">
                        ادامه <ArrowLeft className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
