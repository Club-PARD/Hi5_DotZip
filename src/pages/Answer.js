import styled from "styled-components";
import AnswerVote from "../components/Web/AnswerPage/AnswerVote";
import NavBar from "../components/AnswerNavbar";
import Footer from "../components/Footer";

const AnswerPageComponent = styled.div`
`;



function AnswerPage() {        

    return (
        <AnswerPageComponent>
          
            <div>
                <NavBar/>
                <AnswerVote />
            </div>
        </AnswerPageComponent>
    );
}

export default AnswerPage;