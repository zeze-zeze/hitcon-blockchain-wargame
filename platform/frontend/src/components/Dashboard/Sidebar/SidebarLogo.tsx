import { FC } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import Image from 'material-ui-image';
import LogoImage from 'assets/logo.svg';

const LogoWrapper = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '88px',
        margin: theme.spacing(2),
        borderBottomWidth: '5px',
        borderBottomColor: theme.sidebar.dividerBg,
        borderBottomStyle: 'solid',
    })
);

const LogoContainerWrapper = styled(Link)(
    ({ theme }) => ({
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
        display: 'flex',
        justifyContent: 'space-around',
        textDecoration: 'none',
    })
);

const LogoImageWrapper = styled(Box)(
    ({ theme }) => ({
        width: '48px',
        height: '48px',
    })
);

const LogoTextWrapper = styled(Box)(
    ({ theme }) => ({
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: theme.colors.alpha.trueWhite[50],
    })
);

const LogoText = styled(Box)(
    ({ theme }) => ({
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
        marginTop: '12px',
        marginLeft: '9px',
    })
);


const SidebarLogo: FC = () => {

    return (
        <LogoWrapper>
            <LogoContainerWrapper to="/">
                <LogoImageWrapper>
                    <Image src={LogoImage} alt="logo" disableSpinner disableTransition />
                </LogoImageWrapper>
                <LogoTextWrapper>
                    <LogoText>HITCON Wargame</LogoText>
                </LogoTextWrapper>
            </LogoContainerWrapper>
        </LogoWrapper>
    );
}

export default SidebarLogo;
