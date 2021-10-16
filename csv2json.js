const csv = require("csvtojson");

exports.csv2json = async (path) => {
  const jsonArray = await csv().fromFile(path);
  return jsonArray;
};
