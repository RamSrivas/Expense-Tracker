import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../component-css/transaction.css';
import '../component-css/utility.css';
function Transaction() {
    const location = useLocation();
    console.log(location);
    let mb_amt=location.state.mb_amt
    let Expenses=location.state.Expenses;
    let names=location.state.names;
    const navigate = useNavigate();
    let exp=Expenses
    for(var i=0;i<Expenses.length;i++){
        for(var j=0;j<Expenses.length;j++){
            if(exp[i].tran_date>exp[j].tran_date){
                var temp=exp[i];
                exp[i]=exp[j];
                exp[j]=temp;
            }
        }
    }
    
    function click(){
      navigate('/Home' , {state:{names,Expenses,mb_amt}} )
    }
    
  return (
    <div>
        <section >
            <div className="traspagebox br-2">
                <div className="flex spaceard ai_center tratitle br-2">
                    <button className="glow-on-hover margin_1-0" onClick={click} >Back</button>
                    <div className="spacer"></div>
                    <div className="tra_page_tile br-2">
                        <p>All Transactions</p>
                    </div>
                </div>
                <div className='grid helo gapping'>
                    <div className='transac_type'>Transaction-Type</div>
                    <div className="transac_paymode">Payment-Mode</div>
                    <div className="transac_transactionamount">Amount(₹)</div>
                    <div className="transac_category">Categories</div>
                    <div className="transac_transactiondate">Date</div>
                </div>
                {exp.map((exp) =><div className='grid helo' >
                    <div className='transac_type'style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}}>{exp.tran_type}</div>
                    <div className="transac_paymode">{exp.tran_paytype}</div>
                    <div className="transac_transactionamount" style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}} >{exp.tran_amount}</div>
                    <div className="transac_category">{exp.categories}</div>
                    <div className="transac_transactiondate">{exp.tran_date}</div></div>)}
            </div>
        </section>
    </div>
  )
}

export default Transaction
