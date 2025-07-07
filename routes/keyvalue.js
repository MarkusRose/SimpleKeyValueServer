var express = require('express');
var router = express.Router();
const {Database} = require('sqlite3').verbose();

const database = new Database('pace-cache.db');
database.run(`
    CREATE TABLE IF NOT EXISTS kv
    (
        key TEXT PRIMARY KEY,
        gid TEXT,
        value TEXT
    ) STRICT
`);

const responseBody = (responseValues) => ({d: {results: responseValues}})

/* GET full key value store */
router.get('/mock-kv-store', function (req, res, next) {
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
        const key = reqKeyString.substring(indexStart, indexEnd);
        const query = database.prepare('SELECT * FROM kv WHERE key = ?');
        query.get(key, (err, row) => {

            if (err) res.status(500).send(new Error(err));

            if (row) {
                console.log('row', row)
                res.send(responseBody([{
                    key: row.key,
                    gid: row.gid,
                    value: Buffer.from(row.value).toString('base64')
                }]));
            } else
                res.send(responseBody([]));
        });
        query.finalize()
    } else {
        database.all('SELECT * FROM kv OrDER BY key', (err, rows) => {
            if (err) res.status(500).send(new Error(err));
            else if (rows) {
                const allEntries = rows.map((row) => (
                    {
                        key: row.key,
                        gid: row.gid,
                        value: Buffer.from(row.value).toString('base64')
                    }
                ))
                res.send(responseBody(allEntries));
            } else {
                res.send(responseBody([]));
            }
            res.end()

        });
    }
});

/* POST new values to key-value-store */
router.post('/mock-kv-store', function (request, res, next) {
    console.log("Posting: ", request.body.key);
    const insert = database.prepare('INSERT OR REPLACE INTO kv (key, gid, value) VALUES (?, ?, ?)');
    insert.run(request.body.key, request.body.gid, Buffer.from(request.body.value, 'base64').toString('utf8'));
    insert.finalize()
    res.end();
})

module.exports = router;
