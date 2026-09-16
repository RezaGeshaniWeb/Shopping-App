'use client';

import { useState, type FormEvent } from "react"
import { signIn } from "next-auth/react";
import { findMobile } from "@/lib/actions/findMobile.actions";
import { OTP } from "@/lib/actions/otp.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function OtpForm() {
    const [loginInProgress, setLoginInProgress] = useState(false)
    const [isStepTwo, setIsStepTwo] = useState(false)
    const [mobile, setMobile] = useState('')
    const [userCode, setUserCode] = useState('')
    const [error, setError] = useState(false)

    async function checkMobile(phone: string) {
        setLoginInProgress(true)

        const mobileNumber = await findMobile(phone)
    }

    return (
        <div>
            OtpForm
        </div>
    )
}
