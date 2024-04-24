'use client'
import {collection, DocumentData, getDocs, query, where} from '@firebase/firestore';
import {auth, db} from '@/firebaseConfig';
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";

async function getNotes(userId: string): Promise<DocumentData[]> {
    try {
        const notesQuery = query(
            collection(db, 'notes'),
            where('userId', '==', userId)
        );

        const querySnapshot = await getDocs(notesQuery);

        const data: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()})
        })
        console.log('Fetched notes: ' + data)
        return data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        return [];
    }
}

export default function ShowNotes(){
    const [data, setData] = useState<DocumentData[]>([]);
    const [user, loading, error] = useAuthState(auth);

    useEffect( () => {
        if (!user) return;
        const fetchData = async () =>{
            const fetchedData = await getNotes(user.uid);
            setData(fetchedData);
        }
        fetchData();
    }, [user]);

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
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Notes</h1>
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                {data.length > 0 ? ( /* Check if data contains notes */
                    data.map((note: DocumentData) => (
                        <div key={note.id} className="border-b border-gray-200 py-4">
                            <p className="text-gray-700">{note.note}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No notes found.</p>
                    )}
            </div>
        </main>
    );
}