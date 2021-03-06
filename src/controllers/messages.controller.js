import Message from "./../models/Message";
import Group from "./../models/Group";
import User from "./../models/User";

export const getMessages = async (req, res) => {
  var groups = await User.findById(req.userId)
    .select("groups")
    .populate("groups");
  groups = groups.groups;
  const Messages = await Message.find({ groups: { $in: groups } })
    .sort([["createdAt", -1]])
    .populate(["groups", "user"]);
  res.json(Messages);
};

export const getMessageById = async (req, res) => {
  const message = await Message.findById(req.params.messageId);

  res.status(200).json(message);
};

export const createMessage = async (req, res) => {
  const { title, message, groups } = req.body;
  const newMessage = new Message({ title, message, groups });
  if (groups) {
    const foundGroups = await Group.find({ name: { $in: groups } });
    newMessage.groups = foundGroups.map((group) => group._id);
  } else {
    const group = await Group.findOne({ name: "socio" });
    newMessage.groups = [group._id];
  }
  newMessage.user = req.userId;
  const messageSaved = await newMessage.save();
  res.io.emit("message", { message: "Nuevo mensaje" });
  res.status(201).json(messageSaved);
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
