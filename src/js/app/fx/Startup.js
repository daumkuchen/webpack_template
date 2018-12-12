import Schedule from 'js/utility/Schedule.js';
import Utility from "js/utility/Utility";

export default class Startup {
    run( prev, next, $newContent, params, controllerManager, nextTask ) {
        let _ = this,
            dl = null;

        return function () {
            let self = this,
                schedule = new Schedule(),
                PROCESS_TIME = 10;

            schedule.add( function ( resolve ) {
                $( resolve );
            } );

            schedule.add( function ( resolve ) {
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( function ( resolve ) {
                let $content = $( '.page-content' ),
                    id = $content.attr( 'id' ),
                    currentPage = '';

                $( 'body' ).addClass( id === 'top' ? 'index' : 'sub' );
                controllerManager.add( id, $content );
                Schedule.wait( PROCESS_TIME ).then( resolve );

                // add current
                switch ( id ) {
                    case 'top' :
                        currentPage = '/';
                        break;
                    case 'blog-single':
                        currentPage = '/blog/';
                        break;
                    case 'works-detail':
                        currentPage = '/works/';
                        break;
                    default:
                        currentPage = '/' + id + '/';
                        break;
                }

                $( '.nav-list' ).each( function () {
                    let a = $( this ).find( 'a' );

                    if ( a.attr( 'href' ) === currentPage ) {
                        $( this ).addClass( 'current' );
                    }
                } )


            } );

            schedule.add( function ( resolve ) {
                // controllerManager.use( 'current' ).viewWillLoad();
                // controllerManager.use( 'current' ).viewDidLoad();
                controllerManager.use( 'current' ).viewWillAppear();
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.done( () => {
                nextTask( dl )
            } );
        }
    }
}