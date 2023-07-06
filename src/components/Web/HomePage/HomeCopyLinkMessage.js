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
    top: 67%;
    /* transform: translateX(-50%); */
    transform: translate(-50%, -50%); /* 가운데 정렬을 위한 transform 설정 */
    bottom: 10%;
    z-index: 1000;
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

const CopyLinkMessage = () => {
    return (
        <>
        <Box>
            <Text>링크가 복사되었어요.</Text>
        </Box>
        </>
    );
}
export default CopyLinkMessage;