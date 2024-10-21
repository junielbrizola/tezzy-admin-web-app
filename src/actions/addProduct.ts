/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const addProduct = async (
    type: string,
    color: string,
    model: string,
    size: string,
    custom: boolean,
    price: number,
    material: string,
    medias: string[]
) => {
    try {
        const response = await http.post(`/products`, {
            type,
            color,
            model,
            custom: Boolean(custom),
            size,
            price,
            material,
            medias
        })
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}