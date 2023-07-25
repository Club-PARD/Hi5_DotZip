import React, { useEffect } from 'react';
import Animation from './Animation';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerNavBar from "../../AnswerNavbar"

const Div = styled.div`
width: 327px;
margin: 0px auto;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
`;
const Container = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-top: 100px;
width: 100%;
`;
const Header1=styled.div`
color: var(--gray-90, #353535);

/* Head/H3-24-B */
font-size: 18px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 28px;

`;


const Header2=styled.div`
color: var(--gray-90, #353535);
position: absolute;
/* Head/H3-24-B */
font-size: 18px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 28px;
margin-top: 200px;
`;
const AnswerLoading = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const navigateToAnswerEnd = () => {
        navigate(`/AnswerEnd/${questionId}`, { replace: true });
      };
      useEffect(() => {
        const timer = setTimeout(() => {
          navigateToAnswerEnd();
        }, 2000);
    
        return () => clearTimeout(timer);
      }, []);
  return (
    <Div>
      <AnswerNavBar/>
      <Container>
        <></>
    <Header1>작성해주신 답변을</Header1>
    <Header1>질문 폴더로 전달하고 있어요! </Header1>
    </Container>
    {/* <Header2></Header2> */}
        <Animation/>
    </Div>
  );
};

export default AnswerLoading;

