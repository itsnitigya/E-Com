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
	`prod_id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`information` varchar(255) NOT NULL,
	`min_quantity` INT(11) NOT NULL,
	PRIMARY KEY (`prod_id`)
);

DROP TABLE IF EXISTS `Weight`;
CREATE TABLE `Weight` (
	`prod_id`  varchar(255) NOT NULL,
	`weight_id` INT(11) NOT NULL,
	`weight` INT(11) NOT NULL,
	`price` INT(11) NOT NULL,
	PRIMARY KEY (`prod_id` , `weight_id`),
	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Retailer`;
CREATE TABLE `Retailer` (
	`r_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) UNIQUE,
	`number` varchar(255),
	`location` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`r_id`)
);

DROP TABLE IF EXISTS `Distributor`;
CREATE TABLE `Distributor` (
	`d_id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) UNIQUE,
	`number` varchar(255),
	`location` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`d_id`)
);

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
	`cart_id` varchar(255) NOT NULL,
	`r_id` INT(11) NOT NULL,
	`d_id` INT(11) NULL,
	`total` INT(11) NOT NULL,
	`retailer_location` varchar(255) NOT NULL,
	`distributor_location` varchar(255) NULL,
	`isProcessed` BOOLEAN NOT NULL,
	`isRejected` BOOLEAN NOT NULL,
	`isDelivered` BOOLEAN NOT NULL,
	`isRecieved` BOOLEAN NOT NULL,
	`isCancelled` BOOLEAN NOT NULL, 
	`reason` varchar(255) NULL,
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`cart_id`),
	FOREIGN KEY (r_id) references Retailer(r_id) ON DELETE CASCADE,
	FOREIGN KEY (d_id) references Distributor(d_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Item`;
CREATE TABLE `Item` (
	`item_id` INT(11) NOT NULL,
	`cart_id` varchar(255) NOT NULL,
	`prod_id`  varchar(255) NOT NULL,
	`weight_id` INT(11) NOT NULL,
	`quantity` INT(11) NOT NULL,
	`price` INT(11) NOT NULL,
	PRIMARY KEY (`item_id`, `cart_id`, `prod_id`,`weight_id`),
	FOREIGN KEY (cart_id) references Cart(cart_id) ON DELETE CASCADE,
	FOREIGN KEY (prod_id) references Inventory(prod_id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS `Ledger`;
CREATE TABLE `ledger` (
	`cart_id` varchar(255) NOT NULL,
	`r_id` INT(11) NOT NULL,
	`d_id` INT(11) NOT NULL,
	`total` INT(11) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`cart_id` , `created_at`),
	FOREIGN KEY (r_id) references Retailer(r_id) ON DELETE CASCADE,
	FOREIGN KEY (cart_id) references Cart(cart_id) ON DELETE CASCADE
);
