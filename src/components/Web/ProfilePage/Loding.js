import styled, { keyframes } from "styled-components";
import React from 'react';
import LodingImage from '../../../img/LodingImage.jpeg';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotatingImage = styled.img`
  width: 300px;
  height: 300px;
  animation: ${spinAnimation} 2s linear infinite;
`;

const Loading = () => {
    return (
        <>
            <RotatingImage src={LodingImage} />
        </>
    );
}

export default Loading;

