import { FC } from 'react';
import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderWrapper = styled(Box)(
    ({ theme }) => ({
        height: theme.header.height,
        color: theme.header.textColor,
        padding: theme.spacing(0, 2),
        right: 0,
        zIndex: 5,
        backgroundColor: theme.header.background,
        boxShadow: theme.header.boxShadow,
        position: 'fixed',
        justifyContent: 'space-between',
        width: '100%',
        [`@media (min-width: ${theme.breakpoints.values.lg}px`]: {
            left: theme.sidebar.width,
            width: 'auto',
        }
    })
);

const Header: FC = ({ sidebarToggled, toggleSidebar }) => {
    return (
        <HeaderWrapper display="flex" alignItems="center">
            <Box display="flex" alignItems="center">
                <HeaderButtons />
                <HeaderUserbox />
                <Hidden lgUp>
                    <Tooltip arrow title="Toggle Menu">
                        <IconButton color="primary" onClick={toggleSidebar}>
                            {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
                        </IconButton>
                    </Tooltip>
                </Hidden>
            </Box>
        </HeaderWrapper>
        )
};
