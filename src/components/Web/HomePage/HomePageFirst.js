import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import { KakaoIdContext} from '../../../KakaoIdContext';


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

const HeaderDiv = styled.header`
  width: 120px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #efefef;
  left: calc(50% - 311px/2);
`;

const Header3 = styled.p`
  width: 110px;
  height: 24px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #efefef;
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
  width: 375px;
  height: 812px;
  background: black;
  margin: 0 auto;
  overflow-x: hidden;
`;

const HomePageFirst = () => {
  const navigate = useNavigate();
  const [kakaoContext] = useContext(KakaoIdContext);
  console.log("userId : ", kakaoContext);//userId

useEffect(() => {
  const unsubscribe = onSnapshot(collection(dbService, 'kakaoId'), (snapshot) => {
    // 원하는 로직을 추가하세요.
  });

  return () => {
    unsubscribe(); // 컴포넌트가 언마운트될 때 데이터 변경 구독을 해제합니다.
  };
}, []);

// ...


  const handleButtonClick = () => {
    navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
  };

  const handleButton1Click = () => {
    navigate('../../../../SurveyCreate'); // Replace with the actual path you want to navigate to
  };
  const handleButton2Click = () => {
    navigate('../../../../Answer'); // Replace with the actual path you want to navigate to
  };

  return (
    <Div>
      <Survey>
        <Header2>
          <HeaderDiv>안녕하세요, OO님</HeaderDiv>
          <HeaderP>궁금한 질문을 담은 링크를 공유해보세요.</HeaderP>
        </Header2>
        <button onClick={handleButtonClick}>나의 .Zip</button>
        <button onClick={handleButton1Click}>새로운 .Zip 만들기</button>
        <button onClick={handleButton2Click}>answer가기</button>
        <Header3>진행중인 .Zip</Header3>
      </Survey>
    </Div>
  );
};

export default HomePageFirst;
