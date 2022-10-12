# csvreader

Procedure(Backend):

1)We had created a api that will read the data from csv file that is available in any url which is accessible and available for download.

Steps:

i)First we will download the csv file and store it in tempCsvFiles.To do that we are using download package.

ii)after that we are using fs.createReadStream to read and csv-parser to convert it into json object but it is only converting coma seprated value data in desired json format so we also add some manual code to conver ';' seprated value in desired json format.

iii)ater completion of the process we will again remove that file which is downloaded using that url.

iv) and the

CREATE TABLE `sql6525042`.`author` ( `email` VARCHAR(50) NULL , `firstname` VARCHAR(50) NULL , `lastname` VARCHAR(50) NULL ) ENGINE = InnoDB;

CREATE TABLE `sql6525042`.`books` ( `title` VARCHAR(2000) NOT NULL , `isbn` VARCHAR(700) NOT NULL , `authors` VARCHAR(1000) NULL , `description` VARCHAR(9000) NULL ) ENGINE = InnoDB;

CREATE TABLE `sql6525042`.`magazines` ( `title` VARCHAR(2000) NOT NULL , `isbn` VARCHAR(700) NOT NULL , `authors` VARCHAR(1000) NULL , `publishedAt` VARCHAR(50) NULL ) ENGINE = InnoDB;

ALTER TABLE `magazines` ADD PRIMARY KEY(`isbn`);
