'use client';
import { auth, db } from "@/firebaseConfig";
import { collection, addDoc } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormEvent, useState } from "react";

async function addNote(userId: string, note: string) {
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            userId: userId,
            note: note,
        });
        console.log("Added document for user with id:" + userId);
        return true;
    } catch (error) {
        console.log("An error occurred while adding document. Error: " + error);
        return false;
    }
}

export default function SaveNote() {
    const [user, loading, error] = useAuthState(auth);
    const [note, setNote] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (user) {
            const added = await addNote(user.uid, note);
            if (added) {
                setNote("");
            }
        }
    };

    if (!user) {
        return (
            <main className="flex justify-center items-center h-screen">
                <div className="bg-red-100 text-red-700 p-4 rounded shadow-md">
                    <h1>Not authorized</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Add Note</h1>
                <div className="mb-4">
                    <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
                        Note:
                    </label>
                    <input
                        type="text"
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </main>
    );
}
