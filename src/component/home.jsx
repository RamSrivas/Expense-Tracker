import '../component-css/navbar.css'
import '../component-css/home.css'
import '../component-css/utility.css'
import {useLocation } from 'react-router-dom';
import { Chart } from "react-google-charts";
const data = [
    ["Task", " Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  export const data1 = [
    ["Year", "Income", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];
const options = {title: "Expense By Categories",};
const options1 = {
    title: "Income vs Expense",
    curveType: "function",
    legend: { position: "bottom" },
};
const Home = (props) => {
    const location =useLocation();
    const nam=location.state.names;
    return (
        <>
        <div className="navbar_container">
            <div className=" navbar">
                <div className=" navbar_content flex flex_d-col">
                    <div className=" navbar_logo flex">
                        <a className=' navbar_logo_img' href="/Home"><img src="logo.svg"/></a>
                    </div>
                    <div className=" navbar_general flex flex_d-col">
                        <h3 className=" navbar_general_title">General</h3>
                        <a href="" className=" navbar_general_content flex ai_center"><img src="home.svg" alt="" />Home</a>
                        <a href="" className=" navbar_general_content flex ai_center"><img src="transaction.svg" alt="" />Transaction</a>
                        <a href="" className=" navbar_general_content flex ai_center"><img src="c-folder.svg" alt="" />Categories</a>
                    </div>
                    <div className=" navbar_extra">
                    <h3 className=" navbar_extra_title">Extra</h3>
                    <a href="" className=" navbar_general_content1 flex ai_center"><img src="graph.svg" alt="" />Report</a>
                    <a href="" className=" navbar_general_content1 flex ai_center"><img src="setting.svg" alt="" />Setting</a>
                    </div>
                    
                </div>
            </div>
            <div className="home__page">
                <div className='flex ai_center jc_center page'>
                <div className="home__page__container br-2 bs flex ai_center jc_center">
                    <div className='home__page_inner_container'>
                        <h1 className="home__h1">Hello {nam} !!</h1>
                        <p className="home__para"><b></b></p>
                        <img src="" alt="" />
                        <div className="income br-2 box bs flex">
                            <div className='incomebox'>
                            <img src="" alt="" />
                            </div>
                            <div className='incomebox1 flex flex_d-col ai_center jc_center '>
                            <h3>TOTAL INCOME</h3>
                            <p>$400</p>
                            </div>
                        </div>
                        <div className="expense bs br-2 box flex">
                        <div className='incomebox'>
                            <img src="" alt="" />
                            </div>
                            <div className='incomebox1 flex flex_d-col ai_center jc_center '>
                            <h3>TOTAL EXPENSE</h3>
                            <p>$400</p>
                            </div>
                        </div>
                        <div className="balance bs br-2 box flex ">
                        <div className='incomebox'>
                            <img src="" alt="" />
                            </div>
                            <div className='incomebox1 flex flex_d-col ai_center jc_center '>
                            <h3>BALANCE</h3>
                            <p>$0</p>
                            </div>
                        </div>
                        <div className="pie_graph"><Chart
                            chartType="PieChart"
                            width="100%"
                            height='400px'
                            data={data}
                            options={options}
                            />
                        </div>
                        <div className="line_graph"><Chart
                            chartType="LineChart"
                            width="100%"
                            height="400px"
                            data={data1}
                            options={options1}
                            />
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
        </>
    )
} 
export default Home;