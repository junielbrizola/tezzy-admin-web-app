/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const signUp = async (
    name: string,
    email: string,
    password: string,
    type: string
) => {
    try {
        const response = await http.post(`/sign-up`, {
            name,
            email,
            password,
            type
        })
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}