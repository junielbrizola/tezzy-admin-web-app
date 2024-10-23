/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const signIn = async (
    email: string,
    password: string
) => {
    try {
        const response = await http.post(`/sign-in/admin`, {
            email,
            password
        })
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}