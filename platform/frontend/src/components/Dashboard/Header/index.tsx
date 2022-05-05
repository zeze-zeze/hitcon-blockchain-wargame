import { FC } from 'react';
import { Box, Hidden, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import HeaderButtons from './Buttons';

const HeaderWrapperLg: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: theme.sidebar.width,
        right: 0,
        width: 'auto',
        height: theme.header.height,
        color: theme.header.textColor,
        padding: theme.spacing(3),
        zIndex: -8,
        backgroundColor: theme.header.background,
        boxShadow: theme.header.boxShadow,
    })
);

const RightButtonsWrapperLg: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    })
);

const Header: FC = ({ sidebarToggled, toggleSidebar }) => {
    return (
        <Hidden lgDown>
            <HeaderWrapperLg>
                <Typography variant="h3" component="h3">
                    Dashboard
                </Typography>
                <RightButtonsWrapperLg>
                    <HeaderButtons />
                    <Tooltip arrow title="Toggle Menu">
                        <IconButton color="primary" onClick={toggleSidebar}>
                            {!sidebarToggled ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
                        </IconButton>
                    </Tooltip>
                </RightButtonsWrapperLg>
            </HeaderWrapperLg>
        </Hidden>
    )
};

export default Header;
/* <HeaderUserbox /> */
