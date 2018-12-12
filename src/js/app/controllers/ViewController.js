import UIHeader from 'js/modules/UIHeader';
import HoverManager from 'js/modules/HoverManager';

export default class ViewController {
    constructor(content) {

        this.SWITCH_WIDTH = 768;
        this.windowInnerHeight = window.innerHeight;
        this.windowInnerWidth = window.innerWidth;

    }

    viewWillLoad() {

        // this.uIHeader = new UIHeader();
        // this.uIHeader.run();

        // this.hover = new HoverManager();
        // if(this.windowInnerWidth > this.SWITCH_WIDTH) {
        //     this.hover.run();
        // }

    }

    viewDidLoad() {}

    viewWillAppear() {}

    viewDidAppear() {}

    viewWillDisappear() {}

    viewDidDisappear() {}

    resize() {

        this.windowInnerHeight = window.innerHeight;
        this.windowInnerWidth = window.innerWidth;

    }

    scroll(st) {

        // this.uIHeader.scroll(st);

    }

}