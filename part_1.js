const fs1 = require('fs');
// module required to read the files
const writeStream = fs1.createWriteStream('part_1.json');

const fs = require('fs'); // module required to read the files
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('./chicagocrimes.csv'); // streming in data asynchronously
const outstream = new Stream();
// let ostream = fs.createWriteStream('output1.json');
const rl = readline.createInterface(instream, outstream);
let a = 0;
let yearI;
let descI;
let result1;
const result = [];
let headers = [];
//regex for identifying theft
const tester = new RegExp('(.*)(,THEFT,)(.*)');

const mp1 = {};
const mp2 = {};
const fp1 = {};
const fp2 = {};

for (let i = 0; i < 2017; i += 1) {
  mp1[i] = 0;
  mp2[i] = 0;
}
for (let q = 0; q < 2017; q += 1) {
  fp1[q] = 0;
  fp2[q] = 0;
}
rl.on('line', (line) => {
  if (a === 0) {
  	//to find index of headers
    headers = line.split(',');
    for (let i = 0; i < headers.length; i += 1) {
      if (headers[i] === 'Year') { yearI = i; }
      if (headers[i] === 'Description') { descI = i; }
    }
  } else if (tester.test(line) === true) {
    const obj = {};
    const currentline = line.split(',');
    const year = currentline[yearI];
    for (let j = 0; j < headers.length; j += 1) {
      if (j === descI) {
        if (currentline[j] === 'OVER $500') {
          mp1[year] += 1;
        } else if (currentline[j] === '$500 AND UNDER') {
          mp2[year] += 1;
        }
      }
    }
    //creating objects 
    obj[headers[yearI]] = currentline[yearI];
    obj.countOver = mp1[year];
    obj.countUnder = mp2[year];
    result.push(obj);
  }
  a += 1;
});

rl.on('close', () => {
  const answer1 = [];
  for (let k = 0; k < result.length; k += 1) {
    fp1[result[k].Year] = result[k].countOver;
    fp2[result[k].Year] = result[k].countUnder;
  }
  for (let t = 2001; t < 2017; t += 1) {
  	//creating objects to push in final array
    const objs = {};
    objs.year = t;
    objs.countOver = fp1[t];
    objs.countUnder = fp2[t];
    //this array is used to stringify objects
    answer1.push(objs);
  }
  result1 = JSON.stringify(answer1);
  writeStream.write(result1, 'UTF-8');
});
