import { Property } from "@/lib/property-service"
import app from "@/lib/firebase-service"
import { getAuth } from "firebase/auth"
import { addDoc, collection, doc, getDocs, getFirestore,updateDoc } from "firebase/firestore"

const db = getFirestore(app)

export async function getProperties() {
    const snapShot = await getDocs(collection(db, "Properties"))
    return snapShot
}

export async function propertyVerification(propertyId: string, action: string) {
    await updateDoc(doc(db, "Properties", propertyId), {
        isVerified: action
    })
}

export async function resetVerification(id: string) {
    await updateDoc(doc(db, "Properties", id), {
        isVerified: "pending"
    })
}
