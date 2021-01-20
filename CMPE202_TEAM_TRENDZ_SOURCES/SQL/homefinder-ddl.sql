DROP DATABASE IF EXISTS homefinder;
CREATE DATABASE homefinder;
USE homefinder;


CREATE TABLE user (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `first_name` VARCHAR(20) NULL DEFAULT NULL,
  `last_name` VARCHAR(20) NULL DEFAULT NULL,
  `user_type` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE listing_status (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status_string` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE listing_type (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type_string` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE listing (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `security_deposit` INT NULL DEFAULT NULL,
  `building_number` VARCHAR(10) NULL DEFAULT NULL,
  `apartment` VARCHAR(50) NULL DEFAULT NULL,
  `street_name` VARCHAR(50) NOT NULL,
  `city` VARCHAR(40) NULL DEFAULT NULL,
  `state` VARCHAR(20) NULL DEFAULT NULL,
  `zip_code` VARCHAR(20) NULL DEFAULT NULL,
  `country` VARCHAR(30) NULL DEFAULT NULL,
  `listing_price` INT NOT NULL,
  `distance` INT NOT NULL,
  `listing_status` INT NOT NULL,
  `listing_type` INT NOT NULL,
  `listing_user` INT NOT NULL,
  `listing_views` INT NOT NULL,
  `is_furnished` TINYINT(1) NULL DEFAULT NULL,
  `square_footage` INT NULL DEFAULT NULL,
  `num_baths` SMALLINT NOT NULL,
  `num_beds` SMALLINT NOT NULL,
  `num_parking_spots` SMALLINT NULL DEFAULT NULL,
  `pet_policy` TINYINT(1) NULL DEFAULT NULL,
  `smoking_policy` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE listing_media (
  `id` INT NOT NULL AUTO_INCREMENT,
  `listing_id` INT NOT NULL,
  `media_title` VARCHAR(50) NOT NULL,
  `media_path` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));







