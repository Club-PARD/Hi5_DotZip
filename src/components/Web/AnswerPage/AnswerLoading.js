import React, { useEffect } from 'react';
import Animation from './Animation';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const Div = styled.div`
width: 300px;
height: 300px;
background-color: aqua;
margin: 200px auto;
`;
const AnswerLoading = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const navigateToAnswerEnd = () => {
        navigate(`/AnswerEnd/${questionId}`);
      };
      useEffect(() => {
        const timer = setTimeout(() => {
          navigateToAnswerEnd();
        }, 2000);
    
        return () => clearTimeout(timer);
      }, []);
  return (
    <Div>
    <div>작성해주신 답변이 <br/> userName폴더에 전달되고 있어요</div>
    <div>00님을 잘 아시는군요?</div>

        <Animation/>
    </Div>
  );
};

export default AnswerLoading;

