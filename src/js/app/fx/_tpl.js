import Utility from '../../utility/Utility';

export default class _tpl {

    run( prev, next, $newContent, params, controllerManager ) {
        return function() {
            var self = this,
                $b = $( 'body' ),
                $prev = $( '#' + prev, $b ),
                $next = $newContent.find( '#' + next ),
                to = (prev !== 'top' && next === 'top') || (prev === 'top' && next === 'top') ? 'index' : 'sub',
                dl = null;

            const q = $.Queue();
            const PROCESS_TIME = 10;


            q.append( function() {
                Utility.wait( PROCESS_TIME ).done( this.resolve );
            } );

            q.append( function() {
                $prev.remove();
                $( '#contents' ).append( $next );
                $( 'body' ).removeClass( 'index sub' ).addClass( to );
                Utility.wait( PROCESS_TIME ).done( this.resolve );
            } );

            q.append( function() {
                if ( $prev.length ) {
                    controllerManager.add( next, $next );
                    controllerManager.use( 'prev' ).viewDidDisappear();
                    controllerManager.pop();
                }

                Utility.wait( PROCESS_TIME ).done( this.resolve );
            } );

            q.append( function() {
                controllerManager.use( 'current' ).viewWillAppear();
                Utility.wait( PROCESS_TIME ).done( this.resolve );
            } );

            q.append( function() {
                self.resolve( dl );
            } );
        }
    }

}