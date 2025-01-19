import { Image, Col, Row, Button, Container  } from "react-bootstrap";
import API from '../API';
import { useEffect, useState } from 'react';
import { Sidebar } from "./SideBar";
import ShoppingCartPreview from './ShoppingCartPreview';
import HeaderBar from "./HeaderBar";
import ShopCard from "./ShopCard";
import {Spinner} from "react-bootstrap";
function ShopsList({tab, setTab,dirty, loggedIn,logOutSuccesful,doLogOut}) {
  const [shopsList, setShopsList] = useState([]);
  
  useEffect(() => {
    API.getShops().then((shopslist) => {
      setShopsList(shopslist);
    });
    setTab(1);
  }, []);
  //AUTHENTICATION FUNCTION
  function Loading(props) {
    return (
      <Spinner className='m-2' variant="info" animation="border"  role="status" />
    )
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
          {dirty ?
           < Loading/>
           : (
          <Col md={8} className="py-3">
            <Row>
              {shopsList.map((shop) => (
                <Col md="auto" key={shop.id}>
                  <ShopCard shop={shop} />
                </Col>
              
              ))}
            </Row>
          </Col>
           )
          }
          {/* ShoppingCartPreview */}
          <Col md={2} className="py-3">
            <ShoppingCartPreview />
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export { ShopsList };
