/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal } from './modal';


interface IData {
    medias: string[]
}

interface IMediasProduct {
    component: ({ onClick }: { onClick: any }) => React.ReactNode,
    onCallback: any
    data: IData
}

const MediasProduct: React.FC<IMediasProduct> = ({ onCallback, data, component }) => {
    const [open, setOpen] = React.useState(false);
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {component({ onClick: handleClickOpen })}
            {open && (
                <Modal
                    data={data}
                    onCallback={onCallback}
                    handleClose={handleClose}
                />    
            )}
        </React.Fragment>
    );
}

export { MediasProduct };
