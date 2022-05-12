import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Button, Divider, lighten, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';

import InboxIcon from '@mui/icons-material/Inbox';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const UserBoxButton: FC = styled(Button)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    })
);

const MenuUserBox: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        background: theme.colors.alpha.black[5],
        padding: theme.spacing(2),
    })
);

const UserBoxText: FC = styled(Box)(
    ({ theme }) => ({
        paddingLeft: theme.spacing(1),
        justifyContent: 'center',
        alignItem: 'center',
    })
);

const UserBoxLabel: FC = styled(Typography)(
    ({ theme }) => ({
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.main,
        display: 'block',
        overflow: 'hidden',
        maxWidth: '156px',
        textOverflow: 'ellipsis',
    })
);

const UserBoxDescription: FC = styled(Typography)(
    ({ theme }) => ({
        color: lighten(theme.palette.secondary.main, 0.5),
    })
);

const UserBoxSignoutBox: FC = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(1),
    })
);

const HeaderUserMenu: FC = () => {
    const user = {
        name: 'Doge',
        avatar: '/static/images/avatars/1.jpg',
    };

    const ref = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar variant="rounded" alt={user.name} src={user.avatar} />
                <UserBoxText>
                    <UserBoxLabel>{user.name}</UserBoxLabel>
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
                    <Button color="primary" fullWidth>
                        <LockOpenIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </UserBoxSignoutBox>
            </Popover>
        </>
    );
}

export default HeaderUserMenu;
