const fs = require("fs");
const csv = require('csvtojson');
const fileDirtection = "./source/crypto_historical_data.csv";
const CryptoData = require('../models/crypto-data');
const { log } = require("console");

function readData() {
  csv().fromFile(fileDirtection).then(async function(jsonArray){
    console.log(jsonArray);
    // await CryptoData.insertMany(jsonArray);
    CryptoData.
    console.log('read data finish');
  })
};

function dataEdit(datas) {

};

exports.readData = readData;
