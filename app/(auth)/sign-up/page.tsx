import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/auth"
import SignUpForm from "./SignUpForm"

export default async function SignUpPage(props: { searchParams: Promise<{ callback: string }> }) {
    const { callbackUrl } = await props.searchParams

    const session = await auth()

    if (session) {
        return redirect(callbackUrl || '/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full h-full">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center">ثبت نام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
    )
}
