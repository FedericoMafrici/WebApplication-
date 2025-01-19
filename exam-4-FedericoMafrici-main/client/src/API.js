//IMPORT 
import dayjs from "dayjs";

const APIURL = 'http://localhost:3000/api';

// ** AUTH APIs ** //
/*

API LIST CALLS 

*/
async function logIn(credentials) {
    let response = await fetch(APIURL + '/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;
    }
  }
  
  async function logOut() {
    await fetch(APIURL+'/sessions/current', {
      method: 'DELETE', 
      credentials: 'include' 
    });
  }
  
  async function getUserInfo() {
    const response = await fetch(APIURL+'/sessions/current', {
      credentials: 'include'
    });
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
  }
  
// ** DB APIs ** // 

async function getShops()
{
    const response= await fetch(APIURL+'/shops');
    const shops=await response.json();
    if(response.ok)
    {
        return shops;
    }
    else
    {
        throw shops;
    }
}

async function getBags()
{
    const response= await fetch(APIURL+'/bags',{
     
      method: 'GET',
      credentials: 'include', 
     
    });
    const shops=await response.json();
    if(response.ok)
    {
        return shops;
    }
    else
    {
        throw shops;
    }
}
async function getItems()
{
    const response= await fetch(APIURL+'/itemsInTheBags',{
     
      method: 'GET',
      credentials: 'include', 
     
    });
    const shops=await response.json();
    if(response.ok)
    {
        return shops;
    }
    else
    {
        throw shops;
    }
}
// RETRIEVING BAGS RESERVED IF THEY ARE PRESENT IN THE ORDER 
 async function getReservedBags(bagIds)
{
  return new Promise((resolve, reject) => {
    fetch(APIURL+'/bags/reserved', {
      
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bagIds: bagIds }),
    }).then((response) => {
      // we got something, we pass this to further analyze
      response.json().then((result) =>{ console.log("json succes"); resolve(result)})
      .catch(() => { console.log("json failed"); reject({ error: "Cannot parse server response." }) }); // something else
    }).catch((response) => { reject(response) }); // connection errors
  });
}
//RETRIEVING USER'S ORDERED BAGS 
async function getOrderedBags()
{
  return new Promise((resolve, reject) => {
    fetch(APIURL+'/bags/reserved', {
     
      method: 'GET',
      credentials: 'include', 
     
    }).then((response) => {
      // we got something, we pass this to further analyze
      response.json().then((result) =>{ console.log("json succes"); resolve(result)})
      .catch(() => { console.log("json failed"); reject({ error: "Cannot parse server response." }) }); // something else
    }).catch((response) => { reject(response) }); // connection errors
  });
}
//updating the items quantity properly with the order
function changeItemQuantity(item) {
  return new Promise((resolve, reject) => {
    fetch(APIURL + '/itemsInTheBags', {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId: item.itemId, bagId: item.bagsId, quantity: item.quantity, orderQuantity: item.orderQuantity }),
    }).then((response) => {
      if (response.ok) {
        resolve(true);
      } else {
        console.error('Error in API response:', response);
        reject(response.statusText);
      }
    }).catch((error) => {
      console.error('Error during API call:', error);
      reject(error);
    });
  });
}
//reserve a bag with the user id 
 async function reserveBag(bagId)
{
  return new Promise((resolve, reject) => {
    fetch(APIURL+'/bags/'+bagId.toString(), {
      method: 'POST',
      credentials:'include',
    }).then((response) => {
      // we got something, we pass this to further analyze
      if(response.ok){
        response.json().then((result) =>{ console.log("json succes"); resolve(result)})
      .catch(() => { console.log("json failed"); reject({ error: "Cannot parse server response." }) }); // something else
        
      }
      else
      reject(false);
    }).catch((error) => { console.log(error);reject(error) }); // connection errors
  });
}
async function removeBagReservation(bagId)
{
  return new Promise((resolve, reject) => {
    fetch(APIURL+'/bags/reserved/'+bagId.toString(), {
      method: 'POST',
      credentials:'include',
    }).then((response) => {
      // we got something, we pass this to further analyze
      if(response.ok){
      resolve(true)
      }
      else
      reject(false);
    }).catch((response) => { console.log("error in removebagsreservation API "); reject(response) }); // connection errors
  });
}
export default { removeBagReservation,getOrderedBags,getShops,getBags,getItems,logIn,logOut,getUserInfo,getReservedBags,changeItemQuantity,reserveBag};