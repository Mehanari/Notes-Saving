'use client';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { useEffect } from 'react';

interface SignInProps {
    onSignInSuccess: () => void;
}

export default function SignIn({ onSignInSuccess }: SignInProps) {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const handleClick = async () => {
        await signInWithGoogle();
    };

    useEffect(() => {
        if (user) {
            onSignInSuccess();
        }
    }, [user, onSignInSuccess]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-lg">
                    <p>Error: {error.message}</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Sign In with Google
                </button>
            </div>
        </div>
    );
}
