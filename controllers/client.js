const Client = require('../models/Client');

exports.createClient = (req,res) =>{
	const {firstName, lastName, contactNumber, company} = req.body;

	const createdBy = req.user._id;

	Client.findOne({contactNumber, company})
		.exec((error,clients)=>{
			if(error) res.status(500).json({error})

			if(clients){
				return res.status(400).json({Message: "Contact Number already used"})
			}
			const client = new Client({firstName, lastName, contactNumber, createdBy});
			client.save((err, _client)=>{
				if(err) res.status(400).json({err})
				if(_client) res.status(201).json({})
			})
		})
	
}

exports.getClientsByCompany = (req,res)=>{
	Client.find({company})
	.exec((error, clients)=>{
		if(error) res.status(400).json({error})

		if(clients) res.status(200).json(clients)
	})
}

exports.getClients = (req,res)=> {
	Client.find({})
	.exec((error, clients)=>{
		if(error) res.status(400).json({error})

		if(clients) res.status(200).json(clients)
	})
}

exports.deleteClient = (req,res)=>{
    const {_id} = req.body;

    Client.deleteOne({_id})
    .exec((error,message)=>{
        if(error) res.status(404).json({error})
        if(message) res.status(201).json({Message: "Deleted Client"})
    })
}