import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc,serverTimestamp } from 'firebase/firestore';
import { dbService } from '../../../fbase';
import 'firebase/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import BackNavBar from "../../BackNavbar"
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import answer1 from '../../../img/answer1.png';
import answer2 from '../../../img/answer2.png';
import answer3 from '../../../img/answer3.png';
import answer4 from '../../../img/answer4.png';
import progress from '../../../img/Line1.png'
import button1 from '../../../img/Button1.png'
import CreateMyques from '../../../img/CreateMyques.png'

const Div = styled.div`
    display: flex;
    align-items: center;
  flex-direction: column;
  margin: 0 auto;

`;


const Survey = styled.div`
  width: 375px;
  //background: white;
  display: flex;
  justify-content: center;

`;

const ButtonRow = styled.div`
  position: relative;
  width: 327px;
`;

const Button = styled.button`
  width: 327px;
  height: 60px;
  border: none;
  border-radius: 10px;
  background: var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%));
  color: var(--black-90, #212121);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 1;
  margin-top: 20px;
`;

const HeaderDiv = styled.header`
  width : 100%;
  height: 19px;
  font-size: 24px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
text-align: left;
  color: var(--gray-90, #353535);
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 327px;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
`;

const HeaderP = styled.header`
  width: 100%;
  height: 19px;
  color: var(--gray-60, #808080);
text-align: left;
margin-top: 15px;
/* Body/B4-14-SB */
font-size: 14px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-bottom: 12px;
`;


const Button1 = styled.img`
  width: 327px;
  height: 64px;
  margin-bottom: 10px;
  margin-top: 20px;

`;

// const Button2 = styled.button`
//   box-sizing: border-box;
//   width: 375px;
//   height: 60px;
//   left: calc(50% - 375px/2);
//   background: #212121;
//   border: 1px solid #ABABAB;
//   font-family: 'Pretendard';
//   font-style: normal;
//   font-weight: 700;
//   font-size: 14px;
//   line-height: 20px;
//   text-align: center;
//   color: #ABABAB;
// `;


const Progress = styled.img`
  width: 125px;
  height: 1.5px;
  margin-right: 235px;
  margin-top: 4.5px;
`;
const Img = styled.img`
width: 327px;
height: 96px;
margin-top: 20px;
cursor: pointer;

`;
const ButtonNew = styled.img`
width: 327px;
height: 64px;
margin-top: 20px;
cursor: pointer;
margin-bottom: 150px;
`;


function SurveyFirst() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [buttonSelected, setButtonSelected] = useState(false);
  // const [selectedButton, setSelectedButton] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [voteEnd, setIsBooleanValue] = useState(true);
  const kakaoId = localStorage.getItem("kakaoId");
  const timestamp = serverTimestamp();
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleButtonClick = () => {
    if (kakaoId) {
      navigate('/SurveyCreate');
    } else {
      navigate('/');
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedEmoji) {
      handleButton1Click();
    }
  }, [selectedEmoji]);

  const handleButton1Click = async () => {
    try {
      if (!kakaoId) {
        throw new Error('User not logged in');
      }

      let question = '';
      let comment = '';
      let emoji ='';
      const VoteNum = 0; // Define the value of VoteNum



      if (selectedEmoji === 'emoji1') {
        question = '내가 가지고 있는 강점은?';
        comment = '내가 빛나보였던 순간을 떠올려보세요!';
        emoji = emoji1;

      } else if (selectedEmoji === 'emoji2') {
        question = '내가 보완하면 좋을 약점은?';
        comment = '나의 성장에 도움이 될만한 점을 적어보세요!';
        emoji = emoji2;
        setSelectedEmoji("emoji2");
      } else if (selectedEmoji === 'emoji3') {
        question = '나를 표현하는 형용사는?';
        comment = '나에게 어울리는 단어를 생각해보세요!';
        emoji = emoji3;
        setSelectedEmoji("emoji3");
      } else if (selectedEmoji=== 'emoji4') {
        question = '나를 생각하면 떠오르는 노래는?';
        comment = '나와 관련된 키워드와 이미지를 연관지어보세요!';
        emoji = emoji4;
        setSelectedEmoji("emoji4");
      }

      const questionId = uuidv4();

      await setDoc(doc(dbService, 'zip_Question', questionId), {
        kakaoId,
        questionId,
        question,
        comment,
        voteEnd,
        timestamp,
        emoji  : selectedEmoji,
        VoteNum,
      });

      setButtonSelected(false);
      setSelectedEmoji(null);
      setQuestionId(questionId); // Set the questionId value

      navigate(`/SurveyMyFold/${questionId}`);
    } catch (error) {
      console.error('Firestore에 데이터를 저장하는 도중 오류가 발생했습니다.', error);
    }
  };

  const handleButtonSelect = (button) => {
    setSelectedEmoji(button);
  };

  const handleButton4Click = () => {
    navigate('../../../../SurveySecond'); // Replace with the actual path you want to navigate to
  };
  

  return (
    <>
    <Div>
      <Div>
    <BackNavBar/>
    {/* <Progress src={progress}/> */}
        <Header2>
          <HeaderDiv>질문을 선택해보세요.</HeaderDiv>
        <HeaderP>내가 물어보고 싶은 질문을 선택해보세요!</HeaderP>
        </Header2>
        <ButtonRow>
          <Img src={answer1}             
          onClick={() => handleButtonSelect('emoji1')}
            active={selectedEmoji === 'emoji1'}/>
          <Img src={answer2}             
          onClick={() => handleButtonSelect('emoji2')}
            active={selectedEmoji === 'emoji2'}/> 
          <Img src={answer3}             
          onClick={() => handleButtonSelect('emoji3')}
            active={selectedEmoji === 'emoji3'}/> 
          <Img src={answer4}             
          onClick={() => handleButtonSelect('emoji4')}
            active={selectedEmoji === 'emoji4'}/> 
        </ButtonRow>
        {/* <Survey>
        <Button1 src={button1}onClick={handleButtonClick} />
        </Survey> */}
        {/* <Button2 disabled={!buttonSelected} onClick={() => navigate(`/SurveyShare/${questionId}`)}>
          다음
        </Button2> */}
        <ButtonNew src={CreateMyques} onClick={handleButton4Click} />
    </Div>
    </Div>
    </>
  );
}

export default SurveyFirst;
