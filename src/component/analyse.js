import React from 'react';
import { useRef,useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../component-css/analytic.css';
import { Chart } from "react-google-charts";
import '../component-css/utility.css';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// utility for zero‑padding numbers to two digits
const pad2 = n => n.toString().padStart(2,'0');

const Analyse=() =>{
  const location = useLocation();
  const navigate = useNavigate();
  
  const Expenses=location.state.Expenses;
  const mb_amt=location.state.mb_amt;
  const names=location.state.names;

  const pdfRef = useRef(undefined);
   
  const [buttonText, setButtonText] = useState('Generate PDF');

  const handlePdf =  async() => {
    setButtonText('Generating PDF...');
    const pdf = new jsPDF('portrait', 'pt', 'a4');
    const data = await html2canvas(pdfRef.current);
    const img = data.toDataURL('image/png');
    const pageHeight = 842;
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    let heightLeft = pdfHeight;
    let position = 0;
    heightLeft -= pageHeight;
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(img, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
    pdf.save('Expenses.pdf');
    setButtonText('Generate PDF');
  }



  function click(){
    navigate('/Home' , {state:{names,Expenses,mb_amt}} );
  }
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
  const initialWStart = `${year}-${pad2(month)}-${pad2(MMonday_date)}`;
  const initialWEnd = `${year}-${pad2(month)}-${pad2(yyy)}`;
  const [firstw, setfirstw]=useState(initialWStart);
  const [secondw, setsecondw]=useState(initialWEnd);
  const [curmonthX,setcurmonthX]=useState(month);
  const [curmonthY,setcurmonthY]=useState(month);
  const [curyearX,setcuryearX]=useState(year);
  const [curyearY,setcuryearY]=useState(year);

  const [firstm, setfirstm]=useState(initialWStart);
  const [secondm, setsecondm]=useState(initialWEnd);
  const [curmonthXm,setcurmonthXm]=useState(month);
  const [curmonthYm,setcurmonthYm]=useState(month);
  const [curyearXm,setcuryearXm]=useState(year);
  const [curyearYm,setcuryearYm]=useState(year);

  const [firsty, setfirsty]=useState(initialWStart);
  const [secondy, setsecondy]=useState(initialWEnd);
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

  function resetw() {
    lagMX=month;
    lagMY=month;
     lagYearX=year;
     lagYearY=year;
     lagX=Monday_date;
     lagY=parseInt(MMonday_date,10)+6;
  }
  function resetm() {
    lagMXm=month;
    lagMYm=month;
    lagYearXm=year;
    lagYearYm=year;
    lagXm=Monday_date
    lagYm=parseInt(MMonday_date,10)+6;
  }
  function resety() {
    lagMXy=month;
    lagMYy=month;
    lagYearXy=year;
    lagYearYy=year;
    lagXy=Monday_date;
    lagYy=parseInt(MMonday_date,10)+6;
  }




  let countd=31;
  let county=366;


  
    const options = {
    title: "Category-wise Expense",
    backgroundColor: "#ffff",
    };
  
  
    function forward (){
      lagX+=7;
      lagY+=7;
      if(lagMX===1 || lagMX===3 ||lagMX===5 ||lagMX===7 ||lagMX===8 ||lagMX===10 ||lagMX===12)
      {
        if(lagX>31){
          lagX=lagX-31;
          if(lagMX!==12){
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
          if(lagMY!==12){
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
          if(lagMX!==1){
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
          if(lagMY!==1){
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
                if(lagMYm===13)
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
      setfirstw(`${lagYearX}-${pad2(lagMX)}-${pad2(lagX)}`);
      setsecondw(`${lagYearY}-${pad2(lagMY)}-${pad2(lagY)}`);
    }
    
    
    function setm(){
      setfirstm(`${lagYearXm}-${pad2(lagMXm)}-${pad2(lagXm)}`);
      setsecondm(`${lagYearYm}-${pad2(lagMYm)}-${pad2(lagYm)}`);
    }


    function setyyy(){
      setfirsty(`${lagYearXy}-${pad2(lagMXy)}-${pad2(lagXy)}`);
      setsecondy(`${lagYearYy}-${pad2(lagMYy)}-${pad2(lagYy)}`);
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
    
   


 



    const [showWeek,setshowWeek]=useState(true);
    const [showMonth,setshowmonth]=useState(false);
    const [showYear,setshowyear]=useState(false);
    const [selanatype, setselanatype] = useState(0)
    const selweek = () =>{
        setselanatype(0);
        setshowWeek(true);
        setshowmonth(false);
        setshowyear(false);
        resetw();
        set();
        but_forw();
        but_bacw();
      };
    const selmonth =()=>{
        setselanatype(33);
        setshowWeek(false);
        setshowmonth(true);
        setshowyear(false);
        resetm()
        setm()
        but_form()
        but_bacm()
    };
    const selyear =()=>{
        setselanatype(65);
        setshowWeek(false);
        setshowmonth(false);
        setshowyear(true);
        resety();
        setyyy();
        but_fory();
        but_bacy();
    };
    
    // produce filtered expenses and aggregated statistics together
    const { newExpenses, stats } = React.useMemo(() => {
      const filtered = Expenses.filter(exp => {
        const date = exp.tran_date;
        if (showWeek && firstw <= date && secondw >= date) return true;
        if (showMonth && firstm <= date && secondm >= date) return true;
        if (showYear && firsty <= date && secondy >= date) return true;
        return false;
      });

      const result = {
        totalexpense: 0,
        totalincome: 0,
        count: 0,
        counti: 0,
        maxExpense: 0,
        maxIncome: 0,
        Groceries: 0,
        Entertainment: 0,
        Travel: 0,
        Shopping: 0,
        Medical: 0,
        Other: 0,
        cash: 0,
        cc: 0,
        dc: 0,
        online: 0,
        other: 0
      };
      filtered.forEach(e => {
        if (e.tran_type === "Expense") {
          result.totalexpense += e.tran_amount;
          result.count += 1;
          if (e.tran_amount > result.maxExpense) result.maxExpense = e.tran_amount;

          if (result.hasOwnProperty(e.categories)) {
            result[e.categories] += e.tran_amount;
          }
          if (result.hasOwnProperty(e.tran_paytype.toLowerCase())) {
            result[e.tran_paytype.toLowerCase()] += e.tran_amount;
          }
        } else {
          result.totalincome += e.tran_amount;
          result.counti += 1;
          if (e.tran_amount > result.maxIncome) result.maxIncome = e.tran_amount;
        }
      });

      return { newExpenses: filtered, stats: result };
    }, [Expenses, showWeek, showMonth, showYear, firstw, secondw, firstm, secondm, firsty, secondy]);

    const totalno = stats.count + stats.counti;
    const data = [
      ["Category", "Expense"],
      ["Groceries", stats.Groceries],
      ["Entertainment", stats.Entertainment],
      ["Travel", stats.Travel],
      ["Shopping", stats.Shopping],
      ["Medical", stats.Medical],
      ["Other", stats.Other],
    ];


  return (
    <div>

      <section  >
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
                <button type="button" className='Ana_tab' onClick={selweek} >Week</button>
                <button type="button" className='Ana_tab' onClick={selmonth} >Month</button>
                <button type="button" className='Ana_tab' onClick={selyear}  >Year</button>
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
                    height={"300px"}/>
                </div>
                <div className="payment_mode">
                  <div className="flex jc_center">
                  <h2>Payment Modes</h2>
                  </div>
                  <div className='flex spaceard'>
                  <div>
                  <div className="pmcontent"><p>Cash: ₹{stats.cash} </p></div>
                  <div className="pmcontent"><p>Credit card: ₹{stats.cc} </p></div>
                  <div className="pmcontent"><p>Debit card: ₹{stats.dc}</p></div>
                  </div>
                  <div>
                  <div className="pmcontent"><p>Online Payments: ₹{stats.online}</p></div>
                  <div className="pmcontent"><p>Other: ₹{stats.other}</p></div>
                  </div>
                  </div>
                
                </div>
                  <h1 className='ol'>Total Number of Transaction: {totalno}</h1>
                <div className="stats flex spaceard">
                  <div className="avg_expense flex flex_d-col spaceard">
                    <h2>Expense Stats</h2>
                    <p>Per day Expense: {Math.round((stats.totalexpense/7) * 100) / 100}</p>
                    <p>Average Expense: {stats.count ? Math.round((stats.totalexpense/stats.count) * 100) / 100 : 0}</p>
                    <p>Total Expense: {stats.totalexpense}</p>
                    <p>Max Value Spend :{stats.maxExpense}</p>
                  </div>
                  <div className="space"></div>
                  <div className="avg_income flex flex_d-col spaceard">
                    <h2>Income Stats</h2>
                    <p>Per day Income: {Math.round((stats.totalincome/7) * 100) / 100}</p>
                    <p>Average Income: {stats.counti ? Math.round((stats.totalincome/stats.counti) * 100) / 100 : 0}</p>
                    <p>Total Income:{stats.totalincome}</p>
                    <p>Max Value Spend :{stats.maxIncome}</p>
                  </div>
                </div>
                <div className="alltransactions">
                <div className='grid heloo helo gapping'>
                    <div className='transac_type'>Transaction-Type</div>
                    <div className="transac_paymode">Payment-Mode</div>
                    <div className="transac_transactionamount">Amount(₹)</div>
                    <div className="transac_category">Categories</div>
                    <div className="transac_transactiondate">Date</div>
                </div>
                {newExpenses.map((exp) =><div className='grid heloo helo' >
                    <div className='transac_type'style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}}>{exp.tran_type}</div>
                    <div className="transac_paymode">{exp.tran_paytype}</div>
                    <div className="transac_transactionamount" style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}} >{exp.tran_amount}</div>
                    <div className="transac_category">{exp.categories}</div>
                    <div className="transac_transactiondate">{exp.tran_date}</div></div>)}
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
                    height={"300px"}/>
                </div>
                <div className="payment_mode ">
                <div className="flex jc_center">
                  <h2>Payment Modes</h2>
                  </div>
                  <div className='flex spaceard'>
                  <div>
                  <div className="pmcontent"><p>Cash: ₹{stats.cash} </p></div>
                  <div className="pmcontent"><p>Credit card: ₹{stats.cc} </p></div>
                  <div className="pmcontent"><p>Debit card: ₹{stats.dc}</p></div>
                  </div>
                  <div>
                  <div className="pmcontent"><p>Online Payments: ₹{stats.online}</p></div>
                  <div className="pmcontent"><p>Other: ₹{stats.other}</p></div>
                  </div>
                  </div>
                
                </div>
                  <h1 className='ol'>Total Number of Transaction: {totalno}</h1>
                <div className="stats flex spaceard">
                  <div className="avg_expense flex flex_d-col spaceard">
                    <h2>Expense Stats</h2>
                    <p>Per day Expense: {Math.round((stats.totalexpense/countd) * 100) / 100}</p>
                    <p>Average Expense: {stats.count ? Math.round((stats.totalexpense/stats.count) * 100) / 100 : 0}</p>
                    <p>Total Expense: {stats.totalexpense}</p>
                    <p>Max Value Spend :{stats.maxExpense}</p>
                  </div>
                  <div className="space"></div>
                  <div className="avg_income flex flex_d-col spaceard">
                    <h2>Income Stats</h2>
                    <p>Per day Income: {Math.round((stats.totalincome/countd) * 100) / 100}</p>
                    <p>Average Income: {stats.counti ? Math.round((stats.totalincome/stats.counti) * 100) / 100 : 0}</p>
                  </div>
                </div>
                <div className="alltransactions">
                <div className='grid heloo helo gapping'>
                    <div className='transac_type'>Transaction-Type</div>
                    <div className="transac_paymode">Payment-Mode</div>
                    <div className="transac_transactionamount">Amount(₹)</div>
                    <div className="transac_category">Categories</div>
                    <div className="transac_transactiondate">Date</div>
                </div>
                {newExpenses.map((exp) =><div className='grid heloo helo' >
                    <div className='transac_type'style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}}>{exp.tran_type}</div>
                    <div className="transac_paymode">{exp.tran_paytype}</div>
                    <div className="transac_transactionamount" style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}} >{exp.tran_amount}</div>
                    <div className="transac_category">{exp.categories}</div>
                    <div className="transac_transactiondate">{exp.tran_date}</div></div>)}
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
                    height={"300px"}/>
                </div>
                <div className="payment_mode ">
                <div className="flex jc_center">
                  <h2>Payment Modes</h2>
                  </div>
                  <div className='flex spaceard'>
                  <div>
                  <div className="pmcontent"><p>Cash: ₹{stats.cash} </p></div>
                  <div className="pmcontent"><p>Credit card: ₹{stats.cc} </p></div>
                  <div className="pmcontent"><p>Debit card: ₹{stats.dc}</p></div>
                  </div>
                  <div>
                  <div className="pmcontent"><p>Online Payments: ₹{stats.online}</p></div>
                  <div className="pmcontent"><p>Other: ₹{stats.other}</p></div>
                  </div>
                  </div>
                
                </div>
                  <h1 className='ol'>Total Number of Transaction: {totalno}</h1>
                <div className="stats flex spaceard">
                  <div className="avg_expense flex flex_d-col spaceard">
                    <h2>Expense Stats</h2>
                    <p>Per day Expense: {Math.round((stats.totalexpense/countd) * 100) / 100}</p>
                    <p>Average Expense: {stats.count ? Math.round((stats.totalexpense/stats.count) * 100) / 100 : 0}</p>
                    <p>Total Expense: {stats.totalexpense}</p>
                    <p>Max Value Spend :{stats.maxExpense}</p>
                  </div>
                  <div className="space"></div>
                  <div className="avg_income flex flex_d-col spaceard">
                    <h2>Income Stats</h2>
                    <p>Per day Income: {Math.round((stats.totalincome/county) * 100) / 100}</p>
                    <p>Average Income: {stats.counti ? Math.round((stats.totalincome/stats.counti) * 100) / 100 : 0}</p>
                    <p>Total Income: {stats.totalincome}</p>
                    <p>Max Value Spend :{stats.maxIncome}</p>
                  </div>
                </div>
                <div className="alltransactions">
                <div className='grid heloo helo gapping'>
                    <div className='transac_type'>Transaction-Type</div>
                    <div className="transac_paymode">Payment-Mode</div>
                    <div className="transac_transactionamount">Amount(₹)</div>
                    <div className="transac_category">Categories</div>
                    <div className="transac_transactiondate">Date</div>
                </div>
                {newExpenses.map((exp) =><div className='grid heloo helo' >
                    <div className='transac_type'style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}}>{exp.tran_type}</div>
                    <div className="transac_paymode">{exp.tran_paytype}</div>
                    <div className="transac_transactionamount" style={{color:exp.tran_type === "Income" ? "#81C784" : "#FF9F63"}} >{exp.tran_amount}</div>
                    <div className="transac_category">{exp.categories}</div>
                    <div className="transac_transactiondate">{exp.tran_date}</div></div>)}
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
