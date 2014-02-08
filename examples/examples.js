var Dadot = require('../dadot');
var fs = require('fs');

fs.readFile('./news.html', 'utf8', function (err, html) {
    if (err) {
        return console.log(err);
    }
    console.log(Dadot.extract(html));
});
