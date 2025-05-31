import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import app from "@/lib/firebase-service"

export type UserRole = "client" | "landlord" | "agent" | "driver" | "cleaner" | "admin"

interface User {
  id: string
  name: string | null
  email: string | null
  role: UserRole
  avatar?: string | null
}

const auth = getAuth(app)

export async function signup(email: string, password: string, role: UserRole, handlePage: Function, handleError: Function) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;

        const newUser: User = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            role,
            avatar: user.photoURL,
        }

        handlePage(role)
        localStorage.setItem("hoyfinder-user", JSON.stringify(newUser))
    })
    .catch((error) => {
        const errorMessage = error.message
        handleError(errorMessage.substring(10,))
        throw new Error(errorMessage)
    })
}

export async function login(email: string, password: string, role: UserRole, handlePage: Function, handleError: Function) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user
        
        const newUser: User = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            role,
            avatar: user.photoURL,
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