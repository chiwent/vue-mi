
function rem() {
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
}


/*
window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();
*/

/*
const baseSize = 32
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
*/

export {rem};