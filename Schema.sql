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

DROP TABLE IF EXISTS `Retailers`;
CREATE TABLE `Retailers` (
	`r_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) UNIQUE,
	`number` INT(11) UNIQUE,
	`location` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`r_id`)
);

DROP TABLE IF EXISTS `Distributors`;
CREATE TABLE `Distributors` (
	`d_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) UNIQUE,
	`number` INT(11) UNIQUE,
	`location` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`d_id`)
);

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
	`order_id` INT(11) NOT NULL,
	`prod_id` INT(11) NOT NULL,
	`quantity` INT NOT NULL,
	PRIMARY KEY (`order_id`),
	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE,
);

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
	`cart_id` INT(11) NOT NULL AUTO_INCREMENT,
	`order_id` INT(11),
	`r_id` INT(11) NOT NULL,
	`d_id` INT(11) NULL,
	`retailer_location` varchar(255) NOT NULL,
	`distributor_location` varchar(255) NULL,
	`isProcessed` BINARY NOT NULL,
	`isRejected` BINARY NOT NULL,
	`isDelivered` BINARY NOT NULL,
	`isRecieved` BINARY NOT NULL,
	`isCanceled` BINARY NOT NULL, 
	`Reason` varchar(255) NULL,
	`timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`cart_id`, `order_id`),
	FOREIGN KEY (order_id) references Orders(order_id) ON DELETE CASCADE,
	FOREIGN KEY (r_id) references Retailers(r_id) ON DELETE CASCADE,
	FOREIGN KEY (d_id) references Distributors(d_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Ledger`;
CREATE TABLE `ledger` (
	`cart_id` INT(11) NOT NULL,
	`r_id` INT(11) NOT NULL,
	`d_id` INT(11) NULL,
	`total` FLOAT NOT NULL,
	`timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`cart_id` , `r_id` , `d_id`),
	FOREIGN KEY (order_id) references Orders(order_id) ON DELETE CASCADE,
	FOREIGN KEY (r_id) references Retailers(r_id) ON DELETE CASCADE,
	FOREIGN KEY (cart_id) references Cart(cart_id) ON DELETE CASCADE,
);
