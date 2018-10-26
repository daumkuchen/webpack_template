import CustomEase from 'js/vendors/CustomEase.min';

export default class Utility {

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
     *
     * @param urls {[]}
     * @return {Promise}
     */
    static getLoadedImagePromise( urls ) {
        /**
         *
         * @type {[Promise]}
         */
        let sheetsLoadedPromise = [];

        urls.forEach( function( sheet, index ) {
            sheetsLoadedPromise.push( new Promise( function( resolve, reject ) {
                let img = new Image();

                img.onload = function() {
                    resolve( [ sheet, img, index ] );
                };
                img.onerror = function() {
                    reject( [ sheet, img, index ] );
                };

                img.src = sheet;
            } ) );
        } );

        return Promise.all( sheetsLoadedPromise )
    }
}