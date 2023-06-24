import styled from "styled-components";
import HomeFirst from "../components/Web/HomePage/HomePageFirst";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { KakaoIdContext } from "../KakaoIdContext";

const HomePageComponent = styled.div`
    
`;

function Home() {

const { kakaoContext } = useContext(KakaoIdContext);
console.log(kakaoContext);

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