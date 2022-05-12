import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, List, ListItem, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import FlagIcon from '@mui/icons-material/Flag';

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
    ({ theme }) => ({
        '&.MuiList-root': {
            padding: 0,
            '.MuiList-root .MuiList-root .MuiListItem-root .MuiButton-root': {
                fontWeight: 'normal !important',
            },
            '.MuiListItem-root': {
                paddingTop: '2px',
                paddingRight: theme.spacing(2),
                paddingBottom: '2px',
                paddingLeft: theme.spacing(2),
                '.MuiButton-root': {
                    display: 'flex',
                    color: theme.sidebar.menuItemColor,
                    backgroundColor: theme.sidebar.menuItemBg,
                    width: '100%',
                    justifyContent: 'flex-start',
                    fontSize: theme.typography.pxToRem(13),
                    paddingTop: theme.spacing(0.8),
                    paddingBottom: theme.spacing(0.8),
                    position: 'relative',
                    '.MuiBadge-root': {
                        position: 'absolute',
                        right: theme.spacing(4),
                        '.MuiBadge-standard': {
                            background: theme.colors.primary.main,
                            fontSize: theme.typography.pxToRem(9),
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            color: theme.palette.primary.contrastText,
                        }
                    },
                    '.MuiButton-startIcon, .MuiButton-endIcon': {
                        transition: theme.transitions.create(['color']),
                        '.MuiSvgIcon-root': {
                            fontSize: 'inherit',
                            transition: 'none',
                        }
                    },
                    '.MuiButton-startIcon': {
                        fontSize: theme.typography.pxToRem(26),
                        marginRight: theme.spacing(1.5),
                        color: theme.sidebar.menuItemIconColor,
                    },
                    '.MuiButton-endIcon': {
                        marginLeft: 'auto',
                        fontSize: theme.typography.pxToRem(22),
                    },
                    '&.Mui-active, &:hover': {
                        backgroundColor: theme.sidebar.menuItemBgActive,
                        color: theme.sidebar.menuItemColorActive,
                        '.MuiButton-startIcon, .MuiButton-endIcon': {
                                color: theme.sidebar.menuItemIconColorActive,
                        }
                    },
                },
                '&.Mui-children': {
                    flexDirection: 'column',
                    lineHeight: 1,
                }
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
            </MenuSubEntryWrapper>
        </>
    );
};

export default SidebarMenu;
