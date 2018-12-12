import Schedule from 'js/utility/Schedule.js';
import Utility from "js/utility/Utility";

export default class Default {

    run( prev, next, $newContent, params, controllerManager, nextTask ) {
        return function() {
            let self = this,
                $b = $( 'body' ),
                $prev = $( '#' + prev, $b ),
                $next = $newContent.find( '#' + next ),
                to = ( prev !== 'top' && next === 'top' ) || ( prev === 'top' && next === 'top' ) ? 'index' : 'sub',
                dl = null,

                // add this project
                src = '<div id="page-transition-cover"></div>';

            const schedule = new Schedule();
            const PROCESS_TIME = 10;
            const TRANSITION_1ST_TIME  = 900;
            const TRANSITION_LAST_TIME = 900;
            const TRANSITION_LAST_WAIT_TIME = 450;

            schedule.add( resolve => {
                Utility.noScroll();
                $( '#wrap' ).append( src );
                Schedule.wait( 50 ).then( resolve );
            } );


            schedule.add( resolve => {
                $b.removeClass( 'is-page-transition-last' ).addClass( 'is-page-transition-first' );
                Schedule.wait( TRANSITION_1ST_TIME ).then( resolve );
            } );


            schedule.add( resolve => {
                $( '#wrap' ).css( {
                    'position': 'fixed',
                    'width': '100%',
                    'height': '100%',
                    'top': 0,
                    'left': 0,
                    'overflow': 'hidden'
                } ).scrollTop(0);

                $b.addClass( 'is-page-transition-middle' );
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( resolve => {
                $prev.remove();
                $( '#contents' ).append( $next );
                $( 'body' ).removeClass( 'index sub' ).addClass( to );

                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( resolve => {
                if ( $prev.length ) {
                    controllerManager.add( next, $next );
                    controllerManager.use( 'prev' ).viewDidDisappear();
                    controllerManager.pop();
                    setTimeout( () => {
                        TweenLite.to( $( 'body,html' ), 0.1, {
                            scrollTop: 0
                        } );
                    }, 100 );
                }

                Schedule.wait( PROCESS_TIME ).then( resolve );
            });


            schedule.add( resolve => {
                controllerManager.use( 'current' ).viewWillAppear();

                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );


            schedule.add( resolve => {
                $b.addClass( 'is-page-transition-last' );

                let ratioTime = 0;

                if(MOBILE || TABLET) {
                    ratioTime = 300;
                }



                setTimeout(()=>{
                    $b.addClass( 'is-page-transition-last-02' );
                },TRANSITION_LAST_WAIT_TIME + ratioTime);

                Schedule.wait( TRANSITION_LAST_TIME + ratioTime ).then( resolve );

            } );

            schedule.add( resolve => {
                $( '#page-transition-cover' ).remove();

                if($('.page-content').attr('id') !== 'top'){

                    $( '#wrap' ).css( {
                        'position': '',
                        'width': '',
                        'height': '',
                        'top': '',
                        'left': '',
                        'overflow': ''
                    } );
                }

                $b.removeClass( 'is-page-transition-first is-page-transition-middle' )
                // .addClass( 'is-page-opened' );

                setTimeout(()=>{
                    $b.removeClass( 'is-page-transition-last-02' );
                    $( '.waypoint-container,.waypoint' ).removeClass('is-active');
                    Schedule.wait( PROCESS_TIME ).then( resolve );
                },TRANSITION_LAST_WAIT_TIME);

            } );

            schedule.done( () => {

                Utility.returnScroll();
                nextTask( dl );
            } );
        }
    }

}