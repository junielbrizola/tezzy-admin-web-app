/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const addProduct = async (
    type: string,
    ean: string,
    color: string,
    model: string,
    custom: boolean,
    price: number,
    material: string,
    medias: string[]
) => {
    try {
        const response = await http.post(`/products`, {
            type,
            ean,
            color,
            model,
            custom: Boolean(custom),
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