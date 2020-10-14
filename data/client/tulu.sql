CREATE TABLE `Vehicle` (
	`vin` VARCHAR(255) PRIMARY KEY,
	`make` VARCHAR(1024),
	`model` VARCHAR(1024),
	`year` INTEGER,
	`trim` VARCHAR(1024)

);

--type are 'image', 'report', 'badge'
CREATE TABLE `VehicleLinks` (
	`vin` VARCHAR(255),
	`name` VARCHAR(1024),
	`url` VARCHAR(2048),
	`type` VARCHAR(255)
);

CREATE TABLE `Users` (
	`id` VARCHAR(36) PRIMARY KEY,
	`name` VARCHAR(1024),
	`email` VARCHAR(1024),
	`type` VARCHAR(255),
	`password` VARCHAR(1024)
);

INSERT INTO `Users` (`id`, `name`, `email`, `type`, `password`) VALUES (UUID(), 'admin', 'admin', 'SysAdmin', 'admin');
