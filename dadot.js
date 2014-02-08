var cheerio = require('cheerio'),
    _ = require('underscore');

var Dadot = module.exports = {
    extract: function(html) {
        var $ = cheerio.load(html);
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
}
