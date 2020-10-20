DROP DATABASE `spartacus`;
CREATE DATABASE `spartacus`;
USE `spartacus`;

DROP TABLE IF EXISTS `Dealer`;
CREATE TABLE `Dealer` (
	`id` VARCHAR(36) PRIMARY KEY,
	`name` VARCHAR(2048),
	`accountId` VARCHAR(255),
	`logo` VARCHAR(2048),
	`hours` VARCHAR(1024)
);

CREATE TABLE `DealerUser` (
	`userId` VARCHAR(36),
	`dealerId` VARCHAR(36),
	PRIMARY KEY (`userId`, `dealerId`)
);

DROP TABLE IF EXISTS `Vehicle`;
CREATE TABLE `Vehicle` (
	`vin` VARCHAR(255),
	`make` VARCHAR(1024),
	`model` VARCHAR(1024),
	`year` INTEGER,
	`trim` VARCHAR(1024),
	`dealerId` VARCHAR(36),
	`listDate` DATETIME,
	`isSold` BOOLEAN, 
	PRIMARY KEY(`vin`, `dealerId`)
);

DROP TABLE IF EXISTS `VehicleLinks`;
CREATE TABLE `VehicleLinks` (
	`vin` VARCHAR(255),
	`dealerId` VARCHAR(36),
	`name` VARCHAR(1024),
	`url` VARCHAR(2048),
	`type` VARCHAR(255),
	`sequence` INTEGER DEFAULT 0,
	PRIMARY KEY(`vin`, `dealerId`, `sequence`)
);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` VARCHAR(36) PRIMARY KEY,
	`name` VARCHAR(1024),
	`email` VARCHAR(1024),
	`type` VARCHAR(255) DEFAULT 'User',
	`password` VARCHAR(1024)
);

DROP TABLE IF EXISTS `Address`;
CREATE TABLE `Address` (
	`targetId` VARCHAR(36),
	`name` VARCHAR(1024),
	`street` VARCHAR(1024),
	`city` VARCHAR(1024),
	`province` VARCHAR(255),
	`postal` VARCHAR(255),
	`sequence` INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS `Phone`;
CREATE TABLE `Phone` (
	`targetId` VARCHAR(36),
	`type` VARCHAR(255),
	`value` VARCHAR(255),
	`sequence` INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS `Tulus`;
CREATE TABLE `Tulus` (
	`userId` VARCHAR(36) PRIMARY KEY,
	`type` VARCHAR(255),
	`notes` VARCHAR(2048)
);

DROP TABLE IF EXISTS `Rating`;
CREATE TABLE `Rating` (
	`targetId` VARCHAR(36),
	`stars` FLOAT,
	`type` VARCHAR(255),
	`userId` VARCHAR(36),
	`notes` VARCHAR(4000)
);

DROP VIEW IF EXISTS `RatingView`;
CREATE VIEW `RatingView` AS SELECT `targetId`, `type`, AVG(`stars`) AS `rating`, COUNT(`stars`) AS `reviews` FROM `Rating` GROUP BY `targetId`, `type`;

INSERT INTO `Users` (`id`, `name`, `email`, `type`, `password`) VALUES (UUID(), 'admin', 'admin', 'SysAdmin', 'admin');
