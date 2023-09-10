import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Button,
    List,
    ListItem,
    ListSubheader,
    SvgIcon,
    alpha,
    lighten
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import FlagIcon from '@mui/icons-material/Flag';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageContext from 'contexts/LanguageContext';

const WaterDropIcon: FC = () => {
    return (
        <SvgIcon viewBox="0 0 48 48">
            <path d="M24 44Q17.65 44 12.825 39.575Q8 35.15 8 27.6Q8 22.6 11.975 16.725Q15.95 10.85 24 4Q32.05 10.85 36.025 16.725Q40 22.6 40 27.6Q40 35.15 35.175 39.575Q30.35 44 24 44ZM23.95 37.6Q24.75 37.6 25.175 37.325Q25.6 37.05 25.6 36.5Q25.6 35.95 25.175 35.65Q24.75 35.35 23.9 35.35Q21.8 35.35 19.625 34.025Q17.45 32.7 16.85 29.35Q16.75 28.9 16.4 28.625Q16.05 28.35 15.65 28.35Q15.1 28.35 14.8 28.775Q14.5 29.2 14.6 29.65Q15.35 33.85 18.15 35.725Q20.95 37.6 23.95 37.6Z"/>
        </SvgIcon>
    );
};

const MenuEntryWrapper = styled(List)(
    ({ theme }) => ({
        margin: theme.spacing(1),
        padding: 0,
        '& > .MuiList-root': {
            padding: theme.spacing(0, 2, 2, 2)
        },
        '.MuiListSubheader-root': {
            color: theme.colors.alpha.trueWhite[50],
            padding: theme.spacing(1.5, 2),
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
                    color: theme.colors.alpha.trueWhite[70],
                    backgroundColor: 'transparent',
                    width: '100%',
                    justifyContent: 'flex-start',
                    padding: theme.spacing(1.2, 3),
                    '.MuiButton-startIcon, .MuiButton-endIcon': {
                        transition: theme.transitions.create(['color']),
                        '.MuiSvgIcon-root': {
                            fontSize: 'inherit',
                            transition: 'none',
                        }
                    },
                    '.MuiButton-startIcon': {
                        fontSize: theme.typography.pxToRem(24),
                        marginRight: theme.spacing(2),
                        color: theme.colors.alpha.trueWhite[30],
                    },
                    '.MuiButton-endIcon': {
                        color: theme.colors.alpha.trueWhite[50],
                        marginLeft: 'auto',
                        opacity: '0.8',
                        fontSize: theme.typography.pxToRem(20),
                    },
                    '&.Mui-active, &:hover': {
                        backgroundColor: alpha(theme.colors.alpha.trueWhite[100], 0.2),
                        color: lighten(theme.colors.alpha.trueWhite[100], 0.05),
                        '.MuiButton-startIcon, .MuiButton-endIcon': {
                            color: lighten(theme.colors.alpha.trueWhite[100], 0.05),
                        }
                    },
                },
            }
        }
    })
);

const SidebarMenu: FC = () => {
    
    const { multiLang } = useContext(LanguageContext);

    return (
        <>
            <MenuEntryWrapper subheader={
                <ListSubheader disableSticky>
                    {multiLang?.dashboard.sidebar.subheader}
                </ListSubheader>
            }/>
            <MenuSubEntryWrapper>
                { /* Add new menu entries here */ }
                <ListItem>
                    <Button component={NavLink} startIcon={<HomeIcon />} to="/home" >
                        {multiLang?.dashboard.sidebar.entries.home}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<SchoolIcon />} to="/tutorial" >
                        {multiLang?.dashboard.sidebar.entries.tutorial}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<WaterDropIcon />} to="/faucet" >
                        {multiLang?.dashboard.sidebar.entries.faucet}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<FlagIcon />} to="/challenges" >
                        {multiLang?.dashboard.sidebar.entries.challenges}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={NavLink} startIcon={<LogoutIcon />} to="/" >
                        {multiLang?.dashboard.sidebar.entries.logout}
                    </Button>
                </ListItem>
            </MenuSubEntryWrapper>
        </>
    );
};

export default SidebarMenu;
