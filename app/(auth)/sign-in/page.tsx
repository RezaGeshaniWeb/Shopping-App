import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignInForm from "./SignInForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage(props: { searchParams: Promise<{ callbackUrl: string }> }) {
    const { callbackUrl } = await props.searchParams
    
    const session = await auth()

    if (session) {
        return redirect(callbackUrl || '/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full h-full">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    <Link href={'/'}>بازگشت به فروشگاه</Link>
                    <CardTitle className="text-center">ورود</CardTitle>
                    <CardDescription className="text-center">ورود به حساب کاربری</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignInForm />
                </CardContent>
            </Card>
        </div>
    )
}
