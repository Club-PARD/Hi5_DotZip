import { createGlobalStyle } from 'styled-components';
import Pretendard from '../asset/font/Pretendard-Medium.otf'


// GlobalStyle을 생성합니다.
export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-style: normal;
    src: url('Pretendard');
    src: url(${Pretendard}) format('embedded-opentype'),
         url(${Pretendard}) format('woff2'),
         url(${Pretendard}) format('woff'),
         url(${Pretendard}) format("truetype");
    font-display: swap;
} 
@font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url('Pretendard');
    src: url(${Pretendard}) format('embedded-opentype'),
         url(${Pretendard}) format('woff2'),
         url(${Pretendard}) format('woff'),
         url(${Pretendard}) format("truetype");
    font-display: swap;
} 
@font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-style: normal;
    src: url('Pretendard');
    src: url(${Pretendard}) format('embedded-opentype'),
         url(${Pretendard}) format('woff2'),
         url(${Pretendard}) format('woff'),
         url(${Pretendard}) format("truetype");
    font-display: swap;
} 
@font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-style: normal;
    src: url('Pretendard');
    src: url(${Pretendard}) format('embedded-opentype'),
         url(${Pretendard}) format('woff2'),
         url(${Pretendard}) format('woff'),
         url(${Pretendard}) format("truetype");
    font-display: swap;
} 
@font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-style: normal;
    src: url('Pretendard');
    src: url(${Pretendard}) format('embedded-opentype'),
         url(${Pretendard}) format('woff2'),
         url(${Pretendard}) format('woff'),
         url(${Pretendard}) format("truetype");
    font-display: swap;
} 

  body{
      font-family: "Pretendard";
      background-color: #fff;
   }

`;

export const theme = {
  Web_fontSizes: {
    Header0: '96px',
    Header1: '70px',
    Header2: '60px',
    Header3: '48px',
    Header4: '34px',
    Header5: '24px',
    Header6: '20px',
    Header7: '40px',
    Header8: '30px',
    Subtitle1: '16px',
    Subtitle2: '14px',
    Subtitle3: '24px',
    Body1: '16px',
    Body2: '14px',
    ButtonText1: '16px',
    Caption1: '12px',
    Caption: '12px'
  },
  fontWeights: {
    Header0: '800',
    Header1: '800',
    Header2: '800',
    Header3: '400',
    Header4: '400',
    Header5: '700',
    Header6: '700',
    Header7: '800',
    Header8: '800',
    Subtitle1: '800',
    Subtitle2: '700',
    Subtitle3: '400',
    Body1: '400',
    Body2: '400',
    ButtonText1: '700',
    Caption1: '400',
    Caption: '400'
  },
  Mob_fontSizes: {
    Header0: '96px',
    Header1: '70px',
    Header2: '60px',
    Header3: '48px',
    Header4: '34px',
    Header5: '24px',
    Header6: '20px',
    Header7: '40px',
    Header8: '30px',
    Subtitle1: '16px',
    Subtitle2: '14px',
    Subtitle3: '24px',
    Body1: '16px',
    Body2: '14px',
    ButtonText1: '16px',
    Caption1: '12px',
    Caption: '12px'
  },

};
