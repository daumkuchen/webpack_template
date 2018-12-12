import Notification from "./utility/Notification";
import UserAgent from "./utility/UserAgent";


if ( process.env.NODE_ENV === 'development' ) {
    setTimeout(console.log.bind(console,'%cTHIS SOURCE IS DEVELOPMENT MODE.','color: #fff;background-color: #9dbc04;border:6px solid #9dbc04;'));
    // console.log('%cTHIS SOURCE IS DEVELOPMENT MODE.','color: #F8BBD0;background-color: #E91E63;border:6px solid #E91E63;')
} else {
    setTimeout(console.log.bind(console,'%cCreated By https://baqemono.jp','color: #fff;background-color: rgb(76, 76, 76);border:6px solid rgb(76, 76, 76);'));
    // setTimeout(console.log.bind(console,'%cBUILT AT ' + new Date( process.env.TIME_STAMP ) ,'color: #B3E5FC;background-color: #008e3c;border:6px solid #008e3c;'));
    // console.log('%cBUILT AT ' + new Date( process.env.TIME_STAMP ) ,'color: #B3E5FC;background-color: #03A9F4;border:6px solid #03A9F4;')
}

require( './utility/BuildIn' );

window.ua = new UserAgent();

window.MOBILE = ua.mobile;
window.TABLET = ua.tablet;
window.OTHER = !MOBILE && !TABLET;
window.uaName = ua.getBrowser();
window.IE = uaName.match( /ie/ );


if(IE){
    $('body').on("mousewheel", function () {
        event.preventDefault();
        var wd = event.wheelDelta;
        var csp = window.pageYOffset;
        window.scrollTo(0, csp - wd);
    });

    $('html').addClass('is-ie');
}


window.pageInitialized = false;

window.notification = new Notification();

window.WHEEL_RATIO = 'firefox' === ua.getBrowser() ? 100 : 1;
