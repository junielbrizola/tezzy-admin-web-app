/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getUsers } from '@/actions/getUsers';
import { DeleteUser } from '@/components/users/deleteUser';
import { SaveUser } from '@/components/users/saveUser';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';

interface IUser {
  id: string
  name: string
  email: string
  password: string
  type: string  
}

export default function Users() {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [isPending, startTransition] = React.useTransition();

  const loadUsers = React.useCallback(async () => {
    startTransition(async () => {
      try {
        const { data: response, errors } = await getUsers();
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
          setUsers(response?.users);
        }
      } catch (e: any) {
        console.log({ e });
      }
    });
  }, []);

  React.useEffect(() => {
    loadUsers();
  }, []);
  return (
    <Stack gap={3} flex={1}>
      <Stack
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <SaveUser
          onCallback={async () =>  loadUsers()}
          component={({ onClick }) => (
            <Button
              onClick={onClick}
              variant="contained"
            >
              Adicionar
            </Button>
          )}
        />
      </Stack>
      <DataGrid
        loading={isPending}
        autoPageSize
        rows={users}
        columns={[
          {
            field: 'name',
            headerName: 'Nome',
            flex: 1,
          },
          {
            field: 'email',
            headerName: 'E-mail',
            flex: 1,
          },
          {
            field: 'type',
            headerName: 'Tipo',
            width: 150,
          },
          {
            field: 'action',
            headerName: '',
            width: 130,
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row }: any)=> {
              return (
                <Stack flexDirection="row" alignItems="center" gap={1} justifyContent="center" height="100%">
                  <SaveUser
                    data={{
                      id: row.id,
                      name: row.name,
                      email: row.email,
                      password: row.password,
                      type: row.type,
                    }}
                    onCallback={async () =>  loadUsers()}
                    component={({ onClick }) => (
                      <IconButton
                        onClick={onClick}
                      >
                        <EditRounded color="primary"/>
                      </IconButton>
                    )}
                  />
                  <DeleteUser
                    id={row?.id}
                    onCallback={async () => loadUsers()}
                    component={({ onClick }) => (
                      <IconButton
                        onClick={onClick}
                      >
                        <DeleteRounded color="error"/>
                      </IconButton>
                    )}
                  />
                </Stack>
              )
            }
          }
        ]}
        disableRowSelectionOnClick
      />
    </Stack>
  );
}
