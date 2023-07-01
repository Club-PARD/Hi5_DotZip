import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where , orderBy} from 'firebase/firestore';
import styled from 'styled-components';
import CreateFolderButton from '../../../img/CreateFolderButton.png';
import BackNavBar from '../../BackNavbar';

const Div = styled.div`

`;
const Question = styled.button`
  background: #EEFF01;
  width : 400px;
  height : 100px;
  margin : 5px;
`;
const CreateFolderImage = styled.img`
  width: 147px;
  height: 40px;
`;
const NewFolderButton = styled.button`
  border: none;
  background-color: transparent;
`;
const Folder1Text = styled.div`
  font-size: 24px;
  weight: 700;
  height: 24px;
  font-family: Pretendard;
`;
const Folder2Text = styled.div`
  color: #ABABAB;
  font-size: 14px;
  weight: 600;
  height: 18px;
`;
const NoFolder1Text = styled.div`
  color: #ABABAB;
  font-size: 18px;
  weight: 600;
  height: 24px;
  font-family: Pretendard;
`;
const NoFolder2Text = styled.div`
  color: #ABABAB;
  font-size: 14px;
  weight: 600;
  height: 18px;
`;
const VotingPage = () => {
    const kakaoId = localStorage.getItem("kakaoId");
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const q = query(
          collection(dbService, 'zip_Question'),
          where('kakaoId', '==', kakaoId),
          orderBy('timestamp', 'desc')
        );
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

      const navigate = useNavigate();
      const handleQuestionClick = (questionId) => {
        navigate(`/PickAnswer/${questionId}`);
      };
    return(
      <Div>
        <BackNavBar/>
        <Folder1Text>내가 만든 폴더</Folder1Text>
        <Folder2Text>내가 생성한 폴더의 답변을 확인해보세요.</Folder2Text>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.questionId}>
              {question && question.question && (
                <Question onClick={() => handleQuestionClick(question.questionId)}>
                  Question: {question.question} <br />
                  Comment: {question.comment}
                </Question>
              )}
            </div>
          ))
        ) : (
          <div>
            <NoFolder1Text>아직 진행중인 폴더가 없어요.</NoFolder1Text>
            <NoFolder2Text>새로운 폴더를 만들고 공유해보세요.</NoFolder2Text>
            <NewFolderButton><CreateFolderImage src={CreateFolderButton}/></NewFolderButton>
          </div>
        )}
      </Div>
    );
};

export default VotingPage;