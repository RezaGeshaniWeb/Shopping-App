import { auth } from "@/auth"
import CheckoutSteps from "@/components/shared/CheckoutSteps"
import { getUserById } from "@/lib/actions/user.actions"

export default async function page() {
    const session = await auth()
    const userId = session?.user?.id
    if(!userId) throw new Error('user not found')
    const user = await getUserById(userId)

    return (
        <>
            <CheckoutSteps current={2} />
            <div>Form</div>
        </>
    )
}
