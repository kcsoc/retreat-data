// const unis = require("./unis.json");
const csvFilePath = "./orders.csv";
const { csv2json } = require("./csv2json");
const key = "Product Form: University";

(async () => {
  const unis = await csv2json(csvFilePath);
  // console.log(unis);

  
  const result = [];

  unis.forEach((student) => {
    const uni = student[key];
    const obj = result.find((obj) => obj.uni === uni);
    if (!obj) {
      result.push({
        uni,
        value: 1,
      });
    } else {
      obj.value++;
    }
  });

  result.sort((a, b) => (a.value < b.value ? 1 : -1));

  console.log(result);
})();
