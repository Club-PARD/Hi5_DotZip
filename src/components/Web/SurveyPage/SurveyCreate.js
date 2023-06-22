import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { authService, dbService } from '../../../fbase';
import { query, collection, addDoc, where, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
  height: 812px;
  background: black;
  margin: 0 auto;
  overflow-x: hidden;
`;

const HeaderDiv = styled.header`
  width: 120px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #efefef;
  left: calc(50% - 311px / 2);
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
`;

const HeaderP = styled.p`
  width: 260px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 19px;
  color: #818181;
`;

const HeaderName = styled.p`
  width: 115px;
  height: 24px;
  top: 121px;
  left: 30px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #efefef;
`;

const Button = styled.button`
  width: 75px;
  height: 72px;
  top: 157px;
  left: 150px;
  background: ${({ active }) => (active ? '#d9d9d9' : '#353535')};
`;

const InputQues = styled.textarea`
  width: 320px;
  height: 68px;
  top: 240px;
  left: 28px;
  background: #d9d9d9;
  margin: 30px;
`;

const InputQues1 = styled.textarea`
  width: 320px;
  height: 68px;
  top: 316px;
  left: 28px;
  background: #d9d9d9;
  margin: 30px;
`;

const InputVote = styled.button`
  width: 320px;
  height: 68px;
  top: 423px;
  left: 28px;
`;

const Submit = styled.button`
  width: 320px;
  height: 68px;
  top: 530px;
  left: 28px;
`;

const Div = styled.div`
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function SurveyCreate() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (currentUser && currentUser.uid) {
      const questionId = uuidv4();
      console.log('질문 데이터:', { questionId, question, comment });
      try {
        await addDoc(collection(dbService, 'question'), {
          userId: currentUser.uid,
          questionId,
          question,
          comment
        });
  
        console.log('저장됨');
        setQuestion('');
        setComment('');
        navigate('/SurveyShare');
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  };
  

  return (
    <Div>
      <Survey>
        <Header2>
          <HeaderDiv>새로운 .ZiP 만들기</HeaderDiv>
          <HeaderP>궁금한 질문을 담은 링크를 공유해보세요.</HeaderP>
          <HeaderName>ㅇㅇ님의 .ZiP</HeaderName>
        </Header2>
        <Button>이모지선택</Button>
        <InputQues
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문 직접 등록"
        />
        <InputQues1
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="질문 코멘트 입력(선택사항)"
        />
        <InputVote>+투표 항목 추가하기</InputVote>
        <Submit onClick={handleSubmit}>질문 저장하기</Submit>
      </Survey>
    </Div>
  );
}

export default SurveyCreate;
