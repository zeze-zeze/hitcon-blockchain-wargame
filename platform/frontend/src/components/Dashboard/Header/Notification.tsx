import { FC, useState, useEffect, useContext } from 'react';
import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
import { parseISO, formatDistanceToNow } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationContext from 'contexts/NotificationContext';

const Notification: FC = () => {

    const { notification, deleteNotification } = useContext(NotificationContext);

    return (
        <List sx={{ p: 0 }}>
            {
                (notification.length) ? (
                    <>
                        {
                            notification
                                .slice()
                                .reverse() // reverse array without modifying
                                .map(({ title, content, date }, idx) => (
                                    <ListItem key={idx} sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}>
                                        <Box flex="1">
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                sx={{
                                                    width: '288px'
                                                }}
                                            >
                                                <Typography sx={{ fontWeight: 'bold' }}>
                                                    {title}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {content}
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
                                                    deleteNotification(idx);
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
                                    Empty
                                </Typography>
                            </Box>
                        </ListItem>
                    </List>
                )
            }
        </List>
    )
}

export default Notification;
