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
    const [sendCode, setSendCode] = useState('')

    async function checkMobile(phone: string) {
        setLoginInProgress(true)

        const mobileNumber = await findMobile(phone)

        if (!mobileNumber) return null

        setIsStepTwo(true)

        const otpCode = await OTP(phone)

        setMobile(phone)

        if (otpCode && otpCode.data && otpCode.data.code) {
            setSendCode(otpCode.data.code)
        } else {
            setError(true)
            setLoginInProgress(false)
            return null;
        }

        setLoginInProgress(false)
    }

    async function verifyCode(code: string) {
        const verification = sendCode === code
        if (!verification) {
            setError(true)
            return null
        }

        await signIn('mobile-login', {
            mobile: mobile,
            callbackUrl: '/',
        })
    }

    async function submitHandler(event: FormEvent) {
        event.preventDefault()

        if (isStepTwo) {
            verifyCode(userCode)
        }

        if (!isStepTwo) {
            checkMobile(mobile)
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="space-y-6">
                    {isStepTwo ? (
                        <div>
                            <Label className="mb-2">کد تایید</Label>
                            <Input
                                id="vCode"
                                name="vCode"
                                type="text"
                                value={userCode}
                                disabled={loginInProgress}
                                onChange={e => setUserCode(e.target.value)}
                                required
                            />
                        </div>
                    ) : (
                        <div>
                            <Label className="mb-2">موبایل</Label>
                            <Input
                                id="mobile"
                                name="mobile"
                                type="text"
                                value={mobile}
                                disabled={loginInProgress}
                                onChange={e => setMobile(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <Button type="submit" className="w-full" variant={"default"} disabled={loginInProgress}>
                        {isStepTwo ? <span>ثبت کد</span> : <span>ورود</span>}
                    </Button>
                    {error && (
                        <div className="text-center">
                            <span>کد وارد شده اشتباه است</span>
                        </div>
                    )}
                </div>
            </form>
        </>
    )
}
