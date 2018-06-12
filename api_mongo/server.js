var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var API_COMMENTS = 'comments', API_USERS = 'users', API_STORES = 'stores';

var app = express();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader("Content-Type", "application/json");
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;
var url = 'mongodb://localhost:27017/ecommerce'; 

// mongodb.MongoClient.connect(url, function (err, database) {
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	db = database;
	console.log("Database connection ready");
	var server = app.listen(process.env.PORT || 8888, function () {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
});

function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}

app.get("/api/comments", function(req, res) {
	db.collection(API_COMMENTS).find({}).sort({ time: -1 }).toArray(function(err, docs) {
		if (err) {
			handleError(res, err.message, "Failed to get comments.");
		} else {
			res.status(200).json(docs);
		}
	});
});

app.get("/api/comments/:id", function(req, res) {
	var id_product = parseInt(req.params.id);
	db.collection(API_COMMENTS).find({ prod_id: id_product }).toArray(function(err, docs) {
		if (err) {
			handleError(res, err.message, "Failed to get comments.");
		} else {
			res.status(200).json(docs);
		}
	});
});

app.post("/api/add_comment", function(req, res) {
	var newComment = req.body;
	db.collection(API_COMMENTS).insertOne(newComment, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to create new comment.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});
});

app.post("/api/add_user", function(req, res) {
	var user = req.body;
	db.collection(API_COMMENTS).find({ u_name: user.u_name }).toArray(function(err, docs) {
		if (err) {
			handleError(res, err.message, "Failed to get comments.");
		} else {

			if(docs.length > 0){
				var obj = { t: 1, message: 'Usuario ja existe' };
				res.status(200).json(obj);
			}else{
				db.collection(API_USERS).insertOne(user, function(err, doc) {
					if (err) {
						handleError(res, err.message, "Failed to create new comment.");
					} else {
						res.status(201).json(doc.ops[0]);
					}
				});				
			}
		}
	});
});

app.get("/api/remove_comments/:id", function(req, res) {
	var id_product = parseInt(req.params.id);
	db.collection(API_COMMENTS).remove({ prod_id: id_product });
	var obj = { t: 2, message: 'Removido com sucesso' };
	res.status(200).json(obj);
});
