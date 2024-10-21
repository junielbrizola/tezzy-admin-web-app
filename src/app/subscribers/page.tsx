/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getSubscribers } from '@/actions/getSubscribers';
import { DeleteSubscriber } from '@/components/subscribers/deleteSubscriber';
import { AddSubscriber } from '@/components/subscribers/addSubscriber';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { DeleteRounded } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';

interface ISubscriber {
  id: string    
  email: string
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = React.useState<ISubscriber[]>([]);
  const [isPending, startTransition] = React.useTransition();

  const loadSubscribers = React.useCallback(async () => {
    startTransition(async () => {
      try {
        const { data: response, errors } = await getSubscribers();
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
          setSubscribers(response?.subscribers);
        }
      } catch (e: any) {
        console.log({ e });
      }
    });
  }, []);

  React.useEffect(() => {
    loadSubscribers();
  }, []);
  return (
    <Stack gap={3} flex={1}>
      <Stack
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <AddSubscriber
          onCallback={async () =>  loadSubscribers()}
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
        rows={subscribers}
        columns={[
          {
            field: 'type',
            headerName: 'Tipo',
            width: 150,
          },
          {
            field: 'color',
            headerName: 'Cor',
            width: 150,
          },
          {
            field: 'model',
            headerName: 'Modelo',
            minWidth: 150,
            flex: 1
          },
          {
            field: 'ean',
            headerName: 'EAN',
            width: 150,
          },
          {
            field: 'custom',
            headerName: 'Custumizado',
            width: 150,
            valueFormatter: (value) => value ? 'Sim' : 'Não'
          },
          {
            field: 'price',
            headerName: 'Preço',
            width: 150,
            valueFormatter: (value) => `R$ ${formatCurrency(value || 0)}`
          },
          {
            field: 'material',
            headerName: 'Material',
            minWidth: 150,
            flex: 1
          },
          {
            field: 'action',
            headerName: '',
            width: 160,
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row }: any)=> {
              return (
                <Stack flexDirection="row" alignItems="center" gap={1} justifyContent="center" height="100%">
                  <DeleteSubscriber
                    id={row?.id}
                    onCallback={async () => loadSubscribers()}
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