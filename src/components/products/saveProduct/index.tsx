/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal } from './modal';


interface IData {
    id?: string | undefined
    type: any
    ean: string
    color: any
    model: any
    custom: boolean
    price: number
    material: any
    medias: string[]
}

interface ISaveProduct {
    component: ({ onClick }: { onClick: any }) => React.ReactNode,
    onCallback: any
    data?: IData
}

const SaveProduct: React.FC<ISaveProduct> = ({ onCallback, data, component }) => {
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

export { SaveProduct };
