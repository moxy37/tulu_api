DROP DATABASE `spartacus`;
CREATE DATABASE `spartacus`;
USE `spartacus`;

DROP TABLE IF EXISTS `Dealer`;
CREATE TABLE `Dealer` (
	`id` VARCHAR(36) PRIMARY KEY,
	`name` VARCHAR(2048),
	`accountId` VARCHAR(255),
	`logo` VARCHAR(2048),
	`hours` VARCHAR(1024),
	`website` VARCHAR(1024)
);

DROP TABLE IF EXISTS `Vehicle`;
CREATE TABLE `Vehicle` (
	`vin` VARCHAR(255),
	`make` VARCHAR(255),
	`model` VARCHAR(255),
	`year` INTEGER,
	`vehicleType` VARCHAR(255),
	`bodyType` VARCHAR(255),
	`trim` VARCHAR(255),
	`dealerId` VARCHAR(36),
	`listDate` DATETIME,
	`isSold` BOOLEAN, 
	`doors` INTEGER,
	`modelNumber` VARCHAR(255),
	`plant` VARCHAR(255),
	`driveType` VARCHAR(255),
	`msrp` FLOAT,
	`engineName` VARCHAR(255),
	`engineBrand` VARCHAR(255), 
	`engineId` VARCHAR(255),
	`fuelType` VARCHAR(255),
	`iceMaxHp` VARCHAR(255),
	`iceMaxHpAt` VARCHAR(255),
	`iceMaxTorque` VARCHAR(255),
	`iceMaxTorqueAt` VARCHAR(255),
	`maxPayload` VARCHAR(255),
	`transmissionName` VARCHAR(255),
	`colorName` VARCHAR(255),
	`colorHex` VARCHAR(255),
	`baseTowingCapacity` VARCHAR(255),
	`grossWeight` FLOAT,
	`fuelTankCapacity` FLOAT,
	`notes` TEXT,
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
	PRIMARY KEY(`vin`, `dealerId`, `sequence`, `type`)
);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` VARCHAR(36) PRIMARY KEY,
	`name` VARCHAR(1024),
	`email` VARCHAR(1024),
	`password` VARCHAR(1024),
	`linkedIn` VARCHAR(1024),
	`instagram` VARCHAR(1024),
	`facebook` VARCHAR(1024)
);

DROP TABLE IF EXISTS `UserRoles`;
CREATE TABLE `UserRoles` (
	`userId` VARCHAR(36),
	`targetId` VARCHAR(36),
	`role` VARCHAR(255)  DEFAULT 'User',
	PRIMARY KEY (`userId`, `targetId`, `role`)
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

INSERT INTO `Users` (`id`, `name`, `email`, `password`) VALUES ('a21d22fd-15ed-11eb-83a2-e86a647a411d', 'admin', 'admin', 'admin');
INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('a21d22fd-15ed-11eb-83a2-e86a647a411d', '', 'SysAdmin');


INSERT INTO `Dealer` (`id`, `name`, `accountId`, `logo`, `hours`) VALUES ('dfb56be7-15ef-11eb-83a2-e86a647a411d', 'Gauhier Chrysler', '', '/files/logos/dealer_1_logo.jpg', 'Open ⋅ Closes 9 p.m');
INSERT INTO `Users`  (`id`, `name`, `email`, `password`) VALUES ('c5aefb11-15f0-11eb-83a2-e86a647a411d', 'Gauthier Test', 'test@gauthierchrysler.com', 'test');

INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('c5aefb11-15f0-11eb-83a2-e86a647a411d', '', 'User'), ('c5aefb11-15f0-11eb-83a2-e86a647a411d', 'dfb56be7-15ef-11eb-83a2-e86a647a411d', 'Dealer');
INSERT INTO `Users`  (`id`, `name`, `email`, `password`) VALUES ('0167e373-15f1-11eb-83a2-e86a647a411d', 'Gauthier Admin', 'admin@gauthierchrysler.com', 'admin');

INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('0167e373-15f1-11eb-83a2-e86a647a411d', '', 'User'), ('0167e373-15f1-11eb-83a2-e86a647a411d', 'dfb56be7-15ef-11eb-83a2-e86a647a411d', 'DealerAdmin');