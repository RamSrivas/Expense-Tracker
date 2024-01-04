import '../component-css/home.css'
import '../component-css/utility.css'
import {useLocation } from 'react-router-dom';
import React, { useState ,Component , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
let totexp=0;
let max_exp=0;
let max_inc=0;

let tran_type=0
let tran_amount=0
let tran_octype=0
let tran_ocno=0
let tran_date=0 
let tran_paytype= 0
let categories=0
let note=0
let totinc=0;
let balance=0;
const Home = () => {
    const location =useLocation();
    const [Expenses, setExpense]=useState(location.state.Expenses);
    const names=location.state.names;
    const [mb_amt,setmb_amt]=useState(location.state.mb_amt);
    const navigate=useNavigate();
    const [position, setPosition] = useState({ x: 0, y: 0 });  
    const [enteredtype, setEnteredtype]= useState('')
    const [enteredAmount, setEnteredAmount]= useState('')
    const [enteredDate, setEnteredDate]= useState('')
    const [enteredoctype, setEnteredoctype]= useState('')
    const [enteredpaytype, setEnteredpaytype]= useState('')
    const [enterednote, setEnterednote]= useState('')
    const [enteredcat, setEnteredcat]= useState('')
    const [enteredocno, setEnteredocno]= useState(1)
    const [text,settext]=useState("Add")
    let newDate = new Date()
    let month = newDate.getMonth() + 1;
    if(month<10){month="0"+month;}
    let year = newDate.getFullYear();
    let first = year+"-"+month+"-"+"01"
    let second = year+"-"+month+"-"+"31";
    
    const newExpenses = []
    Expenses.forEach((Expenses) =>{
      if(first<=Expenses.tran_date && second>=Expenses.tran_date)
      {
        newExpenses.push(Expenses)
      }
    }) 

    const thief=()=>{
        tran_type=enteredtype
        tran_amount=enteredAmount
        tran_octype= enteredoctype
        tran_ocno= enteredocno
        tran_date=enteredDate
        tran_paytype= enteredpaytype
        categories=enteredcat
        note=enterednote
        
    }
    const submitDATA=(d,e)=>{
        let expenseData ={tran_type:tran_type,
            tran_amount:+tran_amount,
            tran_octype: tran_octype,
            tran_ocno: e,
            tran_date:d,
            tran_paytype: tran_paytype,
            categories: categories,
            note:note}; 
    setExpense((preExpences) => {
        return [expenseData, ...preExpences]})
    }


    const editdata =()=>{
        let ocnumb=parseInt(tran_ocno,10)
        if(ocnumb!==1){
            let fulldate=enteredDate;// 2024-01-04
            let date=fulldate.substring(8, 10);
            let month=fulldate.substring(5, 7);
            let year=fulldate.substring(0, 4);
            tran_ocno=1;
            if(tran_octype==="once"){
                for(var i=1;i<ocnumb;i++){
                    date=parseInt(date,10)
                    month=parseInt(month,10)
                    year=parseInt(year,10)
                    date+=1;
                    
                    if(month===1 || month===3 ||month===5 ||month===7 ||month===8 ||month===10 ||month===12)
                    {   
                        if(date===32){
                            date=1;
                            if(month!==12){
                                month+=1;
                            }
                            else {
                                year+=1;
                                month=1;
                            }
                        }
                    }
                    else if(month===2)
                    {
                        if(year%4===0){
                            if(date===30){
                                date=1;
                                month+=1;
                            }
                        }
                        else{ 
                            if(date===29){
                                date=1;
                                month+=1
                            }
                        }
                    }
                    else{
                        if(date===31){
                            date=1;
                            month+=1;
                        }
                    }
                    if(date<10){date="0"+date}
                    if(month<10){month="0"+month}
                    let d =year+"-"+month+"-"+date
                    submitDATA(d,tran_ocno);
                }
                // Expenses.tran_ocno=1;

            }
            else if(tran_octype==="weekly"){
                for(var i=1;i<ocnumb;i++){
                    date=parseInt(date,10)
                    month=parseInt(month,10)
                    year=parseInt(year,10)
                    date+=7;
                    
                    if(month===1 || month===3 ||month===5 ||month===7 ||month===8 ||month===10 ||month===12)
                    {   
                        if(date>31){
                            date=date-31;
                            if(month!==12){
                                month+=1;
                            }
                            else {
                                year+=1;
                                month=1;
                            }
                        }
                    }
                    else if(month===2)
                    {
                        if(year%4===0){
                            if(date>29){
                                date=date-29;
                                month+=1;
                            }
                        }
                        else{ 
                            if(date>28){
                                date=date-28;
                                month+=1
                            }
                        }
                    }
                    else{
                        if(date>30){
                            date=date-30;
                            month+=1;
                        }
                    }
                    if(date<10){date="0"+date}
                    if(month<10){month="0"+month}
                    let d =year+"-"+month+"-"+date
                    submitDATA(d,tran_ocno);
                }
            }
            else if(tran_octype==="monthly"){
                for(var i=1;i<ocnumb;i++){
                    date=parseInt(date,10)
                    month=parseInt(month,10)
                    year=parseInt(year,10)
                    month+=1;
                    
                    if(month===1 || month===3 ||month===5 ||month===7 ||month===8 ||month===10 ||month===12)
                    {   
                        if(date>31){
                            date=date-31;
                            if(month!==12){
                                month+=1;
                            }
                            else {
                                year+=1;
                                month=1;
                            }
                        }
                    }
                    else if(month===2)
                    {
                        if(year%4===0){
                            if(date>29){
                                date=date-29;
                                month+=1;
                            }
                        }
                        else{ 
                            if(date>28){
                                date=date-28;
                                month+=1
                            }
                        }
                    }
                    else{
                        if(date>30){
                            date=date-30;
                            month+=1;
                        }
                    }
                    if(date<10){date="0"+date}
                    if(month<10){month="0"+month}
                    let d =year+"-"+month+"-"+date
                    submitDATA(d,tran_ocno);
                }
            }
            else if(tran_octype==="yearly"){
                for(var i=1;i<ocnumb;i++){
                    date=parseInt(date,10)
                    month=parseInt(month,10)
                    year=parseInt(year,10)
                    year+=1;
                    
                    if(month===1 || month===3 ||month===5 ||month===7 ||month===8 ||month===10 ||month===12)
                    {   
                        if(date>31){
                            date=date-31;
                            if(month!==12){
                                month+=1;
                            }
                            else {
                                year+=1;
                                month=1;
                            }
                        }
                    }
                    else if(month===2)
                    {
                        if(year%4===0){
                            if(date>29){
                                date=date-29;
                                month+=1;
                            }
                        }
                        else{ 
                            if(date>28){
                                date=date-28;
                                month+=1
                            }
                        }
                    }
                    else{
                        if(date>30){
                            date=date-30;
                            month+=1;
                        }
                    }
                    if(date<10){date="0"+date}
                    if(month<10){month="0"+month}
                    let d =year+"-"+month+"-"+date
                    submitDATA(d,tran_ocno);
                }
            }
            
        }
    }

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
        function ocnoChangeHandler (event){
            setEnteredocno(event.target.value);
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

                let expenseData ={tran_type:enteredtype,
                tran_amount:+enteredAmount,
                tran_octype: enteredoctype,
                tran_ocno: enteredocno,
                tran_date:enteredDate,
                tran_paytype: enteredpaytype,
                categories: enteredcat,
                note:enterednote}; 
        setExpense((preExpences) => {
            return [expenseData, ...preExpences]})


            thief();
              
            event.preventDefault();
            
            setEnteredAmount('');
            setEnteredDate('');
            setEnteredocno(1)
            setEnteredtype('');
            setEnteredoctype('');
            setEnteredpaytype('');
            setEnteredcat('');
            setEnterednote('');
            hidet();
            editdata();
        };
        useEffect(() => {totexp=0;totinc=0;
            for(let i = 0; i < newExpenses.length ; i++)
                { 
                    if(newExpenses[i].tran_type === "Income"){
                        totinc += newExpenses[i].tran_amount;
                    }
                    else{totexp+=newExpenses[i].tran_amount;}
                }
                if(totinc>=totexp)balance='₹'+ (totinc-totexp);
                else balance='-₹'+(totexp-totinc)
        }, [newExpenses]);
    
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

    const showa = () => {
       navigate('/Home/Analyse',{state:{Expenses,names,mb_amt}} )
    };
    const transaction_whole_page =()=>{
        navigate('/Home/Transaction',{state:{Expenses,names,mb_amt}})
    }
    const [isVisiblecati, setIsVisiblecati] = useState(false);
    const [isVisiblecate, setIsVisiblecate] = useState(false);
    const [isVisibleMB,setIsVisibleMB]=useState(true)
    let left=mb_amt-totexp;
    const leftper=(totexp/mb_amt)*100;
    useEffect(() => {
        if(mb_amt != undefined && parseInt(mb_amt,10) != 0){
            setIsVisibleMB(false);
            settext("Edit")
        }
        else if(mb_amt === undefined || parseInt(mb_amt,10) === 0){
            setIsVisibleMB(true);
            settext("Add")}     
        },[left]);

        
    const showMB = () => {
        navigate('/Home/Monthlybudget' , {state:{names,Expenses,mb_amt}} )
    }
    const hidec = () => {
            setIsVisiblecate(true);
            setIsVisiblecati(false);
    };
   
    const showc = () => {
            setIsVisiblecate(false);
            setIsVisiblecati(true);
    };

    const [isVisibleTran, setIsVisible] = useState(false);
    
    const bgcolor=() => {
        if (leftper<99&&leftper>=85){
            return("#d66478")
        }
        else if(leftper<85 && leftper>=45.0){
            return("#e9bc23")
        }
        else if(leftper>=100){
            return("#FF0000")
        }
        else{
            return("#4b714a")
        };
    }

    const checkforlimit=()=>{
        if (leftper<99&&leftper>=85){
            alert("You are close to Your Monthly Budget")
        }
        else if(leftper<85 && leftper>=70){
            alert("I guess its time to slow your expense pace")
        }
        else if(leftper>=100){
            alert('Congratulations! You have reached your Monthly budget Now Stop Your Expenditure before its too late')
        }
    }


    const hidet = () => {
       setIsVisible(false);
    };
   
    const showt = () => {
        checkforlimit();
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
                    <h2 className="home__header2">{names}!</h2>
                </div>
                <div className="flex ai_center">
                    <button className="header_buttons" onClick={showa}>Analyse</button>
                    <button className="header_buttons" onClick={showMB}>{text} Budget</button>
                </div>
            </section>
            <section className='section2'>
                <h1>This Month:</h1>
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
                    <button className='yellow_buttons' onClick={transaction_whole_page} >See All</button>
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
                    <button className='yellow_buttons' onClick={showMB}>{text} Budget</button>
                </div>
                <div className='budget flex jc_center ai_center'>
                    <div className='no-budget-box flex jc_center br-2' >
                        <div className={`${isVisibleMB ? '' : 'hide'}`}>
                            <div className="flex jc_center">
                            <div className="flex flex_d-col ai_center no-budget">
                                <h2>NO Budgets Set!!</h2>
                                <br />
                                <h3>Set up a budget to help you stay in track with ur expense</h3>
                            </div>
                            </div>
                        </div>
                        <div className={`${!(isVisibleMB) ? '' : 'hide'}`}>
                        <div className="budget flex flex_d-col spaceard ai_center" style={{color:bgcolor()}} >
                            <p>
                                Your Budget: {mb_amt}
                            </p>
                            <p>
                                Your Month's Expense: {totexp}
                            </p>
                            <p>
                                You Left with: {left}
                            </p>
                        </div>
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
                    <div className='tran_etype margin_1-0 fs12 flex ai_center spaceeve'>
                        <p className='tran_octype_p'>No.of Occurence</p>
                        <input className='octype ocno tran_am_inp' type="number" min="1" value={enteredocno} onChange={ocnoChangeHandler} required  />
                        
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
                        <input className='octype note_des' type="text" onChange={noteChangeHandler} placeholder='Description'/>
                    </div>
                    <div className="flex ai_center jc_center savebtn">
                    <button className="glow-on-hover" type='submit'>Save</button>
                    </div>
                </div>
            </form>

        </div>
        </>
    )
} 
export default Home;