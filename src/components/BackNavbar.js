import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Div = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
`;
const NavbarWrapper = styled.nav`
  width: 375px;
  padding-left: 36px;
  display: flex;
  height: 64px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Div>
    <NavbarWrapper>
      <BackButton onClick={handleGoBack}>{'<'}</BackButton>
    </NavbarWrapper>
    </Div>
  );
};

export default Navbar;
