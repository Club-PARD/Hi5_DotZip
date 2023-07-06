import React from 'react';
import styled from "styled-components";
import Img from '../../../img/HomdLoading.png';


const IMG = styled.img`
  width: 375px;
  height: 586px;
  top: 683px;
`;

const ProfileAnimation = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IMG src={Img}/>
    </div>
  );
};

export default ProfileAnimation;
