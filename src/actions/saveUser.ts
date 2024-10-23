/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const saveUser = async (
    id: string | undefined,
    name: string,
    email: string,
    password: string,
    type: string,
) => {
    try {
        let response: any = undefined
        if (id) {
            response = await http.put(`/users/${id}`, {
                name, 
                email, 
                password, 
                type
            })
        } else {
            response = await http.post(`/users`, {
                name, 
                email, 
                password, 
                type
            })
        }
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}