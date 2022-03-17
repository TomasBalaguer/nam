import Schedule from "./../models/Schedule";
import Group from "./../models/Group";
import User from "./../models/User";
const { body, validationResult } = require('express-validator');


export const getEvents = async (req, res) => {
  var groups = await User.findById(req.userId)
    .select("groups")
    .populate("groups");

  const group = await Group.findOne({ name: "socio" });
  groups = groups.groups;
  groups.push(group)
  const Events = await Schedule.find({ groups: { $in: groups } })
    .sort([["date", -1]])
    .populate(["groups", "user"]);
  res.json(Events);
};

export const getMessageById = async (req, res) => {
  const message = await Message.findById(req.params.messageId);

  res.status(200).json(message);
};

export const createEvent = async (req, res) => {
  const { title, description, date, time, type, groups } = req.body;
  if(!title || !description || !date || !time, !type)
  {
    res.status(422).json({message: 'Invalid request'});
  }
  const newEvent = new Schedule({ title, description, date, time, type, groups });
  if (groups) {
    const foundGroups = await Group.find({ name: { $in: groups } });
    newEvent.groups = foundGroups.map((group) => group._id);
  } else {
    const group = await Group.findOne({ name: "socio" });
    newEvent.groups = [group._id];
  }
  newEvent.user = req.userId;
  const eventSaved = await newEvent.save();
  res.io.emit("event", { message: "Nuevo evento" });
  res.status(201).json(eventSaved);
};

export const updateMessageById = async (req, res) => {
  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.messageId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedMessage);
};

export const deleteMessageById = async (req, res) => {
  const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);

  res.status(200).json("Mensaje " + req.params.messageId + " eliminado!");
};
