var express = require('express');
var router = express.Router();

let keyValueStore = []

const responseBody = (responseValues) => ({ d: { results: responseValues}})


/* GET full key value store */
router.get('/', function(req, res, next) {
    console.log(req.query);
    if (Object.keys(req.query).length > 0) {
        const reqKeyString = req.query['$filter']
        const qInit = "key eq '";
        const qTerminator = "'";
        const indexStart = reqKeyString.indexOf(qInit) + qInit.length;
        if (indexStart < qInit.length) {
            console.log("Value not found: ", reqKeyString);
            res.send(responseBody([]))
            return
        }
        const indexEnd = reqKeyString.lastIndexOf(qTerminator);
        const filter = reqKeyString.substring(indexStart, indexEnd);
        let output = [ ...keyValueStore.filter((entry) => entry.key === filter)];
        console.log("Found key: ", filter, responseBody(output));
        res.send(responseBody(output));
    } else {
        console.log("Full Store Content: ", responseBody(keyValueStore));
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
