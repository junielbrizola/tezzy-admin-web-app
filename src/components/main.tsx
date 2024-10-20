'use client'

import { Stack, styled } from "@mui/material";

const Main = styled(Stack)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
}));

export { Main }