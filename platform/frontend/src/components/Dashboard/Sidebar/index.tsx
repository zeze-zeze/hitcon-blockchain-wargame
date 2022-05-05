import { FC, ReactNode, useState } from 'react';
import { Box, Drawer, Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import SidebarMenu from './SidebarMenu';
import Logo from './Logo';

const SidebarWrapper = styled(Box)(
    ({ theme }) => ({
        width: theme.sidebar.width,
        color: theme.sidebar.textColor,
        background: theme.sidebar.background,
        boxShadow: theme.sidebar.boxShadow,
        height: '100%',
        position: 'fixed',
        zIndex: 8,
        borderTopRightRadius: theme.general.borderRadius,
        borderBottomRightRadius: theme.general.borderRadius,
    })
);

/*
        [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
                position: 'fixed',
                zIndex: 10,
                borderTopRightRadius: theme.general.borderRadius,
                borderBottomRightRadius: theme.general.borderRadius,
        }
*/

const Sidebar: FC = ({ sidebarToggled, toggleSidebar }) => {
    return (
        <>
            <Hidden lgDown>
                <SidebarWrapper>
                    <Scrollbars autoHide>
                        <Logo />
                        <SidebarMenu />
                    </Scrollbars>
                </SidebarWrapper>
            </Hidden>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    open={sidebarToggled}
                    onClose={() => toggleSidebar()}
                    variant="temporary"
                    elevation={9}
                >
                    <SidebarWrapper>
                        <Scrollbars autoHide>
                            <Logo />
                            <SidebarMenu />
                        </Scrollbars>
                    </SidebarWrapper>
                </Drawer>
            </Hidden>
        </>
    );
};

Sidebar.propTypes = {
    sidebarToggled: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
}

export default Sidebar;
