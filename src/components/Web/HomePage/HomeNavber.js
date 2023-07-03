import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import styled from 'styled-components';


const HomeP = styled.header`
  gap: 10px;
  width: 130px;
  color: white;
  border-bottom: 2px solid black;
  color: black;
  text-align: center;
`;


const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 330px;
  margin-left: 24px;
`;



const Profile = styled.button`
  width: 180px;
  height: 40px;
  top: 80px;
  left: 186px;
  padding: 8px 61.5px;
  gap: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  color: #ababab;
  background-color: white;
  border-bottom: 2px solid black;
`;



const HomeNavbar = () => {
    const navigate = useNavigate();
    const HomeOnClick = () => {
      navigate('/home');
    };
    const onClick = () => {
      navigate('/MyProfile');
    };
      return(
        <HeaderContainer>
        <HomeP onClick={HomeOnClick} >Home</HomeP>
        <Profile onClick={onClick}>프로필</Profile>
      </HeaderContainer>
      );
  };
  

export default HomeNavbar;





