import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignInForm from "./SignInForm";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    <Link href={'/'}>بازگشت به فروشگاه</Link>
                    <CardTitle className="text-center">ورود</CardTitle>
                    <CardDescription>ورود به حساب کاربری</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignInForm />
                </CardContent>
            </Card>
        </div>
    )
}
