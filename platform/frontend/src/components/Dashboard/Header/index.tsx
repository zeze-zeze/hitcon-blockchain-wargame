import { FC, useContext } from 'react';
import { Box, Avatar, Button, Grid, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HeaderButtons from './HeaderButtons';
import HeaderUserMenu from './HeaderUserMenu';
import SidebarToggledContext from 'contexts/SidebarToggledContext';
import { useWeb3React } from '@web3-react/core';
import LoginButton from './LoginButton';

const HeaderWrapper: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: 'auto',
        height: theme.header.height,
        color: theme.header.textColor,
        padding: theme.spacing(3),
        backgroundColor: theme.header.background,
        boxShadow: theme.header.boxShadow,
    })
);

const HeaderComponentsWrapper: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    })
);


const Header: FC = () => {

    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const { sidebarToggled, toggleSidebar } = useContext(SidebarToggledContext);
    const { active } = useWeb3React();

    const nftInfo = [
        {
            url: 'https://i.imgur.com/nHHO5Q8.jpg',
            gain: true,
        },
        {
            url: 'https://i.imgur.com/nHHO5Q8.jpg',
            gain: true,
        },
        {
            url: 'https://i.imgur.com/nHHO5Q8.jpg',
            gain: false,
        },
        {
            url: 'https://i.imgur.com/nHHO5Q8.jpg',
            gain: false,
        },
        {
            url: 'https://i.imgur.com/nHHO5Q8.jpg',
            gain: false,
        },
        {
            url: 'https://i.imgur.com/nHHO5Q8.jpg',
            gain: false,
        },
    ];

    /* 
     * Adjust the width & left property according to
     * 1. current screen size
     * 2. whether the current left sidebar is toggled
     */

    return (
        <>
        {
            /* 
             * If the current window size is big enough & left sidebar is toggled,
             * the header should not span across the menu.
             * Otherwise, the header's width should be equivalent to the screen's width
             */
            <HeaderWrapper sx={{ left: lgUp && sidebarToggled ? theme.sidebar.width: 0 }}>
                <HeaderComponentsWrapper>
                    <Tooltip arrow title="Toggle Menu">
                        <IconButton color="primary" onClick={toggleSidebar}>
                            {sidebarToggled ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                    </Tooltip>
                </HeaderComponentsWrapper>
                <HeaderComponentsWrapper>
                    <Grid container justifyContent="center" alignItems="center" spacing={7}>
                        {
                            nftInfo.map(({ url, gain }, id) => (
                                <Grid item xs={1} key={id}>
                                    <Avatar
                                        variant="rounded"
                                        src={url}
                                        sx={{
                                            opacity: gain ? '100%' : '40%',
                                        }}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </HeaderComponentsWrapper>
                <HeaderComponentsWrapper>
                    <HeaderButtons />
                    {
                        active ? (
                            <HeaderUserMenu />
                        ) : (
                            <LoginButton />
                        )
                    }
                </HeaderComponentsWrapper>
            </HeaderWrapper>
        }
        </>
    )
};

export default Header;

