import { auth, signOut } from "@/auth"

export default async function DashboardPage() {
    const session = await auth()
    
    return (
        <div>
            <h1>Dashboard Page</h1>
            <p>{JSON.stringify(session)}</p>

            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button type="submit">Sign out</button>
            </form>
        </div>
    )
}