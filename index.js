require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Counter = require("./models/Counter");

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    next();
});

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.post("/start", (req, res) => {
	let startCounter = new Counter({});
	return Counter.findOne().then((result, error) => {
		if (error) {
			res.status(500).send("Error");
		} else if (result == null) {
			return startCounter.save().then((result, error) => {
				if (error) {
					res.status(500).send("Error");
				} else {
					res.status(201).send("Success");
				}
			});
		} else if (result !== null) {
			res.status(400).send("Counter already started.");
		}
	});
});

app.get("/count/get", (req, res) => {
	return Counter.findOne().then((result, error) => {
		if (error) {
			res.status(500).send("Error");
		} else {
			res.status(200).json({ count: result.count });
		}
	});
});

app.put("/count/update", (req, res) => {
	let newCount = req.body.count;

	if (newCount >= 0) {
		return Counter.findOneAndUpdate({ count: req.body.count }).then(
			(result, error) => {
				if (error) {
					res.status(500).send("Error");
				} else {
					res.status(200).send("Success");
				}
			}
		);
	}
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
