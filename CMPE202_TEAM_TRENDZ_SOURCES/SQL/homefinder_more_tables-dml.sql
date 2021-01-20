USE homefinder;

INSERT INTO favorite_homes VALUES
(1, 'Renter', 2),
(2, 'Buyer', 3),
(3, 'Renter', 4),
(4, 'Seller' , 5),
(5, 'Landlord', 6);

INSERT INTO searches VALUES
(1, 2000, 9000, 15000, 1, 1, 2000, 3000, 3, 4, 2, 0, 0),
(2, 2500, 8000, 14000, 1, 1, 1900, 2900, 2, 3, 1, 1, 0);

INSERT INTO applications VALUES
('12/2/2020', 1, 5, 9, 'Rent', 'Approved', 3000),
('12/3/2020', 2, 4, 6, 'Rent', 'Rejected', 2000),
('12/4/2020', 3, 6, 4, 'Buy', 'Approved', 55000),
('12/5/2020', 4, 2, 5, 'Sell', 'Approved', 50000);