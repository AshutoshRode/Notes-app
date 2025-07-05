create database notesapp;
use notesapp;

CREATE TABLE `notes` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(225) DEFAULT NULL,
    `contents` varchar(1024) DEFAULT NULL,
    `userId` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`)
)


CREATE TABLE 'user'(
    'firstName' varchar(225) DEFAULT NULL,
    'lastName' varchar(225) DEFAULT NULL,
    'password' varchar(225) DEFAULT NULL,
    'email' varchar(225) DEFAULT NULL,
    'phone' varchar(225) DEFAULT NULL,
    'id' int(11) PRIMARY KEY AUTO_INCREMENT,
)