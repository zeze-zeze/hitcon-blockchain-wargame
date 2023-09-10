import { createContext } from 'react';

type SidebarToggledContentType = {
    sidebarToggled: boolean,
    toggleSidebar: () => void;
};

const SidebarToggledContext = createContext<SidebarToggledContentType>({} as SidebarToggledContentType);

export default SidebarToggledContext;