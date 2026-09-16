import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/auth"
import OtpForm from "./OtpForm"

export default async function SignInPage(props: {
    searchParams: Promise<{ callbackUrl: string }>
}) {
    const { callbackUrl } = await props.searchParams

    const session = await auth()

    if(session) return redirect(callbackUrl || '/')

    return (
        <div className="min-h-screen flex items-center justify-center h-full w-full">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center">ورود با موبایل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <OtpForm />
                </CardContent>
            </Card>
        </div>
    )
}
