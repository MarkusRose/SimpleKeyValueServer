var express = require('express');
var router = express.Router();

let keyValueStore = []

const responseBody = (responseValues) => ({d: {results: responseValues}})


/* GET full key value store */
router.get('/', function (req, res, next) {
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
        let output = [...keyValueStore.filter((entry) => entry.key === filter).map(entry => ({
            ...entry,
            value: Buffer.from(entry.value).toString('base64')
        }))];
        res.send(responseBody(output));
    } else {
        res.send(responseBody(keyValueStore.map(entry => ({
            ...entry,
            value: Buffer.from(entry.value).toString('base64')
        }))));
    }
});

router.get('/plain', (req, res, next) => res.send(responseBody(keyValueStore.map(entry => ({
    ...entry,
    value: JSON.parse(entry.value)
})))));

/* POST new values to key-value-store */
router.post('/', function (req, res, next) {
    const entryIndex = keyValueStore.findIndex((item) => item.key === req.body.key);
    if (entryIndex > -1) {
        keyValueStore[entryIndex] = {
            ...req.body,
            timestamp: new Date().toISOString(),
            value: Buffer.from(req.body.value, 'base64').toString()
        };
    } else {
        keyValueStore.push({
            ...req.body,
            timestamp: new Date().toISOString(),
            value: Buffer.from(req.body.value, 'base64').toString()
        });
    }
    keyValueStore = [...keyValueStore];

    res.send()
})

module.exports = router;
