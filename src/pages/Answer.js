import styled from "styled-components";
import AnswerVote from "../components/Web/AnswerPage/AnswerVote";
import AddAnswer from "../components/Web/AnswerPage/AddAnswer"
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";



function AnswerPage() {    
    const AnswerPageComponent = styled.div`
    `;


    return (
        <AnswerPageComponent>
          
            <div>
                <NavBar/>
                <AnswerVote />
                <AddAnswer/>
                <Footer/>
            </div>
        </AnswerPageComponent>
    );
}

export default AnswerPage;