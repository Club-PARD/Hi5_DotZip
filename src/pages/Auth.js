import React, { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import { dbService } from "../fbase.js";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const Auth = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false); //logout
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

  const handleSuccess = async(response) => {
    console.log("로그인 성공", response);
    console.log("사용자 이메일:",response.response.access_token);
    setAccessToken(response.response.access_token); 
    const unsubscribe = onSnapshot(collection(dbService, "kakaoId"), (snapshot) => {
      const kakaoArr = snapshot.docs.map((doc) => ({
        id: doc.userId,
        ...doc.data(),
      }));
      setKakaoId(kakaoArr);
    });
    const hasMatchingId = (responseId, userIds) => {
      return userIds.some((userId) => responseId === userId);
    };
  
    const addKakaoId = kakaoId.map((item) => item.userId);
    const hasMatchingIdResult = hasMatchingId(response.profile.id, addKakaoId);
    console.log("hasMatchingIdResult:", hasMatchingIdResult);
    if(!hasMatchingIdResult){
      try {
        await addDoc(collection(dbService, "kakaoId"), {
            userId: response.profile.id,
            nickName : response.profile.properties.nickname,
        });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
  }

    return () => unsubscribe();

  };

  const handleFailure = (error) => {
    console.log("로그인 실패", error);
  };

  const handleLogout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        setIsLoggedOut(true);
        setAccessToken("");
        console.log("로그아웃");
      });
    }
  };

  return (
    <div>
      {isLoggedOut ? (
        <div>
          <div>로그아웃되었습니다.</div>
          <button onClick={() => setIsLoggedOut(false)}>로그인</button>
        </div>
      ) : (
        <div>
          {accessToken ? (
            <div>
              <div>Access Token: {accessToken}</div>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <KakaoLogin
              token="5c373a790edcc8d304e01372fe507b43"
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
      )}
    </div>
  );
};

export default Auth;
