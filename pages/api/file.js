import formidable from "formidable";
import fs from "fs";

const csv = require("csvtojson");
import { mongoAdd } from "../../mongo";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    console.log(files.file.path);
    const arr = await csv2json(files.file.path);
    await mongoAdd(arr);
    console.log(arr);
    return res.status(201).send("");
  });
};

// const saveFile = async (file) => {
//   const data = fs.readFileSync(file.path);
//   fs.writeFileSync(`./public/${file.name}`, data);
//   await fs.unlinkSync(file.path);
//   return;
// };

const csv2json = async (path) => {
  const jsonArray = await csv().fromFile(path);
  return jsonArray;
};

// eslint-disable-next-line
export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
