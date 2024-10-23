/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Slide,
    Stack,
    TextField,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { saveUser } from '@/actions/saveUser';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react'
import { getOptions } from '@/actions/getOptions';

interface IData {
    id?: string | undefined
    name: any
    email: any
    password: any
    type: any
}

interface IModal {
    data?: IData
    onCallback: any
    handleClose: any
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: React.FC<IModal> = ({
    data,
    onCallback,
    handleClose
}) => {
    const [options, setOptions] = React.useState<any[]>([])

    const [isPending, startTransition] = React.useTransition();

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IData>({
        defaultValues: {
            name: data?.name || "",
            email: data?.email || "",
            type: data?.type || ""
        },
    });

    const onSubmit = async (formData: IData) => {
        startTransition(async () => {
            try {
                const { data: response, errors } = await saveUser(
                    data?.id,
                    formData.name,
                    formData.email,
                    formData.password,
                    formData.type,
                );
                if (errors) {
                    if (Array.isArray(errors)) {
                      errors.forEach((message: string) => {
                        enqueueSnackbar(message, { variant: 'error' });
                      });
                    } else {
                      enqueueSnackbar(errors || 'Erro no servidor', { variant: 'error' });
                    }
                    return
                }
                if (response) {
                    onCallback(response);
                    handleClose();
                }
            } catch (e: any) {
                console.log({ e })
            }
        })
    };

    const loadData = React.useCallback(async () => {
        try {
            const { data } = await getOptions()
            setOptions(data?.options || [])
        } catch (e) {
            console.log({ e })
        }
    }, [])

    React.useEffect(() => {
        loadData()
    }, [])

    return (
        <Dialog
            TransitionComponent={Transition}
            open={true}
            onClose={handleClose}
            aria-labelledby="add-User-title"
            aria-describedby="add-User-description"
            PaperProps={{
                component: 'form',
                sx: {
                    width: '100%',
                },
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle id="add-User-title">
                Usuario
            </DialogTitle>
            <DialogContent>
                <Stack gap={1}>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <TextField
                            id="name"
                            type="text"
                            placeholder="Nome"
                            fullWidth
                            variant="outlined"
                            {...register('name')}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <TextField
                            id="email"
                            type="text"
                            placeholder="E-mail"
                            fullWidth
                            variant="outlined"
                            {...register('email')}
                        />
                    </FormControl>
                    {!data?.id && (
                         <FormControl fullWidth>
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <TextField
                                id="password"
                                type="text"
                                placeholder="Senha"
                                fullWidth
                                variant="outlined"
                                {...register('password')}
                            />
                        </FormControl>
                    )}
                    <FormControl fullWidth>
                        <FormLabel htmlFor="type">Tipo</FormLabel>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={[
                                        'ADMIN',
                                        'CLIENT'
                                    ]}
                                    onChange={(_, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Tipo"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            )}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    disabled={options.length < 1}
                    type="submit"
                    variant="contained"
                    loading={isPending || isSubmitting}
                >
                    {data?.id ? 'Atualizar' : 'Adicionar'}
                </LoadingButton>
                <Button
                    color="error"
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export { Modal }