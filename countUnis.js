const unis = require("./unis.json");
const key = "Product Form: University";

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
