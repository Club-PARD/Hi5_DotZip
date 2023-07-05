//카카오톡으로 공유하는 기능 구현
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import KakaoImoticon from '../../../img/KakaoImoticon.png';
const { Kakao } = window;



const ShareButton = styled.button`
  border: none;
  margin-top: 13px;
  margin-left: 6px;
  margin-right: 12px;
  padding: 0;
  width: 40px;
  height: 32px;
  background: none;
  display: flex;
`;
const KakaoImage = styled.img`
  width: 100%;
  height: 100%;
`;

const KakaoShareButton = ({ questionId }) => {
  const [userNickname] = useState(localStorage.getItem("userName"));
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
        title: `${userNickname}님이 질문 폴더를 공유했어요!`, // 사용자 id받아와서 넣어 줄 부분
        description: `로그인 없이 \n간편하게 답변을 남겨보세요.`,
        imageUrl: 'https://github.com/Club-PARD/Hi5_DotZip/blob/master/src/img/thumbnail.png?raw=true',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '답변 남기러 가기',
          link: {
            mobileWebUrl: `${window.location.origin}/answer/${questionId}`,
            webUrl: `${window.location.origin}/answer/${questionId}`,
          },
        },
      ],
    });
  };

  return (
    <div>
      <ShareButton id="kakaotalk-sharing-btn" onClick={createKakaoButton}>
        <KakaoImage src={KakaoImoticon} />
      </ShareButton>
    </div>
  );
};

export default KakaoShareButton;
