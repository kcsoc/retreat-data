const mongoose = require("mongoose");

async function createCon() {
  await mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    // bufferMaxEntries: 0,
  });
}

const Objecc =
  mongoose.models.datas ||
  mongoose.model("datas", {
    "Product Form: First Name": String,
    "Product Form: Last Name": String,
    "Product Form: Email": String,
    "Product Form: Mobile Number": String,
    "Product Form: University": String,
  });

exports.mongoAdd = async (data) => {
  await createCon();
  try {
    await mongoose.connection.db.dropCollection("datas");
  } catch (e) {
    console.log("Unable to delete collection 'datas'");
    console.log(e);
  }

  const promises = [];
  for (let i = 0; i < data.length; i++) {
    const obj = new Objecc(data[i]);
    promises.push(obj.save());
  }
  await Promise.allSettled(promises);
};

exports.distinct = async () => {
  await createCon();

  const data = await Objecc.distinct("Product Form: University");
  return data;
};

exports.countUnis = async (unis) => {
  await createCon();
  output = [];
  for (let i = 0; i < unis.length; i++) {
    const uni = unis[i];
    const count = await Objecc.countDocuments({
      "Product Form: University": uni,
    });
    output.push({ uni, count });
  }
  return output;
};

exports.list = async (uni={$regex: ".*"}) => {
  await createCon();
  const data = await Objecc.find(
    {
      "Product Form: University": uni,
    },
    {
      "Product Form: First Name": 1,
      "Product Form: Last Name": 1,
      "Product Form: Mobile Number": 1,
      "Product Form: Email": 1,
      _id: 0,
    }
  );
  return data;
};
