import Team from "../models/Team";
import User from "./../models/User";
const { dirname } = require("path");
const appDir = dirname(require.main.filename);
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

export const createTeam = async (req, res) => {
  const uploadFolder = path.join(
    path.dirname(require.main.filename),
    "storage",
    "teams"
  );
  var form = new formidable.IncomingForm();
  var newTeam = {};
  var formfields = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      var oldpath = files.image.filepath;
      var newpath = uploadFolder + "/" + files.image.originalFilename;
      const image = files.image.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
      resolve([fields, image])
    });
  });
  const { name, address, largeName } = formfields[0];
      newTeam = new Team({
        name,
        largeName,
        address,
        image : formfields[1],
      });
  const savedTeam = await newTeam.save();
  res.status(200).json(savedTeam);
};

export const getTeams = async (req, res) => {
    const teams = await Team.find();
    res.status(200).json(teams)
}
