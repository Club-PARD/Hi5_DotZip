import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import back from '../img/back.png'
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NavbarWrapper = styled.nav`
  width: 327px;
  display: flex;
  height: 64px;
      display: flex;
    align-items: center;
    margin-top: 4.5px;
`;
const ButtonClick = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
    align-items: center;

  `
const BackButton = styled.img`
  background-color: transparent;
  border: none;
  width: 7px;
  height: 14px;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Div>
    <NavbarWrapper >
      <ButtonClick onClick={handleGoBack}>
      <BackButton src={back} ></BackButton>
      </ButtonClick>
    </NavbarWrapper>
    </Div>
  );
};

export default Navbar;
