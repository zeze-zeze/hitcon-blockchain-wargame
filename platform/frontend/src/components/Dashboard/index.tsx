import { FC, useState } from 'react';
import Sidebar from './Sidebar';

const Dashboard: FC = () => {
    const [sidebarToggled, setSidebarToggled] = useState(false);
    const toggleSidebar = () => {
        setSidebarToggled(sidebarToggled);
    };
    return (
        <Sidebar
            sidebarToggled={sidebarToggled}
            toggleSidebar={toggleSidebar}
        />
    );
};

export default Dashboard;
