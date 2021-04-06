const Company = require('../models/Company');
const User = require('../models/User');
const Client = require('../models/Client');
const Message = require('../models/Message');

exports.initialData = async (req,res)=>{

	const { company } = req.body;

	const companies = await Company.find({});
	const users = await User.find({}).populate({path:"company", select:"_id company image"});
	const clients = await Client.find({}).populate({path:"company", select:"_id company image"});
	const messages = await Message.find({}).populate({path:"from", select:"_id company image"});
	const specificClients = await Client.find({company}).populate({path:"company", select:"_id company image"});

	return res.status(200).json({companies, users, clients,messages, specificClients});

}