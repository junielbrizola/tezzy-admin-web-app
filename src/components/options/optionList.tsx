'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddRounded, DeleteRounded } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { CircularProgress, IconButton, InputAdornment, List, ListItem, ListItemText, ListSubheader, Paper, Stack, TextField } from '@mui/material'
import * as React from 'react'
import { Action } from '../action'
import { OptionRef } from './optionRef'

interface IOptionRef {
    inputLabel: string
    load: any
}

interface IOptionList {
    load: any
    add: any
    remove: any
    inputLabel: string
    listLabel: string
    optionRef?: IOptionRef
}

const OptionList: React.FC<IOptionList> = ({
    load,
    add,
    remove,
    inputLabel,
    listLabel,
    optionRef
}) => {
    const [isPending, startTransition] = React.useTransition();
    const [items, setItems] = React.useState<any[]>([])
    const [name, setName] = React.useState<string>('')
    const [option, setOption] = React.useState<string | null>(null);
    
    
    const loadData = React.useCallback(async () => {
        startTransition(async () => {
            try {
                const data = await load()
                setItems(data || [])
            } catch (e) {
                console.log({ e })
            }
        })
    }, [])

    React.useEffect(() => {
        loadData()
    }, [])
    return (
        <Stack component={Paper} gap={1}>
            <TextField
                sx={{ ml: 2, mt: 2, mr: 2 }}
                placeholder={inputLabel}
                variant="outlined"
                value={name}
                onChange={(e) => setName(e?.target?.value)}
                slotProps={{
                    input: {
                        startAdornment: !!isPending && (
                            <InputAdornment position="start">
                                <CircularProgress size="small" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Stack flexDirection='row' gap={1} alignItems="center">
                                    {optionRef && (
                                        <OptionRef
                                            {...optionRef}
                                            value={option}
                                            setValue={setOption}
                                        />
                                    )}
                                    <Action
                                        request={async () => {
                                            await add(name, option)
                                            await loadData()
                                            setName("")
                                            setOption(null)
                                        }}
                                        component={({ loading, onClick }: any) => (
                                            <IconButton component={LoadingButton} loading={loading} onClick={onClick} color="primary">
                                                <AddRounded />
                                            </IconButton>
                                        )}
                                    />
                                </Stack>
                            </InputAdornment>
                        )
                    }
                }}
            />
            <List>
                <ListSubheader>
                    {listLabel}
                </ListSubheader>
                {items?.map((item, index) => (
                    <ListItem
                        divider={(items.length - 1) > index}
                        key={item?.id}
                        secondaryAction={(
                            <Action
                                request={async () => {
                                    await remove(item?.id)
                                    await loadData()
                                }}
                                component={({ loading, onClick }: any) => (
                                    <IconButton color="error" component={LoadingButton} loading={loading} onClick={onClick}>
                                        <DeleteRounded />
                                    </IconButton>
                                )}
                            />
                        )}
                    >
                        <ListItemText
                            primary={item?.name}
                            secondary={item?.optionRefName || ''}
                        />
                    </ListItem>
                ))}
            </List>
        </Stack>
    )
}

export { OptionList }