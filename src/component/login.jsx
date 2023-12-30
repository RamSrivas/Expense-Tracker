import '../component-css/login.css';
import '../component-css/utility.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const[names,setname]=useState('');
    const navigate = useNavigate();

    const change = (event) => {
    setname(event.target.value);}

    const   click = async() =>{
    navigate('/Home', {replace:true , state:{names}});}

    return(
    <>
        <div className="startpage">
            <div className="container">
                <h1 className='login__h1' >Welcome to Your <span className='login__span' >Expense Tracker</span></h1>
                <div className="line"></div>
                <h3>Hello, Whats your name?</h3>
                <input type="text" onChange={change} placeholder='Your Name' value={names}/>

                <div className='button'>
                    <button className='btn' onClick={click}>Submit</button>
                </div>
            </div>
        </div>
    </>
    )
}
export default Login;