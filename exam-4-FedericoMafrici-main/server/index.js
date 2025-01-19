    'use strict';

    const PORT = 3000;

    const express = require('express');
    const morgan = require('morgan');
    const cors = require('cors');
    const {check, validationResult} = require('express-validator'); // validation middleware
   
    const app = express();
    
    const session = require('express-session'); // enable sessions
    const LocalStrategy = require('passport-local').Strategy; // username and password for login
    const passport = require('passport'); // auth middleware
    
    
   // app.use(morgan('combined'));
   // app.use(express.json());
    
    const dao= require('./dao');
    const userDao = require('./user-dao'); // module for accessing the user info in the DB


    //AUTHENTICATION SETUP 
    //set-up middlewares
passport.use(new LocalStrategy(
    function(username, password, done) {
      userDao.getUser(username, password).then((user) => {
        if (!user)
          return done(null, false, { message: 'Incorrect username and/or password.' });
          
        return done(null, user);
      })
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // starting from the data in the session, we extract the current (logged-in) user
  passport.deserializeUser((id, done) => {
    userDao.getUserById(id)
      .then(user => {
        done(null, user); // this will be available in req.user
      }).catch(err => {
        done(err, null);
      });
  });
 
  app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {

  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions)); // NB: Usare solo per sviluppo e per l'esame! Altrimenti indicare dominio e porta corretti

const answerDelay = 300;
// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
      return next();
    
    return res.status(401).json({ error: 'Not authenticated'});
  }
  
  // set up the session
  app.use(session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret: 'wge8d239bwd93rkskb',   //personalize this random string, should be a secret value
    resave: false,
    saveUninitialized: false 
  }));
  
  // then, init passport
  app.use(passport.initialize());
  app.use(passport.session());
  
    // AUTHENTICATION OPERATIONS 
    app.post('/api/sessions', function(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
          if (err)
            return next(err);
            if (!user) {
              // display wrong login messages
              return res.status(401).json(info);
            }
            // success, perform the login
            req.login(user, (err) => {
              if (err)
                return next(err);
              
              // req.user contains the authenticated user, we send all the user info back
              // this is coming from userDao.getUser()
              return res.json(req.user);
            });
        })(req, res, next);
      });
      app.delete('/api/sessions/current', (req, res) => {
        req.logout( ()=> { res.end(); } );
      });
      
      // GET /sessions/current
      // check whether the user is logged in or not
      app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
          res.status(200).json(req.user);}
        else
          res.status(401).json({error: 'Unauthenticated user!'});;
      });
      



    // DB SETUP AND OPERATION
    app.get('/guess', (req, res) => {
        const n = Math.floor(Math.random()*100) ;
        res.send(String(n)) ;
    }) ;

    app.listen(PORT,
        () => { console.log(`Server started on http://localhost:${PORT}/`) });



        /** APIs **/
          // RETRIEVING SHOPS
        app.get('/api/shops',(req,res)=>{
            
                dao.getShops().then(shops => res.status(200).json(shops)).catch(()=>res.status(500).end());
               
        });
          // RETRIEVING BAGS
        app.get('/api/bags',(req,res)=>{
            
            dao.getBags().then(shops => res.status(200).json(shops)).catch(()=>res.status(500).end());
           
    });
      // RETRIEVING ITEMS IN EACH BAGS 
    app.get('/api/itemsInTheBags',isLoggedIn,(req,res)=>{
            
        dao.getItemsInTheBags().then(shops => res.status(200).json(shops)).catch(()=>res.status(500).end());
       
});
    /* 
app.get('/api/itemsInTheBag/:id',[check('id').isInt()],isLoggedIn,async (req,res)=>{
   try
{         
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
  const result= await dao.getItemsInTheBag(req.params.id);
  if(result.error)
    res.status(404).json(result);
  else
    res.json(result);
} catch(err)
{
    res.status(500).end();
}
});
*/
// retrieving users ordered bags
app.get('/api/bags/reserved',isLoggedIn,async (req,res)=>{
  try
{         
 const result= await dao.getOrderedBags(req.user.id);
 if(result.error)
   res.status(404).json(result);
 else
   res.status(200).json(result);
} catch(err)
{
   res.status(500).end();
}
});
//checking if there are reserved bags in the order
app.post('/api/bags/reserved',isLoggedIn,async (req,res)=>{
  try
{         

  const bagIds = req.body.bagIds ? req.body.bagIds : [];
  console.log('checking if there are reserved bags ',bagIds);
  const reservedBags= await dao.getReservedBags(bagIds);
  if(reservedBags.error)
   res.status(404).json({error:'server error'});
 if(reservedBags.length>0)
 {
  res.status(400).json({error:' some bags have already been reserved from other users',reservedBags});
 }
 
   res.status(200).json(reservedBags);
} catch(err)
{
  console.log(err); 
  res.status(500).end();
}
});

//remove bags  reservation 
app.post('/api/bags/reserved/:id',isLoggedIn,[check('id').isInt().custom(async id => {
  const bagExists = await dao.checkBagId(id); //Controllo che il fid esista
  if (!bagExists) {
      throw new Error('The bag id specified doesnt exists');
      
  }
})],async (req,res)=>{

 
  try
{         
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
  }
  //const item = req.body.itemId ? req.body : []; 
  const bagId=req.params.id;
  console.log('removing bags reservation ',bagId);
  const bagsChanged= await dao.removeBagsReservation(bagId,req.user.id);
  console.log(bagsChanged);
  if(bagsChanged)
  res.status(200).json(bagsChanged);
  else
  {
    res.status(422).json(0);
  }
} catch(err)
{
  console.log(err); 
  res.status(500).end();
}
});

//updating item quantity 
app.post('/api/itemsInTheBags',isLoggedIn,async (req,res)=>{
  try
{         

  //const item = req.body.itemId ? req.body : []; 
  const item=req.body;
  console.log('prova cambio oggetto ',item.itemId);
  const itemChanged= await dao.changeItemQuantity(item);
  if(itemChanged)
  res.status(200).json(itemChanged);
} catch(err)  
{
  console.log(err); 
  res.status(500).end();
}
});
//FUNCTION WHICH RESERVE A BAGS ASSOCIATED WITH THE USER ID 
app.post('/api/bags/:id',[check('id').isInt().custom(async id => {

  
  const bagidDoExists = await dao.checkBagId(id); //Controllo che il fid esista
  
  

  if (!bagidDoExists) {
      console.log('the specified bag id doesnt exists');
      throw new Error('The bag id specified doesnt exists');
  }
  
})],async (req,res)=>{
  try
{         
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
  }
  
  const bagId=req.params.id;
 
 
   console.log('changing bags reservation ',bagId);
  const bagsChanged= await dao.changeBagsReservation(bagId,req.user.id);
  
  console.log(bagsChanged);
  if (bagsChanged !== undefined) {
    res.status(200).json(bagsChanged);
 } else {
    res.status(422).end();
  }
} 
catch(err)
{
  console.log(err); 
  res.status(500).end();
}
});



