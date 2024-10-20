/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal } from './modal';


interface IData {
    type: any
    ean: string
    color: any
    model: any
    custom: boolean
    price: number
    material: any
    medias: string[]
}

interface IAddProduct {
    component: ({ onClick }: { onClick: any }) => React.ReactNode,
    onCallback: any
    data?: IData
}

const AddProduct: React.FC<IAddProduct> = ({ onCallback, data, component }) => {
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

export { AddProduct };
