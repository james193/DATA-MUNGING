const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('chicagocrimes.csv');
const outstream = new Stream();
const writeStream1 = fs.createWriteStream('output_1.json');
const writeStream2 = fs.createWriteStream('output_2.json');

const rl = readline.createInterface(instream, outstream);

let yearIndex;
let typeIndex;
let descriptionIndex;
let isArrested;
let headers;
let isHeaders = true;

const mapOver500 = {}; // MAPPING YEAR WITH OVER $500 THEFT
const mapUnder500 = {}; // MAPPING YEAR WITH UNDER $500 THEFT
const mapFinalOver500 = {}; // MAPPING YEAR WITH FINAL COUNT OF OVER $500 THEFT
const mapFinalUnder500 = {}; // MAPPING YEAR WITH FINAL COUNT OF UNDER $500 THEFT

const mapArrested = {}; // MAPPING YEAR WITH ASSAULT LED TO ARREST
const mapNotArrested = {}; // MAPPING YEAR WITH ASSAULT WITH NO ARREST
const mapFinalArrested = {}; // MAPPING YEAR WITH FINAL COUNT OF ARREST
const mapFinalNotArrested = {}; // MAPPING YEAR WITH FINAL COUNT OF NO ARREST

// LOOPING THROUGH TO MAP INITIATE WITH ZERO
for (let i = 2001; i < 2017; i += 1) {
  mapOver500[i] = 0;
  mapUnder500[i] = 0;
  mapArrested[i] = 0;
  mapNotArrested[i] = 0;

  mapFinalOver500[i] = 0;
  mapFinalUnder500[i] = 0;
  mapFinalArrested[i] = 0;
  mapFinalNotArrested[i] = 0;
}

rl.on('line', (line) => {
  // to calculate indexes of the headings to be able to target particular columns directly
  if (isHeaders) {
    headers = line.split(',');
    yearIndex = headers.indexOf('Year');
    typeIndex = headers.indexOf('Primary Type');
    descriptionIndex = headers.indexOf('Description');
    isArrested = headers.indexOf('Arrest');
    isHeaders = false;
  } else {
    // variable for extracting and storing the comma separated values
    const currentline = line.split(',');
    const year = currentline[yearIndex];
    if (currentline[typeIndex] === 'THEFT') {
      for (let j = 0; j < headers.length; j += 1) {
        if (j === descriptionIndex) {
          if (currentline[j] === 'OVER $500') {
            mapOver500[year] += 1;
          } else if (currentline[j] === '$500 AND UNDER') {
            mapUnder500[year] += 1;
          }
        }
      }
      const objects1 = {}; // creation of objects year vise for theft
      objects1[headers[yearIndex]] = currentline[yearIndex];
      objects1.countOver500 = mapOver500[year];
      objects1.countUnder500 = mapUnder500[year];

      mapFinalOver500[currentline[yearIndex]] = mapOver500[year];
      mapFinalUnder500[currentline[yearIndex]] = mapUnder500[year];
    }

    if (currentline[typeIndex] === 'ASSAULT') {
      for (let j = 0; j < headers.length; j += 1) {
        if (j === isArrested) {
          if (currentline[j] === 'true') {
            mapArrested[year] += 1;
          } else if (currentline[j] === 'false') {
            mapNotArrested[year] += 1;
          }
        }
      }
      const objects2 = {}; // creation of objects year vise for assault
      objects2[headers[yearIndex]] = currentline[yearIndex];
      objects2.countArrested = mapArrested[year];
      objects2.countNotArrested = mapNotArrested[year];

      mapFinalArrested[currentline[yearIndex]] = mapArrested[year];
      mapFinalNotArrested[currentline[yearIndex]] = mapNotArrested[year];
    }
  }
});
rl.on('close', () => {
  const answer1 = []; // array to store the year objects from 2001 to 2016
  const answer2 = []; // array to store the year objects from 2001 to 2016
  for (let t = 2001; t < 2017; t += 1) {
    const finalObject1 = {};
    finalObject1.year = t;
    finalObject1.countOver500 = mapFinalOver500[t];
    finalObject1.countUnder500 = mapFinalUnder500[t];
    answer1.push(finalObject1);

    const finalObject2 = {};
    finalObject2.year = t;
    finalObject2.countArrested = mapFinalArrested[t];
    finalObject2.countNotArrested = mapFinalNotArrested[t];
    answer2.push(finalObject2);
  }
  const result1 = JSON.stringify(answer1);
  writeStream1.write(result1, 'UTF-8');
  const result2 = JSON.stringify(answer2);
  writeStream2.write(result2, 'UTF-8');
});
