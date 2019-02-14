import * as dat from 'dat.gui';

export default class Dat {
    constructor() {

        /**
         *
         * @type {Dat}
         */
        this.dat = null;

    }

    setup() {

        this.dat = new dat.GUI();

    }

}