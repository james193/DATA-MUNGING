# Data-Munging

#Chicago Crime Data
Data Source: chicagocrimes.csv

##Part 1: Data Munging

Write a Nodejs program that converts the csv file into a json file that will be used to plot data in part 2. You have to come up with an optimal schema for the json file based on the requirements of Part 2.

##Part 2: Data Visualization with D3.js

1. Make a stacked bar chart filtering on the following criteria and aggregated over the given time frame (2001 - 2016) :-

THEFT OVER $500
THEFT $500 AND UNDER

2.  Make a multi series line chart of all Assault cases over the given time frame aggregated    on whether the crime resulted in an arrest or not.

Use the local server http://172.23.238.252/csv_files for accessing csv.

#Installing

##Installation of http-server:
npm install http-server -g This will install http-server globally so that it may be run from the command line.

##To RUN
1. Clone this repo to your local machine using https://github.com/james193/DATA-MUNGING.git

2. Go to the cloned folder.

3. Use the local server http://172.23.238.252/csv_files for accessing chicagocrimes.csv and extract it to the cloned folder.

4. Run CsvToJson1.js on terminal type --->"node CsvToJson1.js" without quotes.

5. The output will be displayed on these two files : output_1.json and output_2.json.

6. Now to display graphs on browsers,type --->"http-server"  without quotes.

7. Click on the index.html to view graphs.