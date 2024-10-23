/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal } from './modal';

interface IData {
    id?: string | undefined
    name: any
    email: any
    password: any
    type: any  
}

interface ISaveUser {
    data?: IData,
    component: ({ onClick }: { onClick: any }) => React.ReactNode,
    onCallback: any
}

const SaveUser: React.FC<ISaveUser> = ({ onCallback, component, data }) => {
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

export { SaveUser };
