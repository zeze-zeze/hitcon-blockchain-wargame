import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, List, ListItem, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';

import menuConfig from '../../../config/MenuConfig';

const MenuEntryWrapper: FC = styled(List)(
    ({ theme }) => ({
        marginBottom: theme.spacing(1),
        padding: 0,
        '& > .MuiList-root': {
            paddingTop: 0,
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        '.MuiListSubheader-root': {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: theme.typography.pxToRem(12),
            lineHeight: '1.4px',
            color: theme.sidebar.menuItemHeadingColor,
            padding: theme.spacing(0.8, 2),
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
            {
                <MenuSubEntryWrapper>
                {
                    menuConfig.map(({ title, link, icon }) => (
                        <ListItem key={title}>
                            <Button
                                component={NavLink}
                                startIcon={icon}
                                to={link}
                            >
                            {title}
                            </Button>
                        </ListItem>
                    ))
                }
                </MenuSubEntryWrapper>
            }
        </>
    );
};

export default SidebarMenu;
