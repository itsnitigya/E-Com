DROP SCHEMA IF EXISTS hotstreaks;
CREATE SCHEMA IF NOT EXISTS hotstreaks;
USE hotstreaks;

DROP TABLE IF EXISTS `Admin`;
CREATE TABLE `Admin` (
	`user_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`isAdmin` BINARY NOT NULL,
	PRIMARY KEY (`user_id`)
);

DROP TABLE IF EXISTS `Inventory`;
CREATE TABLE `Inventory` (
	`prod_id` INT(11) NOT NULL AUTO_INCREMENT,
	`d_id` INT(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`quantity` INT(11) NOT NULL,
	`information` varchar(255) NOT NULL,
	`price` FLOAT NOT NULL,
	`min_quantity` INT NOT NULL,
	PRIMARY KEY (`prod_id`,`d_id`)
);

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
	`prod_id` BINARY NOT NULL,
	`order_id` INT(11) NOT NULL,
	`r_id` varchar(255) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`quantity` INT NOT NULL,
	`information` DECIMAL NOT NULL,
	`retailer_location` varchar(255) NOT NULL,
	`distributor_location` varchar(255) NOT NULL,
	`isProcessed` BINARY NOT NULL,
	`isDelivered` BINARY NOT NULL,
	`timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`prod_id`,`order_id`,`r_id`)
);

DROP TABLE IF EXISTS `ledger`;
CREATE TABLE `ledger` (
	`order_id` INT NOT NULL AUTO_INCREMENT,
	`prod_id` INT NOT NULL AUTO_INCREMENT,
	`total` FLOAT NOT NULL,
	`timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`order_id`,`prod_id`)
);

DROP TABLE IF EXISTS `Retailers`;
CREATE TABLE `Retailers` (
	`r_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`phone_no` INT(11) NOT NULL,
	PRIMARY KEY (`r_id`)
);

DROP TABLE IF EXISTS `D_Locations`;
CREATE TABLE `D_Locations` (
	`d_id` INT(11) NOT NULL AUTO_INCREMENT,
	`location` varchar(255) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`d_id`)
);

DROP TABLE IF EXISTS `Distributers`;
CREATE TABLE `Distributers` (
	`d_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`d_id`)
);

ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_fk0` FOREIGN KEY (`prod_id`) REFERENCES ``(``);

ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_fk1` FOREIGN KEY (`d_id`) REFERENCES `Distributers`(`d_id`);

ALTER TABLE `Orders` ADD CONSTRAINT `Orders_fk0` FOREIGN KEY (`prod_id`) REFERENCES `Inventory`(`prod_id`);

ALTER TABLE `Orders` ADD CONSTRAINT `Orders_fk1` FOREIGN KEY (`r_id`) REFERENCES `Retailers`(`r_id`);

ALTER TABLE `ledger` ADD CONSTRAINT `ledger_fk0` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`order_id`);

ALTER TABLE `ledger` ADD CONSTRAINT `ledger_fk1` FOREIGN KEY (`prod_id`) REFERENCES `Inventory`(`prod_id`);

ALTER TABLE `ledger` ADD CONSTRAINT `ledger_fk2` FOREIGN KEY (`timestamp`) REFERENCES `Orders`(`timestamp`);

ALTER TABLE `D_Locations` ADD CONSTRAINT `D_Locations_fk0` FOREIGN KEY (`d_id`) REFERENCES `Distributers`(`d_id`);
