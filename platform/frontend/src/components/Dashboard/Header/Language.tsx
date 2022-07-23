import { FC, useContext } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LanguageContext from 'contexts/LanguageContext';
import { useTheme } from '@mui/material/styles'

const Language: FC = () => {

    const { changeLang } = useContext(LanguageContext);
    const theme = useTheme();

    return (
        <>
            <Box sx={{ padding: theme.spacing(1) }}>
                <Button
                    color="primary"
                    variant="text"
                    onClick={() => {
                        changeLang("en-US");
                    }}
                    fullWidth
                >
                    English
                </Button>
                <Button
                    color="primary"
                    variant="text"
                    onClick={() => {
                        changeLang("zh-TW");
                    }}
                    fullWidth
                >
                    繁體中文
                </Button>
            </Box>
        </>
    )
}

export default Language;
