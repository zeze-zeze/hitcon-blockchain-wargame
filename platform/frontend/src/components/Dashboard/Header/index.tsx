import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Avatar, Grid, IconButton, Tooltip, lighten, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HeaderButtons from "./HeaderButtons";
import HeaderUserMenu from "./HeaderUserMenu";
import SidebarToggledContext from "contexts/SidebarToggledContext";
import { useWeb3React } from "@web3-react/core";
import useSolvedProblems from "hooks/useSolvedProblems";
import LanguageContext from "contexts/LanguageContext";
import ConnectButton from "components/Connect/ConnectButton";

const HeaderWrapper = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "auto",
        height: theme.header.height,
        color: theme.header.textColor,
        padding: theme.spacing(3),
        backgroundColor: theme.colors.alpha.black[100],
        boxShadow: lighten(theme.colors.primary.main, 0.7),
    })
);

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
    const { sidebarToggled, toggleSidebar } = useContext(SidebarToggledContext);
    const { active } = useWeb3React();
    const { getSolvedProblems } = useSolvedProblems();

    const solvedProblems = getSolvedProblems();
    const { multiLang } = useContext(LanguageContext);

    const nftImgLinks = [
        "https://i.imgur.com/fSFl7io.png",
        "https://i.imgur.com/OP9jv73.png",
        "https://i.imgur.com/VRYrAZ5.png",
        "https://i.imgur.com/IFRMdTA.png",
        "https://i.imgur.com/lgGrqE6.png", 
        "https://i.imgur.com/yvn5IdB.png"
    ];

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
            <HeaderWrapper sx={{ left: lgUp && sidebarToggled ? theme.sidebar.width: 0 }}>
                <HeaderComponentsWrapper>
                    <Tooltip arrow title={multiLang?.dashboard.header.tooltip.toggleMenu}>
                        <IconButton color="primary" onClick={toggleSidebar}>
                            {sidebarToggled ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                    </Tooltip>
                </HeaderComponentsWrapper>
                <HeaderComponentsWrapper>
                    <Grid container justifyContent="center" alignItems="center" spacing={7}>
                    {
                        solvedProblems.map((solved: boolean, idx: number) => (
                            <Grid item xs={1} key={idx}>
                                <Tooltip arrow title={multiLang?.dashboard.header.tooltip.problems[idx]}>
                                    <Avatar
                                        variant="rounded"
                                        src={nftImgLinks[idx]}
                                        sx={{
                                            borderWidth: "3px",
                                            borderStyle: "dashed",
                                            borderColor: solved ? theme.colors.success.main : theme.colors.error.main,
                                            padding: "1px"
                                        }}
                                        imgProps={{
                                            style: {
                                                opacity: solved ? "100%" : "40%",
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                        ))
                    }
                    </Grid>
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

