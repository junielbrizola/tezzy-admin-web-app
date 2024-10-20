/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { http } from '@/utils/http';

export const addOption = async (
    name: string,
    type: string,
    optionRef?: string  
) => {
    try {
        const response = await http.post(`/options`, {
            name,
            type,
            optionRef
        })
        return { data: response?.data }
    } catch (e: any) {
        console.log({ e })
        return { errors: e?.response?.data?.error }
    }
}