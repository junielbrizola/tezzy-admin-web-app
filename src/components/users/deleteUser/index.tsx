/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal } from './modal';

interface IDeleteUser {
    id: string
    component: ({ onClick }: { onClick: any }) => React.ReactNode,
    onCallback: any
}

const DeleteUser: React.FC<IDeleteUser> = ({ onCallback, component, id }) => {
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
                    id={id}
                    onCallback={onCallback}
                    handleClose={handleClose}
                />    
            )}
        </React.Fragment>
    );
}

export { DeleteUser };
