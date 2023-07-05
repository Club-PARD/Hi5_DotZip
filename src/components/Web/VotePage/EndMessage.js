import styled from "styled-components";
import React from 'react';

const Box = styled.div`
    width: 343px;
    height: 40px;
    border-radius: 8px;
    background: var(--orange-primary, #EC582F);
    backdrop-filter: blur(2px);
    position: fixed;
    left: 49.5%;
    transform: translateX(-50%);
    bottom: 10%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Text = styled.p`
    color: white;
    text-align: center;
    font-size: 14px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
`;

const EndMessage = () => {
    return (
        <>
        <Box>
            <Text>투표가 종료되었어요.</Text>
        </Box>
        </>

    );
}
export default EndMessage;