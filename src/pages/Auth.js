import React, { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import { dbService } from "../fbase.js";
import { collection, onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import login from '../img/Login.png';
import FolderImg from '../img/LoginImg.png';
import styled from 'styled-components';
import zip from '../img/ZiP.png';
import zip1 from '../img/ZiP (1).png';
import logo from '../img/Logo.png';

const DIV = styled.div`
margin: 0 auto;

`;

const Logo = styled.img`
width: 32px;
height: 34px;
margin-top: 32px;
margin-left: 24px;
`;

const Login = styled.img`
width: 327px;
height: 48px;
margin-top: 8px;
margin-left: 24px;
cursor: pointer;
`;

const LoginCon = styled.div`
width: 375px;
height: 812px;
display: flex;
flex-direction: column;
justify-content: flex-start;
margin: 0 auto;
overflow-x: hidden;
background: #FFF8F3;

`;

const LoginP = styled.header`
width: 287px;
margin-top: 32px;
margin-left: 24px;
//styleName: Body/B5-16-SB;
font-family: Pretendard;
font-size: 16px;
font-weight: 600;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
color:#353535;



`;
const LoginP1 = styled.header`
width: 280px;
height: 20px;
top: 125px;
margin-top: 6px;
margin-left: 2px;
//styleName: Body/B5-16-SB;
font-family: Pretendard;
font-size: 16px;
font-weight: 600;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
color:#353535;



`;

const RedText = styled.span`
font-family: Benz Grotesk;
font-size: 18px;
font-weight: 850;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
width: 33px;
top: 126px;
left: 24px;
color: #EC582F;


`;

const Img = styled.img`
width: 252px;
height: 230px;
margin-top: 146px;
margin-left: 58px;
margin-bottom: 171px;
opacity: 0.10000000149011612px;

`;

const ZIP = styled.img`
width: 33px;
height: 20px;
margin-top: 7px;


`;

const ZipCon = styled.div`
margin-left: 24px;
display: flex;
justify-content: flex-start;


`;

const MyZip = styled.header`
width: 140px;
height: 16px;
margin-left: 118px;
color: var(--orange-primary, #EC582F);
/* Body/B2-12-SB */
font-size: 12px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 16px;

`;


const Auth = () => {
  const [accessToken, setAccessToken] = useState("");
  const [kakaoId, setKakaoId] = useState([]);
 
  useEffect(() => {
    const initializeKakao = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("7eee69554b01a9bd34081035d074123e"); //카카오 자바스크립트 key
      }
    };
    initializeKakao();
  }, []); //카카오 초기화

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(dbService, "kakaoId"), (snapshot) => {
      const kakaoArr = snapshot.docs.map((doc) => ({
        id: doc.userId,
        ...doc.data(),
      }));
      setKakaoId(kakaoArr);
    });
    return () => unsubscribe();
  }, []); //kakao id가 있는지 없는지 확인

  const handleSuccess = async (response) => {
    console.log("로그인 성공", response);
    setAccessToken(response.response.access_token);
    localStorage.setItem("kakaoId", response.profile.id);
  
    // const hasMatchingId = (responseId, userIds) => {
    //   return userIds.some((userId) => responseId === userId);
    // };
  
    const collectionName = "kakaoId";
    const documentId = response.profile.id;
  
    // const addKakaoId = kakaoId.map((item) => item.userId);
    // const hasMatchingIdResult = hasMatchingId(response.profile.id, addKakaoId);
    // console.log("hasMatchingIdResult:", hasMatchingIdResult);
  
    const docRef = doc(dbService, collectionName, String(documentId));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("기존 로그인", data.userName);
        localStorage.setItem("userName", data.userName);
      } else {
        console.log("처음 로그인 한 사람");
        const data = {
          userId: response.profile.id,
          userName: response.profile.properties.nickname,
        };
        await setDoc(docRef, data);
        localStorage.setItem("userName", response.profile.properties.nickname);
      }
  };
  

  const handleFailure = (error) => {
    console.log("로그인 실패", error);
  };

  const handleLogout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        setAccessToken("");
        console.log("로그아웃");
      });
    }
  };

  return (
    <div>
      {accessToken ? (
        <div>
          {accessToken && <Navigate to="/home" replace={true} />}
        </div>
      ) : (
        <KakaoLogin
          token="7eee69554b01a9bd34081035d074123e"
          onSuccess={handleSuccess}
          onFail={handleFailure}
          onLogout={handleLogout}
          render={({ onClick }) => (
            <DIV>
              <LoginCon>
              <Logo src={logo}/> 
              <LoginP>지인들의 눈으로 나를 재발견하는 여정의 시작,</LoginP>
            <ZipCon>
              <ZIP src={zip1}/>
              <LoginP1>에서 나의 새로운 모습을 찾아가보세요!</LoginP1>
            </ZipCon>
              <Img src={FolderImg} alt="Folder"/>
              <MyZip>나만의 .ZiP을 만들고 싶다면?</MyZip>
              <Login  src={login} onClick={onClick}/>
              </LoginCon>
              {/* <button onClick={handleLogout}>로그아웃</button> */}
            </DIV>
          )}
        />
      )}
    </div>
  );
};

export default Auth;
