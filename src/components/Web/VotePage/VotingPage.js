import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where , orderBy} from 'firebase/firestore';
import styled from 'styled-components';
import CreateFolderButton from '../../../img/CreateFolderButton.png';
import BackNavBar from '../../BackNavbar';
import VotePageComponent1 from './VotePageComponent1';
import CopyLinkMessage from './CopyLinkMessage';
import EndMessage from './EndMessage';
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
import LinkImage from '../../../img/Link.png';
import CopyToClipboard from 'react-copy-to-clipboard'; //링크복사

//기본틀
const DDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 812px;
`;
const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 375px;
    margin: 0;
    padding: 0;
`;
//새로운 폴더 생성
const NoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CreateFolderImage = styled.img`
  width: 147px;
  height: 40px;
`;
const NewFolderButton = styled.button`
  border: none;
  background-color: transparent;
  margin-top: 24px;
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
  padding-top: 57px;
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
const AnswerLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CopyLinkButton = styled.button`
  border: none;
  margin-top: 11px;
  margin-left: 88px;
  padding: 0;
  width: 97px;
  height: 32px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Link = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

//폴더 안 텍스트
const QText = styled.p`
  color: #212121; 
  font-size: 16px;
  padding: 0;
  margin: 0;
  margin-top: 64px;
  margin-left: 60px;
  margin-bottom: 20px;
  font-weight: 600;
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
  font-weight: 600;
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
  font-weight: 600;
  width: 118px;
  height: 16px;
  font-family: Pretendard;
  color: #808080;
  z-index: 1;
`;
const RedText = styled.span`
  color: #EC582F;
`;
//텍스트
const NoFolder1Text = styled.div`
  color: #ABABAB;
  margin-top: 120px;
  font-size: 18px;
  font-weight: 600;
  height: 24px;
  font-family: Pretendard;
`;
const NoFolder2Text = styled.div`
  color: #ABABAB;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 600;
  height: 18px;
`;

const VotingPage = () => {
    const kakaoId = localStorage.getItem("kakaoId");
    const [questions, setQuestions] = useState([]);
    const [showEndMessage, setShowEndMessage] = useState(false);
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
        const modalConfirmed = localStorage.getItem('modalConfirmed');
        if (modalConfirmed === 'true') {
          setShowEndMessage(true);
    
          setTimeout(() => {
            setShowEndMessage(false);
            localStorage.removeItem('modalConfirmed');
          }, 1000);
        }
      
        return () => {
          unsubscribe();
        };
      }, [kakaoId]);

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

      const navigate = useNavigate();
      const handleQuestionClick = (questionId, index, event) => {
        navigate(`/PickAnswer/${questionId}`, { state: { index } });
      };
      const handleButtonClick = () => {
        navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
      };
      //링크 복사하기
      const [showMessage, setShowMessage] = useState(false);
      const [copiedLinkId, setCopiedLinkId] = useState('');

      const handleLinkButtonClick = (questionId) => {
        setCopiedLinkId(questionId);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      };
      const folderImages = [Folder1, Folder2, Folder3, Folder4];
      const sortedQuestions = questions.slice().sort((a, b) => (a.voteEnd && !b.voteEnd ? -1 : 1));


    return(
      <>
      <BackNavBar/>
      <DDiv>
      <Div>
        <VotePageComponent1 />
        {questions.length > 0 ? (
          sortedQuestions.map((question, index) => (
            <div key={question.questionId}>
              {question && question.question && (
                <FolderImageContainer onClick={() => handleQuestionClick(question.questionId, index)}>
                  <FolderImage src={folderImages[index % folderImages.length]} />
                  <FolderContent>
                    <IMG src={getEmojiImage(question.emoji)} alt="Emoji" />
                    <TipImage src={Tip} />
                    <QText>{question.question}</QText>
                    <CText>{question.comment}</CText>
                    <AnswerLinkContainer>
                      <AnswerText><RedText>{question.VoteNum}명</RedText>이 답변을 남겼어요!</AnswerText>
                      <CopyToClipboard text={`${window.location.origin}/answer/${question.questionId}`}>
                        <CopyLinkButton onClick={(event) => {event.stopPropagation(); handleLinkButtonClick(question.questionId);}} 
                        disabled={!question.voteEnd} style={{ backgroundColor: question.voteEnd ? '#EC582F' : '#F8F8F8' , color: question.voteEnd ? 'white' : '#808080' }}>
                          {question.voteEnd ? (
                            <>
                              <Link src={LinkImage} />
                              링크복사
                            </>
                          ) : (
                            '종료된 투표'
                          )}
                        </CopyLinkButton>
                      </CopyToClipboard>
                      {showMessage && copiedLinkId === question.questionId && <CopyLinkMessage />}
                      {showEndMessage && <EndMessage />}
                    </AnswerLinkContainer>
                  </FolderContent>
                </FolderImageContainer>
              )}
            </div>
          ))
        ) : (
          <NoDiv>
            <NoFolder1Text>아직 진행중인 폴더가 없어요.</NoFolder1Text>
            <NoFolder2Text>새로운 폴더를 만들고 공유해보세요.</NoFolder2Text>
            <NewFolderButton onClick={handleButtonClick}><CreateFolderImage src={CreateFolderButton}/></NewFolderButton>
          </NoDiv>
        )}
      </Div>
      </DDiv>
      </>
    );
};

export default VotingPage;