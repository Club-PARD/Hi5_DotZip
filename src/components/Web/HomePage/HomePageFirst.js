import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import styled from 'styled-components';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import homeFolder from '../../../img/HomeFolder.png';
import banner from '../../../img/banner.png'
import NewquesButton from '../../../img/NewquesButton.png'
import Home1 from '../../../img/Home1.png';
import Home2 from '../../../img/Home2.png';
import Tip from '../../../img/Tip.png';
import LinkImage from '../../../img/Link.png';
import CopyToClipboard from 'react-copy-to-clipboard'; //링크복사


const Div = styled.div`
  display: flex;
  margin: 0 auto; 
  
`;

const HeaderP = styled.header`
color: var(--gray-90, #353535);
/* Head/H2-20-B */
font-size: 20px;
font-family: Pretendardbold;
font-style: normal;
line-height: 24px;
margin-left: 24px;
margin-bottom: 26px;
`;

const HeaderDiv = styled.header`
width: 296px;
top: 152px;
margin-left: 24px;
font-family: Pretendardbold;
font-size: 20px;
line-height: 24px;
letter-spacing: 0em;
margin-top: 25px;
margin-bottom: 8px;
`;

const Header3 = styled.p`
width: 131px;
height: 24px;
top: 692px;
left: 24px;
//styleName: Head/H1-20-B;
font-family: Pretendardbold;
font-size: 20px;
line-height: 24px;
letter-spacing: 0em;
text-align: left;

`;

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  width: 375px;
  height: 1245px;
  margin: 0 auto;
  overflow-x: hidden;
  //background-color: #00FFFF; /* Set the background color to aqua */
  //background-color:white;
`;

const HomeP = styled.button`
  gap: 10px;
  width: 130px;
  height: 40px;
  top: 80px;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  color: #353535;
  background-color: white;
  border: none;
  border-bottom: 2px solid black;

`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 330px;
  margin-left: 24px;
  margin-top: 80px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 350px;
  margin-left: 10px;
`;

const ButtonQ = styled.img`
  width: 156px;
  height: 156px;
  justify-self: flex-start;
  margin-left: 24px;
`;
const ButtonQ1 = styled.img`
  width: 156px;
  height: 156px;
  justify-self: flex-start;
`;

const NewQ = styled.header`
//styleName: Head/H1-20-B;
font-family: Pretendardbold;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
top: 362px;
margin-left: 15px;

`;

const Newq = styled.header`
margin-bottom: 16px;
color: var(--gray-60, #808080);
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-left: 24px;
`;
const ButtonsContainer = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 330px;
  margin-left: 24px;
`;
const Questionp = styled.div`
color: black;
width: 319px;
height: 259px;
font-family: Pretendard;
`;
const Profile = styled.button`
  width: 180px;
  height: 40px;
  top: 80px;
  left: 186px;
  //padding: 8px 61.5px;
  gap: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  color: #ABABAB;
  background-color: white;
  border: none;
  /* border-bottom: 2px solid white; */
`;

const ButtonA = styled.button`
  width: 100px;
  height: 20px;
  top: 367px;
  left: 293px;
  background: white;
  border: 1px solid white;
  left: 24px;
  font-size: 14px;
  font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
