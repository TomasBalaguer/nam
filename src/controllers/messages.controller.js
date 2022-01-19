import Message from './../models/Message'
import Group from './../models/Group'

export const getMessages = async (req, res) => {
    const Messages = await Message.find().populate('groups');
    res.json(Messages)
}

export const getMessageById = async (req, res) => {
    const message = await Message.findById(req.params.messageId);

    res.status(200).json(message)
}

export const createMessage = async (req, res) => {
    const { title, message, groups } = req.body;
    const newMessage = new Message({title, message, groups});
    if(groups){
        const foundGroups = await Group.find({name: {$in: groups}});
        newMessage.groups = foundGroups.map(group => group._id)
    }else{
        const group = await Group.findOne({name: "socio"});
        newMessage.groups = [group._id]
    }
    const messageSaved = await newMessage.save()

    
    res.status(201).json(messageSaved)
}

export const updateMessageById = async (req, res) => {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.messageId, req.body, {
        new: true
    })

    res.status(200).json(updatedMessage);
}

export const deleteMessageById = async (req, res) => {
    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);

    res.status(200).json("Mensaje "+req.params.messageId+" eliminado!")
}