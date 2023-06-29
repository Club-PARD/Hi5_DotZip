import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import styled from 'styled-components';
import { KakaoIdContext } from '../../../KakaoIdContext';
import { UserNameContext } from '../../../UserNameContext';

const Div = styled.div`
  margin-top: 70px;
  height: 1000px;
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

const HeaderDiv = styled.header`
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #efefef;
  left: calc(50% - 311px / 2);
`;

const Header3 = styled.p`
  width: 110px;
  height: 24px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #efefef;
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
`;

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
  height: 1000px;
  background: black;
  margin: 0 auto;
  overflow-x: hidden;
`;

const P = styled.button`
  background: #eeff01;
`;

const HomeP = styled.p`
  gap: 10px;
  width: 120px;
  color: white;
  border-bottom: 2px solid white;
`;


const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
background: #D9D9D9;
width: 375px;
height: 96px;
margin-bottom: 10px;

`;
const ButtonQ = styled.button`
  width: 136px;
  height: 136px;
  justify-self: flex-start;
`;
const ButtonQ1 = styled.button`
  width: 136px;
  height: 136px;
  justify-self: flex-start;
`;

const NewQ = styled.header`
font-family: Pretendard;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
color: white;

`;

const Newq = styled.header`
font-family: Pretendard;
font-size: 14px;
font-weight: 700;
line-height: 17px;
letter-spacing: 0em;
text-align: left;
color:white;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const Questionp = styled.button`
color: black;
width: 319px;
height: 259px;
background: #D9D9D9;
font-family: Pretendard;

`;


const HomePageFirst = () => {
  const navigate = useNavigate();
  const kakaoId = localStorage.getItem('kakaoId');
  //const [userContext] = useContext(UserNameContext);
  const [userNickname] = useState(localStorage.getItem("userName"));
  console.log(localStorage.getItem('userName'));
  console.log(localStorage.getItem('kakaoId'));
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'zip_Question'), where('kakaoId', '==', kakaoId), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const questionList = [];
      snapshot.forEach((doc) => {
        if (doc.data().kakaoId === kakaoId) {
          questionList.push(doc.data());
        }
      });
      setQuestions(questionList);
    });

    return () => {
      unsubscribe();
    };
  }, [kakaoId]);

  const handleQuestionClick = (questionId) => {
    navigate(`/PickAnswer/${questionId}`);
  };

  const handleButtonClick = () => {
    navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
  };

  const handleButton1Click = () => {
    navigate('../../../../MyProfile'); // Replace with the actual path you want to navigate to
  };
  const handleButton2Click = () => {
    navigate(`/Answer/${kakaoId}`); // Replace with the actual path you want to navigate to
  };
  const handleButtonPickAnswer = () => {
    navigate('/PickAnswer'); // Replace with the actual path you want to navigate to
  };
  const handleButton3Click = () => {
    navigate(`/VotingPage`); // Replace with the actual path you want to navigate to
  };
  const handleButton4Click = () => {
    navigate(`/VotingPage`); // Replace with the actual path you want to navigate to
  };

  return (
    <Div>
      <Survey>
        <Header2>
          <HeaderDiv>안녕하세요, {userNickname}님</HeaderDiv>
          <HeaderP>폴더를 만들어 새로운 조이님의 모습을 발견해보세요.</HeaderP>
        </Header2>
        <ButtonContainer>
          <HomeP>Home</HomeP>
          <button onClick={handleButton3Click}>내 폴더</button>
          <button onClick={handleButton1Click}>My .Zip</button>
        </ButtonContainer>
        <Button>인기 질문 하나 노출</Button>
        <NewQ>NEW 폴더 만들기 </NewQ>
        <Newq>궁금한 질문을 담은 폴더 링크를 공유해보세요. </Newq>
        <button onClick={handleButtonClick}>전체보기</button>
        <ButtonsContainer>
          <ButtonQ>나에게 어울리는 컬러는?</ButtonQ>
          <ButtonQ1>나에게 어울리는 동물은?</ButtonQ1>
        </ButtonsContainer>

        <button onClick={handleButtonClick}> + 내가 직접 질문 만들기</button>
        {/* <button onClick={handleButton2Click}>answer가기</button>
        <button onClick={handleButtonPickAnswer}>pickanswer가기</button> */}
        <Header3>진행중인 폴더</Header3>
        <button onClick={handleButton3Click}>전체보기</button>
        {questions.length > 0 ? (
  questions.slice(0, 3).map((question) => (
    <div key={question.questionId}>
      {question && question.question && (
        <P onClick={() => handleQuestionClick(question.questionId)}>
          Question: {question.question} <br />
          Comment: {question.comment}
        </P>
      )}
    </div>
  ))
) : (
  <Questionp>
    진행중인 폴더가 없어요! <br /> +NEW 폴더 만들기
  </Questionp>
)}


{/* 
      </Survey>
      {/* <Header3>진행중인 .Zip</Header3>
        {questions.map((question) => (
          <div key={question.questionId}>
            {question && question.question && (
              <P onClick={() => handleQuestionClick(question.questionId)}>
                Question: {question.question} <br />
                Comment: {question.comment}
              </P>
            )}
          </div>
        ))} */}
      </Survey>
    </Div>
  );
};

export default HomePageFirst;
