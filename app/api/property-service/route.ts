import { Property } from "@/lib/property-service"
import app from "@/lib/firebase-service"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, serverTimestamp, setDoc } from "firebase/firestore"

const db = getFirestore(app)

export async function addProperty(property: Property) {
    console.log(property)

    await addDoc(collection(db, "Properties" ), {
        title: property.title,
        price: property.price,
        type: property.type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        owner: property.owner,
        size: property.size,
        status: property.status,
        description: property.description,
        address: property.address,
        city: property.city,
        state: property.state,
        amenities: property.amenities,
        isPublished: property.isPublished,
        isVerified: "pending",
        media: property.media,
        timeStamp: serverTimestamp()
    })
}

export async function getProperties() {
    const snapShot = await getDocs(collection(db, "Properties"))
    return snapShot
}

export async function deleteProperty(doc_id: string) {
    await deleteDoc(doc(db, "Properties", doc_id))
}
