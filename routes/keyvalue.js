var express = require('express');
var router = express.Router();

let keyValueStore = []

const responseBody = (responseValues) => ({ d: { results: responseValues}})


/* GET full key value store */
router.get('/', function(req, res, next) {
    console.log(req.query);
    if (Object.keys(req.query).length > 0) {
        let output = [ ...keyValueStore.filter((entry) => entry.key === req.query.filter)];
        console.log(responseBody(output));
        res.send(responseBody(output));
    } else {
        console.log(responseBody(keyValueStore));
        res.send(responseBody(keyValueStore));
    }
});

/* POST new values to key-value-store */
router.post('/', function(req, res, next) {
    console.log("Posting: ", req.body);
    const entryIndex = keyValueStore.findIndex((item) => item.key === req.body.key);
    if ( entryIndex > -1 ) {
        keyValueStore[entryIndex] = { ...req.body, timestamp: new Date().toISOString() };
    } else {
        keyValueStore.push({ ...req.body, timestamp: new Date().toISOString() });
    }
    keyValueStore = [...keyValueStore];

    res.send()
})

module.exports = router;
