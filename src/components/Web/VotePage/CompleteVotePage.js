import styled from "styled-components";
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const Div = styled.div`

`;

const LinkButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;

const Message = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 10px;
    border: 1px solid black;
`;


function CompleteVotePage() {
    const voteLink = window.location.href;
    const [showMessage, setShowMessage] = useState(false);

    const handleCopyLink = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    };

    return(
        <Div>
            <h1>투표 생성이 완료되었어요.</h1>
            <h3>링크로 투표를 공유해보세요.</h3>

            <h2>투표제목 그대로 받아오기</h2>
            <h1>이전에 선택한 답변들 나열하고!!!</h1>
            <CopyToClipboard text={voteLink}>
                <LinkButton onClick={handleCopyLink}>링크 복사하기</LinkButton>
            </CopyToClipboard>
            {showMessage && <Message>링크가 복사되었습니다</Message>}
        </Div>
    );
};

export default CompleteVotePage;