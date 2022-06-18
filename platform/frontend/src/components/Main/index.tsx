import { FC, useState, useMemo, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Box, Paper, Container, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useWeb3React } from "@web3-react/core";

import { MainComponentWrapper } from 'App';
import Dashboard from 'components/Dashboard';
import SidebarToggledContext from 'contexts/SidebarToggledContext';
import useEagerConnect from 'hooks/useEagerConnect';


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
        <Typography align="center" variant="h1" sx={{ margin: theme.spacing(3, 0) }}>
        { children }
        </Typography>
    )
};

const SubtitleTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography align="center" variant="h3" sx={{ fontWeight: 'light', margin: theme.spacing(1, 0) }}>
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
        display: 'flex',
        justifyContent: 'flex-start',
        margin: theme.spacing(0, 8),
        borderRadius: '32px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',
    })
);

const PaperCenteredComponentWrapper: FC = styled(Paper)(
    ({ theme }) => ({
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '32px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',
    })
);


const MainWrapper: FC = ({ title, children }) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const { sidebarToggled } = useContext(SidebarToggledContext);
    const { active } = useWeb3React();

    /* 
     * Adjust the width & left property according to
     * 1. current screen size
     * 2. whether the current left sidebar is toggled
     */
    const calculatedLeft = sidebarToggled && lgUp ? theme.sidebar.width : 0;
    const calculatedWidth = sidebarToggled && lgUp ? `calc(100% - ${theme.sidebar.width})` : '100%';

    const tried = useEagerConnect();

    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Dashboard />
            <MainComponentWrapper sx={{ left: calculatedLeft, width: calculatedWidth }}>
                <Scrollbars autoHide>
                    <Container>
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
    BodyTypography,
    PaperComponentWrapper,
    PaperCenteredComponentWrapper,
};

export default MainWrapper;
