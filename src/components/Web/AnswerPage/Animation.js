import React from 'react';
// // import Lottie from 'lottie-react';
// import animationData from '../../../asset/animation/84313-files.json';
import animationLoading from '../../../img/answerLoading.gif'
import { styled } from 'styled-components';

const Img = styled.img`
  animation-duration: 2s;
`;
const Animation = () => {
  return (
    <div>
      <Img src={animationLoading}
      />
    </div>
  );
};

export default Animation;
