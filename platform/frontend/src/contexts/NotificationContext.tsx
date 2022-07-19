import { createContext } from 'react';

type MessageType = {
    idx: number,
    date: number,
};

type MessageArrayType = Array<MessageType>;

type NotificationContextType = {
    notification: MessageArrayType,
    addNotification: (newMessage: MessageType) => void,
    deleteNotification: (idx: number) => void,
};

const SidebarToggledContext = createContext<NotificationContextType>({} as NotificationContextType);

export default SidebarToggledContext;
