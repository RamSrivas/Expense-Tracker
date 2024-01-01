import '../component-css/home.css'
import '../component-css/utility.css'
import {useLocation } from 'react-router-dom';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    const [date, setDate] = useState(new Date());
    let transpage = document.querySelector('#transpage');
    const hide =() =>{
    transpage.classList.add("hide");
    }
    const show =() => {
    transpage.classList.remove("hide");
    }
    let selected=document.querySelector('.selected')
    const income=()=>{
        selected.style.left= 33 +"%";
    }
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
                <button onClick={show} className='add_transaction'>
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
            <section id='transpage' className='' >
                <div className='blurbg'></div>
                <div className="transpagebox br-2">
                    <div className="flex spaceard ai_center trantitle br-2">
                    <button class="glow-on-hover margin_1-0" onClick={hide}>Back</button>
                    <div className="spacer"></div>
                    <div className="tran_page_tile br-2">
                    <p>Add transaction</p>
                    </div>
                    </div>
                    <div className='flex spaceard tran_type'>
                        <div className="selected "></div>
                        <a className='tran_tab' href="">Expense</a>
                        <a onClick={income} className='tran_tab'>Income</a>
                        <a className='tran_tab' >Transfer</a>
                    </div>
                    <div className="tran_date margin_1-0 fs12 flex ai_center spaceeve">
                        <p className='tran_date_p'>Date:</p>
                        <DatePicker className='datepicker' selected={date} onChange={date => setDate(date)} /></div>
                    <div className='tran_etype margin_1-0 fs12 flex ai_center spaceeve'>
                        <p className='tran_octype_p'>Occurence type</p>
                        <select className="octype" name="oc_type" id="oc_type">
                            <option value="once">Once</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="tran_amount margin_1-0 fs12 flex ai ai_center spaceeve">
                        <p className='tran_p'>Amount:</p>
                        <input className='octype tran_am_inp' type="money" placeholder='₹0.00'/>
                    </div>
                    <div className="tran_cat margin_1-0 fs12 flex ai_centers spaceeve">
                        <p className='tran_p'>Categories Type</p>
                        <select className="octype" name="category" id="cat_type"></select>
                    </div>
                    <div className="tran_mode margin_1-0 fs12 flex ai_center spaceeve">
                        <p className='tran_p'>Payment Mode</p>
                        <select className="octype" name="pay_type" id="pay_type">
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Online Payment">Online Payment</option>
                        </select>
                    </div>
                    <div className="tran_snote margin_1-0 fs12 flex ai_center spaceeve">
                        <p className='tran_p'>Note:</p>
                        <input className='octype note_des' type="text" placeholder='Description'/>
                    </div>
                    <div className="flex ai_center jc_center savebtn">
                    <button class="glow-on-hover" onClick={hide}>Save</button>
                    </div>
                </div>
            </section>
        </div>

        </>
    )
} 
export default Home;