BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
	"email"	TEXT,
	"hash"	TEXT,
	"salt"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "shops" (
	"id"	INTEGER,
	"name"	TEXT,
	"address"	TEXT,
	"phoneNumber"	TEXT,
	"typeOfCuisine"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "bags" (
	"id"	INTEGER,
	"name"	TEXT,
	"shopId"	INTEGER,
	"size"	TEXT,
	"bagDate"	TEXT,
	"prize"	INTEGER,
	"type"	TEXT,
	"reserved"	INTEGER,
	FOREIGN KEY("shopId") REFERENCES "shops"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "items" (
	"id"	INTEGER,
	"name"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "itemsInTheBag" (
	"id"	INTEGER,
	"itemId"	INTEGER,
	"bagId"	INTEGER,
	"quantity"	INTEGER,
	"orderQuantity"	INTEGER,
	FOREIGN KEY("itemId") REFERENCES "items"("id"),
	FOREIGN KEY("bagId") REFERENCES "bags"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "users" VALUES (1,'john.doe@polito.it','e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42','72e4eeb14def3b21');
INSERT INTO "users" VALUES (2,'Fulvio.Corno@polito.it','03f973fb2e40f6e7c0f68ee0aa293aa11eeab70c0c8d6788cff6bb3ee70dc5df','153dceedbc0b7e36');
INSERT INTO "users" VALUES (3,'federico.mafrici@polito.it','957959b78c7ce1a2d61783e05dd1f760af80a7038d7e5b8d096d603ea39789d1','5d34bafa8d03359b');
INSERT INTO "shops" VALUES (1,'Luigis Pizzeria','via amerigo bartoli 20','3930003913','italian');
INSERT INTO "shops" VALUES (2,'Los pollos hermanos','via de las noces','3932223913','mexican');
INSERT INTO "shops" VALUES (3,'Aldo''s Bakery','via sabotino','0723499424','bakery');
INSERT INTO "shops" VALUES (4,'Oh Crispa','corso ferrucci','0723499424','chinese');
INSERT INTO "shops" VALUES (5,'Mc Bun','piazzetta jona ','0723599424','meat');
INSERT INTO "bags" VALUES (1,'bag1',1,'M','10:00-23:30',10,'regular',0);
INSERT INTO "bags" VALUES (2,'bag2',1,'M','10:00-15:30',6,'surprise',0);
INSERT INTO "bags" VALUES (3,'bag3',1,'M','10:00-23:30',7,'regular',0);
INSERT INTO "bags" VALUES (4,'bag4',2,'M','10:00-23:30',12,'regular',0);
INSERT INTO "bags" VALUES (5,'bag5',2,'M','10:00-23:30',15,'surprise',1);
INSERT INTO "bags" VALUES (6,'bag6',3,'M','10:00-23:30',20,'surprise',0);
INSERT INTO "bags" VALUES (7,'bag7',3,'M','10:00-23:30',10,'surprise',3);
INSERT INTO "bags" VALUES (8,'bag8',4,'M','3:00-3:30',4,'regular',0);
INSERT INTO "items" VALUES (1,'apple');
INSERT INTO "items" VALUES (2,'banana');
INSERT INTO "items" VALUES (3,'steak');
INSERT INTO "items" VALUES (4,'hamburger');
INSERT INTO "items" VALUES (5,'ananas');
INSERT INTO "items" VALUES (6,'pear');
INSERT INTO "items" VALUES (7,'cereal');
INSERT INTO "items" VALUES (8,'honey');
INSERT INTO "items" VALUES (9,'mustard');
INSERT INTO "items" VALUES (10,'bread');
INSERT INTO "items" VALUES (11,'chips');
INSERT INTO "items" VALUES (12,'milk');
INSERT INTO "itemsInTheBag" VALUES (1,1,1,4,4);
INSERT INTO "itemsInTheBag" VALUES (2,2,1,4,4);
INSERT INTO "itemsInTheBag" VALUES (3,1,8,1,1);
INSERT INTO "itemsInTheBag" VALUES (4,2,8,0,0);
INSERT INTO "itemsInTheBag" VALUES (5,3,3,6,6);
INSERT INTO "itemsInTheBag" VALUES (6,5,3,3,3);
INSERT INTO "itemsInTheBag" VALUES (7,10,4,6,6);
INSERT INTO "itemsInTheBag" VALUES (8,11,4,3,3);
COMMIT;
