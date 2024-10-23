/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getProducts } from '@/actions/getProducts';
import { DeleteProduct } from '@/components/products/deleteProduct';
import { MediasProduct } from '@/components/products/mediasProduct';
import { AddProduct } from '@/components/products/addProduct';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { DeleteRounded, Visibility } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';
import { AdjustProductQuantity } from '@/components/products/adjustProductQuantity';

interface IProduct {
  id: string
  type: string
  ean: string
  color: string
  model: string
  custom: boolean
  price: number
  material: string
  medias: string[]
}

export default function Products() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [isPending, startTransition] = React.useTransition();

  const loadProducts = React.useCallback(async () => {
    startTransition(async () => {
      try {
        const { data: response, errors } = await getProducts();
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
          setProducts(response?.products);
        }
      } catch (e: any) {
        console.log({ e });
      }
    });
  }, []);

  React.useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Stack gap={3} flex={1}>
      <Stack
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <AddProduct
          onCallback={async () =>  loadProducts()}
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
        rows={products}
        columns={[
          {
            field: 'type',
            headerName: 'Tipo',
            width: 165,
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
            field: 'size',
            headerName: 'Tamanho',
            width: 150,
          },
          {
            field: 'material',
            headerName: 'Material',
            minWidth: 150,
            flex: 1
          },
          {
            field: 'qtd',
            headerName: 'Quantidade',
            minWidth: 160,
            renderCell: ({ row }: any) => {
              return (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <AdjustProductQuantity  
                    id={row.id}
                    qtd={row.qtd}
                  />
                </Stack>
              )
            }
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
                  <MediasProduct
                    data={{
                      medias: row.medias
                    }}
                    onCallback={async () => loadProducts()}
                    component={({ onClick }) => (
                      <IconButton
                        onClick={onClick}
                      >
                        <Visibility color="success" />
                      </IconButton>
                    )}
                  />
                  <DeleteProduct
                    id={row?.id}
                    onCallback={async () => loadProducts()}
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
