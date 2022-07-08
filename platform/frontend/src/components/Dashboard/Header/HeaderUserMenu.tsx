import { FC, ElementType, useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';
import { useWeb3React } from "@web3-react/core";
import useShortWallet from 'hooks/useShortWallet';

const UserBoxButton = styled(Button)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    })
);

const UserBoxText = styled(Box)(
    ({ theme }) => ({
        paddingLeft: theme.spacing(1),
        justifyContent: 'center',
        alignItem: 'center',
    })
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => ({
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.main,
        display: 'block',
        overflow: 'hidden',
        maxWidth: '156px',
        textOverflow: 'ellipsis',
    })
);

const UserBoxSignoutBox = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(1),
    })
);

const HeaderUserMenu = () => {

    const ref = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { deactivate } = useWeb3React();

    const walletAddress = useShortWallet();

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar variant="rounded" src="https://i.imgur.com/Osl0YMx.jpeg" />
                <UserBoxText>
                    <UserBoxLabel>{walletAddress}</UserBoxLabel>
                </UserBoxText>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List sx={{ p: 1 }} component="nav">
                    <ListItem button to="/profile" component={NavLink}>
                        <AccountBoxIcon fontSize="small" />
                        <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem button to="/settings" component={NavLink}>
                        <AccountTreeIcon fontSize="small" />
                        <ListItemText primary="Account Settings" />
                    </ListItem>
                </List>
                <Divider />
                <UserBoxSignoutBox>
                    <Button
                        color="primary"
                        variant="text"
                        onClick={() => {
                            deactivate();
                            localStorage.removeItem("_hitcon_wargame_");
                        }}
                        fullWidth
                    >
                        <LogoutIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </UserBoxSignoutBox>
            </Popover>
        </>
    );
}

export default HeaderUserMenu;
