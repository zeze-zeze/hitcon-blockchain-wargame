import { FC, useContext } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HeaderButtons from './HeaderButtons';
import HeaderUserMenu from './HeaderUserMenu';
import { SidebarMenu } from '../../Dashboard';
import { SidebarToggledContext } from '../../../App';

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
    const { sidebarToggled, toggleSidebar, lgUp } = useContext(SidebarToggledContext);

    return (
        <>
        {
            lgUp ? <HeaderWrapper sx={{ left: sidebarToggled ? theme.sidebar.width: 0 }}>
                <HeaderComponentsWrapper>
                    <Tooltip arrow title="Toggle Menu">
                        <IconButton color="primary" onClick={toggleSidebar}>
                            {sidebarToggled ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                    </Tooltip>
                </HeaderComponentsWrapper>
                <HeaderComponentsWrapper>
                    <HeaderButtons />
                    <HeaderUserMenu />
                </HeaderComponentsWrapper>
            </HeaderWrapper>
            : <HeaderWrapper>
                <HeaderComponentsWrapper>
                    <Tooltip arrow title="Toggle Menu">
                        <IconButton color="primary" onClick={toggleSidebar}>
                            {sidebarToggled ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                    </Tooltip>
                </HeaderComponentsWrapper>
                <HeaderComponentsWrapper>
                    <HeaderButtons />
                    <HeaderUserMenu />
                </HeaderComponentsWrapper>
            </HeaderWrapper>
        }
        </>
    )
};

export default Header;

