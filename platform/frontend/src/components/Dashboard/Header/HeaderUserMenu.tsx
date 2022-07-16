import { FC, ElementType, useRef, useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';
import { useWeb3React } from "@web3-react/core";
import useShortWallet from 'hooks/useShortWallet';
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
    const walletAddress = useShortWallet();

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={() => {
                setIsOpen(true);
            }}>
                <Avatar variant="rounded" src="https://i.imgur.com/Osl0YMx.jpeg" />
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
                    <ListItem button to="/settings" component={NavLink}>
                        <AccountTreeIcon fontSize="small" />
                        <ListItemText primary={multiLang?.dashboard.header.userMenu.userSetting} />
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
                        {multiLang?.dashboard.header.userMenu.disconnectWallet}
                    </Button>
                </UserBoxSignoutBox>
            </Popover>
        </>
    );
}

export default HeaderUserMenu;
