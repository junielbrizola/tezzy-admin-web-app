/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const addSubscriber = async (
    email: string,
) => {
    try {
        const response = await http.post(`/subscribers`, {
            email,
        })
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}