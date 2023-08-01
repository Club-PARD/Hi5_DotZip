import styled from "styled-components";
import { Route } from "react-router-dom";
import HomeFirst from "../components/Web/HomePage/Home";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import PickAnswerPage from "../components/Web/VotePage/PickAnswerPage";

const HomePageComponent = styled.div`
    
`;

function Home() {



    return (
        <HomePageComponent>
                <div>
                    <NavBar/>
                    <HomeFirst />
                    {/* <Footer/> */}
                </div>
        </HomePageComponent>
    );
}

export default Home;