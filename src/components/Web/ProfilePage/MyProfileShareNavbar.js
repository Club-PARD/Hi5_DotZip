import React from 'react';
import logo from '../../../img/Logo.png';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

const NavBarWrapper = styled.nav`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  z-index: 0;
  background-color: white;
  color: white;
  margin-bottom: 40px;
`;
const Home  = styled.img `      
  width: 32px;
  height: 34.15px ;
  margin-left: 24px;
`;
// const Login = styled.div`
//   width: 64px;
//   height: 32px;
//   background: #FFF8F3;
//   border: 1px solid #EC582F;
//   color: #EC582F;
//   font-size: 12px;
//   font-family: Pretendard;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 16px;
//   border-radius: 8px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

const MyProfileShareNavbar = () => {
  // const navigate = useNavigate();
  // const onClick = () => {
  //   navigate('/');
  // };
    return(
    <NavBarWrapper>
        <Home src={logo}></Home>
        {/* <Login onClick={onClick}>로그인</Login> */}
    </NavBarWrapper>
    );
};


export default MyProfileShareNavbar;