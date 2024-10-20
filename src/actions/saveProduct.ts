/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const saveProduct = async (
    id: string | undefined,
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
        const response = await http[id ? 'put' : 'post'](id ? `/products/${id}` : `/products`, {
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