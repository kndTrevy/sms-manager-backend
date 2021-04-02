const Message = require('../models/Message');

exports.createMessage = (req,res)=>{
	const { from, message, clients } = req.body;

    const createdBy = req.user._id;

	const data = new Message({from, message, clients, createdBy});
    data.save((error,message)=>{
        if(error) res.status(400).json({error});
        if(message){
            res.status(200).json({Message: "Message sent successfully"});
        }
    })
}

exports.deleteMessage = (req,res)=>{
    const {_id} = req.body;

    Message.deleteOne({_id})
    .exec((error,message)=>{
        if(error) res.status(404).json({error})
        if(message) res.status(201).json({Message: "Deleted Message"})
    })
}

exports.updateMessage= (req,res)=>{
    const {_id} = req.body;

    let updateObj;

    if(req.body.clients){
        updateObj.clients = req.body.clients;
    }

    updateObj.message = req.body.message;

    Message.updateOne({_id}, {...updateObj}, {new: true})
    .exec((error, updatedMessage)=>{
        if(error) res.status(404).json({error})
        if(updatedMessage) res.status(201).json({Message: "Message Updated"})
    })
}

exports.getMessages = (req,res)=>{
    Message.find({})
        .exec((errror, messages)=>{
            if (error) res.status(404).json({error})
            if(messages) res.status(200).json({messages});
        })
}

exports.getOneMessage = (req,res)=>{
    const { _id }= req.params;

    Message.findOne({_id})
    .exec((error, message)=>{
        if(error) {
            return res.status(404).json({error});
        }

        if(message) {
            return res.status(200).json({message});
        }

        return res.status(404).json({Message:"No message found"});
    })
}