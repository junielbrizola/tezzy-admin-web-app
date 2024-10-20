/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Stack,
    IconButton,
    Box,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

interface IData {
    medias: string[];
}

interface IModal {
    data?: IData;
    onCallback: any;
    handleClose: any;
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
    handleClose,
}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (data?.medias.length || 1));
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (data?.medias.length || 1)) % (data?.medias.length || 1));
    };

    if (!data?.medias || data?.medias?.length === 0) {
        return null; 
    }

    return (
        <Dialog
            TransitionComponent={Transition}
            open={true}
            onClose={handleClose}
            aria-labelledby="media-Product-title"
            aria-describedby="media-Product-description"
            PaperProps={{
                sx: {
                    width: '100%',
                },
            }}
        >
            <DialogTitle id="media-Product-title">Imagens</DialogTitle>
            <DialogContent>
                <Stack gap={1} alignItems="center">
                    <Box
                        component="img"
                        src={data.medias[currentIndex]}
                        alt={`Imagem ${currentIndex + 1}`}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: '400px',
                            transition: 'opacity 0.5s',
                        }}
                    />
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <IconButton onClick={handlePrevious} disabled={data.medias.length <= 1}>
                            <ArrowBack />
                        </IconButton>
                        <IconButton onClick={handleNext} disabled={data.medias.length <= 1}>
                            <ArrowForward />
                        </IconButton>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export { Modal };
