'use client'
import SignIn from "../components/SignIn";
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    return (
      <main>
        <SignIn onSignInSuccess={() => {router.push("/menu")} } />
      </main>
    );
}
