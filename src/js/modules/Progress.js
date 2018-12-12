export default class Progress {
    /**
     *
     * @param options {{duration: number, delay: number, onUpdate: (function(*)), onComplete: (function())}}
     */
    constructor( options ) {

        let __default = {
            duration: 1.0,
            delay: 0.5,
            onUpdate : percent => {},
            onComplete : () => {},
        };

        /**
         *
         * @type {{duration: number, delay: number, onUpdate: (function(*)), onComplete: (function())}}
         * @private
         */
        // this.options = Object.assign( __default, options );
        this.options = $.extend( __default, options );

        this.total = 0;

        this._tween = null;

        this._current = 0;
        this._percent = 0;

    }

    update() {
        if ( this._tween ) this._tween.kill();

        this._current++;

        this._tween = TweenLite.to( this, this.options.duration, {
            delay: this.options.delay,
            _percent: Math.min( this._current / this.total * 100, 100 ),
            onUpdate: () => {
                this.options.onUpdate( this._percent );
            },
            onComplete: () => {
                this.options.onComplete();
            }
        } );
    }

}
