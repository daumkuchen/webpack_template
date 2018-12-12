import Progress from "./Progress";


export default class PreLoader {

    /**
     *
     * @param options {{duration: number, delay: number, limit: null, update: (function(*)), complete: (function())}}
     */
    constructor( options ) {
        /**
         *
         * @type {{duration: number, delay: number, limit: null, update: (function(*)), complete: (function())}}
         * @private
         */
        let __default = {
            duration: 1.0,
            delay: 0.5,
            limit: null,
            update: p => {},
            complete: () => {}
        };

        /**
         *
         * @type {{duration: number, delay: number, limit: null, update: (function(*)), complete: (function())}}
         */
        // this.options = Object.assign( __default, options );
        this.options = $.extend( __default, options );

        this.progress = new Progress( {
            duration: this.options.duration,
            delay: this.options.delay,
            onUpdate: this.options.update,
            onComplete: this.options.complete,
        } );
    }


    run( $content ) {
        let $img = $content.find( 'img,.pre-load-targer' ),
            len = $img.length,
            dfds = [];

        if ( len === 0 ) {
            let dfd = $.Deferred();
            dfds.push( dfd.resolve() );
            return $.when.apply( null, dfds );
        }

        this.progress.total = this.options.limit || len;

        $img.each( ( index, elem ) => {
            let src = $( elem ).attr( 'data-pre-load' ) || $( elem ).attr( 'src' ),
                dfd = $.Deferred();

            if ( !src || (null !== this.options.limit && this.options.limit - 1 === index) ) return;

            let img = new Image();

            dfds.push( dfd );

            img.onload = () => {
                dfd.resolve();
                this.progress.update();
            };

            img.onerror = () => {
                dfd.resolve();
                this.progress.update();
            };

            img.src = src;
        } );

        return $.when.apply( null, dfds );
    }
}