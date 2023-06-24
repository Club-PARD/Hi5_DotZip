import styled from "styled-components";
import HomeFirst from "../components/Web/HomePage/HomePageFirst";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePageComponent = styled.div`
    
`;

function Home() {



    return (
        <HomePageComponent>
                <div>
                    <NavBar/>
                    <HomeFirst />
                    <Footer/>
                </div>
        </HomePageComponent>
    );
}

export default Home;