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
    "First Name": String,
    Surname: String,
    Email: String,
    "Mobile Phone": String,
    "University Name": String,
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

  const data = await Objecc.distinct("University Name");
  return data;
};

exports.countUnis = async (unis) => {
  await createCon();
  output = [];
  for (let i = 0; i < unis.length; i++) {
    const uni = unis[i];
    const count = await Objecc.countDocuments({
      "University Name": uni,
    });
    output.push({ uni, count });
  }
  return output;
};

exports.list = async (uni={$regex: ".*"}) => {
  await createCon();
  const data = await Objecc.find({
    "University Name": uni,
  });
  return data;
};
