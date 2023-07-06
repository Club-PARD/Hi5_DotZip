import React from 'react';
import styled from "styled-components";
import GIFImg from '../../../img/MyRankImage.gif';


const GIF = styled.img`
  width: 300px;
  height: 250px;
`;

const ProfileAnimation = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <GIF src={GIFImg}/>
    </div>
  );
};

export default ProfileAnimation;
