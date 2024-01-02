import '../component-css/home.css'
import '../component-css/utility.css'
import {useLocation } from 'react-router-dom';
import React, { useState , useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
let totexp=0;
let totinc=0;
let balance=0;

const Home = () => {
    const location =useLocation();
    const nam=location.state.names;

    
    const [position, setPosition] = useState({ x: 0, y: 0 });  
        const [Expenses, setExpense]=useState([{},{},{},{},{}]);
        const [enteredtype, setEnteredtype]= useState('')
        const [enteredAmount, setEnteredAmount]= useState('')
        const [enteredDate, setEnteredDate]= useState('')
        const [enteredoctype, setEnteredoctype]= useState('')
        const [enteredpaytype, setEnteredpaytype]= useState('')
        const [enterednote, setEnterednote]= useState('')
        const [enteredcat, setEnteredcat]= useState('')
        function typeChangeHandler(x){
            setEnteredtype(x);
        }
        function dateChangeHandler(event){
            setEnteredDate(event.target.value);
        }
        function amountChangeHandler(event){
            setEnteredAmount(event.target.value);
        }
        function octypeChangeHandler (event){
            setEnteredoctype(event.target.value);
        }
        function paytypeChangeHandler(event){
            setEnteredpaytype(event.target.value);
        }
        function catChangeHandler(event){
            setEnteredcat(event.target.value);
        }
        function noteChangeHandler(event){
            setEnterednote(event.target.value);
        }
        function submitHandler(event){
            event.preventDefault();
            const expenseData ={tran_type:enteredtype,
                    tran_amount:+enteredAmount,
                    tran_octype: enteredoctype,
                    tran_date:enteredDate,
                    tran_paytype: enteredpaytype,
                    categories: enteredcat,
                    note:enterednote}; 
            setEnteredAmount('');
            setEnteredDate('');
            setEnteredtype('');
            setEnteredoctype('');
            setEnteredpaytype('');
            setEnteredcat('');
            setEnterednote('');
            hidet();
            setExpense((preExpences) => {
                return [expenseData, ...preExpences]})

        };
        const count =()=>{totexp=0;totinc=0;
            for(let i = 0; i < Expenses.length-5 ; i++)
                { 
                    if(Expenses[i].tran_type === "Income"){
                        totinc += Expenses[i].tran_amount;
                    }
                    else{totexp+=Expenses[i].tran_amount;}
                }
                if(totinc>=totexp)balance='₹'+ (totinc-totexp);
                else balance='-₹'+(totexp-totinc)
                
        };
    
    const handleMouseMove = (e) => {
        const x = e.pageX;
        const y = e.pageY;
        setPosition({ x: x - 10, y: y - 10 });
    };
    
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseMove);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseMove);
        };
    }, []);
    const [selanatype, setselanatype] = useState(0)
    const selweek = () =>{
        setselanatype(0);
    };
    const selmonth =()=>{
        setselanatype(33);
    };
    const selyear =()=>{
        setselanatype(65);
    };

    const [isVisibleAna, setIsVisibleAna] = useState(false);

    const hidea = () => {
       setIsVisibleAna(false);
    };
   
    const showa = () => {
       setIsVisibleAna(true);
    };
    const [isVisiblecati, setIsVisiblecati] = useState(false);
    const [isVisiblecate, setIsVisiblecate] = useState(false);
    const hidec = () => {
            setIsVisiblecate(true);
            setIsVisiblecati(false);
    };
   
    const showc = () => {
            setIsVisiblecate(false);
            setIsVisiblecati(true);
    };
    const [isVisibleTran, setIsVisible] = useState(false);

    const hidet = () => {
       setIsVisible(false);
    };
   
    const showt = () => {
       setIsVisible(true);
       expense()
    };
    const [seltype, setseltype] = useState(0)
    const income = () =>{
        setseltype(50);
        showc();
        typeChangeHandler('Income')
    };
    const expense =()=>{
        setseltype(0);
        typeChangeHandler('Expense')
        hidec();
    };
    function color(x){
        if (Expenses[x].tran_type === "Income") return "#81C784";  //green
        else return "#FF9F63"   ;//red
    }
    return (
        <>
        <div className="cursor" style={{ left:position.x+'px',top:position.y+'px' }} ></div>
        <div  className='page'>
            <section className='flex spacebtw'>
                <div>
                    <h4 className="home__header1">Hello</h4>
                    <h2 className="home__header2">{nam}!</h2>
                </div>
                <div className="flex ai_center">
                    <button className="header_buttons" onClick={showa}>Analyse</button>
                    <button className="header_buttons">Summary PDF</button>
                </div>
            </section>
            <section className='section2'>
                <h1>This Month :</h1>
                <div className="box flex spacebtw">
                    <div className="expense box_content_border br-4 flex ai_center jc_center bs_white">
                        <img className='box_img' src="/down-arrow.svg" alt="" />
                        <div>
                        <p>Expenses: </p>
                        <span id="money1">₹{totexp}</span>
                        </div>
                    </div>
                    <div className="income box_content_border br-4 flex ai_center jc_center bs_white">
                        <img className='box_img' src="/up-arrow.svg" alt="" />
                        <div>
                        <p>Incomes: </p>
                        <span id="money2">₹{totinc}</span>
                        </div>
                    </div>
                    <div className="balance box_content_border br-4 flex ai_center jc_center bs_white">
                        <img className='box_img' src="/balance.svg" alt="" />
                        <div>
                        <p>Balance:</p>
                        <span id='money3'>{balance}</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className='flex Add_transaction_button jc_center'>
                <button onClick={showt} className='add_transaction'>
                    <div className='flex ai_center trans_content'>
                        <p>Add Transaction</p>
                        <img className='transbtn' src="/plus.svg" alt="" />
                    </div>
                </button>
            </div>
            <section className='section3'>
                <div className='flex spacebtw' >
                    <h1>Recently Added Transactions :</h1>
                    <button className='yellow_buttons' >See All</button>
                </div>
                <div className="prv_transaction">
                    <div className="flex trans_prv">
                        <div className='type' style={{color:color(0)}} >{Expenses[0].tran_type}</div>
                        <div className="paymode">{Expenses[0].tran_paytype}</div>
                        <div className="transactionamount">{Expenses[0].tran_amount}</div>
                        <div className="category">{Expenses[0].categories}</div>
                        <div className="transactiondate">{Expenses[0].tran_date}</div>
                    </div>
                    <div className="flex trans_prv">
                        <div className='type' style={{color:color(1)}} >{Expenses[1].tran_type}</div>
                        <div className="paymode">{Expenses[1].tran_paytype}</div>
                        <div className="transactionamount">{Expenses[1].tran_amount}</div>
                        <div className="category">{Expenses[1].categories}</div>
                        <div className="transactiondate">{Expenses[1].tran_date}</div>
                    </div>
                    <div className="flex trans_prv">
                        <div className='type' style={{color:color(2)}} >{Expenses[2].tran_type}</div>
                        <div className="paymode">{Expenses[2].tran_paytype}</div>
                        <div className="transactionamount">{Expenses[2].tran_amount}</div>
                        <div className="category">{Expenses[2].categories}</div>
                        <div className="transactiondate">{Expenses[2].tran_date}</div>
                    </div>
                    <div className="flex trans_prv">
                        <div className='type' style={{color:color(3)}} >{Expenses[3].tran_type}</div>
                        <div className="paymode">{Expenses[3].tran_paytype}</div>
                        <div className="transactionamount">{Expenses[3].tran_amount}</div>
                        <div className="category">{Expenses[3].categories}</div>
                        <div className="transactiondate">{Expenses[3].tran_date}</div>
                    </div>
                    <div className="flex trans_prv">
                        <div className='type' style={{color:color(4)}} >{Expenses[4].tran_type}</div>
                        <div className="paymode">{Expenses[4].tran_paytype}</div>
                        <div className="transactionamount">{Expenses[4].tran_amount}</div>
                        <div className="category">{Expenses[4].categories}</div>
                        <div className="transactiondate">{Expenses[4].tran_date}</div>
                    </div>
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
            <form onSubmit={submitHandler} className={`${isVisibleTran ? '' : 'hide'}`} >
                <div className='blurbg'></div>
                <div className="transpagebox br-2">
                    <div className="flex spaceard ai_center trantitle br-2">
                    <button className="glow-on-hover margin_1-0" onClick={hidet}>Back</button>
                    <div className="spacer"></div>
                    <div className="tran_page_tile br-2">
                    <p>Add transaction</p>
                    </div>
                    </div>
                    <div className='flex spaceard tran_type'>
                        <div className="selected " style={{left:seltype+'%'}} ></div>
                        <a className='tran_tab' onClick={expense} >Expense</a>
                        <a className='tran_tab' onClick={income} >Income</a>
                    </div>
                    <div className="tran_date margin_1-0 fs12 flex ai_center spaceeve">
                        <p className='tran_date_p'>Date:</p>
                        <input className='date' type='date' min="2019-01-01" value={enteredDate} onChange={dateChangeHandler} required  /></div>
                    <div className='tran_etype margin_1-0 fs12 flex ai_center spaceeve'>
                        <p className='tran_octype_p'>Occurence type</p>
                        <select className="octype" name="oc_type" id="oc_type" required value={enteredoctype}  onChange={octypeChangeHandler}>
                            <option disabled value="">Select one</option>
                            <option value="once">Once</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="tran_amount margin_1-0 fs12 flex ai ai_center spaceeve">
                        <p className='tran_p'>Amount:</p>
                        <input className='octype tran_am_inp' required type="money" value={enteredAmount} onChange={amountChangeHandler} placeholder='₹0.00'/>
                    </div>
                    <div className={`${isVisiblecati ? '' : 'hide'}`}>
                    <div className="tran_cat margin_1-0 fs12 flex ai_centers spaceeve">
                        <p className='tran_p'>Categories Type</p>
                        <select className="octype" name="category" id="cat_type" required value={enteredcat} onChange={catChangeHandler}>
                            <option disabled value="">Select one</option>
                            <option value="Salary">Salary</option>
                            <option value="Sold-item">Sold-item</option>
                            <option value="Coupons">Coupons</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    </div>
                    <div className={`${isVisiblecate ? '': 'hide'}`}>
                    <div className="tran_cat margin_1-0 fs12 flex ai_centers spaceeve">
                        <p className='tran_p'>Categories Type</p>
                        <select className="octype" name="category" id="cat_type" required value={enteredcat} onChange={catChangeHandler}>
                            <option disabled value="">Select one</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Medical">Medical</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    </div>
                    <div className="tran_mode margin_1-0 fs12 flex ai_center spaceeve" >
                        <p className='tran_p'>Payment Mode</p>
                        <select className="octype" name="pay_type" id="pay_type" required value={enteredpaytype} onChange={paytypeChangeHandler}>
                            <option disabled value="">Select one</option>
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Online Payment">Online Payment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="tran_snote margin_1-0 fs12 flex ai_center spaceeve">
                        <p className='tran_p'>Note:</p>
                        <input className='octype note_des'enterednote type="text" onChange={noteChangeHandler} placeholder='Description'/>
                    </div>
                    <div className="flex ai_center jc_center savebtn">
                    <button className="glow-on-hover" type='submit'>Save</button>
                    </div>
                </div>
            </form>
            <section div className={`${isVisibleAna ? '' : 'hide'}`} >
                <div className='blurbg'></div>
                <div className="Anaspagebox br-2">
                    <div className="flex spaceard ai_center Anatitle br-2">
                    <button className="glow-on-hover margin_1-0" onClick={hidea}>Back</button>
                    <div className="spacer"></div>
                    <div className="Ana_page_tile br-2">
                    <p>Summary</p>
                    </div>
                    </div>
                    <div className='flex spaceard Ana_type'>
                        <div className="selectedana " style={{left:selanatype+'%'}} ></div>
                        <a className='Ana_tab' onClick={selweek} >Week</a>
                        <a className='Ana_tab' onClick={selmonth} >Month</a>
                        <a className='Ana_tab' onClick={selyear}  >Year</a>
                    </div>
                    
                </div>
            </section>
            {count()}
        </div>
        </>
    )
} 
export default Home;