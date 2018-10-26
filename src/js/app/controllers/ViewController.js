export default class ViewController {
    constructor() {

        /**
         *
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * @public
     */
    viewWillLoad() {}

    /**
     * @public
     */
    viewDidLoad() {
        this.stage = new window.Stage();
        this.stage.setup();
        this.stage.render();
    }

    /**
     * @public
     */
    viewWillAppear() {}

    /**
     * @public
     */
    viewDidAppear() {}

    /**
     * @public
     */
    resize() {}

    /**
     *
     * @param st {number}
     * @public
     */
    scroll(st) {
        this.stage.scroll(st);
    }
}