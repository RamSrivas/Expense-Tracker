import '../component-css/home.css'
import {useLocation } from 'react-router-dom';
const Home = (props) => {
    const location =useLocation();
    const nam=location.state.names;
    return (
        <>
        <div className="home__container">
            <div className="home__navbar">
                <div className="home__navbar_content">
                    <div className="home__navbar_logo">
                        <a href=""></a>
                    </div>
                    <div className="home__navbar_general">
                        <h3 className="home__navbar_general_title">General</h3>
                    </div>
                    <div className="home__navbar_extra">
                    <h3 className="home__navbar_extra_title">Extra</h3>
                    </div>
                </div>
            </div>
            <div className="home__page">

            <h1 className="home__h1">Hello {nam} !!</h1>
            </div>

        </div>
        </>
    )
} 
export default Home;