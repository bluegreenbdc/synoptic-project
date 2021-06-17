const express = require('express');
const bodyParser = require("body-parser");
const server = express();
const jsonParser = bodyParser.json();
const port = 3000;
const fs = require("fs");

server.use(express.static("public"));
server.use(bodyParser.urlencoded({extended: true}));

//runs when a job listing form is submitted
server.post('/form-backend', [], jsonParser, function(req, res) {
	
	//JSON.stringify solution adapted from https://javascriptio.com/view/199733/how-to-convert-req-body-to-string
	const formData = JSON.stringify(req.body);
	
	const path = "./jobs/" + req.body.jobTitle + ".json";
	
	//write job listing submission to a json file
	fs.writeFile(path, formData, function(err) {
		if (err) return res.send("Error saving submission. Please try submitting again.");
		console.log("Saved job at " + path)
		res.send("Job listing successful!");
	});
	
})

server.listen(port, () => {
	console.log(`LPI Server listening at http://localhost:${port}`)
})