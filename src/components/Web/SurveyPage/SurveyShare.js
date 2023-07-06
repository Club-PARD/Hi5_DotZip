import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import BackNavBar from '../../BackNavbar';
import CopyToClipboard from 'react-copy-to-clipboard';
import KakaoShareButton from '../ProfilePage/ShareKakao';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import Tip from '../../../img/Tip.png';
import SurveyShareComponent from './SurveyShareComponent';
import SurveyShareComponent2 from './SurveyShareComponent2';
import Folder from '../../../img/Folder3.png';
import LinkImage from '../../../img/Link.png';
import HomeButtonImage from '../../../img/GoHome.png';

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
const FolderImageContainer = styled.div`
  position: relative;
  width: 357px;
  height: 196px;
  margin-left: 8px;
  margin-bottom: 24px;
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
const FolderImage = styled.img`
  width: 100%;
  height: 100%;
  z-index: 0;
`;
const TipImage = styled.img`
  position: absolute;
  margin-top: 113px;
  width: 53px;
  height: 23px;
  z-index: 1;
`;
const IMG = styled.img`
  position: absolute;
  padding-top: 57px;
  width: 48px;
  height: 48px;
  z-index: 1;
`;
const QText = styled.p`
  color: #212121;
  font-size: 16px;
  padding: 0;
  margin: 0;
  margin-top: 65px;
  margin-left: 60px;
  margin-bottom: 16px;
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
//링크복사
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CopyLinkButton = styled.button`
  border: none;
  margin-top: 13px;
  padding: 0;
  width: 239px;
  height: 32px;
  border-radius: 20px;
  color: white;
  background: #EC582F;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Link = styled.img`
  width: 16px;
  height: 16px;
`;
const LinkMessage = styled.div`
  width: 200px;
  background: white;
  padding: 10px;
  border: 1px solid black;
`;
//투표 Text
const RedText = styled.span`
  color: #EC582F;
`;
const TotalNumber = styled.p`
  margin-right: 12px;
  margin-left: auto;
  font-size: 12px;
  font-weight: 500;
  height: 16px;
  font-family: Pretendard;
  color: #353535;
`;
const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
`;
const AnswerBox = styled.button`
  width: 327px;
  height: 64px;
  width: 327px;
  margin-left: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid var(--primary-orange, #EC582F);
  background: var(--background-orange, #FFF8F3);
`;
const AnswerText = styled.p`
  margin: 0;
  margin-top: 12px;
  margin-left: 12px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  height: 20px;
  font-family: Pretendard;
`;
const VoteNumber = styled.p`
  margin: 0;
  margin-left: 3px;
  font-size: 12px;
  font-weight: 500;
  height: 16px;
  font-family: Pretendard;
  color: #ABABAB;
`;
const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Percentage = styled.p`
  margin-top: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
  margin-left: auto;
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  font-family: Pretendard;
  color: #EC582F;
`;
const VoteBox = styled.div`
  width: 274px;
  height: 8px;
  margin-left: 12px;
  border-radius: 10px;
  border: 0;
  background: linear-gradient(to right, #EC582F ${props => props.percentage}%, #FFF8F3 ${props => props.percentage}%);
  color: #000000;
`;
//버튼
const BackHomeButton = styled.button`
  width: 327px;
  height: 48px;
  margin-top: 80px;
  margin-left: 16px;
  margin-bottom: 8px;
  border: none;
  background: none;
`;
const HomeImage = styled.img`
  width: 100%;
  height: 100%;
`;



const SurveyShare = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onSnapshot(doc(dbService, 'zip_Question', questionId), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setQuestion(data.question);
        setComment(data.comment);
        setEmoji(data.emoji); // Retrieve the "emoji" variable from Firestore
      } else {
        // Handle case when document does not exist
      }
    });

    return () => {
      unsubscribe();
    };
  }, [questionId]);

    //링크 복사하기
    const [showMessage, setShowMessage] = useState(false);
    const [copiedLinkId, setCopiedLinkId] = useState('');

    const handleLinkButtonClick = () => {
    setCopiedLinkId(questionId);
    setShowMessage(true);
    setTimeout(() => {
        setShowMessage(false);
    }, 1000);
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

  const emojiImage = getEmojiImage(emoji);
  //홈으로 돌아가기
  const handleBackHome = () => {
      navigate('/Home');
  };

  return (
    <>
    <BackNavBar/>
    <DDiv>
      <Div>
        <SurveyShareComponent />
        <FolderImageContainer>
          <FolderImage src = {Folder} />
            <FolderContent>
              <IMG src={emojiImage}/>
              <TipImage src={Tip} />
              <QText>{question}</QText>
              <CText>{comment}</CText>
              <CopyToClipboard text={`${window.location.origin}/answer/${questionId}`}>
                <ButtonContainer>
                  <KakaoShareButton />
                  <CopyToClipboard text={`${window.location.origin}/answer/${questionId}`}>
                    <CopyLinkButton onClick={() => {handleLinkButtonClick(questionId);}} >
                      <Link src={LinkImage} />링크 복사
                    </CopyLinkButton>
                  </CopyToClipboard>
                  {showMessage && copiedLinkId === questionId && <LinkMessage>링크가 복사되었습니다</LinkMessage>}
                </ButtonContainer>
              </CopyToClipboard>
            </FolderContent>
          </FolderImageContainer>
          <SurveyShareComponent2 />
          <AnswerBox>
            <AnswerContainer>
              <AnswerText>답변</AnswerText>
              <Percentage>{100}%</Percentage>
            </AnswerContainer>
            <PercentageContainer>
              <VoteBox percentage={100} />
              <VoteNumber>1명</VoteNumber>
            </PercentageContainer>
          </AnswerBox>
          <TotalNumber>총 <RedText>1명</RedText>이 참여했어요.</TotalNumber>
          <BackHomeButton onClick={handleBackHome}><HomeImage src = {HomeButtonImage} /></BackHomeButton>
      </Div>
    </DDiv>
    </>
  );
};

export default SurveyShare;
