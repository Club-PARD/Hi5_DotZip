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

const Div = styled.div`
  margin-top: 70px;
  height: 1000px;
`;

const HeaderP = styled.p`
width: 236px
height: 18px
top: 184px
left: 24px
//styleName: Body/B1-14-SB;
font-family: Pretendard;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
color: Gray;

`;

const HeaderDiv = styled.header`
width: 170px
height: 24px
top: 152px
left: 24px
//styleName: Head/H1-20-B;
font-family: Pretendard;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;

`;

const Header3 = styled.p`
width: 113px
height: 24px
top: 692px
left: 24px
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
`;

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px
  height: 1245px
  margin: 0 auto;
  overflow-x: hidden;

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
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
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

`;

const Newq = styled.header`
//styleName: Body/B1-14-SB;
font-family: Pretendard;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
color: #808080;

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
const Profile = styled.button`
  width: 165px;
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
width: 327px
height: 48px
top: 580px
left: 24px
border-radius: 10px
border: 1px solid;
border-image-source: linear-gradient(93.75deg, #EC5730 0%, #FE8100 51.04%, #F8C51F 99.99%);
background: white;

//styleName: Body/B1-14-SB;
font-family: Pretendard;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
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

  const handleQuestionClick = (questionId) => {
    navigate(`/PickAnswer/${questionId}`);
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
        <Header2>
        <HeaderDiv>
            안녕하세요, <span>{userNickname}</span>님
          </HeaderDiv>
          <HeaderP>폴더를 만들어 새로운 조이님의 모습을 발견해보세요.</HeaderP>
        </Header2>
        <ButtonContainer>
          <HomeP>Home</HomeP>
          <Profile onClick={handleButton1Click}>프로필</Profile>
        </ButtonContainer>
        <Button>인기 질문 하나 노출</Button>
        <ButtonContainer>
        <NewQ>NEW 폴더 만들기 </NewQ>
        <ButtonA onClick={handleButtonClick}>전체보기 &gt; </ButtonA>
        </ButtonContainer>
        <Newq>궁금한 질문을 담은 폴더 링크를 공유해보세요. </Newq>
        <ButtonsContainer>
          <ButtonQ>나에게 어울리는 컬러는?</ButtonQ>
          <ButtonQ1>나에게 어울리는 동물은?</ButtonQ1>
        </ButtonsContainer>

        <ButtonNew onClick={handleButtonClick}> + 새로운 질문 만들기</ButtonNew>
        {/* <button onClick={handleButton2Click}>answer가기</button>
        <button onClick={handleButtonPickAnswer}>pickanswer가기</button> */}
        <ButtonContainer>
        <Header3>내가 만든 폴더</Header3>
        <ButtonA onClick={handleButton3Click}>전체보기 &gt;</ButtonA>
        </ButtonContainer>
        {questions.length > 0 ? (
          <>
            {questions.slice(0, 3).map((question) => (
              <div key={question.questionId}>
                {question && question.question && question.voteEnd && (
                  <P onClick={() => handleQuestionClick(question.questionId)}>
                  emoji: {question.emoji && <img src={getEmojiImage(question.emoji)} alt="Emoji" />}
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
                  emoji: {question.emoji && <img src={getEmojiImage(question.emoji)} alt="Emoji" />}
                    Question: {question.question} <br />
                    Comment: {question.comment}
                  </P>
                )}
              </div>
            ))}
          </>
        ) : (
          <Questionp>
            진행중인 폴더가 없어요! <br /> +NEW 폴더 만들기
          </Questionp>
        )}
      </Survey>
    </Div>
  );
};

export default HomePageFirst;


