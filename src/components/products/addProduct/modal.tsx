/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Autocomplete,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Slide,
    Stack,
    TextField,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { addProduct } from '@/actions/addProduct';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react'
import { getOptions } from '@/actions/getOptions';
import { formatCurrency, parseCurrency } from '@brazilian-utils/brazilian-utils'

interface IData {
    id?: string | undefined
    type: any
    color: any
    model: any
    custom: boolean
    price: number
    material: any
    medias: string[]
}

interface IModal {
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
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        watch,
    } = useForm<IData>({
        defaultValues: {
          
        },
    });

    const onSubmit = async (formData: IData) => {
        startTransition(async () => {
            try {
                
                const files = formData.medias || [];
                const medias: any = await Promise.all(Array.from(files).map((file: any) => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = (error) => reject(error);
                })));
                
                const { data: response, errors } = await addProduct(
                    formData.type?.name,
                    formData.color?.name,
                    formData.model?.name,
                    formData.custom,
                    parseCurrency(formData.price as any),
                    formData.material?.name,
                    medias
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
            aria-labelledby="add-Product-title"
            aria-describedby="add-Product-description"
            PaperProps={{
                component: 'form',
                sx: {
                    width: '100%',
                },
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle id="add-Product-title">
                Produto
            </DialogTitle>
            <DialogContent>
                <Stack gap={1}>

                    <FormControl fullWidth>
                        <FormLabel htmlFor="type">Tipo</FormLabel>
                        <Controller
                            name="type"
                            control={control}
                            disabled={options.length < 1}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={options?.filter(o => o.type === 'TYPE')?.map(m => ({ ...m, label: m.name}))}
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

                    <FormControl fullWidth>
                        <FormLabel htmlFor="color">Cor</FormLabel>
                        <Controller
                            name="color"
                            control={control}
                            disabled={options.length < 1}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={options?.filter(o => o.type === 'COLOR')?.map(m => ({ ...m, label: m.name}))}
                                    onChange={(_, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Cor"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel htmlFor="model">Modelo</FormLabel>
                        <Controller
                            name="model"
                            control={control}
                            disabled={!watch('type')?.id}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={options?.filter(o => (o.type === 'MODEL' && o.optionRef === watch('type')?.id))?.map(m => ({ ...m, label: m.name}))}
                                    onChange={(_, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Modelo"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel htmlFor="material">Material</FormLabel>
                        <Controller
                            name="material"
                            control={control}
                            disabled={!watch('type')?.id}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={options?.filter(o => (o.type === 'MATERIAL' && o.optionRef === watch('type')?.id))?.map(m => ({ ...m, label: m.name}))}
                                    onChange={(_, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Material"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel htmlFor="price">Preço</FormLabel>
                        <TextField
                            disabled={options.length < 1}
                            id="price"
                            type="text"
                            placeholder="Preço"
                            fullWidth
                            variant="outlined"
                            {...register('price')}
                            onInput={(e: any) => {
                                e.target.value = formatCurrency(parseCurrency(e.target.value))
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormControlLabel
                            control={(
                                <Controller
                                    disabled={options.length < 1}
                                    name="custom"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            id="custom"
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                    )}
                                />
                            )} 
                            label="Customizado" 
                        />
                    </FormControl>
                    
                    <FormControl fullWidth>
                        <FormLabel htmlFor="medias">Images</FormLabel>
                        <TextField
                            disabled={options.length < 1}
                            id="medias"
                            type="file"
                            placeholder="Images"
                            fullWidth
                            variant="outlined"
                            inputProps={{ 
                                accept: 'image/*', 
                                multiple: true
                            }}
                            {...register('medias')}
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