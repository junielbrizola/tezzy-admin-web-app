/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const deleteProduct = async (
    id: string
) => {
    try {
        const response = await http.delete(`/products/${id}`)
        return { data: response?.data?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}