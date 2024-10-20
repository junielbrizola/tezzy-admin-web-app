/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material';
import * as React from 'react';

interface IOptionRef {
    inputLabel: string;
    load: any;
    value: any
    setValue: any
}

const OptionRef: React.FC<IOptionRef> = ({ inputLabel, load, value, setValue }) => {
    const [isPending, startTransition] = React.useTransition();
    const [items, setItems] = React.useState<any[]>([]);

    const loadData = React.useCallback(async () => {
        startTransition(async () => {
            try {
                const data = await load();
                setItems(data.map((d: any) => ({
                    ...d,
                    label: d.name,
                })));
            } catch (e) {
                console.log({ e });
            }
        });
    }, []);

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <Autocomplete
            onOpen={() => loadData()}
            value={value}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => setValue(newValue)}
            loading={isPending}
            disablePortal
            options={items || [] as any}
            getOptionLabel={(option) => option.label as any}
            sx={{ width: 200 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    placeholder={inputLabel}
                    sx={{
                        '.MuiInput-root::before': {
                            border: 'none !important',
                        },
                        '.MuiInput-root::after': {
                            border: 'none !important',
                        },
                    }}
                />
            )}
        />
    );
};

export { OptionRef };
