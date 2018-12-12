export default class Notification {
    constructor() {
        this.deferreds = {};
        this.keys = [];
    }

    /**
     *
     * @param key {string}
     */
    add( key ) {
        if ( this.checkKey( key ) ) {
            throw 'already has key';
        } else {
            this.deferreds[ key ] = $.Deferred();
            this.keys.push( key );
        }

    }

    /**
     *
     * @param key {string}
     */
    remove( key ) {
        if ( this.checkKey( key ) ) {
            delete this.deferreds[ key ];
            this.keys.shift( key );
        } else {
            // throw 'not key';
        }
    }

    /**
     *
     * @param key {string}
     */
    get( key ) {
        if ( this.checkKey( key ) ) {
            return this.deferreds[ key ].promise();
        } else {
            return null;
        }
    }

    /**
     *
     * @param key {string}
     * @param value
     * @returns {*|Promise.<T>}
     */
    resolve( key, value ) {
        if ( this.checkKey( key ) ) {
            return this.deferreds[ key ].resolve( value );
        } else {
            return null;
        }
    }

    /**
     *
     * @param key
     * @returns {boolean}
     */
    checkKey( key ) {
        return key in this.deferreds;
    }
}