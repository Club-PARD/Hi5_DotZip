import styled from "styled-components";
import React from 'react';
import HomeNavbar from '../HomePage/HomeNavber';
import MyKakaoShareButton from '../ProfilePage/MyKakaoShare';
import MyProfileComponent from '../ProfilePage/MyProfileComponent';
import MyProfileLank from '../ProfilePage/MyProfileLank';
import ImageSaveButton from '../ProfilePage/SaveImage';


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
const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 85px;
`;

const MyProfilePage = () => {
    return(
      <>
      <DDiv>
        <Div>
          <HomeNavbar />
          <MyProfileComponent />
          <MyProfileLank />
          <Container>
            <MyKakaoShareButton/>
            <ImageSaveButton/>
          </Container>
        </Div>
      </DDiv>
      </>
    );
};

export default MyProfilePage;