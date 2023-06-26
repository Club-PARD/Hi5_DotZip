import styled from "styled-components";
import SurveyFirst from "../components/Web/SurveyPage/SurveyFirst";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";



function SurveyPage() {    const SurveyPageComponent = styled.div`
    `;


    return (
        <SurveyPageComponent>
            <div>
                <NavBar />
                <SurveyFirst />
                <Footer/>
            </div>
        </SurveyPageComponent>
    );
}

export default SurveyPage;



