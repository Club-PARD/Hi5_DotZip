import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Div = styled.div`

`;
//랭킹 top3 키워드
const VoteKewordBox = styled.div`
    width: 200px;
    height: 100px;
    margin: 5px;
    border: 1px solid black;
    background: skyblue;
    color: #ffffff;
`;
//버튼들
const LogOutButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const InquiryButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const IntroduceButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const OutButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;

function Setting() {

    return(
        <Div>
            <h1>환경설정</h1>
            <h3>더 나은 서비스를 위해 계속 발전시켜 갈게요!</h3>
            <InquiryButton>문의하기</InquiryButton>
            <IntroduceButton>팀소개</IntroduceButton>
            <LogOutButton>로그아웃</LogOutButton> {/*현승오빠가 만들어둔 부분 가져오기 */}
            <OutButton>탈퇴</OutButton>
        </Div>
    );
};

export default Setting;