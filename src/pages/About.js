import styled from "styled-components";
import AboutFirst from "../components/Web/AboutPage/AboutFirst";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";



function AboutPage() {    const AboutPageComponent = styled.div`
    `;


    return (
        <AboutPageComponent>
          
            <div>
                <NavBar/>
                <AboutFirst />
                <Footer/>
            </div>
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
