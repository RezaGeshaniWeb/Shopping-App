'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpUser } from "@/lib/actions/user.actions"
import { useSearchParams, useRouter } from "next/navigation"
import { useActionState } from "react"

export default function SignUpForm() {
    const router = useRouter()
    const [data, action] = useActionState(signUpUser, { success: false, message: '' })

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    if(data && data.success) {
        router.push(callbackUrl)
    }

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div>
                    <Label className="mb-2" htmlFor="name">نام</Label>
                    <Input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div>
                    <Label className="mb-2" htmlFor="email">ایمیل</Label>
                    <Input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div>
                    <Label className="mb-2" htmlFor="password">رمز عبور</Label>
                    <Input id="password" name="password" type="password" required autoComplete="password" />
                </div>
                <div>
                    <Label className="mb-2" htmlFor="confirmPassword">تکرار رمز عبور</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="confirmPassword" />
                </div>
                <div>
                    <Button className="w-full" variant={"default"}>ورود</Button>
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}
            </div>
        </form>
    )
}
