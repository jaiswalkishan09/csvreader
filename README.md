# csvreader

Procedure(Backend):

1)We had created a api that will read the data from csv file that is available in any url which is accessible and available for download.

Steps:

i)First we will download the csv file and store it in tempCsvFiles.To do that we are using download package.

ii)after that we are using fs.createReadStream to read and csv-parser to convert it into json object but it is only converting coma seprated value data in desired json format so we also add some manual code to conver ';' seprated value in desired json format.

iii)ater completion of the process we will again remove that file which is downloaded using that url.
