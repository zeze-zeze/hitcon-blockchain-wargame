import { ReactNode } from 'react';

import SchoolIcon from '@mui/icons-material/School';
import FlagIcon from '@mui/icons-material/Flag';

interface MenuSubEntry {
    title: string;
    link: string;
    icon: ReactNode;
}

interface MenuEntry {
    groupTitle: string;
    subEntry: MenuSubEntry[];
}

const menuConfig: MenuEntry[] = [
    {
        title: 'Tutorial',
        link: '/tutorial',
        icon: <SchoolIcon />,
    },
    {
        title: 'Problems',
        link: '/problems',
        icon: <FlagIcon />,
    }
]

export default menuConfig;
