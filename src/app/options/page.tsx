/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { addOption } from '@/actions/addOption'
import { deleteOption } from '@/actions/deleteOption'
import { getOptions } from '@/actions/getOptions'
import { OptionList } from '@/components/options/optionList'
import { Box, Stack } from '@mui/material'
import * as React from 'react'

export default function Options() {

    return (
        <Box height="100%" pb={3}>
            <Stack gap={3} height="100%">
                <OptionList 
                    load={async () => {
                        const { data } = await getOptions()
                        return data?.options?.filter((f: any) => f.type === "TYPE")
                    }}
                    add={async (name: string) => {
                        await addOption(name, "TYPE")
                    }}
                    remove={async (id: string) => {
                        await deleteOption(id)
                    }}
                    inputLabel="Tipo"
                    listLabel="Tipos"
                />
                <OptionList 
                    load={async () => {
                        const { data } = await getOptions()
                        return data?.options?.filter((f: any) => f.type === "COLOR")
                    }}
                    add={async (name: string) => {
                        await addOption(name, "COLOR")
                    }}
                    remove={async (id: string) => {
                        await deleteOption(id)
                    }}
                    inputLabel="Cor"
                    listLabel="Cores"
                />
                <OptionList 
                    load={async () => {
                        const { data } = await getOptions()
                        return data?.options?.filter((f: any) => f.type === "MODEL")?.map((m: any) => {
                            if (m.optionRef) {
                                m.optionRefName = data?.options?.find((f: any) => f.id === m.optionRef).name
                            }
                            return m
                        })
                    }}
                    add={async (name: string, option: any) => {
                        await addOption(name, "MODEL", option?.id as any)
                    }}
                    remove={async (id: string) => {
                        await deleteOption(id)
                    }}
                    inputLabel="Modelo"
                    listLabel="Modelos"
                    optionRef={{
                        inputLabel: "Tipo",
                        load: async () => {
                            const { data } = await getOptions()
                            return data?.options?.filter((f: any) => f.type === "TYPE")
                        }
                    }}
                />
                <OptionList 
                    load={async () => {
                        const { data } = await getOptions()
                        return data?.options?.filter((f: any) => f.type === "MATERIAL")?.map((m: any) => {
                            if (m.optionRef) {
                                m.optionRefName = data?.options?.find((f: any) => f.id === m.optionRef).name
                            }
                            return m
                        })
                    }}
                    add={async (name: string, option: any) => {
                        await addOption(name, "MATERIAL", option?.id as any)
                    }}
                    remove={async (id: string) => {
                        await deleteOption(id)
                    }}
                    inputLabel="Material"
                    listLabel="Materiais"
                    optionRef={{
                        inputLabel: "Tipo",
                        load: async () => {
                            const { data } = await getOptions()
                            return data?.options?.filter((f: any) => f.type === "TYPE")
                        }
                    }}
                />
            </Stack>
        </Box>
    )
}