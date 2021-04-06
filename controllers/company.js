const Company = require('../models/Company');
const User = require('../models/User');
const Client = require('../models/Client');

exports.createCompany = (req,res)=>{
	let { company } = req.body;

    company = company.split(" ").join("");

    const { _id } = req.user;

    const imgBaseUrl = `${req.protocol}://${req.hostname}/public/`;

    if (req.file) {
       const image = `${imgBaseUrl}${req.file.filename}`;
    }
    
	Company.findOne({company})
			.exec((error,data)=>{
				if(error) res.status(500).json({error});

				if(data) res.status(400).json({Message: "I think your company already exists"})

				const _company = new Company({company, image})
				_company.save((error,success)=>{
					if(error) res.status(400).json({error});

					if(success) {
                        User.findOneAndUpdate({ _id }, { company: success._id }, { new: true })
                            .exec((err,response)=>{
                                if(err) res.status(400).json({err});
                                if(response){
                                    return res.status(201).json({ response, success, Message: "Created with success" }); 
                                }
                            });
                       
                    }

				})
			})
}

exports.deleteCompany = (req,res)=>{
    const { _id } = req.body;


    Company.findOneAndDelete({_id})
    .exec(( error, company )=>{
        if(error) res.status(400).json({error})
        if(company) {

            User.updateMany({ company: _id }, { company: null }, { new: true })
            .exec((err, response)=>{
                if(error) res.status(400).json({error})

                if(response){
                    return res.status(201).json({company, response, Message: "Deleted Company"})
                }
            })
  
        }
    })
}

exports.getCompany = (req,res)=>{

    Company.find({})
    .exec((error, companies)=>{
        if(error) res.status(400).json({error});

        if(companies) res.status(200).json({companies});
    })
}

exports.getOneCompany = (req,res)=>{
    const {_id}= req.body;

    Company.findOne({_id})
    .exec((error, company)=>{
        if(error) {
            return res.status(400).json({error});
        }

        if(company) {
            return res.status(200).json({company});
        }

        return res.status(400).json({Message:"No company found"});
    })
}

exports.disableCompany = (req,res)=>{
    const {_id} = req.body;

    Company.findOne({_id})
        .exec(async(error,course)=>{
            if(error) res.status(400).json({error});
            if(course){
                const updateStatus = await Company.findOneAndUpdate({_id}, { status: "disabled" }, {new:true});
                return res.status(201).json({updateStatus, Message:"Company disabled"})
            }else{
               return res.status(400).json({error: "Company doesn't exist"})
            }
        })

}

exports.enableCompany = (req,res)=>{
    const {_id} = req.body;

    Company.findOne({_id})
        .exec(async(error,course)=>{
            if(error) res.status(400).json({error});
            if(course){
                const updateStatus = await Company.findOneAndUpdate({_id}, { status: "enabled" }, {new:true});
                return res.status(201).json({updateStatus, Message:"Company disabled"})
            }else{
               return res.status(400).json({error: "Company doesn't exist"})
            }
        })

}	