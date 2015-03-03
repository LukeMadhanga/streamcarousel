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
        parent = t.parent();
        if (t.length > 1) {
            t.each(function () {
                // Apply this function to all of the elements that the selector matches
                $(this).streamCarousel(options);
            });
            return this;
        }
        T.c = count;
        var curpos = 0,
        li = t.find('li'),
        s = $.extend({
            auto: !0,
            containerMaxHeight: null, 
            containerMaxWidth: null, 
            controls: !0,
            descriptions: !0, 
            pause: 5000,
            random: !1, 
            transitionSpeed: 750
        }, options),
        pa = !1,
        transition = 'opacity ' + s.transitionSpeed + 'ms ease-in-out';
        t.addClass('streamcarousel');
        li.css({'-webkit-transition': transition, '-moz-transition': transition, transition: transition});
        li.addClass('scOld');
        li.eq(curpos).removeClass('scOld').addClass('scCur');
        parent.addClass('scparent').attr({'data-strcarid':T.c}).css({
            'max-width': s.containerMaxWidth, 'max-height': s.containerMaxHeight
        });
        if (s.descriptions){
            parent.append('<div class="scdhold">' + 
                        '<div class="scdesc"><a class="scdtitle"></a><a class="scdtext"></a></div><div class="sccon"><div class="scl"></div>&<div class="scr"></div></div></div>'.replace(/&/g, s.auto?'<div class="scpa"></div>':''));
            if(li.length===1){
                $('.scl,.scr', parent).css({display:'none'});
            }
        }
        
        /**
         * Goto the next image in
         */
        T.gotoNext = function() {
            // Go to next
            curpos = s.random ? Math.floor(Math.random()*(li.length-(0+1))+0) : (curpos + 1 === li.length ? 0 : curpos+1);
            T.toggle();
        };
        
        /**
         * Goto the previous image
         */
        T.gotoPrev = function() {
            // Go to previous
            curpos = s.random ? Math.floor(Math.random()*(li.length-(0+1))+0) : (curpos - 1 < 0 ? li.length-1 : curpos-1);
            T.toggle();
            T.resetInterval();
        };
        
        /**
         * Change the item that is in view
         */
        T.toggle = function(){
            // Toggle the image that is in view and change the description text
            $('.scCur', parent).removeClass('scCur').addClass('scOld');
            li.eq(curpos).removeClass('scOld').addClass('scCur');
            if (s.descriptions) {
                T.setDescription(curpos);
            }
        };
        
        /**
         * Reset the timer interval
         */
        T.resetInterval = function(){
            // Reset the interval
            if (!pa && s.auto) {
                window.clearInterval(window['strcarint'+T.c]);
                window['strcarint'+T.c] = window.setInterval(T.gotoNext, s.pause);
            }
        };
        
        /**
         * Set the description for a given carousel
         * @param {int} pos The position of the current element for which to set the description
         */
        T.setDescription = function(pos) {
            // Set the description text
            var img = li.eq(pos).find('img');
            $('.scdtitle', parent).html(img.data('title'));
            $('.scdtext', parent).html(img.data('description'));
        };
        
        T.setDescription(curpos);
        
        if (s.auto) {
            // If we are automatic, start the changing
            window['strcarint'+T.c] = window.setInterval(T.gotoNext, s.pause);
        }
        // When the left arrow is clicked, go to the previous image (looping)
        $('[data-strcarid="'+T.c+'"] .scl').unbind('click').click(function () {T.gotoPrev();});
        $('[data-strcarid="'+T.c+'"] .scpa').unbind('click').click(function () {
            // What to do when the pause/play button is clicked
            var ti = $(this);
            if(ti.hasClass('scpl')) {
                pa=!1;
                T.resetInterval();
                ti.removeClass('scpl');
            } else {
                pa=!0;
                window.clearInterval(window['strcarint'+T.c]);
                ti.addClass('scpl');
            }
        });
        // When the right arrow is clicked, go to the next image (looping)
        $('[data-strcarid="'+T.c+'"] .scr').unbind('click').click(function () {T.gotoNext();T.resetInterval();});
        count++;
        return T;
    };

})(jQuery, this, 0, Math);