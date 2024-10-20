/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal } from './modal';

interface IAddSubscriber {
    component: ({ onClick }: { onClick: any }) => React.ReactNode,
    onCallback: any
}

const AddSubscriber: React.FC<IAddSubscriber> = ({ onCallback, component }) => {
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
                    onCallback={onCallback}
                    handleClose={handleClose}
                />    
            )}
        </React.Fragment>
    );
}

export { AddSubscriber };
