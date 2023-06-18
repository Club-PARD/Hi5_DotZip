import styled from "styled-components";
import { useMediaQuery } from 'react-responsive'
import AboutFirst from "../components/Web/Web-AboutPage/Web-AboutFirst";
import AboutFirst_Mob from "../components/Mobile/Mobile-AboutPage/Mobile-AboutFirst";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";



function AboutPage() {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

    const AboutPageComponent = styled.div`
    `;


const AboutPageComponent_Mob = styled.div`
width: 100%;
`;

    return (
        <AboutPageComponent>
            {isDesktopOrMobile !== true ?
                <div>
                    <NavBar/>
                    <AboutFirst />
                    <Footer/>
                </div>
                :
                <AboutPageComponent_Mob>
                    <NavBar/>
                    <AboutFirst_Mob/>
                    <Footer/>
                </AboutPageComponent_Mob>
            }
        </AboutPageComponent>
    );
}

export default AboutPage;


// const AboutPageComponent_Web = styled.div`
// justify-content: center;
// background-color: #1A1A1A;
// width: 100%;
// min-width: 1440px;
// `;
