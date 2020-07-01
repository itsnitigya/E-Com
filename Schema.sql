DROP SCHEMA IF EXISTS ganeshgrains;
CREATE SCHEMA IF NOT EXISTS ganeshgrains;
USE ganeshgrains;

DROP TABLE IF EXISTS `Admin`;
CREATE TABLE `Admin` (
	`user_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`user_id`)
);

DROP TABLE IF EXISTS `Inventory`;
CREATE TABLE `Inventory` (
	`prod_id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`quantity` INT(11) NOT NULL,
	`information` varchar(255) NOT NULL,
	`price` FLOAT NOT NULL,
	`min_quantity` INT NOT NULL,
	PRIMARY KEY (`prod_id`)
);

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
	`order_id` INT(11) NOT NULL AUTO_INCREMENT,
	`prod_id` INT(11) NOT NULL,
	`r_id` INT(11) NOT NULL,
	`d_id` INT(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`quantity` INT NOT NULL,
	`information` DECIMAL NOT NULL,
	`retailer_location` varchar(255) NOT NULL,
	`distributor_location` varchar(255) NOT NULL,
	`isProcessed` BINARY NOT NULL,
	`isDelivered` BINARY NOT NULL,
	`isRejected` BINARY NOT NULL,
	`timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`order_id`)
	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE
	FOREIGN KEY (r_id) references Retailers(r_id) ON DELETE CASCADE
	FOREIGN KEY (d_id) references Distributers(d_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `ledger`;
CREATE TABLE `ledger` (
	`order_id` INT(11) NOT NULL,
	`prod_id` INT(11) NOT NULL,
	`total` FLOAT NOT NULL,
	`timestamp` TIMESTAMP NOT NULL,
	FOREIGN KEY (order_id) references Orders(order_id) ON DELETE CASCADE
	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Retailers`;
CREATE TABLE `Retailers` (
	`r_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) UNIQUE,
	`phone_no` INT(11) UNIQUE,
	`password` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	PRIMARY KEY (`r_id`)
);

DROP TABLE IF EXISTS `Distributers`;
CREATE TABLE `Distributers` (
	`d_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) UNIQUE,
	`phone_no` INT(11) UNIQUE,
	`password` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	PRIMARY KEY (`d_id`)
);
