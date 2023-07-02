import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where , orderBy} from 'firebase/firestore';
import styled from 'styled-components';
import CreateFolderButton from '../../../img/CreateFolderButton.png';
import BackNavBar from '../../BackNavbar';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import Folder1 from '../../../img/Folder1.png';
import Folder2 from '../../../img/Folder2.png';
import Folder3 from '../../../img/Folder3.png';
import Folder4 from '../../../img/Folder4.png';
import Tip from '../../../img/Tip.png';

const Div = styled.div`
`;
//새로운 폴더 생성
const CreateFolderImage = styled.img`
  width: 147px;
  height: 40px;
`;
const NewFolderButton = styled.button`
  border: none;
  background-color: transparent;
`;
//폴더
const FolderImageContainer = styled.div`
  position: relative;
  width: 357px;
  height: 196px;
  margin-bottom: 24px;
`;
const FolderImage = styled.img`
  width: 100%;
  height: 100%;
  z-index: 0;
`;
const FolderContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 32px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
const IMG = styled.img`
  position: absolute;
  padding-top: 58px;
  width: 48px;
  height: 48px;
  z-index: 1;
`;
const TipImage = styled.img`
  position: absolute;
  margin-top: 115px;
  width: 53px;
  height: 23px;
  z-index: 1;
`;
//폴더 안 텍스트
const QText = styled.p`
  font-size: 14px;
  margin: 0;
  margin-top: 63px;
  margin-left: 60px;
  margin-bottom: 19px;
  weight: 600;
  width: 235px;
  height: 36px;
  font-family: Pretendard;
  z-index: 1;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const CText = styled.p`
  font-size: 12px;
  margin: 0;
  margin-left: 60px;
  weight: 600;
  width: 235px;
  height: 14px;
  font-family: Pretendard;
  color: #808080;
  z-index: 1;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const AnswerText = styled.p`
  font-size: 12px;
  margin: 0;
  margin-top: 24px;
  weight: 600;
  width: 118px;
  height: 16px;
  font-family: Pretendard;
  color: #808080;
  z-index: 1;
  word-break: keep-all;
`;
const RedText = styled.span`
  color: #EC582F;
`;
//텍스트
const Folder1Text = styled.div`
  font-size: 24px;
  weight: 700;
  height: 24px;
  font-family: Pretendard;
  padding-top: 92px;
  padding-bottom: 8px;
  padding-left: 14px;
`;
const Folder2Text = styled.div`
  color: #ABABAB;
  font-size: 14px;
  weight: 600;
  height: 18px;
  padding-bottom: 32px;
  padding-left: 14px;
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

      const getEmojiImage = (emoji) => {
        switch (emoji) {
          case 'emoji1':
            return emoji1;
          case 'emoji2':
            return emoji2;
          case 'emoji3':
            return emoji3;
          case 'emoji4':
            return emoji4;
          case 'emoji5':
            return emoji5;
          default:
            return null;
        }
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
                <FolderImageContainer onClick={() => handleQuestionClick(question.questionId)}>
                  <FolderImage src={Folder1} />
                  <FolderContent>
                    <IMG src={getEmojiImage(question.emoji)} alt="Emoji" />
                    <TipImage src={Tip} />
                    <QText>{question.question}</QText>
                    <CText>{question.comment}</CText>
                    <AnswerText><RedText>{question.totalVote}</RedText>이 답변을 남겼어요!</AnswerText>
                  </FolderContent>
                </FolderImageContainer>
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