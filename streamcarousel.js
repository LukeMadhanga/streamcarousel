(
/**
 * The StreamCarousel closure
 * @param {object(jQuery)} $ The jQuery object
 * @param {object(Window)} w The window object
 * @param {int} c Count of this particular carousel
 */
function ($,w,c){
    /**
     * The stream carousel object
     * @syntax $(selector).streamCarousel({...})
     * @param {objetc(plain)} o Options for this object
     * @returns {object(jQuery).fn.streamCarousel} The jQuery object for the selected ul, allowing for chainability
     */
    $.fn.streamCarousel = function (o) {
        var t = $(this),
        T = this,
        tp = t.parent();
        if (t.length > 1) {
            t.each(function () {
                // Apply this function to all of the elements that the selector matches
                $(this).streamCarousel(o);
            });
            return this;
        }
        T.c = c;
        var e = 0,
        li = t.find('li'),
        s = $.extend({
            auto: !0, 
            controls: !0,
            descriptions: !0, 
            pause: 5000,
            prefix: 'streamcarousel', 
            random: !1, 
            transitionSpeed: 750
        }, o),
        // Shorcuts to access jQuery methods that are used a lot
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
            if(li.length===1){
                $('.scl,.scr', tp).css({display:'none'});
            }
        }
        T.n = function() {
            // Go to next
            e = s.random ? m.floor(m.random()*(li[le]-(0+1))+0) : (e + 1 === li[le] ? 0 : e+1);
            T.tog();
        };
        T.p = function() {
            // Go to previous
            e = s.random ? m.floor(m.random()*(li[le]-(0+1))+0) : (e - 1 < 0 ? li[le]-1 : e-1);
            T.tog();
            T.ri();
        };
        T.tog=function(){
            // Toggle the image that is in view and change the description text
            $('.scCur', tp)[rc]('scCur')[ac]('scOld');
            li.eq(e)[rc]('scOld')[ac]('scCur');
            if (s.descriptions) {
                T.sd(e);
            }
        };
        T.ri=function(){
            // Reset the interval
            if (!pa && s.auto) {
                w.clearInterval(w[si+T.c]);
                w[si+T.c] = w.setInterval(T.n, s.pause);
            }
        };
        T.sd = function(e) {
            // Set the description text
            var im = li.eq(e).find('img');
            $('.scdtitle', tp).html(im[d]('title'));
            $('.scdtext', tp).html(im[d]('description'));
        };
        T.sd(e);
        if (s.auto) {
            // If we are automatic, start the changing
            w[si+T.c] = w.setInterval(T.n, s.pause);
        }
        // When the left arrow is clicked, go to the previous image (looping)
        $(mes+' .scl').unbind(cl)[cl](function () {T.p();});
        $(mes+' .scpa').unbind(cl)[cl](function () {
            // What to do when the pause/play button is clicked
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
        // When the right arrow is clicked, go to the next image (looping)
        $(mes+' .scr').unbind(cl)[cl](function () {T.n();T.ri();});
        c++;
        return T;
    };

})(jQuery, this, 0);
