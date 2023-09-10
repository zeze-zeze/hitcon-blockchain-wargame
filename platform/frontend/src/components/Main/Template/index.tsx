import { FC } from 'react';
import MainWrapper from '..';
import { useWeb3React } from "@web3-react/core";

/* 
 * ../index.tsx 有提供一些已經 styled 好的一些 Wrapper 可以用。
 * 例如如果要用 HeaderTypography 的話，可以用
 * import { MainWrapper } from '..'
 * 直接載入
 */

const Template: FC = () => {

    return (
        <MainWrapper title="template">
            <h1>
                CHANGE HERE!!!
            </h1>
        </MainWrapper>
    );
}

/* 
 * 之後記得在 Router/route.tsx 加入 route 喔！
 */

export default Template;
