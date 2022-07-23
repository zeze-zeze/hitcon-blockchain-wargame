import { FC, ReactNode, useContext, useEffect } from 'react';
import { Typography, Box, Paper, Container, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { MainComponentWrapper } from 'App';
import Dashboard from 'components/Dashboard';
import SidebarToggledContext from 'contexts/SidebarToggledContext';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router';
import WaitEffect from 'components/WaitEffect';
import useEagerConnect from 'hooks/useEagerConnect';
import Web3Context from 'contexts/Web3Context';

type WrapperProps = {
    children: ReactNode,
};

type MainWrapperProps = {
    children: ReactNode,
    title: string,
};

/* Some convenient wrappers (headers, subtitles, texts) to use */

const HeaderWrapper = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    })
);

const HeaderTypography: FC<WrapperProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography align="center" variant="h1" sx={{ margin: theme.spacing(3, 0) }}>
        { children }
        </Typography>
    )
};

const SubtitleTypography: FC<WrapperProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography align="center" variant="h3" sx={{ fontWeight: 'light', margin: theme.spacing(1, 0) }}>
        { children }
        </Typography>
    )
};

const SubHeaderTypography: FC<WrapperProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h2" sx={{ margin: theme.spacing(3, 0) }}>
        { children }
        </Typography>
    )
};

const SubSubHeaderTypography: FC<WrapperProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h3" sx={{ margin: theme.spacing(3, 0) }}>
        { children }
        </Typography>
    )
};

const BodyTypography: FC<WrapperProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h6" component="p" sx={{ margin: theme.spacing(2, 0) }}>
        { children }
        </Typography>
    )
};

const PaperComponentWrapper = styled(Paper)(
    ({ theme }) => ({
        padding: theme.spacing(3),
        margin: theme.spacing(0, 8, 8, 8),
        display: 'flex',
        justifyContent: 'flex-start',
        borderRadius: '32px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',
    })
);

const PaperCenteredComponentWrapper = styled(Paper)(
    ({ theme }) => ({
        padding: theme.spacing(3),
        margin: theme.spacing(0, 8, 8, 8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '32px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',
    })
);

const MainWrapper: FC<MainWrapperProps> = ({ title, children }) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const { sidebarToggled } = useContext(SidebarToggledContext);
    const { initContracts } = useContext(Web3Context);

    /* 
     * Adjust the width & left property according to
     * 1. current screen size
     * 2. whether the current left sidebar is toggled
     */
    const calculatedLeft = sidebarToggled && lgUp ? theme.sidebar.width : 0;
    const calculatedWidth = sidebarToggled && lgUp ? `calc(100% - ${theme.sidebar.width})` : '100%';
    const { active, account } = useWeb3React();
    
    /*
     * Retrieve problems that the current user solved
     */

    const tried = useEagerConnect();

    useEffect(() => {
        if (tried && active && account) {
            initContracts(account);
        }
    }, [tried, active, account])

    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Dashboard />
            <MainComponentWrapper sx={{ left: calculatedLeft, width: calculatedWidth }}>
                <Scrollbars autoHide>
                    <Container>
                        <WaitEffect />
                        {children}
                    </Container>
                </Scrollbars>
            </MainComponentWrapper>
        </HelmetProvider>
    );
}

export {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    SubSubHeaderTypography,
    BodyTypography,
    PaperComponentWrapper,
    PaperCenteredComponentWrapper,
};

export default MainWrapper;
