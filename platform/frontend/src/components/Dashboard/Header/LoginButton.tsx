import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

const LoginButton: FC = () => {
    const theme = useTheme();
    return (
        <Button
            component={NavLink}
            color="primary"
            variant="contained"
            to="/login"
            sx={{
                'margin': theme.spacing(0, 3)
            }}
        >
            Login
        </Button>
    );
};

export default LoginButton;
