import ViewController from "./ViewController";

export default class TopViewController extends ViewController {
    constructor() {

        super();

        this.stage = null;

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

        super.viewWillLoad();

    }

    /**
     * @override
     */
    viewDidLoad() {

        super.viewDidLoad();

    }

    /**
     * @override
     */
    viewWillAppear() {

        super.viewWillAppear();

    }

    /**
     * @override
     */
    viewDidAppear() {

        super.viewDidAppear();

        this.stage = new window.Stage();
        this.stage.setup();
        this.stage.render();

    }

    /**
     * @override
     */
    resize() {

        super.resize();
        
    }

    /**
     * @override
     */
    scroll(st) {

        super.scroll(st);

    }

}