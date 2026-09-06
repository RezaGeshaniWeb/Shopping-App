'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function notFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h2 className="text-2xl">
                صفحه مورد نظر پیدا نشد
            </h2>
            <Button variant={"outline"} className="mt-6" asChild>
                <Link href='/'>بازگشت به فروشگاه</Link>
            </Button>
        </div>
    )
}
