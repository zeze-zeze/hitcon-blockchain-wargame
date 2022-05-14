import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, List, ListItem, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import FlagIcon from '@mui/icons-material/Flag';
import CodeIcon from '@mui/icons-material/Code';

const MenuEntryWrapper: FC = styled(List)(
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

const MenuSubEntryWrapper: FC = styled(List)(
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
                    <Button component={NavLink} startIcon={<SchoolIcon />} to="/tutorial" >
                        Tutorial
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
