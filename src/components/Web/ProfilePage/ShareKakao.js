//카카오톡으로 공유하는 기능 구현
import React, { useEffect } from 'react';
import styled from "styled-components";
const { Kakao } = window;


const ShareButton = styled.button` //링크복사
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
    display: inline-block;
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
        카카오톡 공유하기
      </ShareButton>
    </div>
  );
};

export default KakaoShareButton;
