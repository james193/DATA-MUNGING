const fs = require('fs');
const readline = require('readline');
const Stream = require('stream'); 

const instream = fs.createReadStream('chicagocrimes.csv');
const outstream = new Stream();
const writeStream1 = fs.createWriteStream('first.json');
const writeStream2 = fs.createWriteStream('second.json');

const rl = readline.createInterface(instream,outstream);

var a=0;
let yearIndex;
let typeIndex;
let descriptionIndex;
let isArrested;
let headers;

const Arrayobjects1 = [];
for(var i=2001;i<2017;i+=1)
{
  const objects1 = {};
  objects1.year = i;
  objects1.countOver500 = 0;
  objects1.countUnder500 = 0;
  Arrayobjects1.push(objects1);
}
const Arrayobjects2 = [];
for(var i=2001;i<2017;i+=1)
{
  const objects2 = {};
  objects2.year = i;
  objects2.countArrested = 0;
  objects2.countNotArrested = 0;
  Arrayobjects2.push(objects2);
}
rl.on('line',function(line)
{ 
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
      if(currentline[typeIndex] === 'THEFT')
      {
        if(currentline[descriptionIndex] === 'OVER $500'){
          for(var j=0;j < Arrayobjects1.length;j+=1){
            if(currentline[yearIndex] == Arrayobjects1[j].year){
                Arrayobjects1[j].countOver500 += 1;
            }
          }
        }
        else if(currentline[descriptionIndex] === '$500 AND UNDER'){
          for(var j=0;j < Arrayobjects1.length;j+=1){
            if(currentline[yearIndex] == Arrayobjects1[j].year){
                Arrayobjects1[j].countUnder500 += 1;
            }
          }
        }
      }
      if(currentline[typeIndex] === 'ASSAULT')
      {
        if(currentline[isArrested] === 'true'){
          for(var j=0;j < Arrayobjects2.length;j+=1){
            if(currentline[yearIndex] == Arrayobjects2[j].year){
                Arrayobjects2[j].countArrested += 1;
            }
          }
        }
        else if(currentline[isArrested] === 'false'){
          for(var j=0;j < Arrayobjects2.length;j+=1){
            if(currentline[yearIndex] == Arrayobjects2[j].year){
                Arrayobjects2[j].countNotArrested += 1;
            }
          }
        }
      }
    }
    a += 1;
});

rl.on('close',function()
{
  var array1;
  var array2;
  array1 = JSON.stringify(Arrayobjects1);
  writeStream1.write(array1,'UTF-8');
  array2 = JSON.stringify(Arrayobjects2);
  writeStream2.write(array2,'UTF-8'); 
});