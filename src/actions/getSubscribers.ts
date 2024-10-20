/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const getSubscribers = async () => {
    try {
        const response = await http.get(`/subscribers`)
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}