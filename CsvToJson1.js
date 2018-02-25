const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('chicagocrimes.csv');
const outstream = new Stream();
const writeStream1 = fs.createWriteStream('output_1.json');
const writeStream2 = fs.createWriteStream('output_2.json');

const rl = readline.createInterface(instream,outstream);

var a=0;
let yearIndex;
let typeIndex;
let descriptionIndex;
let isArrested;
let headers;

const mapYearOver500 = {};
const mapYearUnder500 = {};
const mapYearFinalCountOver500 = {};
const mapYearFinalCountUnder500 = {};

const mapYearArrested = {};
const mapYearNotArrested = {};
const mapYearFinalCountArrested = {};
const mapYearFinalCountNotArrested = {};

for (let i = 2001; i < 2017; i += 1) {
    mapYearOver500[i] = 0;
    mapYearUnder500[i] = 0;
    mapYearArrested[i] = 0;
    mapYearNotArrested[i] = 0;
}
for (let q = 2001; q < 2017; q += 1) {
    mapYearFinalCountOver500[q] = 0;
    mapYearFinalCountUnder500[q] = 0;
    mapYearFinalCountArrested[q] = 0;
    mapYearFinalCountNotArrested[q] = 0;
}

rl.on('line',function(line){
	if(a===0)
    {
      headers = line.split(',');
      yearIndex = headers.indexOf('Year');
      typeIndex = headers.indexOf('Primary Type');
      descriptionIndex = headers.indexOf('Description');
      isArrested = headers.indexOf('Arrest');
    }
    else
    {
      const currentline = line.split(',');
      const year = currentline[yearIndex];
      if (currentline[typeIndex] === 'THEFT') {
        for (let j = 0; j < headers.length; j += 1) {
            if (j === descriptionIndex) {
                if (currentline[j] === 'OVER $500') {
                    mapYearOver500[year] += 1;
                } else if (currentline[j] === '$500 AND UNDER') {
                    mapYearUnder500[year] += 1;
                }
            }
        }
        const objects1 = {};
        objects1[headers[yearIndex]] = currentline[yearIndex];
        objects1.countOver500 = mapYearOver500[year];
        objects1.countUnder500 = mapYearUnder500[year];

        mapYearFinalCountOver500[currentline[yearIndex]]=mapYearOver500[year];
        mapYearFinalCountUnder500[currentline[yearIndex]]=mapYearUnder500[year];
      }

      if (currentline[typeIndex] === 'ASSAULT') {
        for (let j = 0; j < headers.length; j += 1) {
            if (j === isArrested) {
                if (currentline[j] === 'true') {
                    mapYearArrested[year] += 1;
                } else if (currentline[j] === 'false') {
                    mapYearNotArrested[year] += 1;
                }
            }
        }
        const objects2 = {};
        objects2[headers[yearIndex]] = currentline[yearIndex];
        objects2.countArrested = mapYearArrested[year];
        objects2.countNotArrested = mapYearNotArrested[year];

        mapYearFinalCountArrested[currentline[yearIndex]]=mapYearArrested[year];
        mapYearFinalCountNotArrested[currentline[yearIndex]]=mapYearNotArrested[year];
      }
    }
    a += 1;
});

rl.on('close',function(){
	const answer1 = [];
	const answer2 = [];
    for (let t = 2001; t < 2017; t += 1) {
        const finalObject1 = {};
        finalObject1.year = t;
        finalObject1.countOver500 = mapYearFinalCountOver500[t];
        finalObject1.countUnder500 = mapYearFinalCountUnder500[t];
        answer1.push(finalObject1);

        const finalObject2 = {};
        finalObject2.year = t;
        finalObject2.countArrested = mapYearFinalCountArrested[t];
        finalObject2.countNotArrested = mapYearFinalCountNotArrested[t];
        answer2.push(finalObject2);
    }
    const result1 = JSON.stringify(answer1);
    writeStream1.write(result1, 'UTF-8');
    const result2 = JSON.stringify(answer2);
    writeStream2.write(result2, 'UTF-8');
});