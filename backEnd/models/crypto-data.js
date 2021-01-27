const mongoose = require("mongoose");

const cryptoDataSchema = new mongoose.Schema({
  Currency: { type: String, required: true },
  Date: { type: Date, required: true },
  Open: { type: String, required: true },
  High: { type: String, required: true },
  Low: { type: String, required: true },
  Close: { type: String, required: true },
  Volume: { type: String, required: true },
  Market_Cap: { type: String, required: true },
});

module.exports = mongoose.model("datas", cryptoDataSchema);
