/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { PersonAddRounded } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from 'notistack';
import { signUp } from '@/actions/signUp';

const schema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória")
}).required();

export default function SignUp() {
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (formData: any) => {
        startTransition(async () => {
            const { errors } = await signUp(formData.name, formData.email, formData.password, 'ADMIN')
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
            router.push('/sign-in')
        })
    };

    return (
        <Stack
            flex={1}
            height="100vh"
            width="100%"
            justifyContent="center"
            alignItems="center"
        >
            <Card
                sx={{
                    width: 500
                }}
            >
                <CardHeader 
                    avatar={<PersonAddRounded fontSize="large" />}
                    title={"Registrar"}
                    titleTypographyProps={{
                        variant: 'h6'
                    }}
                    subheader="Kelendil Admin"
                />
                <CardContent>
                    <Stack
                        sx={{
                            gap: 1,
                            width: '100%'
                        }}
                    >
                        <TextField
                            placeholder='name'
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : null}
                            {...register("name")} 
                        />
                        <TextField
                            placeholder='E-mail'
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : null}
                            {...register("email")} 
                        />
                        <TextField
                            placeholder='Senha'
                            fullWidth
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : null}
                            {...register("password")}
                        />
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button
                        loading={isPending}
                        component={LoadingButton}
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Registrar
                    </Button>
                    <Button onClick={() => router.push('/sign-in')}>
                        Já possui conta?
                    </Button>
                </CardActions>
            </Card>
        </Stack>
    )
}