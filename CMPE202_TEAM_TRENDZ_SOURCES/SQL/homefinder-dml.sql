USE homefinder;

INSERT INTO `listing_status` VALUES 
(1,'Posted'),
(2,'Verified'),
(3,'Rejected'),
(4,'Occupied');

INSERT INTO `listing_type` VALUES 
(1,'Houses'),
(2,'Condos'),
(3,'Apartments'),
(4,'Town Houses');


INSERT INTO `user` VALUES 
(1,'test1@test.com','encryptedpassword1','first_name','last_name','Renter'),
(2,'test2@test.com','encryptedpassword2','first_name','last_name','Seller'),
(3,'test3@test.com','encryptedpassword3','first_name','last_name','Buyer'),
(4,'test4@test.com','encryptedpassword4','first_name','last_name','Landlord'),
(5,'test5@test.com','encryptedpassword5','first_name','last_name','Buyer'),
(6,'test6@test.com','encryptedpassword6','first_name','last_name','Seller'),
(7,'test7@test.com','encryptedpassword7','first_name','last_name','Landlord'),
(8,'test8@test.com','encryptedpassword8','first_name','last_name','Renter'),
(9,'test9@test.com','encryptedpassword9','first_name','last_name','Realtor'),
(10,'test10@test.com','encryptedpassword10','first_name','last_name','Admin');


INSERT INTO `listing` VALUES 
(1,'Isolated House','House with a nice garden around',0,'No.19','Aragon','Powell Lodge','Sunnywale','California','35889','United States of America',1200,7,2,1,2,0,1,1500,1,3,2,1,0),
(2,'Colorful apartment','Apartments with balcony and blue borders',1,'No.89','Sofi','Thomas Parkways','San Jose','California','45219','United States of America',1100,56,2,3,2,0,0,2000,4,4,3,0,1),
(3,'Amazing palace','Fully furnished palace',1,'#64','Aragon','Mary Falls','San Francisco','California','83917','United States of America',10800,50,2,1,1,0,0,500,4,3,3,1,1),
(4,'Beach side house','A safe home with amazing view of a beach',0,'#80','Northpoint','Hughes Ridge','San Francisco','California','49268','United States of America',700,77,2,1,4,0,1,500,3,2,2,0,1),
(5,'Victorian house','Victorian houses with funky colors',1,'No.92','Southpoint','Patrick Haven','San Jose','California','44289','United States of America',8600,100,2,1,4,0,0,1500,1,2,2,1,0),
(6,'Serene country-side cottage','Cozy cottage on a hill side',1,'#12','Northpoint','Higgins Lodge','San Francisco','California','28470','United States of America',4000,9,2,1,5,0,0,2250,2,1,2,1,0),
(7,'House surrounded by plants','House tucked inside a forest',0,'#26','Aragon','Matthew Via','Sunnywale','California','64062','United States of America',2200,67,2,1,4,0,0,2250,2,1,2,0,1),
(8,'House with big glass windows','Futuristic glass walled house',0,'58','','Graves Run','San Jose','California','35822','United States of America',11700,33,2,1,5,0,1,500,1,3,3,0,1),
(9,'House on a lake between mountains','Floating house on the lake, with view of mountain',1,'No.42','Northpoint','Richardson Cove','Sunnywale','California','92206','United States of America',14700,49,2,1,1,0,1,1000,3,2,2,1,0),
(10,'House with a nice pool','House with a nice garden and a pool',0,'95','Northpoint','Evelyn Fall','San Jose','California','16959','United States of America',1050,38,2,1,1,0,1,750,2,4,1,1,0),
(11,'House with a hill-side view','House on a hill side with a nice pool',0,'#41','Aragon','Kelley Loop','San Francisco','California','81691','United States of America',4200,20,2,1,5,0,1,4000,3,3,1,0,1),
(12,'House on a lake','Lake house, ideal for horror movies',0,'81','Aragon','Jeffrey Viaduct','San Francisco','California','49327','United States of America',10200,76,2,1,2,0,1,1000,4,2,1,1,1),
(13,'Simple house','Simple house, ready to move in',0,'#23','Northpoint','John Union','San Francisco','California','03181','United States of America',3200,86,2,1,5,0,0,3000,4,3,2,1,1),
(14,'Cozy house beside a lake','Cozy house in a cold climate beside the lake',0,'No.68','Northpoint','Wells Trail','San Jose','California','31157','United States of America',10000,23,2,1,1,0,0,750,3,1,3,1,0),
(15,'Moroccan house','Clean and simple architecture',0,'#12','Northpoint','Patterson Canyon','Sunnywale','California','20087','United States of America',5600,70,2,1,3,0,0,2000,1,2,3,1,1),
(16,'Condo on the corner','On the corner, closer to everything',1,'No.16','Southpoint','Aguilar Mews','San Jose','California','12981','United States of America',2700,14,2,2,2,0,0,1000,1,4,2,1,0);


INSERT INTO `listing_media` VALUES 
(1,1,'View from the ranch','Alone-house.jpg'),
(2,2,'View from across the street','Apartments.jpg'),
(3,3,'View from the garden','Big-building.jpg'),
(4,4,'View across the street','Blue-brown.jpg'),
(5,5,'View across the street','Colored-apartments.jpg'),
(6,6,'View with chimney','Cottage.jpg'),
(7,7,'View with pool','Forest-house.jpg'),
(8,8,'View from garden with snow','Glass-building.jpg'),
(9,9,'Good view','good-house.jpg'),
(10,10,'View with the pool','House-with-pool.jpg'),
(11,11,'View with mountains','Infinity-pool.jpg'),
(12,12,'View across the lake','Lake-house.jpg'),
(13,13,'House with pumpkins','Single-house.jpg'),
(14,14,'House across the lake','Snow-house.jpg'),
(15,15,'House with small windows','White-house.jpg'),
(16,16,'Condo','condo.jpg');


