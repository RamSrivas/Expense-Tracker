import '../component-css/home.css'
import '../component-css/utility.css'
import {useLocation } from 'react-router-dom';
import React, { useState , useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

// helper to generate additional dates for recurring entries
// base is YYYY-MM-DD, count is number of occurrences, type is once/weekly/monthly/yearly
function generateDates(base, count, type) {
    const pad2 = (n: number) => n.toString().padStart(2, '0');
    let [year, month, date] = base.split('-').map(Number);
    const out: DateType[] = [];
    for (let i = 1; i < count; i++) {
        switch (type) {
            case 'once':
                date += 1;
                break;
            case 'weekly':
                date += 7;
                break;
            case 'monthly':
                month += 1;
                break;
            case 'yearly':
                year += 1;
                break;
            default:
                break;
        }
        // adjust day/month overflow
        let mdays = 31;
        if ([4,6,9,11].includes(month)) mdays = 30;
        else if (month === 2) mdays = (year % 4 === 0 ? 29 : 28);
        while (date > mdays) {
            date -= mdays;
            month += 1;
            mdays = [4,6,9,11].includes(month) ? 30 : (month === 2 ? (year % 4 === 0 ? 29 : 28) : 31);
        }
        if (month > 12) {
            month = 1;
            year += 1;
        }
        out.push(`${year}-${pad2(month)}-${pad2(date)}`);
    }
    return out;
}
const Home = () => {
    const location =useLocation();
    const [Expenses, setExpense]=useState(location.state.Expenses);
    const names=location.state.names;
    const [mb_amt] = useState(location.state.mb_amt);
    const navigate=useNavigate();
    // cursor position will be handled with refs to avoid rerendering every move
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });

    const [enteredtype, setEnteredtype]= useState('')
    const [enteredAmount, setEnteredAmount]= useState('')
    const [enteredDate, setEnteredDate]= useState('')
    const [enteredoctype, setEnteredoctype]= useState('')
    const [enteredpaytype, setEnteredpaytype]= useState('')
    const [enterednote, setEnterednote]= useState('')
    const [enteredcat, setEnteredcat]= useState('')
    const [enteredocno, setEnteredocno]= useState(1)
    const [text,settext]=useState("Add")
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const first = `${year}-${month}-01`;
    const second = `${year}-${month}-31`;
    
    // filter transactions for current month
    const newExpenses = React.useMemo(() => {
      return Expenses.filter(e => first <= e.tran_date && second >= e.tran_date);
    }, [Expenses, first, second]);

    // compute totals and balance
    const { totexp, totinc, balance } = React.useMemo(() => {
      let te = 0;
      let ti = 0;
      newExpenses.forEach(e => {
        if (e.tran_type === "Income") ti += e.tran_amount;
        else te += e.tran_amount;
      });
      return {
        totexp: te,
        totinc: ti,
        balance: ti >= te ? `₹${ti - te}` : `-₹${te - ti}`
      };
    }, [newExpenses]);

    // create a single expense object from current form state
    const makeExpense = (date, occ = 1) => ({
      tran_type: enteredtype,
      tran_amount: +enteredAmount,
      tran_octype: enteredoctype,
      tran_ocno: occ,
      tran_date: date,
      tran_paytype: enteredpaytype,
      categories: enteredcat,
      note: enterednote
    });



    // previous recurrence logic replaced by generateDates

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
            event.preventDefault();
            const baseDate = enteredDate;
            const ocnumb = parseInt(enteredocno,10);

            // add first entry
            setExpense(prev => [makeExpense(baseDate, 1), ...prev]);

            // add any recurring entries
            if (ocnumb > 1) {
              const dates = generateDates(baseDate, ocnumb, enteredoctype);
              dates.forEach((d, idx) => {
                setExpense(prev => [makeExpense(d, idx+2), ...prev]);
              });
            }

            // reset form
            setEnteredAmount('');
            setEnteredDate('');
            setEnteredocno(1);
            setEnteredtype('');
            setEnteredoctype('');
            setEnteredpaytype('');
            setEnteredcat('');
            setEnterednote('');
            hidet();
        };
        // totals are now memoized, effect not required
    
    const handleMouseMove = e => {
        pos.current.x = e.pageX;
        pos.current.y = e.pageY;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseMove);

        const animate = () => {
            const factor = 0.1; 
            const dx = pos.current.x - current.current.x;
            const dy = pos.current.y - current.current.y;
            current.current.x += dx * factor;
            current.current.y += dy * factor;
            if (cursorRef.current) {
                const angle = Math.atan2(dy, dx);
                cursorRef.current.style.transform =
                    `translate3d(${current.current.x - 10}px, ${current.current.y - 10}px, 0) rotate(${angle}rad)`;
            }
            requestAnimationFrame(animate);
        };
        animate();

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
        if(mb_amt !== undefined && parseInt(mb_amt,10) !== 0){
            setIsVisibleMB(false);
            settext("Edit")
        }
        else if(mb_amt === undefined || parseInt(mb_amt,10) === 0){
            setIsVisibleMB(true);
            settext("Add")}     
        },[left, mb_amt]);

        
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
        <div ref={cursorRef} className="cursor" />
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
                <div className='blurbg'onClick={hidet}></div>
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
                        <button type="button" className='tran_tab' onClick={expense} >Expense</button>
                        <button type="button" className='tran_tab' onClick={income} >Income</button>
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
                        <input className='octype tran_am_inp' required type="number" value={enteredAmount} onChange={amountChangeHandler} placeholder='₹0.00'/>
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