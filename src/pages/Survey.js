import styled from "styled-components";
import { Route } from "react-router-dom";
import SurveyFirst from "../components/Web/SurveyPage/SurveyFirst";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SurveyShare from "../components/Web/SurveyPage/SurveyShare";

const SurveyPageComponent = styled.div`
  // Remaining styles...
`;

function SurveyPage() {
  return (
    <SurveyPageComponent>
      <div>
        <NavBar />
        <SurveyFirst />
        <Route path="/SurveyShare/:questionId" component={SurveyShare} />
        <Footer />
      </div>
    </SurveyPageComponent>
  );
}

export default SurveyPage;
