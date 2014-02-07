var Dadot = require('../dadot');
var fs = require('fs');

fs.readFile('./news.html', 'utf8', function (err, html) {
    if (err) {
        return console.log(err);
    }
    Dadot.extract({
        html: html,
        done: function(html) {
            console.log(html);
        }
    });
});
