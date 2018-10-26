export default class BaseControllerManager {
    constructor( ViewControllers ) {

        /**
         *
         * @type {{}}
         * @private
         */
        this._VC = ViewControllers;

        /**
         *
         * @type {Array}
         * @private
         */
        this._controllers = [];

    }

    /**
     *
     * @param ID
     * @param content
     */
    add( ID = null, content ) {

        if ( typeof ID === 'string' && ID === 'null' ) {
            ID = null;
        }

        this._controllers.unshift( this.getController( ID, content ) );
    }

    pop() {
        this._controllers.pop();
    }

    shift() {
        this._controllers.shift();
    }

    /**
     *
     * @param type
     * @returns {*}
     */
    use( type ) {
        if ( 'prev' === type ) {
            return this._controllers[ 1 ];
        }

        if ( 'current' === type ) {
            return this._controllers[ 0 ];
        }

        return false;
    }

    /**
     *
     * @param ID
     * @param content
     */
    getController( ID = null, content = null ) {

        let controller = null;
        if ( ID !== null && isSet( this._VC[ ID ] ) ) {
            controller = new this._VC[ ID ]( content );
        } else if ( content !== null && isSet( this._VC[ content.attr( 'data-use-controller' ) ] ) ) {
            controller = new this._VC[ content.attr( 'data-use-controller' ) ]( content );
        } else if ( content !== null && isSet( this._VC[ content.attr( 'id' ) ] ) ) {
            controller = new this._VC[ content.attr( 'id' ) ]( content );
        } else {
            controller = new this._VC[ 'default' ]( content );
        }

        return controller;
    }

}