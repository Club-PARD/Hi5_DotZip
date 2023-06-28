import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import styled from 'styled-components';
import { KakaoIdContext} from '../../../KakaoIdContext';
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
  left: calc(50% - 311px/2);
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
  height: 812px;
  background: black;
  margin: 0 auto;
  overflow-x: hidden;
`;
const P = styled.button`
background: #EEFF01;
 
`;

const HomePageFirst = () => {
  const navigate = useNavigate();
  // const [kakaoContext] = useContext(KakaoIdContext);
  // console.log("userId : ", kakaoContext);//userId
  const kakaoId = localStorage.getItem("kakaoId");
  const [userContext] = useContext(UserNameContext);
  console.log("username: ", userContext);
  console.log(localStorage.getItem("kakaoId"));
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'zip_Question'), where('kakaoId', '==', kakaoId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const questionList = snapshot.docs.map((doc) => doc.data());
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

  return (
    <Div>
      <Survey>
        <Header2>
        <HeaderDiv>.zip에서 나의 새로운 모습을 찾아가보세요!</HeaderDiv>
          <HeaderP>궁금한 질문을 담은 링크를 공유해보세요.</HeaderP>

        </Header2>
        <button onClick={handleButton1Click}>My Profile .Zip</button> 
        <button onClick={handleButtonClick}>새로운 .Zip 만들기</button>
        <button onClick={handleButton2Click}>answer가기</button>
        <button onClick={handleButtonPickAnswer}>pickanswer가기</button>
        <Header3>진행중인 .Zip</Header3>
        {questions.map((question) => (
        <div key={question.questionId}>
          {question && question.question && (
          <P onClick={() => handleQuestionClick(question.questionId)}>
            Question: {question.question} <br />
            Comment: {question.comment}
          </P>
          )}
        </div>
        ))}
      </Survey>
    </Div>
  );
};

export default HomePageFirst;
