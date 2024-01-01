import '../component-css/login.css';
import '../component-css/utility.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const[names,setname]=useState('');
    const navigate = useNavigate();

    const change = (event) => {
    setname(event.target.value);}

    const   click = () =>{
    navigate('/Home', {replace:true , state:{names}});}
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

    return(
    <>
        <div className="cursor"></div>
        <div className="startpage">
            <div className="container">
                <h1 className='login__h1' >Welcome to Your <span className='login__span' >Expense Tracker</span></h1>
                <div className="line"></div>
                <h3 className='h3'>Whats your name ?</h3>
                <input type="text" onChange={change} placeholder='Your Name' value={names}/>
                <div>
                <div className='subbtn' >
                <div className='wrapper'>
                    <a className='a br-4' onClick={click} href="/Home"><span>Submit</span></a>
                </div>
                </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Login;