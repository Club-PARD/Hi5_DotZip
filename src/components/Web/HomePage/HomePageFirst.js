import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { dbService } from '../../../fbase';
import { getAuth } from 'firebase/auth';

// Initialize Firebase Authentication
const authService = getAuth();

const Div = styled.div`
  margin-top: 70px;
  height: 1000px;
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
const Header3 = styled.p`
width: 110px;
height: 24px;
top: 270px;
left: 27px;
font-family: Pretendard;
font-size: 20px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
color: #EFEFEF;

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



const HomeFirst = (kakaoid, questionid, answerid) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        console.log('User not logged in');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      console.log('userId:', userId); // For debugging purposes

      const fetchData = async () => {
        const q = query(collection(dbService, 'kakaoId'), where('userId', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          console.log('User ID does not exist in "kakaoId" collection:', userId);
        } else {
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log('User ID exists in "kakaoId" collection:', data.userId);
            // Perform other tasks here
          });
        }
      };

      fetchData();
    }
  }, [currentUser]);

  const handleButtonClick = () => {
    navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
  };

  const handleButton1Click = () => {
    navigate('../../../../SurveyCreate'); // Replace with the actual path you want to navigate to
  };

  return (
  <Div>
    <Survey>
      <Header2>
        <HeaderDiv>안녕하세요, OO님</HeaderDiv>
        <HeaderP>궁금한 질문을 담은 링크를 공유해보세요.</HeaderP>
      </Header2>
      <button onClick={handleButtonClick}>나의 .Zip</button>
      <button onClick={handleButton1Click}>새로운 .Zip 만들기 </button>
      <Header3>진행중인 .Zip</Header3>
    </Survey>
  </Div>
);
    }

export default HomeFirst;