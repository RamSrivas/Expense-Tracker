import React from 'react';
import { useRef,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation } from 'react-router-dom';
import '../component-css/analytic.css';
import { Chart } from "react-google-charts";
import '../component-css/utility.css';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Analyse=() =>{
  const location = useLocation();
  const navigate = useNavigate();
  
  const Expenses=location.state.Expenses;
  const mb_amt=location.state.mb_amt;
  const names=location.state.names;

  const pdfRef = useRef(undefined);
   
  const [buttonText, setButtonText] = useState('Generate PDF');

  const handlePdf =  () => {
     setButtonText('Generating PDF...');
     const pdf = new jsPDF('portrait', 'pt', 'a4');
     const data = html2canvas(pdfRef.current);
     const img = data.toData('image/png');
     const imgProperties = pdf.getImageProperties(img);
     const pdfWidth = pdf.internal.pageSize.getWidth();
     const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
     pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
     pdf.save('Expenses.pdf');
 
     setButtonText('Generate PDF');
  }



  function click(){
    navigate('/Home' , {state:{names,Expenses,mb_amt}} );
  }
  let count=0;
  let totalno=0;
  let totalincome=0;
  let totalexpense = 0;
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let mmonth=month
  if(mmonth<10){mmonth="0"+month;}
  let year = newDate.getFullYear();
  let day = newDate.getDay();
  let Monday_date=date-day+1
  let MMonday_date=Monday_date
  if(Monday_date<10){MMonday_date='0'+ MMonday_date}
  const [x,setx]=useState(Monday_date)
  const [y,sety]=useState(parseInt(MMonday_date,10)+6)
  const [xm,setxm]=useState(Monday_date)
  const [ym,setym]=useState(parseInt(MMonday_date,10)+6)
  const [xy,setxy]=useState(Monday_date)
  const [yy,setyy]=useState(parseInt(MMonday_date,10)+6)
  let yyy=y
  if(yyy<10){yyy="0"+yyy}
  const [firstw, setfirstw]=useState(year+"-"+mmonth+ "-" +MMonday_date);
  const [secondw, setsecondw]=useState(year+"-"+mmonth+ "-"+(yyy));
  const [curmonthX,setcurmonthX]=useState(month);
  const [curmonthY,setcurmonthY]=useState(month);
  const [curyearX,setcuryearX]=useState(year);
  const [curyearY,setcuryearY]=useState(year);

  const [firstm, setfirstm]=useState(year+"-"+mmonth+ "-" +MMonday_date);
  const [secondm, setsecondm]=useState(year+"-"+mmonth+ "-"+(yyy));
  const [curmonthXm,setcurmonthXm]=useState(month);
  const [curmonthYm,setcurmonthYm]=useState(month);
  const [curyearXm,setcuryearXm]=useState(year);
  const [curyearYm,setcuryearYm]=useState(year);

  const [firsty, setfirsty]=useState(year+"-"+mmonth+ "-" +MMonday_date);
  const [secondy, setsecondy]=useState(year+"-"+mmonth+ "-"+(yyy));
  const [curmonthXy,setcurmonthXy]=useState(month);
  const [curmonthYy,setcurmonthYy]=useState(month);
  const [curyearXy,setcuryearXy]=useState(year);
  const [curyearYy,setcuryearYy]=useState(year);
  let lagMX=curmonthX;
  let lagMY=curmonthY;
  let lagYearX=curyearX;
  let lagYearY=curyearY;
  let lagX=x
  let lagY=y;

  let lagMXm=curmonthXm;
  let lagMYm=curmonthYm;
  let lagYearXm=curyearXm;
  let lagYearYm=curyearYm;
  let lagXm=xm
  let lagYm=ym;

  let lagMXy=curmonthXy;
  let lagMYy=curmonthYy;
  let lagYearXy=curyearXy;
  let lagYearYy=curyearYy;
  let lagXy=xy
  let lagYy=yy;

  let countd=31;
  let county=366;


  
    const options = {
    title: "Category-wise Expense",
    backgroundColor: "#ffff",
    };
  
  
    function forward (){
      lagX = parseInt(x,10)+7;
      lagY=parseInt(y,10)+7;
      if(lagMX===1 || lagMX===3 ||lagMX===5 ||lagMX===7 ||lagMX===8 ||lagMX===10 ||lagMX===12)
      {
        if(lagX>31){
          lagX=lagX-31;
          if(lagMX!=12){
          lagMX+=1
          setcurmonthX(lagMX);}
          else{lagYearX+=1;
          setcuryearX(lagYearX)
          lagMX=1;
          setcurmonthX(lagMX)}
        }
      }
      else if(lagMX===2)
      {
        if(lagYearY%4===0){
          if(lagX>29){
            lagX=lagX-29;
            lagMX+=1
            setcurmonthX(lagMX)
          }
        }
        else{
          if(lagX>28){
            lagX=lagX-28;
            lagMX+=1
            setcurmonthX(lagMX)
          }
        }
      }
      else{
        if(lagX>30){
          lagX=lagX-30;
          lagMX+=1
          setcurmonthX(lagMX)
        }
      }
      if(lagMY===1 || lagMY===3 ||lagMY===5 ||lagMY===7 ||lagMY===8 ||lagMY===10 ||lagMY===12)
      {
        if(lagY>31){
          lagY=lagY-31;
          if(lagMY!=12){
          lagMY+=1
          setcurmonthY(lagMY);}
          else{lagYearY+=1;
          setcuryearY(lagYearY)
          lagMY=1;
          setcurmonthY(lagMY)}
        }
      }
      else if(lagMY===2)
      {
        if(lagYearY%4===0){
          if(lagY>29){
            lagY=lagY-29;
            lagMY+=1
            setcurmonthY(lagMY)
          }
        }
        else{
          if(lagY>28){
            lagY=lagY-28;
            lagMY+=1
            setcurmonthY(lagMY)
          }
        }
      }
      else{
        if(lagY>30){
          lagY=lagY-30;
          lagMY+=1
          setcurmonthY(lagMY)
        }
      }
      setx(lagX)
      sety(lagY)
      
    }
    
    function backward (){
      lagX = parseInt(x,10)-7;
      lagY=parseInt(y,10)-7;
      console.log(lagMX,lagMY);
      if(lagMX===4 ||lagMX===1 ||lagMX===2 ||lagMX===6 ||lagMX===8 ||lagMX===9||lagMX===11)
      {
        if(lagX<1){
          lagX=31+lagX;
          if(lagMX!=1){
            lagMX-=1
            setcurmonthX(lagMX);
          }
          else{
            lagYearX-=1;
            setcuryearX(lagYearX)
            lagMX=12;
            setcurmonthX(lagMX)
          }
        }
      }
      else if(lagMX===3)
      {
        if(lagYearX%4===0){
          if(lagX<1){
            lagX=29+lagX;
            lagMX-=1
            setcurmonthX(lagMX)
          }
        }
        else {
          if(lagX<1){
            lagX=28+lagX;
            lagMX-=1
            setcurmonthX(lagMX)
          }
        }
      }
      else{
        if(lagX<1){
          lagX=30+lagX;
          lagMX-=1
          setcurmonthX(lagMX)
        }
      }
      if(lagMY===4 || lagMY===1||lagMY===2 ||lagMY===6 ||lagMY===8 ||lagMY===9 ||lagMY===11)
      {
        if(lagY<1){
          lagY=31+lagY;
          if(lagMY!=1){
            lagMY-=1
            setcurmonthY(lagMY);
          }
          else{
            lagYearY-=1;
            setcuryearY(lagYearY)
            lagMY=12;
            setcurmonthY(lagMY)
          }
        }
      }
      else if(lagMY===3)
      {
        if(lagYearY%4===0){
          if(lagY<1){
            lagY=29+lagY;
            lagMY-=1
            setcurmonthY(lagMY)
          }
        }
        else {
          if(lagY<1){
            lagY=28+lagY;
            lagMY-=1
            setcurmonthY(lagMY)
          }
        }
      }
      else{
        if(lagY<1){
          lagY=30+lagY;
          lagMY-=1
          setcurmonthY(lagMY)
        }
      }
      setx(lagX)
      sety(lagY)
    }

    function forwardm (){
      lagMXm+=1;
      lagMYm+=1;
      lagXm=1;
      if(lagMXm===13)
      {
        lagYearXm+=1;
        setcuryearXm(lagYearXm)
        lagMXm=1;
        setcurmonthXm(lagMXm)
      }
      setcurmonthXm(lagMXm)
      if(lagMYm===1 || lagMYm===3 ||lagMYm===5 ||lagMYm===7 ||lagMYm===8 ||lagMYm===10 ||lagMYm===12)
      {
        lagYm=31;
        setcurmonthYm(lagMYm)
      }
      else if(lagMYm===13)
      {
        lagYearYm+=1;
        setcuryearYm(lagYearYm)
        lagMYm=1;
        setcurmonthYm(lagMYm)
      }
      else if(lagMYm===2){
        if(lagYearYm%4===0){
          lagYm=29;
        }
        else{
          lagYm=28;
        }  
      }
      else{
        lagYm=30;
      }
      setxm(lagXm)
      setym(lagYm)
      countd=lagYm;
      setcurmonthYm(lagMYm)
    }
    
    function backwardm (){
      lagMXm-=1;
      lagMYm-=1;
      lagXm=1;
      if(lagMXm===0)
      {
        lagYearXm-=1;
        setcuryearXm(lagYearXm)
        lagMXm=12;
      }
      setcurmonthXm(lagMXm)
      if(lagMYm===1 || lagMYm===3 ||lagMYm===5 ||lagMYm===7 ||lagMYm===8 ||lagMYm===10 ||lagMYm===12)
      {
        lagYm=31;
      }
      else if(lagMYm===0)
      {
        lagYearYm-=1;
        setcuryearYm(lagYearYm)
        lagMYm=12;
      }
      else if(lagMYm===2){
        if(lagYearYm%4===0){
          lagYm=29;
        }
        else{
          lagYm=28;
        } 
      }
      else{
        lagYm=30;
      }
      setxm(lagXm)
      setym(lagYm)
      countd=lagYm
      setcurmonthYm(lagMYm)
    }
      
    function forwardy (){
      lagXy=1;
      lagYy=31;
      lagMXy=1;
      lagMYy=12;
      lagYearXy+=1
      lagYearYy+=1
      setxy(lagXy)
      setyy(lagYy)
      if(lagYearXy%4===0)
      county=365;
    else county=366;
      setcurmonthXy(lagMXy)
      setcurmonthYy(lagMYy)
      setcuryearXy(lagYearXy)
      setcuryearYy(lagYearYy)
    }
  
    function backwardy ()
    {
      lagXy=1;
      lagYy=31;
      lagMXy=1;
      lagMYy=12;
      lagYearXy-=1
      lagYearYy-=1
      setxy(lagXy)
      setyy(lagYy)
      setcurmonthXy(lagMXy)
      setcurmonthYy(lagMYy)
      setcuryearXy(lagYearXy)
      setcuryearYy(lagYearYy)
    }








    function set(){
      if (lagMX<10 && lagX>9){
      setfirstw(lagYearX+"-"+"0"+lagMX+ "-" +(lagX))}
      else if(lagMX>9 && lagX<10){
        setfirstw(lagYearX+"-"+lagMX+ "-" +"0"+(lagX))}
      else if(lagMX<10 && lagX<10){
        setfirstw(lagYearX+"-"+"0"+lagMX+ "-" +"0"+(lagX))}
      else{
        setfirstw(lagYearX+"-"+lagMX+ "-" +(lagX))}


      if (lagMY<10 && lagY>9){
        setsecondw(lagYearY+"-"+"0"+lagMY+ "-" +(lagY))}
        else if(lagMY>9 && lagY<10){
          setsecondw(lagYearY+"-"+lagMY+ "-" +"0"+(lagY))}
        else if(lagMY<10 && lagY<10){
          setsecondw(lagYearY+"-"+"0"+lagMY+ "-" +"0"+(lagY))}
        else{
          setsecondw(lagYearY+"-"+lagMY+ "-" +(lagY))}
    }
    
    
    function setm(){
      if (lagMXm<10 && lagXm>9){
      setfirstm(lagYearXm+"-"+"0"+lagMXm+ "-" +(lagXm))}
      else if(lagMXm>9 && lagXm<10){
        setfirstm(lagYearXm+"-"+lagMXm+ "-" +"0"+(lagXm))}
      else if(lagMXm<10 && lagXm<10){
        setfirstm(lagYearXm+"-"+"0"+lagMXm+ "-" +"0"+(lagXm))}
      else{
        setfirstm(lagYearXm+"-"+lagMXm+ "-" +(lagXm))}


      if (lagMYm<10 && lagYm>9){
        setsecondm(lagYearYm+"-"+"0"+lagMYm+ "-" +(lagYm))}
        else if(lagMYm>9 && lagYm<10){
          setsecondm(lagYearYm+"-"+lagMYm+ "-" +"0"+(lagYm))}
        else if(lagMYm<10 && lagYm<10){
          setsecondm(lagYearYm+"-"+"0"+lagMYm+ "-" +"0"+(lagYm))}
        else{
          setsecondm(lagYearYm+"-"+lagMYm+ "-" +(lagYm))}
    }


    function setyyy(){
      if (lagMXy<10 && lagXy>9){
      setfirsty(lagYearXy+"-"+"0"+lagMXy+ "-" +(lagXy))}
      else if(lagMXy>9 && lagXy<10){
        setfirsty(lagYearXy+"-"+lagMXy+ "-" +"0"+(lagXy))}
      else if(lagMXy<10 && lagXy<10){
        setfirsty(lagYearXy+"-"+"0"+lagMXy+ "-" +"0"+(lagXy))}
      else{
        setfirsty(lagYearXy+"-"+lagMXy+ "-" +(lagXy))}


      if (lagMYy<10 && lagYy>9){
        setsecondy(lagYearYy+"-"+"0"+lagMYy+ "-" +(lagYy))}
        else if(lagMYy>9 && lagYy<10){
          setsecondy(lagYearYy+"-"+lagMYy+ "-" +"0"+(lagYy))}
        else if(lagMYy<10 && lagYy<10){
          setsecondy(lagYearYy+"-"+"0"+lagMYy+ "-" +"0"+(lagYy))}
        else{
          setsecondy(lagYearYy+"-"+lagMYy+ "-" +(lagYy))}
    }


    function but_forw(){
      forward();
      set();
    }
    function but_bacw(){
      backward();
      set();
    }


    function but_form(){
      forwardm();
      setm();
    }
    function but_bacm(){
      backwardm();
      setm();
    }

    
    function but_fory(){
      forwardy();
      setyyy();
    }
    function but_bacy(){
      backwardy();
      setyyy();
    }
    
    let Groceries=0;
    let Entertainment=0;
    let Travel=0;
    let Shopping=0;
    let Medical=0;
    let Other=0;
    let cash=0;
    let cc=0;
    let dc=0;
    let online=0;
    let other=0;
    let counti=0;
   


 



    const [showWeek,setshowWeek]=useState(true);
    const [showMonth,setshowmonth]=useState(false);
    const [showYear,setshowyear]=useState(false);
    const [selanatype, setselanatype] = useState(0)
    const selweek = () =>{
        setselanatype(0);
        setshowWeek(true);
        setshowmonth(false);
        setshowyear(false);
        but_forw();
        but_bacw();
      };
    const selmonth =()=>{
        setselanatype(33);
        setshowWeek(false);
        setshowmonth(true);
        setshowyear(false);
        but_form()
        but_bacm()
    };
    const selyear =()=>{
        setselanatype(65);
        setshowWeek(false);
        setshowmonth(false);
        setshowyear(true);
        but_fory();
        but_bacy();
    };
    
    let maxExpense=0
    let maxIncome=0
    
    const newExpenses = []
    Expenses.forEach((Expenses) =>{
      if (showWeek) {
        if(firstw<=Expenses.tran_date && secondw>=Expenses.tran_date)
        {
          newExpenses.push(Expenses)
        }
      }
      else if (showMonth)
      {
        if(firstm<=Expenses.tran_date && secondm>=Expenses.tran_date)
        {
          newExpenses.push(Expenses)
        }
      }
      else if(showYear)
      {
        if(firsty<=Expenses.tran_date && secondy>=Expenses.tran_date)
        {
          newExpenses.push(Expenses)
        }
      }
    })  
    for(var i =0;i<newExpenses.length;i++){
      if(newExpenses[i].tran_type=="Expense"){
        totalexpense+=newExpenses[i].tran_amount
        count+=1;
        if(newExpenses[i].tran_amount>maxExpense)
        { maxExpense=newExpenses[i].tran_amount}
        
        if(newExpenses[i].categories=="Groceries"){
          Groceries+=newExpenses[i].tran_amount
        }
        if(newExpenses[i].categories=="Entertainment"){
            Entertainment+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].categories=="Travel"){
            Travel+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].categories=="Shopping"){
            Shopping+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].categories=="Medical"){
            Medical+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].categories=="Other"){
            Other+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].tran_paytype=="Cash"){
            cash+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].tran_paytype=="Credit Card"){
            cc+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].tran_paytype=="Debit Card"){
            dc+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].tran_paytype=="Online Payment"){
            online+=newExpenses[i].tran_amount
          }
          if(newExpenses[i].tran_paytype=="Other"){
            other+=newExpenses[i].tran_amount
          }
        }

      else{
        totalincome+=newExpenses[i].tran_amount;
        counti++;
        if(newExpenses[i].tran_amount>maxIncome)
        { maxIncome=newExpenses[i].tran_amount}
      }totalno=counti+count;
      }
      let data = [
        ["Category", "Expense"],
        ["Groceries", Groceries],
        ["Entertainment", Entertainment],
        ["Travel", Travel],
        ["Shopping", Shopping],
        ["Medical", Medical],
        ["Other", Other],
      ];


  return (
    <div>

      <section >
        <div className="Anaspagebox br-2" >
            <div className="flex spaceard ai_center Anatitle br-2">
            <button className="button" data-text="Awesome" onClick={click}>
                <span className="actual-text"  >&nbsp;back&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;back&nbsp;</span>
            </button>
            <button className="header_btn" onClick={handlePdf} >{buttonText}</button>
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
          <div id='pdf' ref={pdfRef}> 




            <div id="week" className={`${showWeek ? '': 'hide'}`}>
              <div className=''>
                <div className="flex spacebtw view_date">
                    <button className="yellow_buttons btn" onClick={but_bacw}>{"<"}</button> <p> From: {firstw} </p>
                    <p> To: {secondw}</p> <button className="yellow_buttons btn"onClick={but_forw}>{">"}</button>
                </div>
                <div className="categorywise">
                    <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}/>
                </div>
                <div className="payment_mode flex flex_d-col">
                  <div className="flex jc_center">
                  <h2>Payment Modes</h2>
                  </div>
                  <div className='flex spaceard'>
                  <div>
                  <div className="pmcontent"><p>Cash: ₹{cash} </p></div>
                  <div className="pmcontent"><p>Credit card: ₹{cc} </p></div>
                  <div className="pmcontent"><p>Debit card: ₹{dc}</p></div>
                  </div>
                  <div>
                  <div className="pmcontent"><p>Online Payments: ₹{online}</p></div>
                  <div className="pmcontent"><p>Other: ₹{other}</p></div>
                  </div>
                  </div>
                
                </div>
                  <h2>Total Number of Transaction: {totalno}</h2>
                <div className="stats flex spaceard">
                  <div className="avg_expense flex flex_d-col spaceard">
                    <h2>Expense Stats</h2>
                    <p>Per day Expense: {Math.round((totalexpense/7) * 100) / 100}</p>
                    <p>Average Expense: {Math.round((totalexpense/count) * 100) / 100}</p>
                    <p>Total Expense: {totalexpense}</p>
                    <p>Max Value Spend :{maxExpense}</p>
                  </div>
                  <div className="space"></div>
                  <div className="avg_income flex flex_d-col spaceard">
                    <h2>Income Stats</h2>
                    <p>Per day Income: {Math.round((totalincome/7) * 100) / 100}</p>
                    <p>Average Income: {Math.round((totalincome/counti) * 100) / 100}</p>
                    <p>Total Income:{totalincome}</p>
                    <p>Max Value Spend :{totalincome}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="month" className={`${showMonth ? '' : 'hide' }`}>
              <div className=''>
                <div className="flex spacebtw view_date">
                    <button className="yellow_buttons btn" onClick={but_bacm}>{"<"}</button> <p> From: {firstm} </p>
                    <p> To: {secondm}</p> <button className="yellow_buttons btn"onClick={but_form}>{">"}</button>
                </div>
                <div className="categorywise">
                    <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}/>
                </div>
                <div className="payment_mode ">
                  <h2>Payment Modes:</h2>
                  <div className='flex spaceard'>
                  <div>
                  <div className="pmcontent"><p>Cash: ₹{cash} </p></div>
                  <div className="pmcontent"><p>Credit card: ₹{cc} </p></div>
                  <div className="pmcontent"><p>Debit card: ₹{dc}</p></div>
                  </div>
                  <div>
                  <div className="pmcontent"><p>Online Payments: ₹{online}</p></div>
                  <div className="pmcontent"><p>Other: ₹{other}</p></div>
                  </div>
                  </div>
                
                </div>
                  <h2>Total Number of Transaction: {totalno}</h2>
                <div className="stats flex spaceard">
                  <div className="avg_expense flex flex_d-col spaceard">
                    <h2>Expense Stats</h2>
                    <p>Per day Expense: {Math.round((totalexpense/countd) * 100) / 100}</p>
                    <p>Average Expense: {Math.round((totalexpense/count) * 100) / 100}</p>
                    <p>Total Expense: {totalexpense}</p>
                    <p>Max Value Spend :{maxExpense}</p>
                  </div>
                  <div className="space"></div>
                  <div className="avg_income flex flex_d-col spaceard">
                    <h2>Income Stats</h2>
                    <p>Per day Income: {Math.round((totalincome/countd) * 100) / 100}</p>
                    <p>Average Income: {Math.round((totalincome/counti) * 100) / 100}</p>
                  </div>
                </div>
              </div>
              </div>
            <div id="year" className={`${showYear ? '' : 'hide' }`}>
              <div className=''>
                <div className="flex spacebtw view_date">
                    <button className="yellow_buttons btn" onClick={but_bacy}>{"<"}</button> <p> From: {firsty} </p>
                    <p> To: {secondy}</p> <button className="yellow_buttons btn"onClick={but_fory}>{">"}</button>
                </div>
                <div className="categorywise">
                    <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}/>
                </div>
                <div className="payment_mode ">
                  <h2>Payment Modes:</h2>
                  <div className='flex spaceard'>
                  <div>
                  <div className="pmcontent"><p>Cash: ₹{cash} </p></div>
                  <div className="pmcontent"><p>Credit card: ₹{cc} </p></div>
                  <div className="pmcontent"><p>Debit card: ₹{dc}</p></div>
                  </div>
                  <div>
                  <div className="pmcontent"><p>Online Payments: ₹{online}</p></div>
                  <div className="pmcontent"><p>Other: ₹{other}</p></div>
                  </div>
                  </div>
                
                </div>
                  <h2>Total Number of Transaction: {totalno}</h2>
                <div className="stats flex spaceard">
                  <div className="avg_expense flex flex_d-col spaceard">
                    <h2>Expense Stats</h2>
                    <p>Per day Expense: {Math.round((totalexpense/county) * 100) / 100}</p>
                    <p>Average Expense: {Math.round((totalexpense/count) * 100) / 100}</p>
                    <p>Total Expense: {totalexpense}</p>
                    <p>Max Value Spend :{maxExpense}</p>
                  </div>
                  <div className="space"></div>
                  <div className="avg_income flex flex_d-col spaceard">
                    <h2>Income Stats</h2>
                    <p>Per day Income: {Math.round((totalincome/county) * 100) / 100}</p>
                    <p>Average Income: {Math.round((totalincome/counti) * 100) / 100}</p>
                    <p>Total Expense: {totalexpense}</p>
                    <p>Max Value Spend :{maxExpense}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
                    </div>
      </section>
    </div>
  )
}

export default Analyse
