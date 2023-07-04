import React, { useEffect } from 'react';
import Animation from './Animation';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const Div = styled.div`
width: 300px;
margin: 0px auto;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
`;
const Header1=styled.div`
color: var(--gray-90, #353535);

/* Head/H3-24-B */
font-size: 18px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 28px;
margin-top: 100px;
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
    const userName=localStorage.getItem("userName")
    const navigateToAnswerEnd = () => {
        navigate(`/AnswerEnd/${questionId}`);
      };
      useEffect(() => {
        const timer = setTimeout(() => {
          navigateToAnswerEnd();
        }, 2500);
    
        return () => clearTimeout(timer);
      }, []);
  return (
    <Div>
    <Header1>답변 가고 있는중...</Header1>
    {/* <Header2></Header2> */}
        <Animation/>
    </Div>
  );
};

export default AnswerLoading;

