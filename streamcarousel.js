(function ($,w,c){
    $.fn.streamCarousel = function (o) {
        var t = $(this),
        T = this,
        tp = t.parent();
        if (t.length > 1) {
            t.each(function () {
                $(this).streamCarousel(o);
            });
            return this;
        }
        T.c = c;
        var ef = function(){}, 
        e = 0,
        li = t.find('li'),
        s = $.extend({
            after: ef, 
            auto: !0, 
            before: ef, 
            controls: !0,
            descriptions: !0, 
            on: ef, 
            pause: 5000,
            prefix: 'streamcarousel', 
            random: !1, 
            transitionSpeed: 750
        }, o),
        rc = 'removeClass',
        ac = 'addClass',
        r = 'replace',
        cl = 'click',
        le = 'length',
        si = 'strcarint',
        d = 'data',
        m = Math,
        mes = '[data-strcarid="'+T.c+'"]',
        pa = !1,
        tr = 'opacity ' + s.transitionSpeed + 'ms ease-in-out';
        t[ac]('streamcarousel');
        li.css({'-webkit-transition': tr, '-moz-transition': tr, transition: tr});
        li[ac]('scOld');
        li.eq(e)[rc]('scOld')[ac]('scCur');
        tp[ac]('scparent').attr({'data-strcarid':T.c});
        if (s.descriptions){
            tp.append('<£ %"scdhold"><£ %"scdesc"><a %"scdtitle"></a><a %"scdtext"></a></£><£ %"sccon"><£ %"scl"></£>&<£ %"scr"></£></£></£>'[r](/&/g, s.auto?'<£ %"scpa"></£>':'')[r](/£/g,'div')[r](/%/g,'class='));
        }
        T.n = function() {
            e = s.random ? m.floor(m.random()*(li[le]-(0+1))+0) : (e + 1 === li[le] ? 0 : e+1);
            T.tog();
        };
        T.p = function() {
            e = s.random ? m.floor(m.random()*(li[le]-(0+1))+0) : (e - 1 < 0 ? li[le]-1 : e-1);
            T.tog();
            T.ri();
        };
        T.tog=function(){
            $('.scCur', tp)[rc]('scCur')[ac]('scOld');
            li.eq(e)[rc]('scOld')[ac]('scCur');
            if (s.descriptions) {
                T.sd(e);
            }
        };
        T.ri=function(){
            if (!pa && s.auto) {
                w.clearInterval(w[si+T.c]);
                w[si+T.c] = w.setInterval(T.n, s.pause);
            }
        };
        T.sd = function(e) {
            var im = li.eq(e).find('img');
            $('.scdtitle', tp).html(im[d]('title'));
            $('.scdtext', tp).html(im[d]('description'));
        };
        if (s.auto) {
            w[si+T.c] = w.setInterval(T.n, s.pause);
        }
        $(mes+' .scl').unbind(cl)[cl](function () {T.p();});
        $(mes+' .scpa').unbind(cl)[cl](function () {
            var ti = $(this);
            if(ti.hasClass('scpl')) {
                pa=!1;
                T.ri();
                ti[rc]('scpl');
            } else {
                pa=!0;
                w.clearInterval(w[si+T.c]);
                ti[ac]('scpl');
            }
        });
        $(mes+' .scr').unbind(cl)[cl](function () {T.n();T.ri();});
        c++;
        return T;
    };

})(jQuery, this, 0);
