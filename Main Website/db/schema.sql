### Schema
  DROP DATABASE IF EXISTS dragandrop_db;
  CREATE DATABASE dragandrop_db;

USE dragandrop_db;

CREATE TABLE users
(
	id INT(50) auto_increment not null,
	name VARCHAR(255) not null,
	email VARCHAR(255) not null,
	password VARCHAR(255) not null,
	token VARCHAR(255),
	primary key(id)
);

CREATE TABLE posts
(
	id int NOT NULL AUTO_INCREMENT,
	post varchar(255) NOT NULL,
	image blob NOT NULL,
	date_entered DATE DEFAULT current_timestamp,
	entered_by varchar(255) NOT NULL,
	price decimal(15,2) NOT NULL,
	country_of_origin varchar(255) NOT NULL,	
    PRIMARY KEY (id)
);

SELECT * FROM users;
-- SELECT curdate();
SELECT * FROM posts;
-- INSERT INTO parts(art) VALUES (LOAD_FILE('C:\Users\ddjakovic\Dropbox\CCL\CCL\public\img\oops.jpg'));
 INSERT INTO posts(date_entered) VALUES (CURDATE());
 INSERT INTO posts (post) VALUES ("My name is Dragan");
-- SELECT CONVERT(VARCHAR(10),GETDATE(),111)

-- SELECT * FROM posts WHERE (postText) = ("My name is Dragan.");
-- CREATE TABLE parties
-- (
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	party_name varchar(255) NOT NULL,
-- 	party_type varchar(255) NOT NULL,
-- 	party_cost int NOT NULL,
-- 	client_id int NOT NULL,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (client_id) REFERENCES clients(id)
-- );
