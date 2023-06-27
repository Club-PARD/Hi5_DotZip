import React, { useContext, useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import { dbService } from "../fbase.js";
import { collection, onSnapshot, setDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { KakaoIdContext } from "../KakaoIdContext.js";
import { UserNameContext } from "../UserNameContext";

const Auth = () => {
  const [accessToken, setAccessToken] = useState("");
  const [kakaoId, setKakaoId] = useState([]);
  const [kakaoContext, setkakaoContext] = useContext(KakaoIdContext);
  const [userContext, setuserContext] = useContext(UserNameContext);
 
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
    setkakaoContext(response.profile.id.toString());
    localStorage.setItem("kakaoId",response.profile.id);
    setuserContext(response.profile.properties.nickname.toString());
    const hasMatchingId = (responseId, userIds) => {
      return userIds.some((userId) => responseId === userId);
    };

    const collectionName = "kakaoId";
    const documentId = response.profile.id;
    const data = {
      userId: response.profile.id,
      userName: response.profile.properties.nickname,
    };

    const addKakaoId = kakaoId.map((item) => item.userId);
    const hasMatchingIdResult = hasMatchingId(response.profile.id, addKakaoId);
    console.log("hasMatchingIdResult:", hasMatchingIdResult);
    const docRef = doc(dbService, collectionName, String(documentId));
    if (!hasMatchingIdResult) {
      await setDoc(docRef, data);

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
            <div>
              <div onClick={onClick}>카카오로 로그인하기</div>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default Auth;
