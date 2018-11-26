export default class HoverManager {
    constructor() {
        this.target = document.querySelectorAll( '.js-hover' );
        this.options = [];
    }

    /**
     *
     */
    run() {
        this._setFlag( this.target );

        /**
         *
         * @param e
         * @private
         */
        this._eventEnter = e => {
            e.preventDefault();
            this._hoverOverEvent( e.currentTarget );
        };
        
        /**
         *
         * @param e
         */
        this._eventLeave = e => {
            e.preventDefault();
            this._hoverOutEvent( e.currentTarget );
        };

        for ( let i = this.target.length; i--; ) {
            this.target[ i ].addEventListener( 'mouseenter', this._eventEnter, false );
            this.target[ i ].addEventListener( 'mouseleave', this._eventLeave, false );
        }
    }

    /**
     *
     * @param $target
     * @private
     */
    _setFlag( $target ) {
        let length = $target.length;

        for ( let i = length; i--; ) {
            let target = $target[ i ],
                data = target.dataset,
                step = Number( data[ 'hoverStep' ] ) || 1;

            this.options[ i ] = {
                step: step,
                isHovering: false,
                isAnimating: false
            };

            target.setAttribute( 'data-hover-num', i );
        }
    }

    /**
     *
     * @param $this
     * @private
     */
    _hoverOverEvent( $this ) {
        let num = Number( $this.dataset['hoverNum'] );

        this.options[ num ].isHovering = true;

        if ( !this.options[ num ].isAnimating ) {
            this._startHoverOver( $this, num );
        }
    }

    /**
     *
     * @param $this
     * @private
     */
    _hoverOutEvent( $this ) {
        let num = Number( $this.dataset[ 'hoverNum' ] );

        this.options[ num ].isHovering = false;

        if ( !this.options[ num ].isAnimating ) {
            this._startHoverOut( $this, num );
        }
    }

    /**
     *
     * @param $this
     * @param num
     * @private
     */
    _startHoverOver( $this, num ) {
        let time = Number( $this.dataset['hoverInTime'] );

        this.options[ num ].isAnimating = true;

        if ( this.options[ num ].step === 2 ) {
            let wait = 20;

            $this.classList.add( 'is-before-hover' );

            setTimeout( () => {
                $this.classList.add( 'is-hover' );
                $this.classList.remove( 'is-before-hover' );
            }, wait );

            setTimeout( () => {
                this._completeHoverOver( $this, num );
            }, wait + time )

        } else {
            $this.classList.add( 'is-hover' );

            setTimeout( () => {
                this._completeHoverOver( $this, num );
            }, time )

        }

    }

    /**
     *
     * @param $this
     * @param num
     * @private
     */
    _startHoverOut( $this, num ) {
        let time = Number( $this.dataset[ 'hoverOutTime' ] );

        this.options[ num ].isAnimating = true;

        $this.classList.remove( 'is-hover' );

        setTimeout( () => {
            this._completeHoverOut( $this, num );
        }, time )

    }

    /**
     *
     * @param $this
     * @param num
     * @private
     */
    _completeHoverOver( $this, num ) {
        this.options[ num ].isAnimating = false;

        if ( !this.options[ num ].isHovering ) {
            this._startHoverOut( $this, num );
        }
    }

    /**
     *
     * @param $this
     * @param num
     * @private
     */
    _completeHoverOut( $this, num ) {
        this.options[ num ].isAnimating = false;

        if ( this.options[ num ].isHovering ) {
            this._startHoverOver( $this, num );
        }
    }

    /**
     *
     */
    destroy() {
        for ( let i = this.target.length; i--; ) {
            this._startHoverOut(this.target[i], i);
            this.target[ i ].removeEventListener( 'mouseenter', this._eventEnter );
            this.target[ i ].removeEventListener( 'mouseleave', this._eventLeave );
        }
    }

}