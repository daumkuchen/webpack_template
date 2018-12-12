import Color from './Color';
import PreLoader from "../modules/PreLoader";
import CustomEase from "js/vendors/CustomEase.min";

export default class Utility {

    /**
     *
     * @param time {Number}
     * @return {*}
     */
    static wait( time ) {
        let dfd = $.Deferred();
        setTimeout( function() {
            dfd.resolve();
        }, time );
        return dfd.promise();
    }

    /**
     *
     * @param a {Number}
     * @param b {Number}
     * @param c {Number}
     * @param d {Number}
     * @return { * }
     */
    static getCubicCurve( a, b, c, d ) {
        // "M0,0 C"+a+","+b+" "+c+","+d+" 1,1"
        return CustomEase.create( "custom", `M0,0 C${Number( a )},${Number( b )} ${Number( c )},${Number( d )} 1,1` );
    }

    /**
     * @param {String} hexCode
     * @return {Array} RGB
     */
    static hexToRgb( hexCode ) {
        return Color.hexToRgb( hexCode );
    }

    /*
     * @param {Number} R
     * @param {Number} G
     * @param {Number} B
     * @return {String} hexCode
     */
    static rgbToHex( R, G, B ) {
        return Color.rgbToHex( R, G, B );
    }

    /**
     *
     * @param options {{$content: null, duration: number, baseTime: number, onUpdate: (function(*)), onComplete: (function())}}
     * @returns {*}
     */
    static startProgress( options ) {
        /**
         *
         * @type {{$content: null, duration: number, baseTime: number, delay: number, onUpdate: (function(*)), onComplete: (function())}}
         * @private
         */
        let _options = Object.assign( {
                $content: null,
                duration: 1.0,
                baseTime: 1000,
                delay: 0.0,
                onUpdate: p => {},
                onComplete: () => {}
            }, options ),
            p = new PreLoader( {
                duration: _options.duration,
                delay: _options.delay,
                update: p => {
                    _options.onUpdate( p );
                }
            } ),
            dfd = $.Deferred(),
            dfd2 = $.Deferred();

        p.run( _options.$content ).done( () => {
            _options.onComplete();
            dfd.resolve();
        } );

        Utility.wait( _options.baseTime ).done( () => {
            dfd2.resolve();
        } );

        return $.when.apply( null, [ dfd, dfd2 ] );
    }


    /**
     *
     */
    static noScroll(){
        //PC
        let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        $(document).on(scroll_event,function(e){e.preventDefault();});
        //SP
        $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
    }

    /**
     *
     */
    static returnScroll(){
        //PC
        let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        $(document).off(scroll_event);
        //SP
        $(document).off('.noScroll');
    }

}