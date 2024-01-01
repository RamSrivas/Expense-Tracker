import '../component-css/home.css'
import '../component-css/utility.css'
import {useLocation } from 'react-router-dom';
const Home = (props) => {
    const location =useLocation();
    const nam=location.state.names;
    let curs = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
      let x = e.pageX;
      let y = e.pageY;
      curs.style.left = (x - 10) + "px";
      curs.style.top = (y - 10) + "px";
    });
    document.addEventListener('mouseleave', (e) => {
        let x = e.pageX;
        let y = e.pageY;
        curs.style.left = (x - 10) + "px";
        curs.style.top = (y - 10) + "px";
      });
    return (
        <>
        <div className="cursor"></div>
        <div  className='page'>
            <section className='flex spacebtw'>
                <div>
                    <h4 className="home__header1">Hello</h4>
                    <h2 className="home__header2">{nam}!</h2>
                </div>
                <div className="flex ai_center">
                    <button className="header_buttons">Analyse</button>
                    <button className="header_buttons">Summary PDF</button>
                    <button className="header_buttons">Settings</button>
                </div>
            </section>
            <section className='section2'>
                <h1>This Month :</h1>
                <div className="box flex spacebtw">
                    <div className="expense box_content_border br-4 flex ai_center jc_center bs_white">
                        <img className='box_img' src="/down-arrow.svg" alt="" />
                        <div>
                        <p>Expenses: </p>
                        <span id="money1">$0</span>
                        </div>
                    </div>
                    <div className="income box_content_border br-4 flex ai_center jc_center bs_white">
                        <img className='box_img' src="/up-arrow.svg" alt="" />
                        <div>
                        <p>Incomes: </p>
                        <span id="money2">$0</span>
                        </div>
                    </div>
                    <div className="balance box_content_border br-4 flex ai_center jc_center bs_white">
                        <img className='box_img' src="/balance.svg" alt="" />
                        <div>
                        <p>Balance:</p>
                        <span id='money3'>$0</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className='flex jc_center'>
                <button className='add_transaction'>
                    <div className='flex ai_center trans_content'>
                        <p>Add Transaction</p>
                        <img className='transbtn' src="/plus.svg" alt="" />
                    </div>
                </button>
            </div>
            <section className='section3'>
                <div className='flex spacebtw' >
                    <h1>Recent Transactions :</h1>
                    <button className='yellow_buttons' >See All</button>
                </div>
                <div>

                </div>
            </section>
            <section className='section4'>
                <div className='flex spacebtw'>
                    <h1>Monthly Budget</h1>
                    <button className='yellow_buttons' >Add Budget</button>
                </div>
                <div className='budget flex jc_center ai_center'>
                    <div className='no-budget-box flex jc_center br-2' >
                        <div className="flex flex_d-col ai_center no-budget">
                            <h2>NO Budgets Set!!</h2>
                            <br />
                            <h3>Set up a budget to help you stay in track with ur expense</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
        </>
    )
} 
export default Home;