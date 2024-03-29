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
    "Product Form: Name": String,
    "Product Form: Last Name": String,
    "Email": String,
    "Product Form: Mobile Number": String,
    "Product Form: University": String,
    "Product Form: Are you interested in a coach service from any of the following locations?": String,
    "Product Form: Graduation Year": String,
    "Lineitem variant": String, // Shuttle
    "Total": String, // Price paid
    "Product Form: Any Dietary Requirements?": String,
    "Product Form: Any Allergies?": String,
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

exports.distinct = async (option) => {
  await createCon();

  const data = await Objecc.distinct(option);
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

exports.countCoaches = async (coaches) => {
  await createCon();
  output = [];
  for (let i = 0; i < coaches.length; i++) {
    const coach = coaches[i];
    const count = await Objecc.countDocuments({
      "Product Form: Are you interested in a coach service from any of the following locations?": coach,
    });
    output.push({ coach, count });
  }
  return output;
};

exports.count = async () => {
  await createCon();
  const count = await Objecc.countDocuments();
  return count;
};


exports.list = async (uni = { $regex: ".*" }) => {
  await createCon();
  const data = await Objecc.find(
    {
      "Product Form: University": uni,
    },
    {
      "Product Form: Name": 1,
      "Product Form: Last Name": 1,
      "Product Form: Mobile Number": 1,
      "Email": 1,
      "Product Form: University": 1,
      "Product Form: Are you interested in a coach service from any of the following locations?": 1,
      "Product Form: Graduation Year": 1,
      "Lineitem variant": 1, // Shuttle
      "Total": 1, // Price paid
      "Product Form: Any Dietary Requirements?": 1,
      "Product Form: Any Allergies?": 1,
      _id: 0,
    }
  );
  return data;
};

exports.listByCoach = async (uni = { $regex: ".*" }) => {
  await createCon();
  const data = await Objecc.find(
    {
      "Product Form: Are you interested in a coach service from any of the following locations?": uni,
    },
    {
      "Product Form: Name": 1,
      "Product Form: Last Name": 1,
      "Product Form: Mobile Number": 1,
      "Email": 1,
      "Product Form: University": 1,
      "Product Form: Are you interested in a coach service from any of the following locations?": 1,
      _id: 0,
    }
  );
  return data;
};
