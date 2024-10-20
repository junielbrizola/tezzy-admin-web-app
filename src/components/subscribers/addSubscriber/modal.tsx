/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { addSubscriber } from '@/actions/addSubscriber';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react'
import { getOptions } from '@/actions/getOptions';

interface IData {
    email: string
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
    onCallback,
    handleClose
}) => {
    const [options, setOptions] = React.useState<any[]>([])

    const [isPending, startTransition] = React.useTransition();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IData>({
        defaultValues: {
          
        },
    });

    const onSubmit = async (formData: IData) => {
        startTransition(async () => {
            try {
                
                const { data: response, errors } = await addSubscriber(
                    formData.email,
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

    if (options.length < 1) return null 

    return (
        <Dialog
            TransitionComponent={Transition}
            open={true}
            onClose={handleClose}
            aria-labelledby="add-Subscriber-title"
            aria-describedby="add-Subscriber-description"
            PaperProps={{
                component: 'form',
                sx: {
                    width: '100%',
                },
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle id="add-Subscriber-title">
                Assinatura
            </DialogTitle>
            <DialogContent>
                <Stack gap={1}>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <TextField
                            id="email"
                            type="text"
                            placeholder="E-mail"
                            fullWidth
                            variant="outlined"
                            {...register('email')}
                            disabled
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isPending || isSubmitting}
                >
                    Adicionar
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