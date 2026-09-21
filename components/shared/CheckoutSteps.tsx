import React from "react"

export default function CheckoutSteps({ current = 0 }: { current?: number }) {
    return (
        <div className="flex justify-between items-center flex-row space-x-2 mb-10">
            {['ورود', 'آدرس سفارش', 'روش پرداخت', 'ثبت سفارش'].map((step, index) => {
                return (
                    <React.Fragment key={step}>
                        <div className={`p-2 w-56 rounded-full text-center text-sm ${index === current ? 'bg-secondary' : ''}`}>
                            {step}
                        </div>
                        {step !== 'ثبت سفارش' && (
                            <hr className="w-16 border-t border-gray-300 mx-2"></hr>
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}
