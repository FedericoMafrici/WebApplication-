BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "users" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT,
"email" TEXT,
"hash" TEXT,
"salt" TEXT
);

CREATE TABLE IF NOT EXISTS "shops" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT,
    "phoneNumber" TEXT,
    "typeOfCuisine" TEXT
);

CREATE TABLE IF NOT EXISTS "bags"(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "shopId" INTEGER,
    "size" TEXT,
    "bagDate" TEXT,
    "prize" INTEGER,
    "type" TEXT,
    "reserved" INTEGER,
     FOREIGN KEY("shopId") REFERENCES "shops"("id")
);


CREATE TABLE IF NOT EXISTS "items"(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

CREATE TABLE IF NOT EXISTS "itemsInTheBag"(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER,
    "bagId" INTEGER,    
    "quantity" INTEGER,
    "orderQuantity" INTEGER,
    FOREIGN KEY("itemId") REFERENCES "items"("id"),
    FOREIGN KEY("bagId") REFERENCES "bags"("id")
);

INSERT INTO "items" VALUES(NULL,'apple');
INSERT INTO "items" VALUES(NULL,'banana');
INSERT INTO "items" VALUES(NULL,'steak');
INSERT INTO "items" VALUES(NULL,'hamburger');

INSERT INTO "items" VALUES(NULL,'ananas');
INSERT INTO "items" VALUES(NULL,'pear');
INSERT INTO "items" VALUES(NULL,'cereal');
INSERT INTO "items" VALUES(NULL,'honey');

INSERT INTO "items" VALUES(NULL,'mustard');
INSERT INTO "items" VALUES(NULL,'bread');
INSERT INTO "items" VALUES(NULL,'chips');
INSERT INTO "items" VALUES(NULL,'milk');

INSERT INTO "bags" VALUES(NULL,'bag1',1,'M','15:30',10,'regular',0);
INSERT INTO "bags" VALUES(NULL,'bag2',2,'M','16:30',6,'regular',0);
INSERT INTO "bags" VALUES(NULL,'bag3',3,'M','18:30',7,'regular',0);
INSERT INTO "bags" VALUES(NULL,'bag4',4,'M','12:30',12,'regular',1);
INSERT INTO "bags" VALUES(NULL,'bag5',5,'M','13:30',15,'surprise',0);
INSERT INTO "bags" VALUES(NULL,'bag6',6,'M','19:30',20,'surprise',0);
INSERT INTO "bags" VALUES(NULL,'bag7',7,'M','20:30',10,'surprise',0);
INSERT INTO "bags" VALUES(NULL,'bag8',8,'M','22:30',4,'surprise',1);


INSERT INTO "itemsInTheBag" VALUES(NULL,1,1,2,2);
INSERT INTO "itemsInTheBag" VALUES(NULL,2,1,2,2);

INSERT INTO "itemsInTheBag" VALUES(NULL,1,8,2,2);
INSERT INTO "itemsInTheBag" VALUES(NULL,2,8,2,2);

INSERT INTO "shops" VALUES(NULL,'luigis Pizzeria','via amerigo bartoli 20','3930003913','italian');
INSERT INTO "shops" VALUES(NULL,'los pollos hermanos','via de las noces','3932223913','mexican');
INSERT INTO "shops" VALUES(NULL,'antipasti da Mario','via po','0723499424','friggitoria');
INSERT INTO "shops" VALUES(NULL,'cocktails bar','via po','0723499424','friggitoria');
INSERT INTO "shops" VALUES(NULL,'orto da Gino','via po','0723499424','friggitoria');
INSERT INTO "shops" VALUES(NULL,'supermercato Conad','via po','0723499424','friggitoria');
INSERT INTO "shops" VALUES(NULL,'girarrosti santa rita','via po','0723499424','friggitoria');
INSERT INTO "shops" VALUES(NULL,'girarrosti santa rita','via po','0723499424','friggitoria');
INSERT INTO "shops" VALUES(NULL,'girarrosti santa rita','via po','0723499424','friggitoria');


INSERT INTO  "users" VALUES(NULL,'john.doe@polito.it','e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42','72e4eeb14def3b21');
INSERT INTO  "users" VALUES(NULL,'Fulvio.Corno@polito.it','e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42','72e4eeb14def3b21');

COMMIT;

