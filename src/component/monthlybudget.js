import React, { useState } from 'react'
import '../component-css/monthlybudget.css'
import { useLocation, useNavigate } from 'react-router-dom';

function Monthlybudget() {
    let navigate=useNavigate();
    let location=useLocation();
    const[mb_amt,setmb_amt]=useState(location.state.mb_amt);
    let Expenses=location.state.Expenses;
    let names =location.state.names;
    const submitMBhandler=()=>{
        back();
    }
    const back=()=>{
        navigate('/Home' , {state:{names,Expenses,mb_amt}})
    }

    const click=(event)=>{
        setmb_amt(event.target.value);
    }


  return (
    <div>
      <form onSubmit={submitMBhandler}>
                <div className="MBpagebox br-2 flex flex_d-col spaceard">
                    <div className="flex spaceard ai_center trantitle br-2">
                        <button className="glow-on-hover margin_1-0" onClick={back}>Back</button>
                        <div className="spacer"></div>
                        <div className="MBtitle br-2"><p>Add Montly Budget</p></div>
                    </div>
                    <div className="flex jc_center">
                    <h2>Set This Months Budget</h2>
                    </div>
                    <div className="amtinput flex spaceard">
                        <p>Enter the Amount:</p>
                        <input className='octype ocno' type="number" required value={mb_amt} onChange={click} placeholder='0.00' />
                    </div>
                    <div className='flex jc_center'>
                    <button className='glow-on-hover margin_1-0' type='Submit'>Save</button>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default Monthlybudget
