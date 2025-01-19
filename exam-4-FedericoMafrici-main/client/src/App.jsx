import { useState,useEffect } from 'react';
import { Alert,Button, Col, Container, Row } from 'react-bootstrap';
import BagsReservedContext from './component/BagsReserved';
import API from './API';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
//web page navigation 
import { BrowserRouter, Routes, Route,Link,Navigate} from 'react-router-dom';
import { ShopsList } from './component/shopsList';
import { LoginForm } from './component/AuthComponents'; 
import { FullWebPanel } from './component/FullWebPanel';
import ShoppingCartPreview from './component/ShoppingCartPreview';
import { MyOrderComponent } from './component/MyOrderComponent';
function App() {
  
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  // it hold the information about the reserved bags (id,name etc..)
  const [bagsReserved,setBagsReserved]=useState([]);
  const [showBagsReservedAlert,setshowBagsReservedAlert]=useState(false);
  const [showReduceQuantityAlert,setshowReduceQuantityAlert]=useState(false);
  const [showOrderCompleted,setShowOrderCompleted]=useState(false);
  const [dirty,setDirty]=useState(true);
  const [items, setItems] = useState([]);
  const [shops, setShops] = useState([]);
  const [bags,setBags]=useState([]);
  const [tab, setTab] = useState(1);  
  let firstLoading=true;
 const handleError=(error)=>
 {
    console.log("wow you are handling the errors!");
    console.log(error);
 }
  //getting components at mounting time 
useEffect(() => {
  API.getShops().then((shops) => {
   // console.log("Shops data:", shops);
    setShops(shops);
  }).catch((error)=>{handleError(error)});

  API.getBags().then((bags) => {
    //console.log("bags data:", bags);
    setBags(bags);
  }).catch((error)=>{handleError(error)});

  API.getItems().then((items)=> {setItems(items)}).catch((error)=>{handleError(error)})
   if(firstLoading)
   {setTimeout(()=>{setDirty(false); firstLoading=false;},1000) 
    firstLoading=false;
  }// should affect only the first loading 
  
}, [dirty,loggedIn]);



  const addToBagsReserved = (bag) => {
    if(bagsReserved!==undefined){
    setBagsReserved((prevBags) => [...prevBags, bag]);
    }
    else
    {
      setBagsReserved([bag]);
    }
  };

    // CHECKOUT OF THE SHOPPING CART 
  // Dichiarazione della variabile
  let currItemsList;
  //CHANGING ITEM QUANTITY
  const submitChanges = async () => {
    for (const bag of bagsReserved) {
    //  console.log("oggetto"+ bag.id);
      currItemsList = items.filter((item) => item.bagsId === bag.id);
      for (const currItem of currItemsList) {
    //    console.log("oggetto"+ currItem);
        await API.changeItemQuantity(currItem); // Fix qui
   //     console.log("Done");
      }
      // we then proceed into the locking of the bag 
      await API.reserveBag(bag.id).catch((error)=>console.log(error));
      // await API.reserveBag(bag.id).catch((error)=>console.log(error));
    }
      setDirty(true);
      setShowOrderCompleted(true);
      setTimeout(()=>setShowOrderCompleted(false), 5000);
      // Svuota la lista dopo che tutte le operazioni sono state completate
    setBagsReserved([]);
   
  };
  
  

  
  const confirmOrder = (id) => {
    API.getReservedBags(bagsReserved.map((bag)=>{return bag.id})).then((result)=> {
      if(!result.reservedBags || result.length==0)  
      {
      console.log('NO RESERVED BAGS PROCED WITH THE ORDER',);
        
      submitChanges();  
    } 
      else
        {
         //RESERVED BAGS 
         console.log("reserved bags founded ")
          // FILTER THE BAGSRESERVED LIST AND THEN SHOWING OF A MESSAGE 
        setBagsReserved((oldbagsReserved)=>oldbagsReserved.filter((bag1)=>{return !result.reservedBags.some((bag2)=>
            {
              return bag1.id===bag2.bagsId;
            }
            
            )}));
           
          // MESSAGE LOGIC 
            setshowBagsReservedAlert(true);
            setTimeout(()=>setshowBagsReservedAlert(false), 5000);
          
          // CLEAR THE KART
        }
    }).catch(()=> {
      console.log("generic error in bags reservation");
    
      });
  };
  
  const cancelOrder=(opId)=> {
    setBagsReserved((oldbagsReserved)=> ([]));
    setDirty(true);
  }
  const doLogOut=(opId)=>
  {
   API.logOut().then(logOutSuccesful())
   .catch((err)=>console.log('errore nella fase di logout'));
  }

  const loginSuccessful = (user) => {
    setUser(user);
    setLoggedIn(true);
  }
  const logOutSuccesful= ()=>
  {
//    console.log('log out succesful chiamata');
    setUser(null); 
    setLoggedIn(false);
    console.log(loggedIn);
    <Navigate replace to='/'/>
  }

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
        // NO need to do anything: user is simply not yet authenticated
        //handleError(err);
      }
    };
    checkAuth();
  }, []);

  const removeBagFromCart=(bagId) => 
   {
    setBagsReserved((oldbagsReserved) =>bagsReserved.filter((bag) =>{return bag.id!=bagId}));
    setDirty(true);
  }
  const canReduceQuantity = (bagId) => {
    let tmpquantity = 0;

    items.forEach((item) => {
        if (item.bagsId == bagId) {
            tmpquantity += item.quantity - item.orderQuantity;
            console.log(tmpquantity);
        }
    });

    return tmpquantity < 2;
};

  //ITEMS MANIPULATION FUNCTIONS
  const reduceItemQuantity = (bagId, itemId, reduction) => {
    if(canReduceQuantity(bagId)){
    setItems((oldItemsList) => {
      return oldItemsList.map((item) => {
        if (item.itemId === itemId && item.bagsId === bagId) {
         
            if (item.orderQuantity - 1 >= 0) {
              return { ...item, orderQuantity: item.orderQuantity - 1 };
            
          }
        }
        return item;
      });
    });
   
  }
  else
  { 
        setshowReduceQuantityAlert(true);
        setTimeout(()=>setshowReduceQuantityAlert(false), 2000);
    
   // console.log(" , non puoi diminuire ulteriormente l'item");
  } 
  };

  function DefaultRoute() {
    return(
      <Container className='App'>
        <h1>No data here...</h1>
        <h2>This is not the route you are looking for!</h2>
        <Link to='/login'>Please go back and login into the main page</Link>
      </Container>
    );
  }
  function UserNotLogged() {
    return(
      <Container className='App'>
        <h1> 
          <Alert key="danger" variant="danger">
        Users not logged in 
        </Alert>
        </h1>

        <h2>
        <Link to='/login'>Please go back and login into the main page</Link>
        </h2>
        <Link to='/'>Or go bag to the shops list </Link>
      </Container>
    );
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <BagsReservedContext.Provider value={{ bagsReserved, addToBagsReserved }}>
            <ShopsList tab={tab} setTab={()=>setTab(1)} dirty={dirty} loggedIn={loggedIn} logOutSuccesful={logOutSuccesful}  doLogOut={doLogOut} />
            </BagsReservedContext.Provider> 
            }/>
          <Route path="/bags"  element={loggedIn?
            <BagsReservedContext.Provider value={{ bagsReserved, addToBagsReserved }}>
              <FullWebPanel tab={tab} setTab={()=>setTab(2)} shops={shops} bags={bags}items={items} showOrderCompleted={showOrderCompleted} cancelOrder={cancelOrder} loggedIn={loggedIn} doLogOut={doLogOut}  submitChanges={submitChanges} showReduceQuantityAlert={showReduceQuantityAlert} showBagsReservedAlert={showBagsReservedAlert }items={items} removeBagFromCart={removeBagFromCart} reduceItemQuantity={reduceItemQuantity } confirmOrder={confirmOrder}/>
            </BagsReservedContext.Provider>
            :
            <UserNotLogged/>}/>
             <Route path="/myOrder"  element={loggedIn?
            <BagsReservedContext.Provider value={{ bagsReserved, addToBagsReserved }}>
              <MyOrderComponent  tab={tab} setTab={()=>setTab(3)} setDirty={setDirty} shops={shops} bags={bags} loggedIn={loggedIn} logOutSuccesful={logOutSuccesful}  doLogOut={doLogOut} items={items} submitChanges={submitChanges} showBagsReservedAlert={showBagsReservedAlert }items={items} reduceItemQuantity={reduceItemQuantity } confirmOrder={confirmOrder}/>
            </BagsReservedContext.Provider>
            :
            <UserNotLogged/>}/>
          <Route path="/login"  element={loggedIn? <Navigate replace to="/bags" />:  <LoginForm logOutSuccesful={logOutSuccesful} loginSuccessful={loginSuccessful} />}/>
          
          
          <Route path='/*' element={<DefaultRoute/>} />

        </Routes>
   
    </BrowserRouter>
  )
}

export default App
