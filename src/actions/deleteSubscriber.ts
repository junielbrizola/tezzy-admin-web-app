/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const deleteSubscriber = async (
    id: string,
) => {
    try {
        const response = await http.delete(`/subscribers/${id}`)
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}