import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';

const ErrorWrapper = styled(Box)(
    ({ theme }) => ({
        height: '100%',
        display: 'flex',
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    })
);

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => ({
        backgroundColor: theme.colors.alpha.white[100],
    })
);

const Error404 = () => {
    const navigate = useNavigate();
    return (
        <HelmetProvider>
            <Helmet>
                <title>404</title>
            </Helmet>
            <ErrorWrapper>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Typography variant="h2" sx={{ marginY: 4 }}>
                            Oops! Page not found!
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.secondary"
                            fontWeight="normal"
                            sx={{ marginBotton: 4 }}
                        >
                            The page you were looking for does not exist.
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => { navigate(-1); }}
                        >
                            Back
                        </Button>
                    </Box>
                </Container>
            </ErrorWrapper>
        </HelmetProvider>
    );
}

export default Error404;
