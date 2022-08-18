import { FC, useRef, useState, useEffect, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWeb3React } from "@web3-react/core";
import LanguageContext from 'contexts/LanguageContext';

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
        color: theme.colors.alpha.trueWhite[70],
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

const HeaderUserMenu: FC = () => {

    const ref = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { deactivate } = useWeb3React();
    const { multiLang } = useContext(LanguageContext);
    const { active, account } = useWeb3React();
    const walletAddress = useMemo(() => {
        if (active && typeof account === 'string') {
            return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        } else {
            return 'Anonymous';
        }
    }, [active, account]);

    useEffect(() => {
        if (active && account) {
            localStorage.setItem("_hitcon_wargame_", "Injected"); // for useEagerConnect
        }
    }, [active, account]);

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={() => {
                setIsOpen(true);
            }}>
                <Avatar variant="rounded" />
                <UserBoxText>
                    <UserBoxLabel>{walletAddress}</UserBoxLabel>
                </UserBoxText>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={() => {
                    setIsOpen(false);
                }}
                open={isOpen}
                PaperProps={{
                    variant: 'outlined',
                    elevation: 0
                }}
            >
                <List sx={{ p: 1 }} component="nav">
                    <ListItem
                        button
                        onClick={() => {
                            deactivate();
                            localStorage.removeItem("_hitcon_wargame_");
                        }}
                    >
                        <AccountBalanceWalletIcon fontSize="small" />
                        <ListItemText primary={multiLang?.dashboard.header.userMenu.disconnectWallet} />
                    </ListItem>
                </List>
                <Divider />
                <UserBoxSignoutBox>
                    <Button
                        color="primary"
                        variant="text"
                        onClick={() => {
                            window.location.href = "https://hitcon.org/2022/event";
                        }}
                        fullWidth
                    >
                        <LogoutIcon sx={{ mr: 1 }} />
                        {multiLang?.dashboard.header.userMenu.logout}
                    </Button>
                </UserBoxSignoutBox>
            </Popover>
        </>
    );
}

export default HeaderUserMenu;
