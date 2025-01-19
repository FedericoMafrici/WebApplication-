import React from "react";
import {Image, Card, Button } from "react-bootstrap";
import dayjs from "dayjs";

export default function ShopCard(props) {
  
   
  
  
  
  
  
  
  return (
   
    <Card  style={{ width: '18rem' , height:'23rem'}} >
            
            
            <Card.Body>
            <Card.Title>{props.shop.name}</Card.Title> 
            <Card.Text> 
            <p>   address: {props.shop.address} </p>  
            
            <p> phone: {props.shop.phoneNumber} </p>
            
            <p> cuisine: {props.shop.typeOfCuisine}  </p>
            <div> 
            <Image src={"https://assets.vogue.com/photos/633eefaf4f85bd18e8ffbc47/master/w_2560%2Cc_limit/GettyImages-690073036.jpg"} alt={`Image of ${props.shop.name}`} fluid />
            </div> 
            </Card.Text> 
            </Card.Body>

    </Card>
   
 );
}
