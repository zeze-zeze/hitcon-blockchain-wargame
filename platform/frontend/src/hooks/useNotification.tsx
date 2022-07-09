import { useEffect, useState, useReducer } from 'react';
import { useWeb3React } from "@web3-react/core";

type MessageType = {
    title: string,
    content: string,
};

const useNotification = () => {
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const { active } = useWeb3React();
    /* https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate */
    const [_, updateNotification] = useReducer(x => x + 1, 0);
    const getNotification = async (): Promise<Array<MessageType>> => {
        const notificationString = localStorage.getItem("_notifications_");
        if (notificationString === null) {
            return [];
        } else {
            try {
                const notification = JSON.parse(notificationString);
                return notification;
            } catch (error) {
                console.log("Cannot get notification: data corrupted");
                return [];
            }
        }
    };
    const addNotification = async (message: MessageType): Promise<void> => {
        const notification = await getNotification();
        notification.push(message);
        localStorage.setItem("_notifications_", JSON.stringify(notification));
        /* rerender */
        updateNotification();
    };
    useEffect(() => {
        setShowNotification(false);
    }, [showNotification, active]);
    return { showNotification, setShowNotification, getNotification, addNotification };
};

export default useNotification;
