import styled, { css, keyframes } from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import BackNavBar from "../../BackNavbar"
import { useNavigate } from 'react-router-dom';
import AnoQues from '../../../img/AnoQues.png';
import FoldImg from '../../../img/FoldImg.png';
import GoHomeNoBackGround from '../../../img/GoHomeNoBackGround.png';
const DDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
  

const Div = styled.div`
display: flex;
  flex-direction: column;
  width: 375px;
  height: 812px;
  margin: 0 auto;
  /* background-color:aqua; */
`;
const Top = styled.header`
margin-top: 32px;
    color: var(--orange-primary, #EC582F);

/* Head/H3-24-B */
font-family: PretendardBold;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 28px; /* 116.667% */
margin-left: 24px;
margin-bottom: 8px;
`;

const TopP = styled.header`
//styleName: Body/B4-14-SB;
font-family: PretendardSemi;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
color: #808080;
margin-left: 24px;
`;

const IMG = styled.img`
width: 155px;
height: 159px;
margin-top: 114px;
margin-left: 110px;
margin-bottom: 168px;

`;

const ButtonNew = styled.img`
width: 327px;
height: 48px;
margin-top: 20px;
margin-left: 24px;
cursor: pointer;

`;
const Home = styled.img`
width: 327px;
height: 48px;
margin-top: 8px;
margin-left: 24px;
cursor: pointer;

`;

function SurveyNew() {
    const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when the component mounts
    }, []);
  
    const handleSubmit = () => {
        navigate('/SurveyFirst'); // Replace with the actual path you want to navigate to
      };
    const handleHome = () => {
        navigate('/home'); // Replace with the actual path you want to navigate to
      };

  

    return(
        <>
        <DDiv>
        <BackNavBar/>
        <Div>
        <Top>질문 전달 완료!</Top>
        <TopP>소중한 질문 남겨주셔서 감사해요!</TopP>
        <TopP>곧 업데이트될 질문 폴더를 확인해주세요 :)</TopP>
       <IMG src={FoldImg}/>
        <ButtonNew src={AnoQues} onClick={handleSubmit}></ButtonNew>
        <Home src={GoHomeNoBackGround} onClick={handleHome}></Home>
        </Div>
        </DDiv>
        
        </>

    )

}
export default SurveyNew;

