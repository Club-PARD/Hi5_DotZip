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

const Div = styled.div`
  margin-top: 70px;
  height: 1000px;
`;

const HeaderP = styled.p`
color: var(--gray-90, #353535);
/* Head/H2-20-B */
font-size: 20px;
font-family: Pretendard;
font-style: normal;
font-weight: 700;
line-height: 24px;

`;

const HeaderDiv = styled.header`
width: 170px;
height: 24px;
top: 152px;
left: 24px;
font-family: Pretendard;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
margin-top: 32px;


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
  
`;

const Button = styled.button`
  background-size: cover;
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
width: 330px;
`;
const Questionp = styled.button`
color: black;
width: 319px;
height: 259px;
background: #D9D9D9;
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
  border: 1.5px solid #808080;

  background: white;
  border: 1px solid white;
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
display: inline-flex;
padding: 11px 16px;
justify-content: center;
align-items: center;
gap: 6px;
top: 876px;
left: 114px;

`;

const Banner = styled.div`
  width: 375px;
  height: 96px;
  background: var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%));
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
color: #808080;


`;

const Emoji = styled.img`
width: 48px;
height: 48px;

`;
const RedText = styled.span`
color: #EC582F;
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
        <Banner />
        <ButtonContainer>
        <NewQ>새로운 질문 만들기</NewQ>
        <ButtonA onClick={handleButtonClick}>전체보기 &gt; </ButtonA>
        </ButtonContainer>
        <Newq>지인들에게 나에 대해 물어보세요!</Newq>
        <ButtonsContainer>
          <ButtonQ>나에게 어울리는 컬러는?</ButtonQ>
          <ButtonQ1>나에게 어울리는 동물은?</ButtonQ1>
        </ButtonsContainer>

        <ButtonNew onClick={handleButtonClick}> + 나만의 질문 만들기</ButtonNew>
        {/* <button onClick={handleButton2Click}>answer가기</button>
        <button onClick={handleButtonPickAnswer}>pickanswer가기</button> */}
        <ButtonsContainer>
        <Header3>최근에 만든 질문</Header3>
        <ButtonA onClick={handleButton3Click}>전체보기 &gt;</ButtonA>
        </ButtonsContainer>
        <MadeF>만든 폴더를 공유하고 답변을 확인해보세요.</MadeF>
        {questions.length > 0 ? (
          <>
            {questions.slice(0, 3).map((question, index) => (
              <div key={question.questionId}>
                {question && question.question && question.voteEnd && (
                  <P onClick={() => handleQuestionClick(question.questionId, index)}>
                  emoji: {question.emoji && <Emoji src={getEmojiImage(question.emoji)} alt="Emoji" />}
                    Question: {question.question} <br />
                    Comment: {question.comment}
                  </P>
                )}
              </div>
            ))}
            <Header3>여기서 나뉨 밑은 끝난거 위는 안끝난거</Header3>
            {questions.slice(0, 3).map((question) => (
              <div key={question.questionId}>
                {question && question.question && !question.voteEnd && (
                  <P onClick={() => handleQuestionClick(question.questionId)}>
                  emoji: {question.emoji && <Emoji src={getEmojiImage(question.emoji)} alt="Emoji" />}
                    Question: {question.question} <br />
                    Comment: {question.comment}
                  </P>
                )}
              </div>
            ))}
          </>
        ) : (
          <><Questionp>
              진행중인 폴더가 없어요! <br /> 새로운 폴더를 만들고 공유해보세요.
            </Questionp><Img src="../../../img/CreateFolderButton.png" alt="Button" /></>

        )}
      </Survey>
    </Div>
  );
};

export default HomePageFirst;


