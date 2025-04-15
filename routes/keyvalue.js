var express = require('express');
var router = express.Router();

let keyValueStore = []

const responseBody = (responseValues) => ({ d: { results: responseValues}})


/* GET full key value store */
router.get('/', function(req, res, next) {
    console.log(req.query);
    if (Object.keys(req.query).length > 0) {
        let output = [ ...keyValueStore.filter((entry) => entry.key === req.query.filter)];
        res.send(output);
    } else {
        res.send(responseBody(keyValueStore));
    }
});

/* POST new values to key-value-store */
router.post('/', function(req, res, next) {
    req.body.forEach((postEntry) => {
        const entryIndex = keyValueStore.findIndex((item) => item.key === postEntry.key);
        if ( entryIndex > -1 ) {
            keyValueStore[entryIndex] = { ...postEntry };
        } else {
            keyValueStore.push({ ...postEntry });
        }
        keyValueStore = [...keyValueStore];
    })
})

module.exports = router;
