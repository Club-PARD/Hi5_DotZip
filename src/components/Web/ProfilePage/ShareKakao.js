//카카오톡으로 공유하는 기능 구현
import React, { useEffect } from 'react';
import styled from "styled-components";
import KakaoImoticon from '../../../img/KakaoImoticon.png';
const { Kakao } = window;



const ShareButton = styled.button`
  border: none;
  margin-top: 13px;
  margin-left: 51px;
  margin-right: 32px;
  padding: 0;
  width: 97px;
  height: 32px;
  border-radius: 20px;
  color: white;
  background: #EC582F;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const KakaoImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const KakaoShareButton = () => {
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
        title: '{사용자 이름}.Zip', // 사용자 id받아와서 넣어 줄 부분
        description: '타인을 통해 나 자신을 파악하게 도와주는 웹서비스',
        imageUrl: 'https://github.com/Club-PARD/Hi5_DotZip/blob/master/src/img/Logo.png?raw=true',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '.Zip 구경하기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <div>
      <ShareButton id="kakaotalk-sharing-btn" onClick={createKakaoButton}>
        <KakaoImage src={KakaoImoticon} />카톡 공유
      </ShareButton>
    </div>
  );
};

export default KakaoShareButton;
