import { Property } from "@/lib/agent-service"
import app from "@/lib/firebase-service"
import { getAuth } from "firebase/auth"
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"


const auth = getAuth(app)
const db = getFirestore(app)

export async function addProperty(property: Property) {
    await addDoc(collection(db, "Properties" ), {
        title: property.title,
        price: property.price,
        type: property.type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        size: property.size,
        status: property.status,
        description: property.description,
        address: property.address,
        city: property.city,
        state: property.state,
        amenities: property.amenities,
        isPublished: property.isPublished,
        media: property.media
    })
}

export async function getProperty() {
    const snapShot = await getDocs(collection(db, "Properties"))
    return snapShot
}