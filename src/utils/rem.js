function fnResize() {
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
}
window.onresize = function() {
    console.log('resize')
    fnResize();
}
fnResize();


/*
window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();
*/