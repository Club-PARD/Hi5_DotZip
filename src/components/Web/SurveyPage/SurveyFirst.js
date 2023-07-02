import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc,serverTimestamp } from 'firebase/firestore';
import { dbService } from '../../../fbase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import BackNavBar from "../../BackNavbar"
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  flex-direction: column;
  margin-left: 24px;
`;


const Survey = styled.div`
  width: 375px;
  background: white;
  justify-content: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column; /* Changed from row to column */
`;

const Button = styled.button`
  width: 327px;
  height: 60px;
  background: #D9D9D9;
  border: 1px solid #ABABAB;
  border-radius: 10px;
  background: ${({ active }) => (active ? '#D9D9D9' : '#353535')};
  color: white;
`;

const HeaderDiv = styled.header`
  width: 375px;
  height: 19px;
  font-size: 24px;
font-family: Pretendard;
font-style: normal;
font-weight: 700;
text-align: left;
  color: var(--gray-90, #353535);
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 375px;
`;

const HeaderP = styled.header`
  width: 375px;
  height: 19px;
  color: var(--gray-60, #808080);
text-align: left;
margin-top: 7px;
/* Body/B4-14-SB */
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
`;


const Button1 = styled.button`
  width: 327px;
  height: 48px;
  left: calc(50% - 311px/2);
  top: 149px;
  background: #353535;
  border: 1px solid #EFEFEF;
  backdrop-filter: blur(2px);
  border-radius: 8px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #EFEFEF;
  margin-bottom: 10px;
`;

const Button2 = styled.button`
  box-sizing: border-box;
  width: 375px;
  height: 60px;
  left: calc(50% - 375px/2);
  background: #212121;
  border: 1px solid #ABABAB;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ABABAB;
`;



function SurveyFirst() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [buttonSelected, setButtonSelected] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [voteEnd, setIsBooleanValue] = useState(true);
  const kakaoId = localStorage.getItem("kakaoId");
  const timestamp = serverTimestamp();

  const handleButtonClick = () => {
    if (kakaoId) {
      navigate('/SurveyCreate');
    } else {
      navigate('/');
    }
  };


  useEffect(() => {
    if (selectedButton) {
      handleButton1Click();
    }
  }, [selectedButton]);

  const handleButton1Click = async () => {
    try {
      if (!kakaoId) {
        throw new Error('User not logged in');
      }

      let question = '';
      let comment = '';
      console.log('Selected Button:', selectedButton);


      if (selectedButton === '버튼1') {
        question = '나의 컬러 나의 이미지와 가장 잘 어울리는 색이 어떤 색인지 알려주세요!';
        comment = '성격과 컬러의 이미지를 연관지어보세요!';
      } else if (selectedButton === '버튼2') {
        question = '패션브랜드 나의 이미지와 가장 잘 어울리는 패션 브랜드가 어디인지 알려주세요!';
        comment = '성격과 브랜드 이미지를 연관지어보세요!';
      } else if (selectedButton === '버튼3') {
        question = '꽃말 내가 꽃이면 나의 이미지와 가장 잘 어울리는 꽃과 꽃말은 뭔지 알려주세요!';
        comment = '성격과 꽃말을 연관지어보세요!';
      } else if (selectedButton === '버튼4') {
        question = '책 이름 나의 이미지와 가장 잘 어울리는 책 이름이 뭔지 알려주세요!';
        comment = '성격과 책 이름을 연관지어보세요!';
      }

      const questionId = uuidv4();

      await setDoc(doc(dbService, 'zip_Question', questionId), {
        kakaoId,
        questionId,
        question,
        comment,
        voteEnd,
        timestamp,
      });
      
      console.log('Question:', question);
      console.log('Comment:', comment);


      setSelectedButton(null);
      setButtonSelected(false);
      setQuestionId(questionId); // Set the questionId value

      navigate(`/MyAnswer/${questionId}`);
    } catch (error) {
      console.error('Firestore에 데이터를 저장하는 도중 오류가 발생했습니다.', error);
    }
  };

  const handleButtonSelect = (button) => {
    setSelectedButton(button);
    setButtonSelected(true);
  };
  

  return (
    <>
    <BackNavBar/>
    <Div>
        <Header2>
          <HeaderDiv>New! 폴더 만들기</HeaderDiv>
        <HeaderP>주변사람들에게 나에 대해 물어보고 투표를 받아보세요!</HeaderP>
        </Header2>
        <Survey>
        <Button1 onClick={handleButtonClick}>+ 내가 직접 질문 만들기</Button1>
        
        <ButtonRow>
          <Button
            onClick={() => handleButtonSelect('버튼1')}
            active={selectedButton === '버튼1'}
          >
            나의 컬러 <br /> 나의 이미지와 가장 잘 어울리는 색은?
          </Button>
          <Button
            onClick={() => handleButtonSelect('버튼2')}
            active={selectedButton === '버튼2'}
          >
            패션브랜드 <br /> 나의 이미지와 어울리는 패션 브랜드는?
          </Button>
        </ButtonRow>
    
        <ButtonRow>
        <Button
            onClick={() => handleButtonSelect('버튼3')}
            active={selectedButton === '버튼3'}
          >
            꽃말<br /> 내가 꽃이라면 그 꽃과 꽃말은?
          </Button>
          <Button
            onClick={() => handleButtonSelect('버튼4')}
            active={selectedButton === '버튼4'}
          >
            책 이름 <br /> 나를 책으로 만든다면, 그 책의 이름은?
          </Button>
        </ButtonRow>
        </Survey>
        {/* <Button2 disabled={!buttonSelected} onClick={() => navigate(`/SurveyShare/${questionId}`)}>
          다음
        </Button2> */}
    </Div>
    </>
  );
}

export default SurveyFirst;
