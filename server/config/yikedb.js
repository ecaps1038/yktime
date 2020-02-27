var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/yksg');
db.on('error', console.error.bind(console, '... connect error ...'));
db.once('open', function callback() {
    console.info("... db open yisg...");
});
module.exports = db;