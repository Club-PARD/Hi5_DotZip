import React from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';

const Div = styled.footer`
   background-color: #2A2A2A;
    width: 100%;
    justify-content: center;
    display: flex;
    `

const FooterWrapper = styled.footer`
    background-color: #2A2A2A;
    // background-color: white;
    width: 1280px;
    height: 130px;
    font-family: 'NanumSquare Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 180%;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 100px;
    color: white;
`;


function Footer() {

    return (
        <Div>
            <FooterWrapper> 
                배예진 조세희 김현승 김지수 이한나
            </FooterWrapper>
        </Div>
    );
}

export default Footer;