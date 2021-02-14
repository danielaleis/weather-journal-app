// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder, DAL: This line of code connects our server-side code (the code in the server.js file) to our client-side code (the browser code written in the files housed in the website folder).
app.use(express.static('website'));

// Setup server and port
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log("server running yay");
    console.log("running on localhost: " + port);
};

/* Creates a GET route that uses the url /all 
and returns the JavaScript object named projectData (above).
 'localhost:8000/all' will now trigger the GET request*/

 app.get('/all', getData);
function getData(req, res) {
     res.send(projectData);
     console.log("Get funzt!");
 };

 //DAL: TODO - muss hier auch noch eine Post-Route hin? Ja
 // TODO muss das zweite Argument heiße wie das leere JS Objekt?
 app.post('/add', postData)

function postData(req, res)  {
    projectData = req.body;
    res.send({ message: "Post funzt"})
    console.log(req);
}
