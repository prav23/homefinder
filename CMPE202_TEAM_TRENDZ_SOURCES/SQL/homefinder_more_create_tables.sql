CREATE TABLE favorite_homes (
user_id INT NOT NULL,
user_type VARCHAR(20) NULL DEFAULT NULL,
listing_id INT NOT NULL,
PRIMARY KEY(user_id, listing_id)
);


CREATE TABLE searches(
user_id INT NOT NULL,
security_deposit INT NOT NULL,
min_price INT NOT NULL,
max_price INT NOT NULL,
listing_type INT NOT NULL,
is_furnished TINYINT(1) NOT NULL,
min_sf INT NOT NULL,
max_sf INT NOT NULL,
num_baths INT NOT NULL,
num_beds INT NOT NULL,
num_parking_spots INT NOT NULL,
pet_policy TINYINT(1) NOT NULL,
smoking_policy TINYINT(1) NOT NULL
);

CREATE TABLE applications(
app_date VARCHAR(50) NOT NULL,
listing_id INT NOT NULL,
buyer_id INT NOT NULL,
seller_id INT NOT NULL,
app_type VARCHAR(20) NOT NULL,
status VARCHAR(20) NOT NULL,
price INT NULL DEFAULT NULL
);
