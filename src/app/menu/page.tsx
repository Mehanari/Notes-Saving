'use client'
import { useRouter } from 'next/navigation'

export default function Menu() {
    const router = useRouter();

    return (
        <main className="flex justify-center items-center h-screen">
            <div className="space-x-4">
                <button
                    onClick={() => router.push('/save-note')}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Add Note
                </button>
                <button
                    onClick={() => router.push('/show-notes')}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                    View Notes
                </button>
            </div>
        </main>
    );
}
