var jsdom = require('jsdom'),
    _ = require('underscore');

var getArticle = function(window) {
    var $ = window.jQuery;
    var article_candidate = $('br,p').parent(':contains("다.")');
    var refined_list = _.map(article_candidate, function(el) {
        el = _.clone(el);
        $(el).children().remove();
        var result = "";
        if ($(el).html()) {
            result = $(el).html()
                .replace(/<!--(.|\s)*?-->/gi,"")
                .replace(/\r?\n|\r/gi,"") // remove enter key (carrage returen)
                .replace(/\t/gi,"")
                .replace(/&nbsp;/," ")
                .replace(/<style[\w\W]+<\/style>/gi,"") // remove <style>
                .replace(/<script[\w\W]+<\/script>/gi,"") // remove <script>
                .replace(/<[^\>]+>/gi," "); // remove other tag
        }
        return result;
    });
    return _.max(refined_list, function(refined) {
        return refined.split('다.').length;
    });
}

var Dadot = module.exports = {
    extract: function(options) {
        var jsdom_env = {
            html: options.html,
            scripts: ['lib/jquery.min.js'],
            done: function (err, window) {
                options.done(getArticle(window));
            }
        };
        jsdom.env(jsdom_env);
    }
}
