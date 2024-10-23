/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const adjustProductQuantity = async (id: string, qtd: number) => {
    try {
        const response = await http.put(`/products/${id}`, {
            qtd: Number(qtd)
        })
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}