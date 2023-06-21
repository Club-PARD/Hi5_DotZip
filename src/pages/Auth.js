import React, { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import { dbService } from "../fbase.js";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Navigate } from "react-router-dom";

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
  }, []);

  const handleSuccess = async (response) => {
    console.log("로그인 성공", response);
    console.log("사용자 이메일:", response.response.access_token);
    setAccessToken(response.response.access_token);

    const hasMatchingId = (responseId, userIds) => {
      return userIds.some((userId) => responseId === userId);
    };

    const addKakaoId = kakaoId.map((item) => item.userId);
    const hasMatchingIdResult = hasMatchingId(response.profile.id, addKakaoId);
    console.log("hasMatchingIdResult:", hasMatchingIdResult);
    if (!hasMatchingIdResult) {
      try {
        await addDoc(collection(dbService, "kakaoId"), {
          userId: response.profile.id,
          nickName: response.profile.properties.nickname,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
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
//hashMatching 이 false이면 처음들어간 것이라 그때 로그인 환영합니다 페이지 생성
//true면 한번들어온 것이라 그때 생성
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
