import { FC, useState, useEffect, useContext } from 'react';
import { Box, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { parseISO, formatDistanceToNow } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationContext from 'contexts/NotificationContext';
import LanguageContext from 'contexts/LanguageContext';

const NotificationTextWrapper = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    })
);

const Notification: FC = () => {

    const { notification, deleteNotification } = useContext(NotificationContext);
    const { multiLang } = useContext(LanguageContext);

    return (
        <>
            <NotificationTextWrapper>
                <Typography variant="h5">
                    {multiLang?.dashboard.header.notification.title}
                </Typography>
            </NotificationTextWrapper>
            <Divider />
            <List sx={{ p: 0 }}>
                {
                    (notification.length) ? (
                        <>
                            {
                                notification
                                    .slice()
                                    .reverse() // reverse array without modifying
                                    .map(({ idx: messageIdx, date }, notificationIdx) => (
                                        <ListItem key={notificationIdx} sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}>
                                            <Box flex="1">
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    sx={{
                                                        width: '288px'
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        {multiLang?.dashboard.header.notification.messages[messageIdx].title}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {multiLang?.dashboard.header.notification.messages[messageIdx].content}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="caption" sx={{ textTransform: 'none' }}>
                                                        {
                                                            formatDistanceToNow(date, {
                                                                addSuffix: true
                                                            })
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        deleteNotification(notificationIdx);
                                                    }}
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Box>
                                        </ListItem>
                                    ))
                            }
                        </>
                    ) : (
                        <List>
                            <ListItem>
                                <Box flex="1">
                                    <Typography variant="subtitle2">
                                        {multiLang?.dashboard.header.notification.empty}
                                    </Typography>
                                </Box>
                            </ListItem>
                        </List>
                    )
                }
            </List>
        </>
    )
}

export default Notification;
