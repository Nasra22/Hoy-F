import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import app from "@/lib/firebase-service"
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore"
import { User, UserRole } from "@/lib/user-context"

const auth = getAuth(app)
const db = getFirestore(app)

export async function signup(name: string, email: string, password: string, role: UserRole, handlePage: Function, handleError: Function) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;

        const newUser: User = {
            id: user.uid,
            name: name || "",
            email: user.email || "",
            role,
            avatar: user.photoURL || "",
        }

        handlePage(role)
        localStorage.setItem("hoyfinder-user", JSON.stringify(newUser))
        storeUser(newUser, role)
    })
    .catch((error) => {
        const errorMessage = error.message
        handleError(errorMessage.substring(10,))
        throw new Error(errorMessage)
    })
}

export async function storeUser(user: User, role: UserRole) {
    await addDoc(collection(db, "User"), {
        id: user.id,
        name: user.name,
        email: user.email,
        role: role,
        avatar: user.avatar,
        timeStamp: serverTimestamp()
    })
}

export async function login(email: string, password: string, role: UserRole, handlePage: Function, handleError: Function) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user
        
        const newUser: User = {
            id: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            role,
            avatar: user.photoURL || "",
        }

        localStorage.setItem("hoyfinder-user", JSON.stringify(newUser))
        handlePage(role)
    })
    .catch((error) => {
        const errorMessage = error.message
        handleError("Login failed. Please check your credentials and try again.")
        throw new Error(errorMessage)
    })
}

export function logout() {
    localStorage.removeItem("hoyfinder-user")
}
