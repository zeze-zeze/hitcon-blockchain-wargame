import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { FC, FormEvent, HTMLFormElement } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { styled, useTheme } from '@mui/material/styles'

const LoginWrapper: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
    })
);

const LoginAvatar: FC = styled(Avatar)(
    ({ theme }) => ({
        backgroundColor: theme.colors.error.light,
        width: '128px',
        height: '128px',
        margin: theme.spacing(4, 0),
    })
);

const LoginForm: FC = () => {
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const handleLoginFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        /* submit login form to the backend server */
    }
    return (
        <form onSubmit={handleLoginFormSubmit}>
            <FormControl sx={{ width: smUp ? '388px' : '256px' }} >
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    sx={{ bgcolor: theme.colors.alpha.white[100] }}
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="password"
                    sx={{ bgcolor: theme.colors.alpha.white[100] }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2 }}
                >
                    Log In
                </Button>
            </FormControl>
        </form>
    );
}

const Login: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Container component="main" width="xl">
                <LoginWrapper>
                    <LoginAvatar>
                        <LockOutlinedIcon sx={{ fontSize: '72px' }} />
                    </LoginAvatar>
                    <Typography component="h1" variant="h1" sx={{ mb: 2 }}>
                        User Login
                    </Typography>
                    <LoginForm />
                </LoginWrapper>
            </Container>
        </HelmetProvider>
    );
};

export default Login;
