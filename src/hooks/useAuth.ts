import { Context } from "@/contexts/auth"
import React from "react"

const useAuth = () => {
    const value = React.use(Context)
    return value
}

export { useAuth }