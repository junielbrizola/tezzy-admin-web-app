/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { FingerprintRounded } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { signIn } from '@/actions/signIn';
import Cookies from 'js-cookie'
import { enqueueSnackbar } from 'notistack';

const schema = yup.object({
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória")
}).required();

export default function SignIn() {
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (formData: any) => {
        startTransition(async () => {
            const { data, errors } = await signIn(formData.email, formData.password)
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
            if (data) {
                Cookies.set('authorization', data?.token)
                router.replace('/')
            }
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
                    avatar={<FingerprintRounded fontSize="large" />}
                    title={"Entrar"}
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
                        Autenticar
                    </Button>
                    <Button onClick={() => router.push('/sign-up')}>
                        Não possui conta?
                    </Button>
                </CardActions>
            </Card>
        </Stack>
    )
}