import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../asset/animation/myprofile.json';


const ProfileAnimation = () => {
  return (
    <div>
      <Lottie
        animationData={animationData} // 애니메이션 JSON 데이터
        loop={true} // 애니메이션 반복 여부
        autoplay={true} // 애니메이션 자동 재생 여부

      />
    </div>
  );
};

export default ProfileAnimation;
