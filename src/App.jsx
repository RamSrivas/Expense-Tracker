
import Login from './component/login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from  './component/home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path="/Home" element={<Home/>} />
      <Route path='/Transaction' />
      <Route path='/Categories' />
      <Route path='/Report' />
      <Route path='/Settings' />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
