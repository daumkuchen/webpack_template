import App from "./app/App";
import FxRouter from "./app/routers/FxRouter";
import VcRouter from "./app/routers/VcRouter";
import 'waypoints/lib/jquery.waypoints';
import Utility from "js/utility/Utility";

require( './_header' );


window.APP = new App( FxRouter, VcRouter, true );
APP.debug = process.env.NODE_ENV === 'development';
APP.sendAnalytics = path => {
    gtag('config', 'UA-123055862-1', {'page_path': path});
};

APP.boot();

let initWindowWidth = window.innerWidth;

Utility.noScroll();

window.addEventListener( 'resize', function () {
    if ( initWindowWidth > 768 ) {
        if ( window.innerWidth <= 768 ) {
            location.reload();
        }
    } else {
        if ( window.innerWidth > 768 ) {
            location.reload();
        }
    }

}, false );

window.onload = () => {
    setTimeout( () => {
        $( 'body' ).addClass( 'is-page-opened' );

        setTimeout( () => {
            window.setWayPointsDidAppear();
        }, 0 );

        setTimeout( () => {
            Utility.returnScroll();
            $( 'body' ).removeClass( 'page-fixed' );
        }, 1510 );

        setTimeout( () => {
            window.setWayPoints();
            $( 'body' ).removeClass( 'is-click-disable' );
        }, 600 );

        setTimeout( () => {
            window.pageInitialized = true
            $( '.loading-cover' ).remove();
        }, 1200 );

    }, 1000 );
};

window.setWayPointsDidAppear = function () {
    let $way = $( '.waypoint-did-appear' );

    if ( $way.length ) {
        $way.waypoint( function () {
            $( this.element ).addClass( 'is-action' );
            setTimeout( () => {
                if ( !MOBILE && !TABLET ) {
                    $( this.element ).addClass( 'is-action-end' )
                }
            }, 1510 )
        }, {
            offset: '95%'
        } );
    }
};


/**
 *
 * @private
 */
window.setWayPoints = function () {
    let $container = $( '.waypoint-container' ),
        $way = $( '.waypoint' );

    if ( $container.length ) {
        $container.waypoint( function () {
            $( this.element ).addClass( 'is-action' )
        }, {
            offset: '100%'
        } );
    }

    if ( $way.length ) {
        $way.waypoint( function () {
            $( this.element ).addClass( 'is-action' )
        }, {
            offset: '100%'
        } );
    }
}