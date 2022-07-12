import { useEffect, useState, useCallback, useReducer } from 'react';
import { useWeb3React } from "@web3-react/core";

type MessageType = {
    title: string,
    content: string,
    date: Date,
};

const useNotification = () => {
    /* https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate */
    const [probe, updateNotification] = useReducer(x => x + 1, 0);
    const getNotification = useCallback((): Array<MessageType> => {
        const notificationString = localStorage.getItem("_notifications_");
        if (notificationString === null) {
            return [];
        } else {
            try {
                const notification = JSON.parse(notificationString);
                return notification.slice().reverse();
            } catch (error) {
                console.log("Cannot get notification: data corrupted");
                return [];
            }
        }
    }, [probe]);
    const addNotification = (message: MessageType): void => {
        const notification = getNotification();
        notification.push(message);
        localStorage.setItem("_notifications_", JSON.stringify(notification));
        /* rerender */
        updateNotification();
    };
    const deleteNotification = (idx: number): void => {
        const notification = getNotification();
        notification.splice(idx, 1);
        localStorage.setItem("_notifications_", JSON.stringify(notification));
        /* rerender */
        updateNotification();
    };
    return { getNotification, addNotification, deleteNotification };
};

export default useNotification;
