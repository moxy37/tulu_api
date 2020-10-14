DROP DATABASE `spartacus`;
CREATE DATABASE `spartacus`;
USE `spartacus`;

DROP TABLE IF EXISTS `Vehicle`;
CREATE TABLE `Vehicle` (
	`vin` VARCHAR(255) PRIMARY KEY,
	`make` VARCHAR(1024),
	`model` VARCHAR(1024),
	`year` INTEGER,
	`trim` VARCHAR(1024)
);

DROP TABLE IF EXISTS `VehicleLinks`;
CREATE TABLE `VehicleLinks` (
	`vin` VARCHAR(255),
	`name` VARCHAR(1024),
	`url` VARCHAR(2048),
	`type` VARCHAR(255)
);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` VARCHAR(36) PRIMARY KEY,
	`name` VARCHAR(1024),
	`email` VARCHAR(1024),
	`type` VARCHAR(255),
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

DROP TABLE IF EXISTS `Dealer`;
CREATE TABLE `Dealer` (
	`id` VARCHAR(36) PRIMARY KEY,
	`name` VARCHAR(2048),
	`accountId` VARCHAR(255)
);

DROP TABLE IF EXISTS `DealerVehicle`;
CREATE TABLE `DealerVehicle` (
	`vin` VARCHAR(255),
	`dealerId` VARCHAR(36)
);

DROP VIEW IF EXISTS `DealerList`;
CREATE VIEW `DealerList` AS SELECT dv.`vin` AS `vin`, dv.`dealerId` AS `dealerId`, v.`make` AS `make`, v.`model` AS `model`, v.`year` AS `year`, v.`trim` AS `trim` FROM `DealerVehicle` dv JOIN `Vehicle` v ON dv.`vin`=v.`vin`;

INSERT INTO `Users` (`id`, `name`, `email`, `type`, `password`) VALUES (UUID(), 'admin', 'admin', 'SysAdmin', 'admin');
