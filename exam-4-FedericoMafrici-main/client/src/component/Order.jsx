import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import { Card,Image, Col, Row, Button, Container } from "react-bootstrap";
import React, { useEffect, useState,useContext } from 'react';
import Bag from './bag';
import API from '../API';
import BagsReservedContext from './BagsReserved';
function Order({items,shops,bags,removeOrder}) {
  
  const [openStates, setOpenStates] = useState([]);
  const {bagsReserved, addToBagsReserved } = useContext(BagsReservedContext);

  useEffect(() => {
    if(shops && bags ) 
    setOpenStates(new Array(shops.length).fill(false));
  
  },[]);

 const handleToggle = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  

  return (
  
            <Row>
             
              {bags && bags.map((bag, index) => (
                <Col key={index}>
                  
                  <Card style={{ width: 'auto' , height:'auto'}} >
            <Card.Body>
  <Card.Title>Bag {bag.id}  pickUp time: {bag.date} <span style={{ marginLeft: '10px' }}></span>

    <Button variant="danger" onClick={()=>removeOrder(bag.id)} >  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-x-fill" viewBox="0 0 16 16">
            
   

    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293z"/>
    </svg>   </Button> 

  </Card.Title>
  <Card.Text> cost: {bag.prize} € </Card.Text>
  
  {bag.type === "regular" ? (
    items
      .filter((element) => element.bagsId === bag.id)
      .map((element, index) => (
        <Card.Text key={index}>{element.itemname}:{element.quantity}</Card.Text>
      ))
  ) : (
    <Card.Text>Surprise Bag</Card.Text>
  )}

 
  
</Card.Body>
    </Card>
                 
                </Col>
              ))}
            </Row>
         
  );
}

export { Order };
