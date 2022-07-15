import { FC, useRef, useState, useContext } from 'react';
import { alpha, Badge, Box, Divider, IconButton, Popover, Tooltip, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { styled, useTheme } from '@mui/material/styles';
import Notification from './Notification';
import NotificationContext from "contexts/NotificationContext";

const NotificationsBadge = styled(Badge)(
    ({ theme }) => ({
        '.MuiBadge-badge': {
            minWidth: '16px',
            height: '16px',
            padding: 0,
            backgroundColor: alpha(theme.palette.error.main, 0.75),
            color: theme.palette.error.main,
        }
    })
);

const NotificationsIconWrapper = styled(Box)(
    ({ theme }) => ({
        color: theme.colors.alpha.trueWhite[70],
        padding: 0,
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

    const theme = useTheme();
    const buttonRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { notification } = useContext(NotificationContext);

    return (
        <Box>
            <Tooltip arrow title="Notifications">
                <IconButtonWrapper ref={buttonRef} onClick={() => {
                    setIsOpen(true);
                }}>
                    <NotificationsIconWrapper>
                        <NotificationsBadge
                            invisible={notification.length === 0}
                            badgeContent={notification.length}
                        >
                            <NotificationsActiveIcon />
                        </NotificationsBadge>
                    </NotificationsIconWrapper>
                </IconButtonWrapper>
            </Tooltip>
            <Popover
                anchorEl={buttonRef.current}
                onClose={() => {
                    setIsOpen(false);
                }}
                open={isOpen}
                PaperProps={{
                    variant: 'outlined',
                    elevation: 0
                }}
            >
                <NotificationTextWrapper>
                    <Typography variant="h5">Notifications</Typography>
                </NotificationTextWrapper>
                <Divider />
                <Notification />
            </Popover>
        </Box>
    );
}

export default HeaderButtons;
