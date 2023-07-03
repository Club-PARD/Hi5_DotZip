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

const Div = styled.div`
  margin-top: 70px;
  display: flex;
  
`;

const HeaderP = styled.p`
color: var(--gray-90, #353535);
/* Head/H2-20-B */
font-size: 20px;
font-family: Pretendard;
font-style: normal;
font-weight: 700;
line-height: 24px;
left: 24px;


`;

const HeaderDiv = styled.header`
width: 200px;
height: 24px;
top: 152px;
left: 24px;
font-family: Pretendard;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
margin-top: 32px;
left: 24px;

`;

const Header3 = styled.p`
width: 131px;
height: 24px;
top: 692px;
left: 24px;
//styleName: Head/H1-20-B;
font-family: Pretendard;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;

`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  margin-left: 5px; /* Remove the margin-left property */
  padding-left: 0px; /* Add padding-left instead */
`;



const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
  height: 1245px;
  margin: 0 auto;
  overflow-x: hidden;
  // background-color: #00FFFF; /* Set the background color to aqua */
  background-color:white;
`;


const P = styled.button`
  background: #eeff01;
`;

const HomeP = styled.header`
  gap: 10px;
  width: 120px;
  color: white;
  border-bottom: 2px solid black;
  color: black;
  text-align: center;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 330px;
  margin-left: 10px;
`;

const Button = styled.img`
  width: 375px;
  height: 96px;
  margin-bottom: 10px;
`;
const ButtonQ = styled.img`
  width: 156px;
  height: 156px;
  justify-self: flex-start;
`;
const ButtonQ1 = styled.img`
  width: 156px;
  height: 156px;
  justify-self: flex-start;
`;

const NewQ = styled.header`
//styleName: Head/H1-20-B;
font-family: Pretendard;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
top: 362px;
left: 24px;

`;

const Newq = styled.header`
margin-bottom: 16px;
color: var(--gray-60, #808080);
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
`;
const ButtonsContainer = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 340px;
  margin-left:24px;
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
  padding: 10px 61.5px;
  gap: 10px;
  // styleName: Body/B2-16-B;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  color: #ababab;
  background-color: white;
  border: 1px solid white;
`;

const ButtonA = styled.button`
  width: 100px;
  height: 20px;
  top: 367px;
  left: 293px;
  background: white;
  border: 1px solid white;
  margin-left: 20px;
`;
const ButtonB = styled.button`
  width: 100px;
  height: 20px;
  top: 367px;
  left: 293px;
  background: #F8F8F8;
  border: 1px solid #F8F8F8;
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

`;

const Img = styled.img`
gap: 6px;
top: 876px;
width: 154px;
height: 40px;
margin-left: 111.5px;

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

/* Head/H1-18-SB */
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
const AnswerLinkContainer = styled.div`
  display: flex;
  align-items: center;
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
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 330px;
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
  const handleButtonPickAnswer = () => {
    navigate('/PickAnswer'); // Replace with the actual path you want to navigate to
  };
  const handleButton3Click = () => {
    navigate(`/VotingPage`); // Replace with the actual path you want to navigate to
  };
  const handleButton4Click = () => {
    navigate(`/VotingPage`); // Replace with the actual path you want to navigate to
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
        <ButtonContainer>
          <HomeP>Home</HomeP>
          <Profile onClick={handleButton1Click}>프로필</Profile>
        </ButtonContainer>
        <HeaderDiv>안녕하세요, <RedText>{userNickname}</RedText> 님</HeaderDiv>
        <HeaderP>나의 프로필.ZiP을 만들어보세요!</HeaderP>
        {/* <Button>인기 질문 하나 노출</Button> */}
        {/* <Banner /> */}
        <Banner src={banner} onClick={() => navigate(`/SurveyFirst`)}/>
        <ButtonContainer>
        <NewQ>새로운 질문 만들기</NewQ>
        <ButtonA onClick={handleButtonClick}>전체보기 &gt; </ButtonA>
        </ButtonContainer>
        <Newq>지인들에게 나에 대해 물어보세요!</Newq>
        <QuestionContainer>
          <ButtonQ src={Home1}onClick={() => navigate(`/SurveyFirst`)}/>
          <ButtonQ1 src={Home2}onClick={() => navigate(`/SurveyFirst`)}/>
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





