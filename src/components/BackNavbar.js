import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Div = styled.div`
    display: flex;
    justify-content: center;
`;
const NavbarWrapper = styled.nav`
  width: 327px;
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
