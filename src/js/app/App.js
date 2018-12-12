import BaseApp from "./base/BaseApp";
import ControllerManager from "./ControllerManager";

export default class App extends BaseApp {
    constructor( FxRouter, VcRouter, useAjax ) {
        super( FxRouter, VcRouter, useAjax );
        this.controllerManager = new ControllerManager( VcRouter, FxRouter, useAjax );
    }

}