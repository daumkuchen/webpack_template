import page from 'page';

import Schedule from 'js/utility/Schedule';

import BaseControllerManager from "./BaseControllerManager";

export default class BaseApp {
    constructor( FxRouter, VcRouter, useAjax ) {

        /**
         *
         * @type {BaseControllerManager}
         * @public
         */
        this.controllerManager = new BaseControllerManager( VcRouter );

        /**
         *
         * @type {boolean}
         * @public
         */
        this.useAjax = useAjax;

        /**
         *
         * @type {boolean}
         * @public
         */
        this.debug = true;

        /**
         *
         * @type {Array}
         * @private
         */
        this._requests = [];

        /**
         *
         * @type {null}
         * @private
         */
        this._prev = null;

        /**
         * @type {Object}
         * @private
         */
        this._fx = FxRouter;

        /**
         *
         * @type {boolean}
         */
        this.pageInitialized = false;

        /**
         *
         * @type {boolean}
         */
        this.hashChange = false;

        /**
         *
         */
        this.sendAnalytics = path => {};
    }

    /**
     * @public
     */
    boot() {
        if ( this.useAjax ) {
            page.exit( '*', ( prevCtx, next ) => {
                this._pageExit( prevCtx, next );
            } );
            page( '*', ctx => {
                $('body').addClass('is-click-disable');
                this._pageEnter( ctx );
            } );
            page();
        } else {
            this._safeBoot();
        }
    }

    /**
     *
     * @private
     */
    _safeBoot() {
        let schedule = new Schedule();
        schedule.add( this._fx[ 'none --> none' ]( null, null, null, null, this.controllerManager ) );
        schedule.done( () => {
            this.controllerManager.use( 'current' ).viewDidAppear();
        } );
    }

    /**
     *
     * @param prev
     * @param next
     * @param $newContent
     * @param params
     * @returns {*}
     * @private
     */
    _apply( prev, next, $newContent, params ) {
        let dfd = $.Deferred(),
            bfx = prev + ' --> *',
            fx = prev + ' --> ' + next,
            nfx = '* --> ' + next,
            all = '* --> *',
            q = new Schedule(),
            self = this;

        $.each( [ fx, bfx, nfx, all ], function( _, value ) {
            if ( value in self._fx ) {
                if ( self.debug ) {
                    console.log( '%c' + value, 'color: #03A9F4;' );
                    console.group( '%cViewController', 'color: #00C853;' );
                }
                q.add( resolve => {
                    self._fx[ value ]( prev, next, $newContent, params, self.controllerManager, resolve )();
                } );
                return false;
            }
        } );

        q.done( data => {
            dfd.resolve( data );
            if ( self.debug ) {

            }
        } );
        return dfd.promise();
    }

    /**
     *
     * @param ctx
     * @private
     */
    _pageEnter( ctx ) {
        if ( ctx.cancel === true ) return;
        if ( this.debug ) {
            console.group( '%c         app         ', 'color: #B3E5FC;background-color: #03A9F4;' );
            console.log( '%cpage enter', 'color: #03A9F4;' );
        }

        if ( ctx.init ) {
            this._apply( 'none', 'none', null, null ).done( () => {
                this.pageInitialized = true;
                this.controllerManager.use( 'current' ).viewDidAppear();
            } );
            return;
        }

        if ( !this.pageInitialized ) return;

        this._addRequestQueue( {
            from : this._prev,
            to : ctx
        } );
        this._pageChange( this );

        // let _ = this;
        // _._processQueue.add( function() {
        //     _._pageChange( this );
        // } );

    }

    /**
     *
     * @param prevCtx
     * @param next
     * @private
     */
    _pageExit( prevCtx, next ) {
        if ( this.hashChange ) return;
        if ( "" !== prevCtx.hash && 0 === prevCtx.hash.length ) return;

        this._prev = prevCtx;

        if ( !this.pageInitialized ) return next();
        if ( prevCtx.cancelExit === true ) return next();

        $( window ).trigger( 'exit.page.bq' );

        this.controllerManager.use( 'current' ).viewWillDisappear();

        if ( this.debug ) {
            console.groupEnd( 'ViewController' );
            console.log( '%cpage exit', 'color: #03A9F4;' );
            console.groupEnd( 'app' );
        }
        next();
    }

    /**
     *
     * @param _
     * @returns {*}
     * @private
     */
    _pageChange( _ ) {
        let params = _._getRequestQueue(),
            dfd = $.Deferred(),
            process = [];

        if ( params === false ) {
            return this.resolve();
        }

        BaseApp._setNavActive( params.to.canonicalPath );

        if ( params.to.fromChildPage || params.to.toChildPage ) {

        } else {
            //process.push(_scrollToTop());
        }

        $( 'body' ).addClass( 'bq-page-changing' );

        process.unshift( $.get( params.to.path ).promise() );
        $.when.apply( $, process ).done( function( res ) {
            let _res = res;
            if ( $.isArray( res ) ) {
                _res = res[ 0 ];
            }

            _._showPage( _res, params ).done( dfd.resolve );
            _._current = params.to;
            // ga('send','pageview', params.to.path);
            _.sendAnalytics( params.to.path );
        } ).fail( function( res ) {
            _._showPage( res.responseText, params ).done( dfd.resolve );
            _._current = params.to;
        } );

        return dfd.done( this.resolve );
    }

    /**
     *
     * @param res
     * @param params
     * @returns {*}
     * @private
     */
    _showPage( res, params ) {
        let dfd = $.Deferred(),
            $newContent = BaseApp._purseHTML( res ),
            title = res.match( /<title>(.*)<\/title>/ ),
            prev_id = $( '.page-content' ).attr( 'id' ),
            next_id = $newContent.find( '.page-content' ).attr( 'id' );

        if ( $newContent.find( 'title' ).text() ) {
            title = $newContent.find( 'title' ).text();
        } else {
            title = $( 'title' ).text();
        }

        this._apply( prev_id, next_id, $newContent, params ).done( () => {
            $( 'body' ).removeClass( 'bq-page-changing' );
            $( 'title' ).text( title );
            $( window ).trigger( 'enter.page.bq' );
            this.controllerManager.use( 'current' ).viewDidAppear();
            dfd.resolve();
        } );

        return dfd.promise();
    }

    /**
     *
     * @returns {*}
     * @private
     */
    _getRequestQueue() {
        let _requests = this._requests;

        if ( _requests.length === 0 ) return false;

        let params = _requests[ _requests.length - 1 ];

        this._requests = [];

        return params;
    }

    /**
     *
     * @param params
     * @private
     */
    _addRequestQueue( params ) {
        this._requests[ this._requests.length ] = params;
    }

    /**
     *
     * @param data
     * @returns {*|jQuery|HTMLElement}
     * @private
     */
    static _purseHTML( data ) {
        let folder = document.createElement( 'div' );
        folder.innerHTML = data;
        return $( folder );
    }

    /**
     *
     * @param path
     * @private
     */
    static _setNavActive( path ) {
        let p = ( ( path !== '' && path.substr( -1 ) === '/' ) ? path : path + '/' ).replace( /^\/([a-zA-Z\-\_]*)\/.*$/, '/$1/' );
        let $context = $( '#g-footer, #g-header, .g-nav, #side-nav' );
        $context.find( '.nav-list, .dot' ).removeClass( 'current' );
        $context.find( 'a[href="' + p + '"]' ).parent().addClass( 'current' );
    }
    
}