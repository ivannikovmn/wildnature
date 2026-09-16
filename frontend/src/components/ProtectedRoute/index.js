'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export default function ProtectedRoute({ children }) {
    const router = useRouter()
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    if (!token) {
        return null
    }

    let decodeToken = jwtDecode(token)

    if (decodeToken.exp * 1000 > Date.now()) {
        return <>{children}</>
    }

    if (decodeToken.role.name === "employee") {
        router.push('/login')
    } else {
        router.push("/employer/signin")
    }
}