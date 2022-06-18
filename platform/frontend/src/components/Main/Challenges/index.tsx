import { FC } from 'react';
import { useParams} from "react-router-dom";
import { Grid, Container } from '@mui/material';
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    BodyTypography,
    PaperComponentWrapper
} from '..';
import MainWrapper from 'components/Main';
import Error404 from 'components/Error/_404.tsx';
import HighLight from 'react-highlight';

const SolidityCodeBlock: FC = ({ code }) => {
    return (
        <pre>
        { code }
        </pre>
    );
};

const Challenge: FC = () => {
    const { id } = useParams();
    const problemId = Number(id);
    const problemNum = Number(process.env.REACT_APP_PROBLEM_NUM);

    const chal = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Fallback {

    using SafeMath for uint256;
    mapping(address => uint) public contributions;
    address payable public owner;

    constructor() public {
        owner = msg.sender;
        contributions[msg.sender] = 1000 * (1 ether);
    }

    modifier onlyOwner {
                require(
                        msg.sender == owner,
                        "caller is not the owner"
                );
                _;
        }

    function contribute() public payable {
        require(msg.value < 0.001 ether);
        contributions[msg.sender] += msg.value;
        if(contributions[msg.sender] > contributions[owner]) {
            owner = msg.sender;
        }
    }

    function getContribution() public view returns (uint) {
        return contributions[msg.sender];
    }

    function withdraw() public onlyOwner {
        owner.transfer(address(this).balance);
    }

    receive() external payable {
        require(msg.value > 0 && contributions[msg.sender] > 0);
        owner = msg.sender;
    }
}
`;
    
    if (Number.isInteger(problemId) && problemId >= 1 && problemId <= problemNum) {
        return (
            <MainWrapper>
                <Grid container>
                    <Grid xs={12}>
                        <HeaderWrapper>
                            <HeaderTypography>
                                Fallback
                            </HeaderTypography>
                            <SubtitleTypography>
                                Look carefully at the contract's code below. You will beat this level if
                                <ol>
                                    <li>you claim ownership of the contract</li>
                                    <li>you reduce its balance to 0</li>
                                </ol>
                            </SubtitleTypography>
                            <SubtitleTypography>
                            </SubtitleTypography>
                        </HeaderWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperComponentWrapper>
                            <Container>
                                <SubHeaderTypography>
                                    Source
                                </SubHeaderTypography>
                                <BodyTypography>
                                    <SolidityCodeBlock code={chal} />
                                </BodyTypography>
                            </Container>
                        </PaperComponentWrapper>
                    </Grid>
                </Grid>
            </MainWrapper>
        );
    } else {
        return (
            <Error404 />
        );
    }
}

export default Challenge;
