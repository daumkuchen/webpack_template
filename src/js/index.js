import 'js/_header';

import routes from 'js/app/routes/routes';
import BaseControllerManager from "js/app/routes/BaseControllerManager";



/**
 * @type {ViewController}
 */
let viewController = new BaseControllerManager( routes ).getController( document.body.getAttribute( 'id' ) );

window.addEventListener( 'DOMContentLoaded', function() {
    viewController.viewWillLoad();
}, false );

window.addEventListener( 'load', function() {
    viewController.viewDidLoad();

    if ( viewController.resizeTrigger ) {
        viewController.resize();
    }

    setTimeout( () => {
        viewController.viewWillAppear();
    }, 400 );

    setTimeout( () => {
        viewController.viewDidAppear();
    }, 1000 );

}, false );

window.addEventListener( 'resize', function() {
    viewController.resize();
}, false );

window.addEventListener( 'scroll', function() {
    viewController.scroll( window.pageYOffset || document.documentElement.scrollTop );
}, false );