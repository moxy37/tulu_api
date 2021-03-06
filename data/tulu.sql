DROP DATABASE `spartacus`;
CREATE DATABASE `spartacus`;
USE `spartacus`;

DROP TABLE IF EXISTS `VehicleDump`;
CREATE TABLE `VehicleDump` (
	`vin` VARCHAR(255) PRIMARY KEY,
	`value` LONGTEXT
);

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
	`isSold` BOOLEAN, 
	`image` VARCHAR(255), 
	`doors` INTEGER,
	`modelNumber` VARCHAR(255),
	`plant` VARCHAR(255),
	`driveType` VARCHAR(255),
	`msrp` FLOAT,
	`wholeSalePrice` FLOAT,
	`minPrice` FLOAT,
	`maxPrice` FLOAT,
	`refferalFee` FLOAT,
	`mileage` INTEGER,
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
	`notes` LONGTEXT,
	PRIMARY KEY(`vin`, `dealerId`)
);

DROP TABLE IF EXISTS `VehicleTimeline`;
CREATE TABLE `VehicleTimeline` (
	`vin` VARCHAR(255),
	`dealerId` VARCHAR(36),
	`label` VARCHAR(255),
	`timestamp` DATETIME DEFAULT NOW(),
	`value` FLOAT DEFAULT 0,
	`targetId` VARCHAR(36) DEFAULT '',
	`notes` VARCHAR(2048)
);

