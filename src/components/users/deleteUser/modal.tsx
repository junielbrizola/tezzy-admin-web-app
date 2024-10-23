/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { LoadingButton } from '@mui/lab';
import { deleteUser } from '@/actions/deleteUser';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react'

interface IModal {
    id: string
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
    id,
    onCallback,
    handleClose
}) => {
    const [isPending, startTransition] = React.useTransition();

    const onSubmit = async () => {
        startTransition(async () => {
            try {
                const { data: response, errors } = await deleteUser(
                  id
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

    return (
        <Dialog
            TransitionComponent={Transition}
            open={true}
            onClose={handleClose}
            aria-labelledby="delete-User-title"
            aria-describedby="delete-User-description"
            PaperProps={{
                sx: {
                    width: '100%',
                },
            }}
        >
            <DialogTitle id="delete-User-title">
                Usuário
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem certeza que deseja deletar esse usuário?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    variant="contained"
                    loading={isPending}
                    onClick={onSubmit}
                >
                    {'Deletar'}
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