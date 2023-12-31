//카카오톡으로 공유하는 기능 구현
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import KakaoImoticon from '../../../img/Share.png';
const { Kakao } = window;

const ShareButton = styled.img`
    width: 157px;
    height: 48px;
    margin-left:15px;
    cursor: pointer;
`;
const MyKakaoShareButton = () => {
  const [userNickname] = useState(localStorage.getItem("userName"));
  const hashId = 3 * localStorage.getItem("kakaoId");
  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    try {
      if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init('7eee69554b01a9bd34081035d074123e');
        }
      }
    } catch (e) {
      alert(e.name);
      alert(e.description);
    }

    Kakao.Share.createDefaultButton({
      container: '#kakaotalk-sharing-btn',
      objectType: 'feed',
      content: {
        title: `${userNickname}님이 프로필을 공유했어요!`, // 사용자 id받아와서 넣어 줄 부분
        description: `프로필.ZiP을 \n지금 바로 확인해보세요.`,
        imageUrl: 'https://github.com/Club-PARD/Hi5_DotZip/blob/master/src/img/thumbnail.png?raw=true',
        link: {
          mobileWebUrl: `${window.location.origin}/MyProfileSharePage/${hashId}`,
          webUrl: `${window.location.origin}/MyProfileSharePage/${hashId}`,
        },
      },
      buttons: [
        {
          title: '프로필 구경하러 가기',
          link: {
            mobileWebUrl: `${window.location.origin}/MyProfileSharePage/${hashId}`,
            webUrl: `${window.location.origin}/MyProfileSharePage/${hashId}`,
          },
        },
      ],
    });
  };

  return (
    <div>
      <ShareButton id="kakaotalk-sharing-btn" onClick={createKakaoButton} src={KakaoImoticon} />
    </div>
  );
};

export default MyKakaoShareButton;
