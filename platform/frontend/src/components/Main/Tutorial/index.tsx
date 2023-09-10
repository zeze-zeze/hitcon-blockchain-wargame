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
                                multiLang?.tutorial.content.map((display: HeaderType | BodyType) => ((
                                    <Fragment key={JSON.stringify(display)}>
                                        {
                                            display.type === "header" ? (
                                                <SubHeaderTypography>
                                                    {display.data}
                                                </SubHeaderTypography>
                                            ) : (
                                                <Fragment>
                                                    {
                                                        display.children.map((paragraph: TutorialType[]) => ((
                                                            <BodyTypography key={JSON.stringify(paragraph)}>
                                                                {
                                                                    paragraph.map((statement: TutorialType) => ((
                                                                        <Fragment key={JSON.stringify(statement)}>
                                                                            {
                                                                                statement.type === "text" ? (
                                                                                    statement.data
                                                                                ) : statement.type === "code" ? (
                                                                                    <code>{statement.data}</code>
                                                                                ) : statement.type === "link" ? (
                                                                                    <a target="_blank" href={statement.to?.replace(
                                                                                        "REACT_APP_BASE_URL",
                                                                                        baseURL
                                                                                    )}>{statement.data}</a>
                                                                                ) : (
                                                                                    <Fragment />
                                                                                )
                                                                            }
                                                                        </Fragment>
                                                                    )))
                                                                }
                                                            </BodyTypography>
                                                        )))
                                                    }
                                                </Fragment>
                                            )
                                        }
                                    </Fragment>
                                )))
                            }
                        </Container>
                    </PaperComponentWrapper>
                </Grid>
            </Grid>
        </MainWrapper>
    );
}

export default Tutorial;
