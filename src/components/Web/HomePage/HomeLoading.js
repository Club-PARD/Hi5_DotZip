import React from 'react';
import styled from "styled-components";
import Img from '../../../img/HomdLoading.png';


const IMG = styled.img`
  width: 400px;
  height: 380px;
`;

const ProfileAnimation = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IMG src={Img}/>
    </div>
  );
};

export default ProfileAnimation;
