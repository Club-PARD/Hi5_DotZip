import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
import styled /*{ ThemeProvider } */ from 'styled-components';
// import { useState, useEffect } from 'react';

const NavBarWrapper = styled.nav`
  height: 70px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #1A1A1A;
  color: white;
`;

const NavBar = () => {
    return(
    <NavBarWrapper>
        <div>Hi^5 화이팅!!</div>
    </NavBarWrapper>
    );
};


export default NavBar;