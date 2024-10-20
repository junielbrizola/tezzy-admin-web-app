'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'

interface IAction {
    request: any
    component: any
}

const Action: React.FC<IAction> = ({
    request,
    component
}) => {
    const [isPending, startTransition] = React.useTransition();
    const handle = React.useCallback(async () => {
        startTransition(async () => {
            try {
                await request()
            } catch (e) {
                console.log({ e })
            }
        })
    }, [request])
    return (
        <>
            {component({ 
                loading: isPending,
                onClick: handle
            })}
        </>
    )
}

export { Action }