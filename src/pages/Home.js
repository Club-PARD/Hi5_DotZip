import styled from "styled-components";
import { useMediaQuery } from 'react-responsive'
import HomeFirst from "../components/Web/Web-HomePage/Web-HomePageFirst";
import HomeFirst_Mob from "../components/Mobile/Mobile-HomePage/Mobile-HomePageFirst";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";



function Home() {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' }); // 758px 이하일 때는 모바일 뷰로 바뀐다.
    const HomePageComponent = styled.div`
    
    `;
    const HomePageComponent_Mob = styled.div`
    width: 100%;
`;

    return (
        <HomePageComponent>
            {isDesktopOrMobile !== true ?
                <div>
                    <NavBar/>
                    <HomeFirst />
                    <Footer/>
                </div>
                :
                <HomePageComponent_Mob>
                    <NavBar/>
                    <HomeFirst_Mob/>
                    <Footer/>
                </HomePageComponent_Mob>
            }
        </HomePageComponent>
    );
}

export default Home;