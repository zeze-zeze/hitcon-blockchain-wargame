import { alpha, Badge, Box, Divider, IconButton, List, ListItem, Popover, Tooltip, Typography } from '@mui/material';
import { FC, useRef, useState } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { styled } from '@mui/material/styles';
import { formatDistance, subDays } from 'date-fns';

const NotificationsBadge = styled(Badge)(
    ({ theme }) => ({
        '.MuiBadge-badge': {
            minWidth: '16px',
            height: '16px',
            padding: 0,
            backgroundColor: alpha(theme.palette.error.main, 0.2),
            color: theme.palette.error.main,
        }
    })
);

const IconButtonWrapper = styled(IconButton)(
    ({ theme }) => ({
        color: theme.colors.primary.main,
        padding: theme.spacing(1),
    })
);

const NotificationTextWrapper = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    })
);


const HeaderButtons: FC = () => {

    const ref = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Box>
            <Tooltip arrow title="Notifications">
                <IconButtonWrapper ref={ref} onClick={handleOpen}>
                    <NotificationsBadge badgeContent={1}>
                        <NotificationsActiveIcon />
                    </NotificationsBadge>
                </IconButtonWrapper>
            </Tooltip>
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
                <NotificationTextWrapper>
                    <Typography variant="h5">Notifications</Typography>
                </NotificationTextWrapper>
                <Divider />
                <List sx={{ p: 0 }}>
                    <ListItem sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}>
                        <Box flex="1">
                            <Box display="flex" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Horray! You solved Challenge 1.
                                </Typography>
                                <Typography variant="caption" sx={{ textTransform: 'none' }}>
                                    {formatDistance(subDays(new Date(), 3), new Date(), {
                                        addSuffix: true
                                    })}
                                </Typography>
                            </Box>
                            <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                            >
                                You gained a gift <code>NFT1</code>
                            </Typography>
                        </Box>
                    </ListItem>
                </List>
            </Popover>
        </Box>
    );
}

export default HeaderButtons;
