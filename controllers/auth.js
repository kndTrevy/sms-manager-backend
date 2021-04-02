const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const shortid = require('shortid');


exports.signUp = (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    const { role } = req.query;
    let profilePicture;

    let creationObj={
        firstName, lastName, email,role
    }

    const imgBaseUrl = `${req.protocol}://${req.hostname}:2500/public/`;
    const assetDir = `../assets/default.jpg`;

    if (req.file) {
       creationObj.profilePicture = `${imgBaseUrl}${req.file.filename}`;
    }else{
        creationObj.profilePicture = assetDir;
    }

    if(req.body.company){
        creationObj.company = req.body.company;
    }

    const username = shortid.generate();

    User.findOne({ email })
        .exec(async (error, user) => {
            if (error) res.status(500).json({ error });
            if (user) res.status(400).json({ message: "Email is already taken" });

            const hash_password = await bcrypt.hash(password, 10);
            creationObj.hash_password = hash_password;

            const _user = new User({ ...creationObj });
            _user.save((error, user) => {
                if (error) res.status(400).json({ error });

                if (user) {
                    res.status(201).json({ message: `${role} Signed successfully` });
                }
            })

        })

}


exports.signIn = (req, res) => {
    const { email, password } = req.body;

	console.log(`role:${req.query.role}, data: ${email}, ${password}`);


    User.findOne({ email })
        .exec(async (error, user) => {
            if (error) res.status(500).json({ error });
            if (user) {

                const passwordVerification = await user.authenticate(password);
                if (req.query.role === "customer") {
                	if (passwordVerification && user.role === 'customer') {
                    const token = jwt.sign({ role: user.role, _id: user._id },
                        process.env.JWT_SECRET, { expiresIn: '7d' });
	                    res.cookie('token', token, { expiresIn: '7d' });
	                    return res.status(200).json({ user, token });
	                }else{
	                    return res.status(400).json({message: "Password invalid"});
	                }
                }
                if (req.query.role === "admin") {
                	if (passwordVerification && user.role === 'admin') {
                    const token = jwt.sign({ role: user.role, _id: user._id },
                        process.env.JWT_SECRET, { expiresIn: '7d' });
	                    res.cookie('token', token, { expiresIn: '7d' });
	                    return res.status(200).json({ user, token });
	                }else{
	                    return res.status(400).json({message: "Password invalid"});
	                }
                }
                
            }else{
                return res.status(400).json({message: "no User found to login"});
            }

        })
}

exports.signOut = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: "Logout successfully..."
    });
}

exports.updateProfile = async (req, res) => {

    const {email, password, _id}= req.body;


    const imgBaseUrl = `${req.protocol}://${req.hostname}:2500/public/`;


    if (req.file) {

        req.body.profilePicture = `${imgBaseUrl}${req.file.filename}`;

    }

    User.findOne({ email })
        .exec(async (error, user) => {
            if (error) res.status(400).json({ error });

            if (user) {
                const update = req.body;

                const passwordVerification = await user.authenticate(password);
                if (passwordVerification) {

                    const userUpdates = await User.findOneAndUpdate({ email }, {...update}, { new: true });

                    return res.status(201).json({ updatedValues: userUpdates })

                }else{
                    return res.status(400).json({message: "Password invalid"});
                }
            }else{
                return res.status(400).json({Message: "No User to update"});
            }
        })

}


exports.getUsers = (req,res) =>{
	const {role}= req.query;

	User.find({role})
    .populate({path:"company", select:"_id company"})
	.exec((error, users)=>{
		if (error) res.status(400).json({ error });
		if(users) res.status(200).json({users})
	})
}

exports.getOneUser = (req,res) =>{
	const {_id} = req.params;

	User.findOne({_id})
    .populate({path:"company", select:"_id company"})
	.exec((error,user)=>{
		if (error) {
			return res.status(400).json({ error });
		}
		if (user) {
			return res.status(200).json({ user });
		}

		return res.status(400).json({Message: "No User found"})
	})
}