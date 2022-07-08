import { FC, useContext } from 'react';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import SidebarMenu from './SidebarMenu';
import SidebarLogo from './SidebarLogo';
import SidebarToggledContext from 'contexts/SidebarToggledContext';

const SidebarWrapper = styled(Box)(
    ({ theme }) => ({
        width: theme.sidebar.width,
        color: theme.sidebar.textColor,
        background: theme.sidebar.background,
        boxShadow: theme.sidebar.boxShadow,
        height: '100%',
        position: 'fixed',
        zIndex: 8,
    })
);

const Sidebar: FC = () => {

    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const { sidebarToggled, toggleSidebar } = useContext(SidebarToggledContext);

    /* 
     * If the current window size is big enough, use a persistent drawer>
     * Otherwise, use a temporary drawer.
     */

    return (
        <>
        {
            lgUp ? <Drawer
                anchor="left"
                open={sidebarToggled}
                onClose={toggleSidebar}
                variant="persistent"
                elevation={5}
            >
                <SidebarWrapper>
                    <Scrollbars autoHide>
                        <SidebarLogo />
                        <SidebarMenu />
                    </Scrollbars>
                </SidebarWrapper>
            </Drawer>
            : <Drawer
                anchor="left"
                open={sidebarToggled}
                onClose={toggleSidebar}
                variant="temporary"
                elevation={5}
            >
                <SidebarWrapper>
                    <Scrollbars autoHide>
                        <SidebarLogo />
                        <SidebarMenu />
                    </Scrollbars>
                </SidebarWrapper>
            </Drawer>
        }
        </>
    );
};

export default Sidebar;
