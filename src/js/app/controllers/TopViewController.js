import ViewController from "./ViewController";

export default class TopViewController extends ViewController {
    constructor(content) {

        super(content);

        this.stage = null;

    }

    viewWillLoad() {

        super.viewWillLoad();

    }

    viewDidLoad() {

        super.viewDidLoad();

    }

    viewWillAppear() {

        super.viewWillAppear();

    }

    viewDidAppear() {

        super.viewDidAppear();

        this.stage = new window.Stage();
        this.stage.setup();
        this.stage.render();

    }

    viewWillDisappear() {

        super.viewWillDisappear();

    }

    viewDidDisappear() {

        super.viewDidDisappear();

    }

    resize() {

        super.resize();

    }

    scroll(st) {

        super.scroll();

    }

}