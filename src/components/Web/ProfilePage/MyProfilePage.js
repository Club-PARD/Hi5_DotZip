import styled from "styled-components";
import React, {useEffect} from 'react';
import Navbar from '../../Navbar';
import HomeNavbar from '../HomePage/HomeNavber';
import MyProfileComponent from '../ProfilePage/MyProfileComponent';
import MyProfileLank from '../ProfilePage/MyProfileLank';




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


const MyProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
    return(
      <>
      <DDiv>
        <Div>
          <Navbar />
          <HomeNavbar />
          <MyProfileComponent />
          <MyProfileLank />
        </Div>
      </DDiv>
      </>
    );
};

export default MyProfilePage;