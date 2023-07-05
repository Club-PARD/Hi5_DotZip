import styled from "styled-components";
import React from 'react';
import MyProfileShareNavbar from './MyProfileShareNavbar';
import MyProfileShareComponent from '../ProfilePage/MyProfileShareComponent';
import MyProfileShareLank from '../ProfilePage/MyProfileShareLank';

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


const MyProfileSharePage = () => {
    return(
      <>
      <DDiv>
        <Div>
          <MyProfileShareNavbar />
          <MyProfileShareComponent />
          <MyProfileShareLank />
        </Div>
      </DDiv>
      </>
    );
};

export default MyProfileSharePage;