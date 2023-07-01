import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;

`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0;
    padding: 0;
    background-color: aqua;
`;
//버튼들
const Button = styled.button`
    width: 100%;
    height: 48px;
    padding-left: 24px;
    background: #FFF8F3;
    text-align: left;
    font-size: 16px;
    font-family: Pretendard;
    border-style: none;
    position: relative;
    overflow: hidden;

    &::after {
        content: '>';
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
`;

const Divide = styled.div`
    width: 100%;
    height: 76px;
    background: #FFF8F3;
    border-style: none;
    text-align: left;

    display: flex;
    align-items: center;
    margin-top: 24px;
`;
const DivideContent = styled.div`
    padding-left: 24px;
    font-size: 20px;
    font-family: Pretendard;
    font-weight: 700;
`;
function Setting() {

    return(
        <DDiv>
        <Div>
            <h1>환경설정</h1>
            <h3>더 나은 서비스를 위해 계속 발전시켜 갈게요!</h3>
            <Divide>    <DivideContent>고객센터</DivideContent></Divide>
            <Button>문의하기</Button>
            <Button>팀소개</Button>
            <Divide>    <DivideContent>계정관리</DivideContent></Divide>
            <Button>약관</Button>
            <Button>로그아웃</Button> {/*현승오빠가 만들어둔 부분 가져오기 */}
            <Button>탈퇴</Button>
        </Div>
        </DDiv>
    );
};

export default Setting;