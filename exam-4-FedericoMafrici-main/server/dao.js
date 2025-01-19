
    const sqlite = require('sqlite3');
    const dayjs = require('dayjs');
const { use } = require('passport');

    const db = new sqlite.Database('surplusFood.db', (err) => {
        if(err) throw err;
    });
    
    exports.checkBagId = (bagId) => {
      return new Promise((resolve, reject) => {
          const sql = `SELECT *
                       FROM bags
                       WHERE id = ${bagId}`;
          db.all(sql, [], (err, rows) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length > 0);
          });
      });
  };

    exports.getAll= () =>
    {
        return new Promise((resolve,reject)=>
        {
                const sql='SELECT bags.id AS bagId, bags.name AS bagName, bags.shopId AS shopId, itemsInTheBag.id AS itemsInTheBagId, items.name AS itemName  FROM itemsInTheBag JOIN bags ON itemsInTheBag.bagId = bags.id JOIN items ON itemsInTheBag.itemId = items.id ORDER BY bags.shopId, bags.id, itemsInTheBag.id';
                  
                
                
                db.all(sql,[],(err,rows)=>{
                    if(err){
                       
                        reject(err);
                        return;
                    }
                   
                    const shops=rows.map((result)=>({bagId: result.bagId, bagName:result.bagName, item:result.itemName, shopId:result.shopId}));
                    resolve(shops);
                });
        });
    };

    exports.getShops= () =>
    {
        return new Promise((resolve,reject)=>
        {
                const sql='SELECT * FROM shops ORDER BY name';
                console.log('fin qui tutto oc');
                db.all(sql,[],(err,rows)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                        return;
                    }
                    console.log('fin qui tutto oc');
                    const shops=rows.map((shop)=>({shopId: shop.id, name:shop.name, address: shop.address, phoneNumber: shop.phoneNumber,typeOfCuisine: shop.typeOfCuisine}))
                    resolve(shops);
                });
        });
    };


    exports.getBags= () =>
    {
        return new Promise((resolve,reject)=>
        {
                const sql='SELECT * FROM bags';
           
                db.all(sql,[],(err,rows)=>{
                    if(err){
                        
                        reject(err);
                        return;
                    }
                   
                    const shops=rows.map((bag)=>({id: bag.id, name:bag.name,size:bag.size,shopId:bag.shopId ,date: bag.bagDate, prize: bag.prize ,type:bag.type, reserved:bag.reserved}))
                    resolve(shops);
                });
        });
    };
    exports.getOrderedBags= (userId) =>
    {
        return new Promise((resolve,reject)=>
        {
                const sql='SELECT * FROM bags WHERE reserved=?';
                console.log('user ordered bags retrieved');
                db.all(sql,[userId],(err,rows)=>{
                    if(err){
                        console.log('getOrderedBags query error: '+err);
                        reject(err);
                        return;
                    }
                    if(rows.length>0){
                    console.log('getOrderedBags query completed succesfully');
                    const shops=rows.map((bag)=>({id: bag.id, name:bag.name,size:bag.size,shopId:bag.shopId ,date: bag.bagDate, prize: bag.prize ,type:bag.type, reserved:bag.reserved}))
                    resolve(shops);
                    }
                    else
                    {
                      console.log('no Order done by the users, returning and empty list');                      
                      resolve([]);
                    }
                });
        });
    };
    exports.getItemsInTheBags= () =>
    {
        return new Promise((resolve,reject)=>
        {
                const sql='SELECT itemsInTheBag.id AS itemsInTheBagId, itemsInTheBag.itemId, bags.shopId AS shopId, bags.id AS bagId, items.name AS itemName, itemsInTheBag.quantity,itemsInTheBag.orderQuantity  FROM itemsInTheBag JOIN  bags ON itemsInTheBag.bagId = bags.id JOIN items ON itemsInTheBag.itemId = items.id ORDER BY bags.id, itemsInTheBag.id;';

                db.all(sql,[],(err,rows)=>{
                    if(err){
                        
                        reject(err);
                        return;
                    }
                
                    const shops=rows.map((items)=>({id: items.ItemsInTheBagId, itemId:items.itemId, ShopId: items.shopId, bagsId: items.bagId,itemname: items.itemName,quantity:items.quantity,orderQuantity:items.orderQuantity}))
                    resolve(shops);
                });
        });
    };
    exports.getItemsInTheBag= (id) =>
    {
        return new Promise((resolve,reject)=>
        {
                const sql='SELECT * FROM itemsInTheBag WHERE id=?';
               
                db.all(sql,[id],(err,rows)=>{
                    if(err){
                        console.log('aiaiai'+err);
                        reject(err);
                        return;
                    }
                    
                    const shops=rows.map((items)=>({id: items.id, itemId:items.itemId, bagId: items.bagId, quantity: items.quantity,removed: items.removed}))
                    resolve(shops);
                });
        });
    };
        exports.getReservedBags= (bagIds) =>
        {
            return new Promise((resolve,reject)=>
            {
                
               
                const placeholders = bagIds.map(() => '?').join(',');
                const sql = `SELECT id AS bagId FROM bags WHERE reserved!=0 AND id IN (${placeholders})`;
                console.log(sql);
                if (bagIds.length === 0) {
                    // Se l'array è vuoto, non eseguire la query
                    resolve([]);
                    return;
                }

                    db.all(sql,bagIds,(err,rows)=>{
                        if(err){
                            console.error(err);
                            reject(err);
                            return;
                        }
                       
                        const reservedBags=rows.map((item)=>({bagsId: item.bagId}))
                        resolve(reservedBags);
                    });
            });
        };

        exports.changeItemQuantity = (item) => {
            return new Promise((resolve, reject) => {
              console.log('Inizio modifica quantità:', item);
          
              const sql = 'UPDATE itemsInTheBag SET quantity=?,orderQuantity=? WHERE itemId=? AND bagId=?' ;
          
              if (!item) {
                console.log('Item nullo. Nessuna modifica eseguita.');
                resolve([]);
                return;
              }
          
              // Esegui l'aggiornamento senza iniziare una transazione esplicita
              db.run(sql, [item.orderQuantity, item.orderQuantity,item.itemId,item.bagId], (err) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  console.log('Modifica quantità completata con successo.');
                  resolve(true);
                }
              });
            });
          };
        
          exports.changeBagsReservation = (bagId, userId) => {
            return new Promise((resolve, reject) => {
              console.log('Inizio modifica stato borsa id: ' + bagId + ' userid:' + userId);
          
              const sql = 'UPDATE bags SET reserved=? WHERE id=?';
          
              if (!bagId) {
                console.log('BagId null, no action completed');
                resolve(undefined);
                return;
              }
          
              // Utilizza una funzione freccia per mantenere il contesto
              db.run(sql, [userId, bagId], (err) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  console.log('Aggiornamento completato con successo:');
                  resolve(1);
                }
              });
            });
          };
       
         
          exports.removeBagsReservation = (bagId, userId) => {
            return new Promise((resolve, reject) => {
              console.log('Inizio modifica stato borsa id: ' + bagId + ' userid:' + userId);
          
              const sql = 'UPDATE bags SET reserved=? WHERE id=? AND reserved=?';
          
              if (!bagId) {
                console.log('BagId null, no action completed');
                resolve(undefined);
                return;
              }
          
              // Utilizza una funzione freccia per mantenere il contesto
              db.run(sql, [0, bagId, userId], function (err) {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  console.log('Aggiornamento completato con successo. Righe modificate:', this.changes);
                  if (this.changes !== undefined && this.changes > 0) {
                    resolve(this.changes);
                  } else {
                    console.log('Nessuna riga è stata modificata.');
                    console.log('this:', this);
                    resolve(0); // Nessuna riga modificata
                  }
                }
              });
            });
          };
          
        
        
    
