const express = require("express");
const itemModel = require("../models/item");

let router = express.Router();

//DATABASE

const database = [];
let id = 100;

//REST API

router.get("/shopping",function(req,res) {
	let query = {"user":req.session.user}
	itemModel.find(query,function(err,items) {
		if(err) {
			console.log("Error when querying items. Reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json(items);
	})
});

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let item = new itemModel({
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	})
	item.save(function(err) {
		if(err) {
			console.log("Failed to save item. Reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(201).json({message:"success"});
	})
})

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i = 0;i<database.length;i++) {
		if(tempId === database[i].id) {
			if(req.session.user !== database[i].user) {
				return res.status(409).json({message:"You are not authorized to remove this item"});
			}
			database.splice(i,1);
			return res.status(200).json({message:"Success!"})
		}
	}
	return res.status(404).json({message:"not found"});
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		id:tempId,
		user:req.session.user
	}
	for(let i = 0;i<database.length;i++) {
		if(tempId === database[i].id) {
			if(req.session.user !== database[i].user) {
				return res.status(409).json({message:"You are not authorized to edit this item"});
			}			
			database.splice(i,1,item);
			return res.status(200).json({message:"Success!"})
		}
	}
	return res.status(404).json({message:"not found"});
});

module.exports = router;