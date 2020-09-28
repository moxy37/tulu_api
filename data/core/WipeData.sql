

DELETE FROM `FieldValueString`;
DELETE FROM `FieldValueInteger`;
DELETE FROM `FieldValueDateTime`;
DELETE FROM `FieldValueFloat`;
DELETE FROM `FieldValueBit`;
DELETE FROM `FieldDefinition`;
DELETE FROM `DocumentDefinition`;
DELETE FROM `DocDefField`;
DELETE FROM `Groups`;
DELETE FROM `FieldDefinitionSelect`;
DELETE FROM `Field`;
DELETE FROM `Document`;


INSERT INTO `DocDefField` VALUES ('09cec09b-6841-492b-886c-290f2463465a','6b920f71-5c5d-43f4-8b78-18e65d8fa8f4',1),('09cec09b-6841-492b-886c-290f2463465a','bd227df3-213d-442f-992e-ac6beccbe50f',2),('09cec09b-6841-492b-886c-290f2463465a','c5277ecf-811d-4220-afa3-fa7276bb62ec',3),('09cec09b-6841-492b-886c-290f2463465a','f8422470-7dfb-4dd6-a51f-61110d540a3a',0);
INSERT INTO `FieldDefinition` VALUES ('6b920f71-5c5d-43f4-8b78-18e65d8fa8f4','2016-10-04 06:14:29','Password',17,0,''),('bd227df3-213d-442f-992e-ac6beccbe50f','2016-10-04 06:15:11','Email',18,0,''),('c5277ecf-811d-4220-afa3-fa7276bb62ec','2016-10-04 06:15:42','User Type',6,0,'0'),('f8422470-7dfb-4dd6-a51f-61110d540a3a','2016-10-04 06:14:29','Name',0,0,'');
INSERT INTO `FieldDefinitionSelect` VALUES ('28a3381c-b5e1-45d5-b777-e1338975e033','c5277ecf-811d-4220-afa3-fa7276bb62ec',3,'8030bb93-bc29-40f8-94f7-d6530b2dd996',6),('3c378908-df91-43db-9745-5926d6707983','c5277ecf-811d-4220-afa3-fa7276bb62ec',1,'67784d9b-23cc-4759-a653-3471266f3e8a',6),('e1bd09fc-ef14-4142-bd3d-c925d8c32c02','c5277ecf-811d-4220-afa3-fa7276bb62ec',2,'192d52c2-17b5-45fc-8763-ba24139db329',6);
INSERT INTO `FieldValueString` VALUES ('192d52c2-17b5-45fc-8763-ba24139db329','2016-10-04 06:15:42','',6,'Admin'),('67784d9b-23cc-4759-a653-3471266f3e8a','2016-10-04 06:15:42','',6,'User'),('8030bb93-bc29-40f8-94f7-d6530b2dd996','2016-10-04 06:15:42','',6,'SysAdmin');
INSERT INTO `DocumentDefinition` VALUES ('09cec09b-6841-492b-886c-290f2463465a','2016-10-04 06:14:30','User','',0);
INSERT INTO `Document` (`id`, `documentDefinitionId`, `toString`) VALUES ('efad18ad-c67d-11ea-ae84-e86a647a411d', '09cec09b-6841-492b-886c-290f2463465a', 'admin');
INSERT INTO `Field` (`id`,  `fieldDefinitionId` , `documentId`, `valueId`, `sequence`) VALUES ('113e5c3a-c67e-11ea-ae84-e86a647a411d', 'f8422470-7dfb-4dd6-a51f-61110d540a3a', 'efad18ad-c67d-11ea-ae84-e86a647a411d', '4bf85e2e-c67e-11ea-ae84-e86a647a411d', 0), ('1fba8bef-c67e-11ea-ae84-e86a647a411d', '6b920f71-5c5d-43f4-8b78-18e65d8fa8f4', 'efad18ad-c67d-11ea-ae84-e86a647a411d', '4bf85e33-c67e-11ea-ae84-e86a647a411d', 1), ('2acf0710-c67e-11ea-ae84-e86a647a411d', 'bd227df3-213d-442f-992e-ac6beccbe50f', 'efad18ad-c67d-11ea-ae84-e86a647a411d', '4bf85e34-c67e-11ea-ae84-e86a647a411d', 2), ('361e21ad-c67e-11ea-ae84-e86a647a411d', 'c5277ecf-811d-4220-afa3-fa7276bb62ec', 'efad18ad-c67d-11ea-ae84-e86a647a411d', '8030bb93-bc29-40f8-94f7-d6530b2dd996', 3);
INSERT INTO `FieldValueString` (`id`, `fieldId`, `fieldDataType`, `value`) VALUES ('4bf85e2e-c67e-11ea-ae84-e86a647a411d', '113e5c3a-c67e-11ea-ae84-e86a647a411d', 0, 'admin'), ('4bf85e33-c67e-11ea-ae84-e86a647a411d', '1fba8bef-c67e-11ea-ae84-e86a647a411d', 17, 'admin'), ('4bf85e34-c67e-11ea-ae84-e86a647a411d', '2acf0710-c67e-11ea-ae84-e86a647a411d', 18, 'admin');