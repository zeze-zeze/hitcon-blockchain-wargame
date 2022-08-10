import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import MainWrapper from 'components/Main';
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    BodyTypography,
    PaperComponentWrapper
} from 'components/Main';
import LanguageContext from 'contexts/LanguageContext';
import { string } from 'prop-types';

type TutorialType = {
    type: string;
    data: string;
    to?: string;
};

type HeaderType = {
    type: 'header';
    data: string;
};
type BodyType = {
    type: 'body';
    children: TutorialType[][];
};

const Tutorial: FC = () => {
    const { multiLang } = useContext(LanguageContext);
    const [baseURL, setBaseURL] = useState<string>("");
    
    useEffect(() => {
        switch (process.env.NODE_ENV) {
            case "development":
                setBaseURL(process.env.REACT_APP_BASE_URL_DEV as string);
                break;
            case "test":
                setBaseURL(process.env.REACT_APP_BASE_URL_TEST as string);
                break;
            case "production":
                setBaseURL(process.env.REACT_APP_BASE_URL_PROD as string);
                break;
            default:
                setBaseURL(process.env.REACT_APP_BASE_URL_DEV as string);
                break;
        }
    }, []);
    return (
        <MainWrapper title="Tutorial">
            <Grid container>
                <Grid item xs={12}>
                    <HeaderWrapper>
                        <HeaderTypography>
                            {multiLang?.tutorial.title}
                        </HeaderTypography>
                        <SubtitleTypography>
                            {multiLang?.tutorial.subtitle}
                        </SubtitleTypography>
                    </HeaderWrapper>
                </Grid>
                <Grid item xs={12}>
                    <PaperComponentWrapper>
                        <Container>
                            {
                                multiLang?.tutorial.content.map((display: HeaderType | BodyType) => {
                                    if (display.type === "header") {
                                        return (
                                            <SubHeaderTypography key={JSON.stringify(display)}>
                                                {display.data}
                                            </SubHeaderTypography>
                                        )
                                    } else if (display.type === "body") {
                                        return (
                                            <Fragment key={JSON.stringify(display)}>
                                                {
                                                    display.children.map((paragraph: TutorialType[]) => {
                                                        return (
                                                            <BodyTypography>
                                                                {
                                                                    paragraph.map((statement: TutorialType) => {
                                                                        if (statement.type === "text") {
                                                                            return statement.data;
                                                                        } else if (statement.type === "code") {
                                                                            return (
                                                                                <code>{statement.data}</code>
                                                                            )
                                                                        } else if (statement.type === "link") {
                                                                            return (
                                                                                <a target="_blank" href={statement.to?.replace(
                                                                                    "REACT_APP_BASE_URL",
                                                                                    baseURL
                                                                                )}>{statement.data}</a>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </BodyTypography>
                                                        );
                                                    })
                                                }
                                            </Fragment>
                                        );
                                    }
                                })
                            }
                        </Container>
                    </PaperComponentWrapper>
                </Grid>
            </Grid>
        </MainWrapper>
    );
}

export default Tutorial;
