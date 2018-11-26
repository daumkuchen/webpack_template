import Utility from './../utils/Utility';
import { TweenMax, TweenLite } from 'gsap';

export default class UIHeader {
    constructor() {

        this.saveScrollTop = 0;
        
    }

    run() {

        this.saveScrollTop = $(window).scrollTop();

        this.scroll();

    }
    
    scroll(st) {
        
    }

    _set(st) {

        $('#wrapper').css({
            'position': 'fixed',
            'width': '100%',
            'height': $(window).outerHeight(),
            'overflow': 'hidden',
        }).scrollTop(st);

        setTimeout(() => {
            $(window).scrollTop(0);
        }, 600);

    }

    _clear() {

        $('#wrapper').css({
            'position': '',
            'width': '',
            'height': '',
            'overflow': '',
        }).scrollTop(0);
        $(window).scrollTop(this.saveScrollTop);

    }
    
    _open() {

    }

    _close() {

    }

}