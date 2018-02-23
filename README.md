# Data_Munging

#Chicago Crime Data
Data Source: chicagocrimes.csv

##Part 1: Data Munging


Write a Nodejs program that converts the csv file into a json file that will be used to plot data in part 2. You have to come up with an optimal schema for the json file based on the requirements of Part 2.


##Part 2: Data Visualization with D3.js


1.Make a stacked bar chart filtering on the following criteria and aggregated over the given time frame (2001 - 2016) :-

THEFT OVER $500

THEFT $500 AND UNDER


2.   Make a multi series line chart of all Assault cases over the given time frame aggregated    on whether the crime resulted in an arrest or not.


Use the local server http://172.23.238.252/csv_files for accessing csv.


#Getting Started

##Prerequisites
Clone this repo to your local machine using https://github.com/fvcproductions/SOMEREPO
run the code in http-server
Use the local server http://172.23.238.252/csv_files for accessing chicagocrimes.csv and extract it to the root folder.

#Installing
A step by step series of examples that tell you have to get a development env running

##Installation of http-server:
npm install http-server -g This will install http-server globally so that it may be run from the command line.

##To RUN
1.Go to the cloned folder
2.Run part_1.js on terminal --->node part_1.js
3.The output will be displayed on part_1.json
4.Similarly run part_2.js on terminal --->node part_2.js
5.The output will be displayed on part_2.json
6.Now to display graphs on browsers,type --->http-server
7.Click on the index.html to view graphs.