import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackNavBar from '../../BackNavbar';
import front from '../../../img/front.png'
const DDiv = styled.div`
    display: flex; //유연하게 바꾸는 역할
    justify-content: center; // 중간으로 모으는 역할
    width: 100%; //100퍼센트의 중간
    height: 812px; // 임의값
`;

const Div = styled.div`
    display: flex; //유연하게
    flex-direction: column; //세로로 보여주는 역할
    width: 375px; // 375px 고정값
`;
const Header1 = styled.div`
    padding-left: 24px;
    font-family: PretendardBold;
    font-size: 24px;
`;
const Body1 = styled.div`
    padding-left: 24px;
    padding-top : 8px;
    color : gray;
    font-family: PretendardSemi;
    font-size: 14px;
    font-weight: 600;
`;

const NavBarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 375px;
  z-index:0;
  background-color: white;
  color: white;
`;


//버튼들
const Button = styled.button`
    width: 100%;
    height: 48px;
    padding-left: 24px;
    background: #FFF8F3;
    text-align: left;
    font-size: 16px;
    font-family: PretendardSemi;
    border-style: none;
    position: relative;
    color: var(--gray-90, #353535);
`;
const Front  = styled.img `
position: absolute;
width: 6px;
height: 12px;
right: 20px;
cursor: pointer;
`;

const Divide = styled.div`
    width: 100%;
    height: 76px;
    background: #FFF8F3;
    text-align: left;
    display: flex;
    align-items: center;
    margin-top: 24px;
`;
const DivideContent = styled.div`
    padding-left: 24px;
    font-size: 20px;
    font-family: PretendardBold;
    font-weight: 700;
`;
function Setting() {
    const [accessToken, setAccessToken] = useState("");
    const navigate = useNavigate();
    const onClickInquire = () => {
        window.open('https://instagram.com/dot.zip_official?igshid=OGQ5ZDc2ODk2ZA==', '_blank'); //문의 페이지
    };

    const onClickTeam = () => {
        window.open('https://pumped-confidence-93d.notion.site/HI-5-2ede1c0bec7140129d737fa2175f03cd?pvs=4', '_blank'); // 팀소개 페이지
    };
    const onClickTerm = () => {
        window.open('https://www.notion.so', '_blank'); // 약관페이지
    };
    const onClickLogout = () => {
            if (window.Kakao.Auth.getAccessToken()) {
              window.Kakao.Auth.logout(() => {
                setAccessToken("");
              });
            }
            navigate("/");
    };
    const onClickDrop  = () => {
        localStorage.clear();
        navigate("/");
    };

    return(
        <>
        <BackNavBar/>
        <DDiv>
        <Div>
            <Header1>환경설정</Header1>
            <Body1>더 나은 서비스를 위해 계속 발전시켜 갈게요!</Body1>
            <Divide>    <DivideContent>고객센터</DivideContent></Divide>
            <NavBarWrapper>
            <Button onClick={onClickInquire}>문의하기</Button>
            <Front src={front}onClick={onClickInquire}></Front>
            </NavBarWrapper>
            <NavBarWrapper>
            <Button onClick={onClickTeam}>팀소개</Button>
            <Front src={front} onClick={onClickTeam}></Front>
            </NavBarWrapper>
            <Divide>    <DivideContent>계정관리</DivideContent></Divide>
            <NavBarWrapper>
            <Button onClick={onClickTerm}>약관</Button>
            <Front src={front} onClick={onClickTerm}></Front>
            </NavBarWrapper>
            <NavBarWrapper>
            <Button onClick={onClickLogout}>로그아웃</Button>
            <Front src={front} onClick={onClickLogout} ></Front>
            </NavBarWrapper> {/*현승오빠가 만들어둔 부분 가져오기 */}
            <NavBarWrapper>         
            <Button onClick={onClickDrop}>탈퇴</Button> 
            <Front src={front} onClick={onClickDrop} ></Front>
            </NavBarWrapper> 
        </Div>
        </DDiv>
        </>
    );
};

export default Setting;