DROP TABLE IF EXISTS `VehicleLinks`;
CREATE TABLE `VehicleLinks` (
	`vin` VARCHAR(255),
	`dealerId` VARCHAR(36),
	`name` VARCHAR(1024),
	`url` VARCHAR(2048),
	`type` VARCHAR(255),
	`description` VARCHAR(255),
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
	`facebook` VARCHAR(1024),
	`bio` VARCHAR(1024),
	`image` VARCHAR(2048)
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
	`sequence` INTEGER DEFAULT 0,
	`latitude` FLOAT,
	`longitude` FLOAT
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

DROP TABLE IF EXISTS `TuluFavorite`;
CREATE TABLE `TuluFavorite` (
	`tuluId` VARCHAR(36) NOT NULL,
	`vin` VARCHAR(255) NOT NULL,
	`dealerId` VARCHAR(36) NOT NULL,
	`timestamp` DATETIME DEFAULT NOW(),
	PRIMARY KEY (`tuluId`, `vin`, `dealerId`)
);

DROP TABLE IF EXISTS `Rating`;
CREATE TABLE `Rating` (
	`targetId` VARCHAR(36),
	`stars` FLOAT,
	`type` VARCHAR(255),
	`userId` VARCHAR(36),
	`notes` VARCHAR(4000)
);

DROP TABLE IF EXISTS `Messages`;
CREATE TABLE `Messages` (
	`id` VARCHAR(36) PRIMARY KEY,
	`senderId` VARCHAR(36),
	`targetId` VARCHAR(36),
	`type` VARCHAR(255),
	`timestamp` DATETIME DEFAULT NOW(),
	`message` LONGTEXT,
	`vin` VARCHAR(255),
	`dealerId` VARCHAR(36),
	`isRead` INTEGER DEFAULT 0,
	`linkId` VARCHAR(36) DEFAULT ''
);


DROP TABLE IF EXISTS `TestDrive`;
CREATE TABLE `TestDrive` (
	`id` VARCHAR(36) PRIMARY KEY,
	`vin` VARCHAR(255),
	`dealerId` VARCHAR(36),
	`timestamp` DATETIME, 
	`userId` VARCHAR(36),
	`tuluId` VARCHAR(36),
	`type` VARCHAR(255)
);

DROP VIEW IF EXISTS `TestDriveView`;
CREATE VIEW `TestDriveView` AS SELECT `t`.`id`, `t`.`vin`, `t`.`dealerId`,`t`.`timestamp`, `t`.`userId`, `t`.`tuluId`, `t`.`type`, `u1`.`name` AS `userName`, `u2`.`name` AS `tuluName`, `d`.`name` AS `dealerName` FROM `TestDrive` `t` JOIN `Dealer` `d` ON `t`.`dealerId`=`d`.`id` JOIN `Users` `u1` ON `t`.`userId`=`u1`.`id` JOIN `Users` `u2` ON `t`.`tuluId`=`u2`.`id`;

DROP VIEW IF EXISTS `MessagesView`;
CREATE VIEW `MessagesView` AS SELECT `m`.`id`, `m`.`senderId`, `m`.`targetId`, `m`.`type`, `m`.`timestamp`, `m`.`message`, `m`.`vin`, `m`.`dealerId`, `m`.`isRead`, `u1`.`name` AS `targetName`, `u2`.`name` AS `senderName`, `m`.`linkId` FROM `Messages` `m` LEFT JOIN `Users` `u1` ON `m`.`targetId`=`u1`.`id` LEFT JOIN `Users` `u2` ON `m`.`senderId`=`u2`.`id`;

DROP VIEW IF EXISTS `RatingView`;
CREATE VIEW `RatingView` AS SELECT `targetId`, `type`, AVG(`stars`) AS `rating`, COUNT(`stars`) AS `reviews` FROM `Rating` GROUP BY `targetId`, `type`;

INSERT INTO `Users` (`id`, `name`, `email`, `password`) VALUES ('a21d22fd-15ed-11eb-83a2-e86a647a411d', 'admin', 'admin', 'admin');
INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('a21d22fd-15ed-11eb-83a2-e86a647a411d', '', 'SysAdmin');


INSERT INTO `Dealer` (`id`, `name`, `accountId`, `logo`, `hours`) VALUES ('dfb56be7-15ef-11eb-83a2-e86a647a411d', 'Gauhier Chrysler', '', '/files/logos/dealer_1_logo.jpg', 'Open ⋅ Closes 9 p.m');
INSERT INTO `Users`  (`id`, `name`, `email`, `password`) VALUES ('c5aefb11-15f0-11eb-83a2-e86a647a411d', 'Gauthier Test', 'test@gauthierchrysler.com', 'test');

INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('c5aefb11-15f0-11eb-83a2-e86a647a411d', '', 'User'), ('c5aefb11-15f0-11eb-83a2-e86a647a411d', 'dfb56be7-15ef-11eb-83a2-e86a647a411d', 'Dealer');
INSERT INTO `Users`  (`id`, `name`, `email`, `password`) VALUES ('0167e373-15f1-11eb-83a2-e86a647a411d', 'Gauthier Admin', 'admin@gauthierchrysler.com', 'admin');
INSERT INTO `Users`  (`id`, `name`, `email`, `password`,`linkedIn`,`instagram`,`facebook`,`bio`) VALUES ('d3096938-1e04-11eb-b7cf-e86a647a411d', 'Test User', 'test@user.com', 'test','https://www.linkedin.com/company/tulu-inc/','https://www.instagram.com/tulucanada/?hl=en','https://www.facebook.com/tulucanada1/','This is a Bio');
INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('d3096938-1e04-11eb-b7cf-e86a647a411d', '', 'User');
INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('0167e373-15f1-11eb-83a2-e86a647a411d', '', 'User'), ('0167e373-15f1-11eb-83a2-e86a647a411d', 'dfb56be7-15ef-11eb-83a2-e86a647a411d', 'DealerAdmin');
INSERT INTO `Users`  (`id`, `name`, `email`, `password`) VALUES ('2de62f1e-1e05-11eb-b7cf-e86a647a411d', 'Test  Tulu', 'tulu@tulu.com', 'tulu');
INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES ('2de62f1e-1e05-11eb-b7cf-e86a647a411d', '', 'User'),('2de62f1e-1e05-11eb-b7cf-e86a647a411d', '', 'Tulu');