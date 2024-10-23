/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

interface IProvider {
    children: React.ReactNode
}

interface IContext {
    auth: any
}

const Context = React.createContext<IContext>({
    auth: undefined
})

const Provider: React.FC<IProvider> = ({
    children
}) => {
    const [isInitialized, setIsIniatilized] = React.useState(false)
    const [isPending, startTransition] = React.useTransition();
    const [auth, setAuth] = React.useState<any>(undefined)
    console.log({ auth })
    React.useEffect(() => {
        startTransition(() => {
            setIsIniatilized(false)
            const authorization = Cookies.get('authorization')
            if (authorization) {
                const decoded = jwtDecode(authorization);
                setAuth(decoded)
            } else {
                setAuth(undefined)
            }
            setIsIniatilized(true)
        })
    }, [])
    if (isPending || !isInitialized) return null
    return (
        <Context.Provider
            value={{
                auth
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }