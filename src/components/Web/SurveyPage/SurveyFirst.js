import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { authService, dbService } from '../../../fbase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
  height: 812px;
  background: black;
  margin: 0 auto;
  overflow-x: hidden;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 148px;
  height: 120px;
  background: #D9D9D9;
  margin: 8px;
  border: 1px solid #ABABAB;
  border-radius: 10px;
  background: #353535;
`;

const HeaderDiv = styled.header`
  width: 120px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #EFEFEF;
  left: calc(50% - 311px/2);
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px; /* Adjust this value to move it higher */
`;

const HeaderP = styled.p`
  width: 260px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 19px;
  color: #818181;
`;

const Button1 = styled.button`
  width: 311px;
  height: 48px;
  left: calc(50% - 311px/2);
  top: 149px;
  background: #353535;
  border: 1px solid #EFEFEF;
  backdrop-filter: blur(2px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  width: 375px;
  height: 60px;
  left: calc(50% - 375px/2);
  top: 648px;
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

const Div = styled.div`
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function CreateFirst() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null); // State to track the current user
    const [buttonSelected, setButtonSelected] = useState(false); // State to track if any button is selected
  
    useEffect(() => {
      // Listen for changes in the user authentication state
      const unsubscribe = authService.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const handleButtonClick = async () => {
      if (currentUser) {
        const userId = currentUser.uid;
  
        const q = query(collection(dbService, 'kakaoId'), where('userId', '==', userId));
        const snapshot = await getDocs(q);
  
        if (snapshot.empty) {
          navigate('/'); // userId가 존재하지 않을 경우 로그인 페이지로 이동
        } else {
          // userId가 존재할 경우 여기에서 다른 작업을 수행합니다.
        }
      }
    };
  
    const handleButtonSelect = () => {
      setButtonSelected(true);
    };
  
    return (
      <Div>
        <Survey>
          <Header2>
            <HeaderDiv>새로운 .ZiP 만들기</HeaderDiv>
            <HeaderP>궁금한 질문을 담은 링크를 공유해보세요.</HeaderP>
          </Header2>
          <Button1 onClick={handleButtonClick}>+ 내가 직접 질문 만들기</Button1>
          <ButtonRow>
            <Button onClick={handleButtonSelect}>버튼1</Button>
            <Button onClick={handleButtonSelect}>버튼2</Button>
          </ButtonRow>
          <ButtonRow>
            <Button onClick={handleButtonSelect}>버튼3</Button>
            <Button onClick={handleButtonSelect}>버튼4</Button>
          </ButtonRow>
          <Button2 disabled={!buttonSelected} onClick={() => navigate('/SurveySecond')}>
            다음
          </Button2>
        </Survey>
      </Div>
    );
  }
  
  export default CreateFirst;
  