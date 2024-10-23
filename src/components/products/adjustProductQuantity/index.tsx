/* eslint-disable @typescript-eslint/no-explicit-any */
import { adjustProductQuantity } from '@/actions/adjustProductQuantity'
import { TextField, CircularProgress, InputAdornment } from '@mui/material'
import * as React from 'react'
import debounce from 'lodash/debounce'

interface IAdjustProductQuantity {
    id: string
    qtd: string
}

const AdjustProductQuantity: React.FC<IAdjustProductQuantity> = ({
    id,
    qtd
}) => {
    const [value, setValue] = React.useState(qtd);
    const [isPending, startTransition] = React.useTransition();

    const debouncedAdjustQuantity = React.useMemo(
        () => debounce(async (newValue: number) => {
            startTransition(async () => {
                try {
                    await adjustProductQuantity(id, newValue);
                } catch (error) {
                    console.error('Error adjusting product quantity:', error);
                }
            })
        }, 500),
        [id]
    );

    React.useEffect(() => {
        return () => {
            debouncedAdjustQuantity.cancel();
        };
    }, [debouncedAdjustQuantity]);

    return (
        <TextField
            value={value}
            variant="standard" 
            disabled={isPending}
            type="number" 
            onChange={(e: any) => {
                setValue(e.target.value);
                debouncedAdjustQuantity(e.target.value);
            }}
            slotProps={{
                input: {
                    startAdornment: !!isPending && (
                        <InputAdornment position="start">
                            <CircularProgress size="small" />
                        </InputAdornment>
                    ),
                }
            }}
            sx={{
                '.MuiInput-root::before': {
                    border: 'none !important',
                },
                '.MuiInput-root::after': {
                    border: 'none !important',
                },
            }}
        />
    );
}

export { AdjustProductQuantity }
