import { Modal, Button, Col, Container, Row } from 'react-bootstrap';
import BagsReservedContext from './BagsReserved';
import { useContext } from 'react';

export default function ShoppingCartPreview({ items,reduceItemQuantity,removeBagFromCart,confirmOrder,cancelOrder }) {
  const { bagsReserved, addbagsReserved } = useContext(BagsReservedContext);

  
  return (
   
      
        <div className="d-flex flex-column" >
          <Row className="d-flex align-items-center justify-content-between">
            <Col>
              <h1>
                Shopping Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-cart "
                  viewBox="0 0 16 16"
                >
                  {/* ... (path for the cart icon) */}
                </svg>
              </h1>
            </Col>
          </Row>
      

        <Row className="d-flex align-items-center justify-content-between">
          
          
            {bagsReserved && bagsReserved.map((bag, index) => (
              <div key={index}>
                <h2>{bag.name}
                
                <Button variant="light" onClick={()=>removeBagFromCart(bag.id) } >  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash-fill" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1"/>
</svg> </Button> 

                </h2>
                
                {   bag.type==='surprise' ?
              (<p> surprise bag </p>) :
              null 
            }
           
               
                {items && items
                  .filter((item) => item.bagsId===bag.id)
                  .map((itemInBag, index) => (
                    <div  key={index}> 
            {
                    itemInBag.orderQuantity ? (
    
              <p>    {itemInBag.itemname}: {itemInBag.orderQuantity}
              
    
                    <Button variant="light" onClick={()=>reduceItemQuantity(itemInBag.bagsId,itemInBag.itemId,1) } >   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
</svg> </Button> 

                    </p> 
    ) : 
    (
    
              
              <p class="text-secondary"> {itemInBag.itemname}: {itemInBag.orderQuantity} 
                    <Button variant="light" onClick={()=>reduceItemQuantity(itemInBag.bagsId,itemInBag.itemId,1) } >   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
</svg> </Button> 

                    </p> 
    )
    }

                    </div >
                  
                  
                  
                  ))}
              </div>
            ))}
       
        </Row> 
        {
        bagsReserved && bagsReserved.length!=0 ? (
          <>
        <Button variant="success" onClick={() =>confirmOrder(2)} >  Confirm Order   </Button > 
        <Button variant="danger" onClick={() =>cancelOrder(2)} >  cancel Order   </Button > 
        </>
        ):
        <p class="text-info" style={{fontSize:"15px"}} > 
        
        Add at least one bag to the order  
        </p >
        }
        </div>
  );
}
