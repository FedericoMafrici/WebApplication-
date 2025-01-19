import {Container,Button, Alert,Row,Col } from "react-bootstrap";
import HeaderBar from "./HeaderBar";
import { Sidebar } from "./SideBar";
import API from "../API";
import { useEffect,useState } from "react";
import { ShopsAndBags } from "./shopsAndBags";
import { Order } from "./Order";
function MyOrderComponent({tab,setTab, setDirty , shops, bags, submitChanges,loggedIn,logOutSuccesful, doLogOut,confirmOrder,items,reduceItemQuantity}){
    setTab(3);
  //My order Bags 
    const [orderedBags,setOrderedBags]=useState([]);
    const [updateUserInfo,setUpdateUserInfo]=useState(false);
useEffect(() => {
    API.getOrderedBags().then((bags) => {
      console.log("ordered bags:", bags);
      setOrderedBags(bags);
    })},[]);

    const removeOrder = async (bagId) => {
        console.log("removed Order called");
        try {
          await API.removeBagReservation(bagId);
          setOrderedBags((oldOrderedBags) => [
            ...oldOrderedBags.filter((bag) => bag.id !== bagId)
          ]);
          console.log("effettuo l'aggiornamento dello stato");
          // to update theo other states 
          setDirty(true);
          setUpdateUserInfo(true);
          setTimeout(() => setUpdateUserInfo(false), 3000);

        } catch (error) {
          console.error("Errore nella rimozione della prenotazione:", error);
          // Gestisci l'errore in modo più specifico, ad esempio mostrando un messaggio all'utente
        }
       
      };
      
        
       
    

        
        function Link() {
            return (
              
                
                  <Alert key="warning" variant="warning">
                    Order have been canceled, thank you for your time 
              
                 
                  </Alert>
              
           
            );
          }
          
        
        
          //AUTHENTICATION FUNCTION
            function doLogOut()
            {
            API.logOut().then(logOutSuccesful())
            .catch((err)=>console.log('errore nella fase di logout'));
            }

          return (
            <>
              <HeaderBar loggedIn={loggedIn} logOut={doLogOut}/>
              <Container fluid>
                <Row>
                  {/* Sidebar */}
                  <Col md="auto" className="py-3" >
                    <Sidebar tab={tab} setTab={setTab} />
                  </Col>
                  
                  {/* Lista di ShopCard */}
                  <Col md={8} className="py-3">
                  <Row>  
                        <Col md={12} >
                        {updateUserInfo ? (
                 <>
                 <Link />
                 { orderedBags.length!=0 ?
                 <Order setDirty={setDirty} shops={shops} bags={orderedBags} items={items} updateUserInfo={updateUserInfo} removeOrder={removeOrder} />      
                    : 
                    <h1> No pending Order    </h1>
                }  
                 </>
                ) : (
                    <>
                    {orderedBags.length!=0? 
                  <Order setDirty={setDirty} shops={shops} bags={orderedBags} updateUserInfo={updateUserInfo} items={items} removeOrder={removeOrder}/>      
                        :
                        <h1>   No pending Order    </h1>
                    }
                    </>
                  )}
                        

        
                        </Col>
                    
                    </Row>
                  </Col>
        
   
            
                </Row>
              </Container>
            </>
          );
        
    }
    export{MyOrderComponent}