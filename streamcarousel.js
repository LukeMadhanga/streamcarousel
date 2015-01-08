(
/**
 * The StreamCarousel closure
 * @param {object(jQuery)} $ The jQuery object
 * @param {object(Window)} window The window object
 * @param {int} count Count of this particular carousel
 * @param {object(Math)} Math Reference to the Math object
 */
function ($, window, count, Math){
    /**
     * The stream carousel object
     * @syntax $(selector).streamCarousel({...})
     * @param {objetc(plain)} options Options for this object
     * @returns {object(jQuery).fn.streamCarousel} The jQuery object for the selected ul, allowing for chainability
     */
    $.fn.streamCarousel = function (options) {
        var t = $(this),
        T = this,
        tp = t.parent();
        if (t.length > 1) {
            t.each(function () {
                // Apply this function to all of the elements that the selector matches
                $(this).streamCarousel(options);
            });
            return this;
        }
        T.c = count;
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
        }, options),
        // Shorcuts to access jQuery methods that are used a lot
        pa = !1,
        transition = 'opacity ' + s.transitionSpeed + 'ms ease-in-out';
        t.addClass('streamcarousel');
        li.css({'-webkit-transition': transition, '-moz-transition': transition, transition: transition});
        li.addClass('scOld');
        li.eq(e).removeClass('scOld').addClass('scCur');
        tp.addClass('scparent').attr({'data-strcarid':T.c});
        if (s.descriptions){
            tp.append('<div class="scdhold">' + 
                        '<div class="scdesc"><a class="scdtitle"></a><a class="scdtext"></a></div><div class="sccon"><div class="scl"></div>&<div class="scr"></div></div></div>'.replace(/&/g, s.auto?'<div class="scpa"></div>':''));
            if(li.length===1){
                $('.scl,.scr', tp).css({display:'none'});
            }
        }
        T.n = function() {
            // Go to next
            e = s.random ? Math.floor(Math.random()*(li.length-(0+1))+0) : (e + 1 === li.length ? 0 : e+1);
            T.tog();
        };
        T.p = function() {
            // Go to previous
            e = s.random ? Math.floor(Math.random()*(li.length-(0+1))+0) : (e - 1 < 0 ? li.length-1 : e-1);
            T.tog();
            T.ri();
        };
        T.tog=function(){
            // Toggle the image that is in view and change the description text
            $('.scCur', tp).removeClass('scCur').addClass('scOld');
            li.eq(e).removeClass('scOld').addClass('scCur');
            if (s.descriptions) {
                T.sd(e);
            }
        };
        T.ri=function(){
            // Reset the interval
            if (!pa && s.auto) {
                window.clearInterval(window['strcarint'+T.c]);
                window['strcarint'+T.c] = window.setInterval(T.n, s.pause);
            }
        };
        T.sd = function(e) {
            // Set the description text
            var im = li.eq(e).find('img');
            $('.scdtitle', tp).html(im.data('title'));
            $('.scdtext', tp).html(im.data('description'));
        };
        T.sd(e);
        if (s.auto) {
            // If we are automatic, start the changing
            window['strcarint'+T.c] = window.setInterval(T.n, s.pause);
        }
        // When the left arrow is clicked, go to the previous image (looping)
        $('[data-strcarid="'+T.c+'"] .scl').unbind('click').click(function () {T.p();});
        $('[data-strcarid="'+T.c+'"] .scpa').unbind('click').click(function () {
            // What to do when the pause/play button is clicked
            var ti = $(this);
            if(ti.hasClass('scpl')) {
                pa=!1;
                T.ri();
                ti.removeClass('scpl');
            } else {
                pa=!0;
                window.clearInterval(window['strcarint'+T.c]);
                ti.addClass('scpl');
            }
        });
        // When the right arrow is clicked, go to the next image (looping)
        $('[data-strcarid="'+T.c+'"] .scr').unbind('click').click(function () {T.n();T.ri();});
        count++;
        return T;
    };

})(jQuery, this, 0, Math);