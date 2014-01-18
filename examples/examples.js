var Dadot = require('../dadot');

Dadot.extract({
    //UTF-8
    url: 'http://hani.co.kr/arti/society/society_general/619920.html?_fr=mt1',
//    url: 'http://www.segye.com/content/html/2014/01/15/20140115001672.html',
    //EUC-KR
//    url: 'http://www.kookje.co.kr/news2011/asp/newsbody.asp?code=0200&key=20140116.99002172001',
//    url: 'http://news.chosun.com/site/data/html_dir/2014/01/17/2014011702686.html?news_top',
    charset: 'utf-8',
    done: function(html) {
        console.log(html);
    }
});
