import '../component-css/login.css';
import '../component-css/utility.css'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const[names,setname]=useState('');
    const navigate = useNavigate();
    const Expenses=[{},{},{},{},{}];
    const change = (event) => {
    setname(event.target.value);}

    const   click = () =>{
    navigate('/Home', {state:{names,Expenses}});}

    const [position, setPosition] = useState({ x: 0, y: 0 });
    
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

    return(
    <>
        <div className="cursor" style={{
        left: position.x + 'px',
        top: position.y + 'px',
      }}></div>
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