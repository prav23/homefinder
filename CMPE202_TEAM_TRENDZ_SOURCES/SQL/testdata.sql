CREATE TABLE project (
  `proj_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `description` varchar(120) DEFAULT NULL,
  `owner_id` varchar(20) NOT NULL,
  PRIMARY KEY (`proj_id`))
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into project(title, description, owner_id) values('title1', 'desc1', 'panguru');
insert into project(title, description, owner_id) values('title2', 'desc2', 'prav23');
insert into project(title, description, owner_id) values('title3', 'desc3', 'nakul');
insert into project(title, description, owner_id) values('title4', 'desc4', 'mustafa');
insert into project(title, description, owner_id) values('title5', 'desc5', 'krishnamurthy');
insert into project(title, description, owner_id) values('title6', 'desc6', 'vignesh');
insert into project(title, description, owner_id) values('title7', 'desc7', 'praveen');

