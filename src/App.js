import React from 'react';
import Login from './component/login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from  './component/home';
import Analyse from './component/analyse'
import Transaction from './component/transaction'
import Monthlybudget from './component/monthlybudget';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Home/Analyse" element={<Analyse/>} />
      <Route path="/Home/Transaction" element={<Transaction/>} />
      <Route path="/Home/Monthlybudget" element={<Monthlybudget/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;