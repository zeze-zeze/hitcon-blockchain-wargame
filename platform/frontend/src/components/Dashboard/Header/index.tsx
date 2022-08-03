import { FC, useContext } from "react";
import {
    Box,
    IconButton,
    Tooltip,
    useMediaQuery,
    lighten
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HeaderButtons from "./HeaderButtons";
import HeaderUserMenu from "./HeaderUserMenu";
import SidebarToggledContext from "contexts/SidebarToggledContext";
import { useWeb3React } from "@web3-react/core";
import HeaderNFTList from "./HeaderNFTList";
import LanguageContext from "contexts/LanguageContext";
import Web3Context from "contexts/Web3Context";
import ConnectButton from "components/Connect/ConnectButton";


const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: 'auto',
    height: theme.header.height,
    color: theme.header.textColor,
    padding: theme.spacing(3),
    backgroundColor: theme.colors.alpha.black[100],
    boxShadow: lighten(theme.colors.primary.main, 0.7),
}));

const HeaderComponentsWrapper = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
        alignItems: "center",
    })
);

const Header: FC = () => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const showSolved = useMediaQuery("(min-width:940px)");
    const { sidebarToggled, toggleSidebar } = useContext(SidebarToggledContext);
    const { active } = useWeb3React();

    const { solved } = useContext(Web3Context);
    const { multiLang } = useContext(LanguageContext);

    /* 
     * Adjust the width & left property according to
     * 1. current screen size
     * 2. whether the current left sidebar is toggled
     */

    return (
        <>
            {
                /* 
                 * If the current window size is big enough & left sidebar is toggled,
                 * the header should not span across the menu.
                 * Otherwise, the header"s width should be equivalent to the screen"s width
                 */
                <HeaderWrapper sx={{ left: lgUp && sidebarToggled ? theme.sidebar.width : 0 }}>
                    <HeaderComponentsWrapper>
                        <Tooltip arrow title={multiLang?.dashboard.header.tooltip.toggleMenu ?? ""}>
                            <IconButton color="primary" onClick={toggleSidebar}>
                                {sidebarToggled ? <MenuOpenIcon /> : <MenuIcon />}
                            </IconButton>
                        </Tooltip>
                    </HeaderComponentsWrapper>
                    <HeaderComponentsWrapper>
                        {showSolved && <HeaderNFTList />}
                    </HeaderComponentsWrapper>
                    <HeaderComponentsWrapper>
                        <HeaderButtons />
                        {
                            active ? (
                                <HeaderUserMenu />
                            ) : (
                                <ConnectButton />
                            )
                        }
                    </HeaderComponentsWrapper>
                </HeaderWrapper>
            }
        </>
    )
};

export default Header;
