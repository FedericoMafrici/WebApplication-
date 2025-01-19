import React, { useContext } from "react";
import {Image, Card, Button } from "react-bootstrap";
import dayjs from "dayjs";
import BagsReservedContext from './BagsReserved';
export default function Bag(props) {
  const {bagsReserved,addToBagsReserved}=useContext(BagsReservedContext);
   
  
  const isInTimeRange = (timeRange) => {
    

    const orariArray = timeRange.split('-');

    // Converte gli orari in oggetti Day.js
    const inizioOrario = dayjs(orariArray[0], 'HH:mm');

    // Verifica se l'orario è valido
    if (!inizioOrario.isValid()) {
   //    console.error('Orario non valido:', orariArray[0]);
        return false;
    }

    const fineOrario = dayjs(orariArray[1], 'HH:mm');

    // Verifica se l'orario è valido
    if (!fineOrario.isValid()) {
   //     console.error('Orario non valido:', orariArray[1]);
        return false;
    }

   // console.log('Inizio orario:', inizioOrario.format('HH:mm'));
  //  console.log('Fine orario:', fineOrario.format('HH:mm'));

    // Confronta gli orari attuali con l'intervallo specificato
    const now = dayjs();
    return (now.isAfter(inizioOrario) && now.isBefore(fineOrario)) || (now.isBefore(inizioOrario));
    
   
  }

  
  const handleButtonPress = () => {
    // Chiamare la funzione per aggiungere props.bag al contesto
    if(bagsReserved && bagsReserved.some((bag)=>bag.shopId===props.bag.shopId))
    return ;
    else 
    addToBagsReserved(props.bag);
  };

  let statusClass ="null" ;
  //console.log(props.film.status);
 
  switch(statusClass) {
    case 'added':
    console.log('sono entrato gim bro');    
    statusClass = "card text-white bg-success mb-3";
    console.log(statusClass);
      break;
    case 'deleted':
      statusClass = "card text-white bg-success mb-3";
      break;
    case 'updated':
      statusClass = "card text-white bg-success mb-3";
      break;
    default:
      break;
  } 
  
  
  
  
  return (
   
    <Card class={statusClass} style={{ width: 'auto' , height:'auto'}} >
            <Card.Body>
  <Card.Title>Bag {props.bag.id} </Card.Title>
  <Card.Text> cost: {props.bag.prize} € </Card.Text>
  <Card.Text> pickUp Time: {props.bag.date}  </Card.Text>
  {props.bag.type === "regular" ? (
    props.items
      .filter((element) => element.bagsId === props.bag.id)
      .map((element, index) => (
        <Card.Text key={index}>{element.itemname}: {element.quantity}</Card.Text>
      ))
  ) : (
    <Card.Text>Surprise Bag</Card.Text>
  )}
    <Card.Text>size : {props.bag.size} </Card.Text>
  {props.bag.reserved ? (
     <h6 class="text-danger" style={{fontSize:"22px"}} > 
      reserved
    </h6 > 
  ) : (
          
        isInTimeRange(props.bag.date) ? (<> 
    <Button variant="success" onClick={handleButtonPress}>
        Reserve
      </Button> 
      </>
        )
            :
            (
              <>
               <h6 class="text-danger" style={{fontSize:"22px"}} > 
              unavailable
            </h6 > 
            </>
            )
        
      )}



</Card.Body>
    </Card>
   
 );
}
