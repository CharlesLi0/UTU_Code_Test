const { format } = require("fast-csv");
const mongoose = require("mongoose");
const CryptoDatas = require("../models/crypto-data");

const HttpError = require("../models/HttpError");

const currencySet = [
  "bnb",
  "tezos",
  "bitcoin",
  "bnb",
  "bitcoin-cash",
  "cardano",
  "eos",
  "ethereum",
  "litecoin",
  "stellar",
  "tether",
  "xrp",
];

const getData = async (req, res, next) => {
  let datas;

  try {
    const newestDate = (
      await CryptoDatas.findOne(
        {},
        {},
        {
          sort: { Date: -1 },
          function(err, post) {
            console.log(post);
          },
        }
      )
    ).Date;

    getDateFromDB(newestDate);

    
    // console.log(oldestData);

    res.json(newestDate);
  } catch (err) {
    const error = new HttpError("Could not fetch the data", 500);
    return next(error);
  }
};

const getDataByDate = async (req, res, next) => {
  const reqDate = req.param.selectDate;
  if (!reqDate) {
    reqDate = await CryptoDatas.find(
      Date,
      {},
      {
        sort: { Date: -1 },
        function(err, post) {
          console.log(post);
        },
      }
    ).Date;
  }
  res.json(reqDate);
};

const getAllDate = async (req, res, next) => {
  let dates;
  try {
    dates = await CryptoDatas.find(
      Date,
      {
        Date: 1,
        Currency: 0,
        Open: 0,
        High: 0,
        low: 0,
        Close: 0,
        Volume: 0,
        "Market Cap": 0,
      },
      {
        unique: true,
        sort: { Date: -1 },
      }
    );

    // console.log(dates);
    // console.log(oldestData);

    //   Currency: { type: String, required: true },
    // Date: { type: Date, required: true },
    // Open: { type: String, required: true },
    // High: { type: String, required: true },
    // Low: { type: String, required: true },
    // Close: { type: String, required: true },
    // Volume: { type: String, required: true },
    // "Market Cap": { type: String, required: true },

    res.json(dates);
  } catch (err) {
    const error = new HttpError("Could not fetch the data", 500);
    return next(error);
  }
};

async function getDateFromDB(selectDate) {
  try {
    datas = await CryptoDatas.find(
      { 
        Date: selectDate,
      },
      {},
      {
        sort: { Market_Cap: -1 },
        sort: { "Currency": 1 }
      }
    );

    datasIn24h = await CryptoDatas.find(
      {
        Date: selectDate.setDate(selectDate.getDate() - 1),
      },
      {},
      { 
        sort: { Currency: 1 },
      }
    );

    datasIn7D = await CryptoDatas.find(
      { 
        Date: selectDate.setDate(selectDate.getDate() - 7),
      },
      {},
      {
        sort: { Currency: 1 },
      }
    );
    

    console.log(datas);
    // console.log(oldestData);

  } catch (err) {
    throw err;
  }

  return handleData(datas, datasIn24h, datasIn7D);
}

function handleData(datas, dataIn24h, dataIn7D) {}

function getBeforeDate(x) {
  let year, month, day;
}

exports.getAllDate = getAllDate;
exports.getData = getData;
exports.getDataByDate = getDataByDate;
