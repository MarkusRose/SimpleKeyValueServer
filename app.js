var express = require('express');
var cors = require('cors');

var keyvalueRouter = require('./routes/keyvalue');

const PORT = 3000;

var app = express();

// Force browser to load the repeated requests again. Not using cache.
app.disable('etag');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/', keyvalueRouter);
app.use('/keyvalue', keyvalueRouter)

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(PORT, () => {
  console.log(`Express Concurrency Server running on port ${PORT}.`)
});
