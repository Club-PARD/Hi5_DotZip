import styled from "styled-components";
import React from 'react';
import MyProfileShareNavbar from './MyProfileShareNavbar';
import MyProfileShareComponent from '../ProfilePage/MyProfileShareComponent';
import MyProfileShareLank from '../ProfilePage/MyProfileShareLank';
import QButtonImage from '../../../img/QButton.png';
import { useNavigate } from 'react-router-dom';

//기본틀
const DDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 911px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  margin: 0;
  padding: 0;
  margin-left: 8px;
  margin-right: 8px;
`;
const Text = styled.p`
  color: var(--orange-primary, #EC582F);
  font-size: 12px;
  font-family: PretendardSemi;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  margin-left: 90px;
  margin-top: 90px;
`;
const QButton = styled.img`
  width: 327px;
  height: 48px;
  margin-top: 8px;
  margin-left: 24px;
  cursor: pointer;
`;

const MyProfileSharePage = () => {
  const navigate = useNavigate();
  const handleBackLogin = () => {
    navigate('/');
};
    return(
      <>
      <DDiv>
        <Div>
          <MyProfileShareNavbar />
          <MyProfileShareComponent />
          <MyProfileShareLank />
          <Text>나도 지인들에게 투표를 받아보고 싶다면?</Text>
          <QButton src = {QButtonImage} onClick={handleBackLogin}></QButton>
        </Div>
      </DDiv>
      </>
    );
};

export default MyProfileSharePage;