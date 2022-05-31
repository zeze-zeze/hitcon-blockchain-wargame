import { FC, FormEvent, HTMLFormElement, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { styled, useTheme } from '@mui/material/styles'
import axios from 'axios';
import urlJoin from 'url-join';

type RegisterResponse = {
    username: string,
    password: string,
};


const SignupWrapper: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
    })
);

const SignupAvatar: FC = styled(Avatar)(
    ({ theme }) => ({
        backgroundColor: theme.colors.error.light,
        width: '128px',
        height: '128px',
        margin: theme.spacing(4, 0),
    })
);

const SignupForm: FC = () => {
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const apiBaseURL = process.env.REACT_APP_BASE_API_URL;

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheckOK, setPasswordCheckOK] = useState<boolean>(true);

    const handlePasswordCheck = (event: FormEvent<HTMLFormElement>) => {
        const retypePassword = event.target.value;
        setPasswordCheckOK(retypePassword === password);
    }

    const handleSignupFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        /* submit form to the backend server */

        try {
            const res = await axios.post(urlJoin(apiBaseURL, 'register'), {
                username: username,
                password: password
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Axios Error');
            } else {
                console.log('Other Error');
            }
        }
    }

    return (
        <form onSubmit={handleSignupFormSubmit}>
            <FormControl sx={{ width: smUp ? '388px' : '256px' }} >
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    onChange={ (event: FormEvent<HTMLFormElement>) => {
                        setUsername(event.target.value);
                    }}
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
                    onChange={ (event: FormEvent<HTMLFormElement>) => {
                        setPassword(event.target.value);
                    }}
                    sx={{ bgcolor: theme.colors.alpha.white[100] }}
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    error={!passwordCheckOK}
                    helperText={!passwordCheckOK && 'Password unmatched'}
                    id="retype_password"
                    name="retype_password"
                    label="Retype Password"
                    type="password"
                    autoComplete="password"
                    onChange={handlePasswordCheck}
                    sx={{ bgcolor: theme.colors.alpha.white[100] }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2 }}
                >
                    Register
                </Button>
            </FormControl>
        </form>
    );
}

const Signup: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <Container component="main" width="xl">
                <SignupWrapper>
                    <SignupAvatar>
                        <PersonOutlineOutlinedIcon sx={{ fontSize: '72px' }} />
                    </SignupAvatar>
                    <Typography component="h1" variant="h1" sx={{ mb: 2 }}>
                        Signup
                    </Typography>
                    <SignupForm />
                </SignupWrapper>
            </Container>
        </HelmetProvider>
    );
};

export default Signup;