color: var(--gray-60, #808080);
`;
const ButtonB = styled.button`
  width: 100px;
  height: 20px;
  top: 367px;
  left: 293px;
  background: #F8F8F8;
  border: 1px solid #F8F8F8;
  font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
color: var(--gray-60, #808080);
`;

const ButtonNew = styled.button`
width: 327px;
height: 48px;
flex-shrink: 0;
border-radius: 10px;
border-image-source: linear-gradient(93.75deg, #EC5730 0%, #FE8100 51.04%, #F8C51F 99.99%);
font-family: Pretendard;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: center;
color: #EC582F;
border: 1px solid var(--primary-orange, #EC582F);
background: none;
margin-left: 24px;

`;

const Img = styled.img`
gap: 6px;
top: 876px;
width: 154px;
height: 40px;
margin-left: 111.5px;
margin-top: 24px;

`;

const Banner = styled.img`
  width: 375px;
  height: 96px;
  // background: var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%));
  margin-bottom: 32px;
`;

const MadeF = styled.header`
width: 240px;
height: 18px;
top: 724px;
left: 5px;
font-family: Pretendard;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
color: #F8F8F8;


`;

const Emoji = styled.img`
width: 48px;
height: 48px;

`;
const RedText = styled.span`
color: #EC582F;
`;

const DIVB = styled.div`
top: 700px;
width: 375px;
height: 586px;
background-color: #F8F8F8;
margin-top: 32px;
`;

const QP = styled.p`
color: var(--gray-30, #ABABAB);
font-size: 18px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 24px;
margin-left: 99px;
margin-top: 100px;

`;
const Qp = styled.p`
color: var(--gray-30, #ABABAB);

/* Body/B4-14-SB */
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-left: 90px;

`;
const FolderImage = styled.img`
  z-index: 0;
  width: 327px;
  height: 196px;

`;

const FolderImageContainer = styled.div`
  position: relative;
  width: 357px;
  margin-bottom: 24px;
  margin-left: 24px;


`;

const FolderContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
const IMG = styled.img`
  position: absolute;
  padding-top: 44px;
  width: 48px;
  height: 48px;
  z-index: 1;
`;
const TipImage = styled.img`
  position: absolute;
  margin-top: 108px;
  width: 53px;
  height: 23px;
  z-index: 1;
`;
const AnswerLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;



//폴더 안 텍스트
const QText = styled.p`
  font-size: 14px;
  margin: 0;
  margin-top: 55px;
  margin-left: 60px;
  margin-bottom: 19px;
  font-weight: 600;
  width: 1155px;
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
  margin-left: 59px;
  font-weight: 600;
  width: 223px;
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

const QuestionContainer = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 330px;
`;

const LinkMessage = styled.div` //링크복사
  width: 200px;
  background: white;
  padding: 10px;
  border: 1px solid black;
`;
const CopyLinkButton = styled.button`
  border: none;
  margin-top: 15px;
  margin-left: 72px;
  padding: 0;
  width: 97px;
  height: 32px;
  border-radius: 20px;
  color: white;
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

const HomePageFirst = () => {
  const navigate = useNavigate();
  const kakaoId = localStorage.getItem('kakaoId');
  //const [userContext] = useContext(UserNameContext);
  const [userNickname] = useState(localStorage.getItem("userName"));
  console.log(localStorage.getItem('userName'));
  console.log(localStorage.getItem('kakaoId'));
  const [questions, setQuestions] = useState([]);
  const [emoji, setEmoji] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const [copiedLinkId, setCopiedLinkId] = useState('');
  
  // kakaoId가 비어있는 경우에만 새로고침
  if (!kakaoId) {
    window.location.reload();
  } 

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

  const handleQuestionClick = (questionId, index) => {
    navigate(`/PickAnswer/${questionId}`, { state: { index } });
  };

  const handleButtonClick = () => {
    navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
  };

  const handleButton1Click = () => {
    navigate('../../../../MyProfile'); // Replace with the actual path you want to navigate to
  };
  const handleButton3Click = () => {
    navigate(`/VotingPage`); // Replace with the actual path you want to navigate to
  };

  const handleLinkButtonClick = (questionId) => {
    const link = `${window.location.origin}/answer/${questionId}`;
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

  return (
    <Div>
      <Survey>
        <HeaderContainer>
          <HomeP>홈</HomeP>
          <Profile onClick={handleButton1Click}>프로필</Profile>
        </HeaderContainer>
        <HeaderDiv>안녕하세요, <RedText>{userNickname}</RedText> 님</HeaderDiv>
        <HeaderP>나의 프로필.ZiP을 만들어보세요!</HeaderP>
        <Banner src={banner} onClick={() => navigate(`/BannerCreate/${kakaoId}`)}/>
        <ButtonContainer>
        <NewQ>새로운 질문 만들기</NewQ>
        <ButtonA onClick={handleButtonClick}>전체보기 &gt; </ButtonA>
        </ButtonContainer>
        <Newq>지인들에게 나에 대해 물어보세요!</Newq>
        <QuestionContainer>
          <ButtonQ src={Home1} onClick={() => navigate(`/Question1Create/${kakaoId}`)}/>
          <ButtonQ1 src={Home2} onClick={() => navigate(`/BannerCreate/${kakaoId}`)}/>
        </QuestionContainer>
        <ButtonNew onClick={handleButtonClick}> + 나만의 질문 만들기</ButtonNew>
        <DIVB>
        <ButtonsContainer>
        <Header3>최근에 만든 질문</Header3>
        <ButtonB onClick={handleButton3Click}>전체보기 &gt;</ButtonB>
        </ButtonsContainer>
        {questions.length > 0 ? (
        questions.slice(0, 2).map((question, index) => (
        <div key={question.questionId}>
        {question && question.question && (
        <FolderImageContainer onClick={() => handleQuestionClick(question.questionId, index)}>
          <FolderImage src={homeFolder} />
                  <FolderContent>
                    <IMG src={getEmojiImage(question.emoji)} alt="Emoji" />
                    <TipImage src={Tip} />
                    <QText>{question.question}</QText>
                    <CText>{question.comment}</CText>
                    <AnswerLinkContainer>
                      <AnswerText><RedText>{question.VoteNum}명</RedText>이 답변을 남겼어요!</AnswerText>
                      <CopyToClipboard text={`${window.location.origin}/answer/${question.questionId}`}>
                        <CopyLinkButton onClick={(event) => {event.stopPropagation(); handleLinkButtonClick(question.questionId);}} 
                        disabled={!question.voteEnd} style={{ backgroundColor: question.voteEnd ? '#EC582F' : 'gray' }}>
                          <Link src={LinkImage} />링크복사
                        </CopyLinkButton>
                      </CopyToClipboard>
                      {showMessage && copiedLinkId === question.questionId && <LinkMessage>링크가 복사되었습니다</LinkMessage>}
                    </AnswerLinkContainer>
                  </FolderContent>
                </FolderImageContainer>
              )}

    </div>
  ))
) : (
  <><Questionp>
              <QP>진행중인 폴더가 없어요! </QP>
              <Qp>새로운 폴더를 만들고 공유해보세요.</Qp>
              <Img src={NewquesButton}onClick={() => navigate(`/SurveyFirst`)}/>
            </Questionp></>
)}
        </DIVB>
      </Survey>
    </Div>
  );
};

export default HomePageFirst;






