import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, List, ListItem, ListSubheader, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import FlagIcon from '@mui/icons-material/Flag';
import CodeIcon from '@mui/icons-material/Code';

const WaterDropIcon: FC = () => {
    return (
        <SvgIcon viewBox="0 0 48 48">
            <path d="M24 44Q17.65 44 12.825 39.575Q8 35.15 8 27.6Q8 22.6 11.975 16.725Q15.95 10.85 24 4Q32.05 10.85 36.025 16.725Q40 22.6 40 27.6Q40 35.15 35.175 39.575Q30.35 44 24 44ZM23.95 37.6Q24.75 37.6 25.175 37.325Q25.6 37.05 25.6 36.5Q25.6 35.95 25.175 35.65Q24.75 35.35 23.9 35.35Q21.8 35.35 19.625 34.025Q17.45 32.7 16.85 29.35Q16.75 28.9 16.4 28.625Q16.05 28.35 15.65 28.35Q15.1 28.35 14.8 28.775Q14.5 29.2 14.6 29.65Q15.35 33.85 18.15 35.725Q20.95 37.6 23.95 37.6Z"/>
        </SvgIcon>
    );
};

const MenuEntryWrapper = styled(List)(
    ({ theme }) => ({
        marginBottom: theme.spacing(1),
        padding: 0,
        '& > .MuiList-root': {
            padding: theme.spacing(0, 2, 2, 2)
        },
        '.MuiListSubheader-root': {
            color: theme.sidebar.menuItemHeadingColor,
            padding: theme.spacing(1, 2),
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: theme.typography.pxToRem(12),
            lineHeight: '1.4px',
        }
    })
);

const MenuSubEntryWrapper = styled(List)(
    /* style menu entries */
    ({ theme }) => ({
        '&.MuiList-root': {
            padding: 0,
            '.MuiListItem-root': {
                padding: theme.spacing(0.5, 2),
                '.MuiButton-root': {
                    display: 'flex',
                    color: theme.sidebar.menuItemColor,
                    width: '100%',
                    justifyContent: 'flex-start',
                    '.MuiButton-startIcon, .MuiButton-endIcon': {
                        transition: theme.transitions.create(['color']),
                        '.MuiSvgIcon-root': {
                            fontSize: 'inherit',
                            transition: 'none',
                        }
                    },
                    '.MuiButton-startIcon': {
                        fontSize: theme.typography.pxToRem(26),
                        marginRight: theme.spacing(2),
                        color: theme.sidebar.menuItemIconColor,
                    },
                    '&.Mui-active, &:hover': {
                        backgroundColor: theme.sidebar.menuItemBgActive,
                        color: theme.sidebar.menuItemColorActive,
                        '.MuiButton-startIcon': {
                            color: theme.sidebar.menuItemIconColorActive,
                        }
                    },
                },
            }
        }
    })
);

const SidebarMenu: FC = () => {
    return (
        <>
            <MenuEntryWrapper subheader={
                <ListSubheader disableSticky>
                    Dashboard
                </ListSubheader>
            }/>
            <MenuSubEntryWrapper>
                { /* Add new menu entries here */ }
                <ListItem>
                    <Button component={NavLink} startIcon={<HomeIcon />} to="/" >
                        Home
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<SchoolIcon />} to="/tutorial" >
                        Tutorial
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<WaterDropIcon />} to="/faucet" >
                        Faucet
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<FlagIcon />} to="/problems" >
                        Problems
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<CodeIcon />} to="/template" >
                        Template
                    </Button>
                </ListItem>
            </MenuSubEntryWrapper>
        </>
    );
};

export default SidebarMenu;
