import { FC, useRef, useState, useContext } from 'react';
import { lighten, alpha, Badge, Box, IconButton, Popover, Tooltip, Button, useMediaQuery } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LanguageIcon from '@mui/icons-material/Language';
import { styled, useTheme } from '@mui/material/styles';
import Notification from './Notification';
import NotificationContext from "contexts/NotificationContext";
import LanguageContext from 'contexts/LanguageContext';
import HeaderNFTList from './HeaderNFTList';

const BadgeWrapper = styled(Badge)(
    ({ theme }) => ({
        '.MuiBadge-badge': {
            minWidth: '16px',
            height: '16px',
            padding: 0,
            backgroundColor: alpha(theme.palette.error.main, 0.75),
            color: lighten(theme.palette.error.main, 1),
        }
    })
);

const IconWrapper = styled(Box)(
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

const HeaderButtons: FC = () => {

    const theme = useTheme();
    const showSolved = useMediaQuery("(min-width:940px)");
    const notificationRef = useRef<any>(null);
    const langButtonRef = useRef<any>(null);
    const achievementRef = useRef<any>(null);

    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [langOpen, setLangOpen] = useState<boolean>(false);
    const [achievementOpen, setAchievementOpen] = useState<boolean>(false);

    const { notification } = useContext(NotificationContext);
    const { multiLang, changeLang } = useContext(LanguageContext);

    return (
        <>
            {
                showSolved || (
                    <Box sx={{ mr: theme.spacing(1) }}>
                        <Tooltip arrow title={multiLang?.dashboard.header.tooltip.achievement}>
                            <IconButtonWrapper ref={achievementRef} onClick={() => {
                                setAchievementOpen(true);
                            }}>
                                <IconWrapper>
                                    <BadgeWrapper
                                        invisible={true}
                                    >
                                        <EmojiEventsIcon />
                                    </BadgeWrapper>
                                </IconWrapper>
                            </IconButtonWrapper>
                        </Tooltip>
                        <Popover
                            anchorEl={achievementRef.current}
                            onClose={() => {
                                setAchievementOpen(false);
                            }}
                            open={achievementOpen}
                            PaperProps={{
                                variant: 'outlined',
                                elevation: 0
                            }}
                        >
                            <Box sx={{ padding: theme.spacing(1) }}>
                                <HeaderNFTList />
                            </Box>
                        </Popover>
                    </Box>
                )
            }
            <Box sx={{ mr: theme.spacing(1) }}>
                <Tooltip arrow title={multiLang?.dashboard.header.tooltip.notification}>
                    <IconButtonWrapper ref={notificationRef} onClick={() => {
                        setNotificationOpen(true);
                    }}>
                        <IconWrapper>
                            <BadgeWrapper
                                invisible={notification.length === 0}
                                badgeContent={notification.length}
                            >
                                <NotificationsActiveIcon />
                            </BadgeWrapper>
                        </IconWrapper>
                    </IconButtonWrapper>
                </Tooltip>
                <Popover
                    anchorEl={notificationRef.current}
                    onClose={() => {
                        setNotificationOpen(false);
                    }}
                    open={notificationOpen}
                    PaperProps={{
                        variant: 'outlined',
                        elevation: 0
                    }}
                >
                    <Notification />
                </Popover>
            </Box>
            <Box>
                <Tooltip arrow title="Language/語言">
                    <IconButtonWrapper ref={langButtonRef} onClick={() => {
                        setLangOpen(true);
                    }}>
                        <IconWrapper>
                            <BadgeWrapper invisible={true}>
                                <LanguageIcon />
                            </BadgeWrapper>
                        </IconWrapper>
                    </IconButtonWrapper>
                </Tooltip>
                <Popover
                    anchorEl={langButtonRef.current}
                    onClose={() => {
                        setLangOpen(false);
                    }}
                    open={langOpen}
                    PaperProps={{
                        variant: 'outlined',
                        elevation: 0
                    }}
                >
                    <Box sx={{ padding: theme.spacing(1) }}>
                        <Button
                            color="primary"
                            variant="text"
                            onClick={() => {
                                changeLang("en-US");
                                setLangOpen(false);
                            }}
                            fullWidth
                        >
                            English
                        </Button>
                        <Button
                            color="primary"
                            variant="text"
                            onClick={() => {
                                changeLang("zh-TW");
                                setLangOpen(false);
                            }}
                            fullWidth
                        >
                            繁體中文
                        </Button>
                    </Box>
                </Popover>
            </Box>
        </>
    );
}

export default HeaderButtons;
