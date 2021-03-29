// Call express
const express = require('express');
// Call BodyParser
const bodyParser = require('body-parser');
// Create the app
const app = express();

// Use bodyParser
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// GET method route
app.get('/api', (req, res) => {
    res.status(200).json({});
});


// POST method route
app.post('/expand_validator', (req, res) => {
    const type = req.body.type;
    const validators = req.body.validators;
    const items = req.body.items;
    const properties = req.body.properties;

    console.log(req.body);
             const key = Object.keys(req.body);
             console.log(key);
        // If str is empty then it sends "string null"
        let str = key[0];
        if (str === ''){
            res.send('string null')
        };

        // Removes the "." from the Output
        let arrayClean = str.split(".");

        // Save the last step
        let saveStep = null;


        let flag = false

        // Reverse the direction of content
        // Since it starts from the end it automatically makes the first object a leaf and saves it
        for (let i = arrayClean.length - 1; i >= 0; i--) {
        if (i === arrayClean.length - 1) {
            console.log(JSON.stringify({"type": "leaf", "validators": ["integer"]}));
            saveStep = {
                "type": "leaf",
                "validators": [
                    "integer"
                ]
            };
            continue;
        };

        // Condition : if it's a * then it's an array. If not it's an object
        if (arrayClean[i] === '*') {
            flag = true
            console.log(JSON.stringify({"items": { "type": "object", "validators": ["object"]}}));
        }
        else {


            if (flag){
                console.log(JSON.stringify({"container": {"type": "array", "validators": ["array"]}}))

            } else {
                flag = false
                console.log(JSON.stringify({"type": "object","validators":["object"]}));
            };
            };

        };
});


// Listen in port 3000(http//:localhost:3000)
app.listen(3000);
