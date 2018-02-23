const fs1 = require('fs');

const writeStream = fs1.createWriteStream('part_2.json');

const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('chicagocrimes.csv');
const outstream = new Stream();

const rl = readline.createInterface(instream, outstream);
let a = 0;
let yearI;
let descI;
const result = [];
let headers = [];
const tester = new RegExp('(.*)(,ASSAULT,)(.*)');
const nector = new RegExp('(.*)(,true,)(.*)');
const sector = new RegExp('(.*)(,false,)(.*)');

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
    headers = line.split(',');
    yearI = headers.indexOf('Year');
    descI = headers.indexOf('Arrest');
  } else if (tester.test(line) === true) {
    if (nector.test(line) === true || sector.test(line) === true) {
      const obj = {};
      const currentline = line.split(',');
      const year = currentline[yearI];

      for (let j = 0; j < headers.length; j += 1) {
        if (j === descI) {
          if (currentline[j] === 'true') {
            mp1[year] += 1;
          } else if (currentline[j] === 'false') {
            mp2[year] += 1;
          }
        }
      }
      obj[headers[yearI]] = currentline[yearI];
      obj.Arrested = mp1[year];
      obj.NotArrested = mp2[year];

      result.push(obj);
    }
  }
  a += 1;
});

rl.on('close', () => {
  const answer1 = [];
  for (let k = 0; k < result.length; k += 1) {
    fp1[result[k].Year] = result[k].Arrested;
    fp2[result[k].Year] = result[k].NotArrested;
  }

  for (let t = 2001; t < 2017; t += 1) {
    const objs = {};
    objs.year = t;
    objs.Arrested = fp1[t];
    objs.NotArrested = fp2[t];

    answer1.push(objs);
  }
  const result1 = JSON.stringify(answer1);
  writeStream.write(result1, 'UTF-8');
});