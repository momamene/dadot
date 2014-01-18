var jsdom = require('jsdom'),
    request = require('request'),
    _ = require('underscore'),
    Iconv = require('iconv').Iconv,
    euckr2utf8 = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');

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
            url: options.url,
            scripts: ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'],
            done: function (err, window) {
                console.log(window.document.documentElement.innerHTML
                            .replace(/<!--(.|\s)*?-->/gi,"")
                            .replace(/\r?\n|\r/gi,"") // remove enter key (carrage returen)
                            .replace(/\t/gi,"")
                            .replace(/&nbsp;/," ")
                            .replace(/<style[\w\W]+<\/style>/gi,"") // remove <style>
                            .replace(/<script[\w\W]+<\/script>/gi,"") // remove <script>
                            .replace(/<[^\>]+>/gi," ")); // remove other tag
                options.done(getArticle(window));
            }
        };
        if (options.charset.toUpperCase() === 'EUC-KR') {
            jsdom_env = _.extend(jsdom_env, {
                encoding: 'binary',
                done: function(err, window) {
                    var text = window.document.documentElement.innerHTML;
                    var buf = new Buffer(text.length);
                    buf.write(text, 0, text.length, 'binary');
                    window.document.documentElement.innerHTML = euckr2utf8.convert(buf).toString();
                    options.done(getArticle(window));
                }
            });
        }
        jsdom.env(jsdom_env);
    }
}
