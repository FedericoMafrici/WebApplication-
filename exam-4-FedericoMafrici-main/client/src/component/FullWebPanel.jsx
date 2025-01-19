import { Alert,Image, Col, Row, Button, Container } from "react-bootstrap";
import API from '../API';
import { useEffect, useState } from 'react';
import { Sidebar } from "./SideBar";
import ShoppingCartPreview from './ShoppingCartPreview';
import HeaderBar from "./HeaderBar";
import ShopCard from "./ShopCard";
import { ShopsAndBags } from "./shopsAndBags";
import BagsReservedContext from "./BagsReserved";


function FullWebPanel({tab,setTab ,shops, bags, loggedIn,submitChanges,cancelOrder,showBagsReservedAlert,showReduceQuantityAlert,showOrderCompleted,logOutSuccesful,doLogOut,removeBagFromCart,confirmOrder,items,reduceItemQuantity})
{
  setTab(2);
  function OrderCompletedAlert() {
    return (
      
        
          <Alert key="success" variant="success">
            Order have been completed, thank you for your time 
      
         
          </Alert>
      
   
    );
  }
  function CantReduceQuantiy() {
    return (
      
        
          <Alert key="can't reduce quantity" variant="danger">
            Maximum item reduction quantity reached 
    
          </Alert>
      
   
    );
  }
 

  function Link() {
    return (
      
        
          <Alert key="warning" variant="warning">
            Some of the bags you choosed where already taken,pls 
            <Button variant="link" onClick={submitChanges}>click here</Button> 
            to confirm the order for the remaining available bag,
            otherwise in 5 second the order will be canceled 
           
          </Alert>
      
   
    );
  }

  


 

  return (
    <>
      <HeaderBar loggedIn={loggedIn} logOut={doLogOut}/>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md="auto" className="py-3" >
            <Sidebar tab={tab}  setTab={setTab} />
          </Col>
          
          {/* Lista di ShopCard */}
          <Col md={8} className="py-3">
          <Row>  
                <Col md={12} >
                {showBagsReservedAlert  || showReduceQuantityAlert ? (
                
                 showBagsReservedAlert ?  (
                  <>
                  <Link />
                  <ShopsAndBags shops={shops} bags={bags} items={items} />      
                  </>
                ):
                ( 
                  <>
                  <CantReduceQuantiy />
                  <ShopsAndBags shops={shops} bags={bags} items={items} />      
                  </>
                )
                ) : (
                  showOrderCompleted ? (
                  <>
                 <OrderCompletedAlert />
                  <ShopsAndBags shops={shops} bags={bags} items={items} />      
                  </>
                  )
                  :
                  
                  <ShopsAndBags shops={shops} bags={bags} items={items} />      
                )}



                </Col>
            
            </Row>
          </Col>

          {/* ShoppingCartPreview */}
          <Col md={2} className="py-3">
         
            <ShoppingCartPreview items={items} reduceItemQuantity={reduceItemQuantity} removeBagFromCart={removeBagFromCart}  cancelOrder={cancelOrder} confirmOrder={confirmOrder}/>
           
          </Col>
        </Row>
      </Container>
    </>
  );
}

export{FullWebPanel}