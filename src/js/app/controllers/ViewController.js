import UIHeader from 'js/modules/UIHeader';
import HoverManager from 'js/modules/HoverManager';

export default class ViewController {
    constructor() {

        this.SWITCH_WIDTH = 768;
        this.windowInnerHeight = window.innerHeight;
        this.windowInnerWidth = window.innerWidth;

    }

    /**
     * @public
     */
    beforeLoad() {

    }

    /**
     * @public
     */
    viewWillLoad() {

        // this.uIHeader = new UIHeader();
        // this.uIHeader.run();

        // this.hover = new HoverManager();
        // if(this.windowInnerWidth > this.SWITCH_WIDTH) {
        //     this.hover.run();
        // }

    }

    /**
     * @public
     */
    viewDidLoad() {}

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
    resize() {

        this.windowInnerHeight = window.innerHeight;
        this.windowInnerWidth = window.innerWidth;

    }

    /**
     *
     * @param st {number}
     * @public
     */
    scroll(st) {

        // this.uIHeader.scroll(st);

    }

}