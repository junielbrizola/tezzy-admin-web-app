/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react';
import { AppBar } from '@/components/appBar';
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import { Main } from '@/components/main';
import { DrawerHeader } from '@/components/drawerHeader';
import { CategoryRounded, ChevronLeftRounded, Groups3Rounded, LogoutRounded, MenuRounded, Person4Rounded, TuneRounded } from '@mui/icons-material';
import { redirect, usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie'

const drawerWidth = 300;

export default function RootLayout(props: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  interface IPage {
    icon: any
    title: string
    pathname: string
  }

  const pages: IPage[] = [
    {
      icon: <CategoryRounded />,
      title: "Produtos",
      pathname: '/products'
    },
    {
      icon: <TuneRounded />,
      title: "Opções",
      pathname: '/options'
    },
    {
      icon: <Groups3Rounded /> ,
      title: "Usuários",
      pathname: '/users'
    },
  ]

  if (!Cookies.get('authorization')) return redirect('/sign-in')

  return (
    <>

      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
            ]}
          >
            <MenuRounded />
          </IconButton>
          <Stack 
            gap={3}
            flex={1}
            flexDirection="row"
            alignItems="center"
            
          >
            <Typography variant="h6" letterSpacing={3} noWrap component="div">
              Administrador
            </Typography>
            <Divider orientation="vertical" sx={(theme) => ({ height: 24, backgroundColor: theme.palette.background.paper })} />
            <Typography variant="h6" fontWeight={400} noWrap component="div">
              {pages.find(p => p.pathname === pathname)?.title}
            </Typography>
          </Stack>
          <IconButton
            color="inherit"
            onClick={() => {
              Cookies.remove('authorization')
              router.push('/sign-in')
            }}
          >
            <LogoutRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        onClose={handleDrawerClose}
        variant="temporary"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton color="error" onClick={handleDrawerClose}>
            <ChevronLeftRounded />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ pt: 0, pb: 0 }}>
          {pages?.map((page) => (
            <ListItem key={page.title} disablePadding>
              <ListItemButton 
                selected={pathname === page.pathname} 
                onClick={() => {
                  router.push(page.pathname)
                  handleDrawerClose()
                }}
              >
                <ListItemIcon>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main>
        <DrawerHeader />
        {props.children}
      </Main>
          
    </>
  );
}