'use server';

import { db } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function registerForEvent(data: {name: string, email: string, visibility: 'secure' | 'public'}) {
    try {
        await addDoc(collection(db, "registrations"), data);
        revalidatePath('/admin_2003');
        return { success: true, message: "Registration successful!" };
    } catch (error) {
        console.error("Registration Error: ", error);
        return { success: false, message: "Registration failed. Please try again." };
    }
}

export async function updateEventDetails(data: { topic: string, meetLink: string }) {
    try {
        const eventDocRef = doc(db, "event", "details");
        // Using setDoc with merge: true will create or update the document.
        await setDoc(eventDocRef, data, { merge: true });
        revalidatePath('/');
        revalidatePath('/admin_2003');
        return { success: true, message: "Event details updated." };
    } catch (error) {
        console.error("Update Event Error: ", error);
        return { success: false, message: "Failed to update event details." };
    }
}

export async function deleteRegistration(id: string) {
    try {
        await deleteDoc(doc(db, "registrations", id));
        revalidatePath('/admin_2003');
        return { success: true, message: "Registration deleted." };
    } catch (error) {
        console.error("Delete Registration Error: ", error);
        return { success: false, message: "Failed to delete registration." };
    }
}
