import { FC, useContext } from 'react';
import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import SidebarMenu from './SidebarMenu';
import SidebarLogo from './SidebarLogo';
import { SidebarToggledContext } from '../../../App';

const SidebarWrapper: FC = styled(Box)(
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

    const { sidebarToggled, toggleSidebar, lgUp } = useContext(SidebarToggledContext);

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
