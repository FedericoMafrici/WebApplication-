import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import { Image, Col, Row, Button, Container } from "react-bootstrap";
import { useEffect, useState,useContext } from 'react';
import Bag from './bag';
import API from '../API';
import BagsReservedContext from './BagsReserved';
function ShopsAndBags({items,shops,bags}) {
  
  const [openStates, setOpenStates] = useState([]);
  const {bagsReserved, addToBagsReserved } = useContext(BagsReservedContext);


  

  useEffect(() => {
    if(shops ) 
    setOpenStates(new Array(shops.length).fill(false));
  
  },[]);

 const handleToggle = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <ListGroup>
      {shops && shops.map((element, index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col>
             
               <h6> {element.name} </h6>   
               <div>
               {element.address}
              </div>
              {element.phoneNumber}
              
            </Col>
            <Col>
           {
            bags.filter((bag) => (
                bag.shopId==element.shopId
              )).length===0 ? 
              (
                <p class="text-danger"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bag-x-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293z"/>
        </svg>
            </p>
              )
              :
              (
              <Button
                variant="success"
                onClick={() => handleToggle(index)}
                aria-controls={`example-collapse-text-${index}`}
                aria-expanded={openStates[index]}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z" />
                </svg>
              </Button>
              )
              }
            </Col>
          </Row>
          <Collapse in={openStates[index]}>
            <Row>
             
              {bags && bags.filter((bag) => (
                bag.shopId==element.shopId
              )).map((bag, index) => (
                <Col key={index}>
                  
                  <Bag bag={bag}  items={items} />
                 
                </Col>
              ))}
            </Row>
          </Collapse>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export { ShopsAndBags };

/*
   <Button
                variant="danger"
                aria-controls={`example-collapse-text-${index}`}
                aria-expanded={openStates[index]}
              >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-x-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293z"/>
        </svg>
              </Button>
              */ 