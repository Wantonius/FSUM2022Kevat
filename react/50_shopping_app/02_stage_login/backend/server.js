const express = require("express");
const apiroutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

let app = express();

app.use(express.json());

const port = process.env.port || 3001;

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
let time_to_life_diff = 3600000;


//HELPERS AND MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Please provide proper credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Please provide proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Please provide proper credentials"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username already in use"})
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({message:"Internal server error"});
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		registeredUsers.push(user);
		console.log(registeredUsers);
		return res.status(201).json({message:"Register success!"});
	});
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Please provide proper credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Please provide proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Please provide proper credentials"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
		bcrypt.compare(req.body.password,registeredUsers[i].password,function(err,success) {
				if(err) {
					return res.status(500).json({message:"Internal server error"});
				}
				if(!success) {
					return res.status(401).json({message:"Unauthorized!"});
				}
				let token = createToken();
				let now = Date.now();
				let session = {
					user:req.body.username,
					token:token,
					ttl:now+time_to_life_diff
				}
				loggedSessions.push(session);
				return res.status(200).json({"token":token});
			})
		}
	}
	return res.status(401).json({message:"Unauthorized!"});
});


app.use("/api",apiroutes);

app.listen(port);

console.log("Running in port ",port);