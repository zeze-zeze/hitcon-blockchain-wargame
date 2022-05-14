import { FC, useContext } from 'react';
import { Typography, Box, Paper, Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Dashboard from '../Dashboard';
import { SidebarToggledContext, MainComponentWrapper } from '../../App';
import { Helmet } from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars-2';

/* Some convenient wrappers (headers, subtitles, texts) to use */

const HeaderWrapper: FC = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    })
);

const HeaderTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h1" sx={{ margin: theme.spacing(1, 0) }}>
        { children }
        </Typography>
    )
};

const SubtitleTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="subtitle1" sx={{ margin: theme.spacing(1, 0) }}>
        { children }
        </Typography>
    )
};

const SubHeaderTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h2" sx={{ margin: theme.spacing(3, 0) }}>
        { children }
        </Typography>
    )
};

const BodyTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h6" component="p" sx={{ margin: theme.spacing(2, 0) }}>
        { children }
        </Typography>
    )
};

const PaperComponentWrapper: FC = styled(Paper)(
    ({ theme }) => ({
        padding: theme.spacing(3),
    })
);

const MainWrapper: FC = ({ title, children }) => {
    const theme = useTheme();
    const { sidebarToggled, lgUp } = useContext(SidebarToggledContext);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Dashboard />
            <MainComponentWrapper sx={{
                /* 
                 * Adjust the width & left property according to
                 * 1. current screen size
                 * 2. whether the current left sidebar is toggled
                 */
                left: sidebarToggled && lgUp ? theme.sidebar.width : 0,
                width: sidebarToggled && lgUp ? `calc(100% - ${theme.sidebar.width})` : '100%',
            }}>
                <Scrollbars autoHide>
                    <Container>
                    {children}
                    </Container>
                </Scrollbars>
            </MainComponentWrapper>
        </>
    );
}

export { MainWrapper, HeaderWrapper, HeaderTypography, SubtitleTypography, SubHeaderTypography, BodyTypography, PaperComponentWrapper };
