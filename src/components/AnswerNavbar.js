import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo.png'

import styled /*{ ThemeProvider } */ from 'styled-components';
// import { useState, useEffect } from 'react';

const NavBarWrapper = styled.nav`
  height: 70px;
  display: flex;

  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  z-index:0;
  background-color: white;
  color: white;
`;

const Home  = styled.img `      
  width: 32px;
  height: 34.15px ;
  margin-left: 24px;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const HomeOnClick = () => {
    navigate('/home');
  };
    return(
    <NavBarWrapper>

        <Home src={logo} onClick={HomeOnClick}></Home>
    </NavBarWrapper>
    );
};


export default NavBar;