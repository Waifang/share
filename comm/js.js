/* global Box */
const ROTATE_BASE_DEG = 1800; // 开始转动时都要先转动8圈
/**
 * 获取当前对象obj转动角度，正数是顺时针旋转，负数为逆时针旋转
 *
 * @param {Object} obj jquery对象
 * @return {number} 角度
 */
function getRotationDegrees(obj) {
    let angle = 0;
    let matrix = obj.css('-webkit-transform');
    if (matrix !== 'none') {
        let values = parseInt(matrix.slice(7, -4), 10);
        angle = values;
    }
    else {
        angle = 0;
    }
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
/**
 * 计算转盘应该转动的角度，当第一次转动时，根据后端传来的结果计算转动角度；转动次数大于1次，一直转到kiss角度
 *
 * @param {number} times 当前页面时点击「立即领取」按钮次数
 * @param {number} winningGift 中奖结果编号（从编号0开始，编号0对应的奖为奖盘未旋转时正上方的奖）
 * @param {number} prizeTypeNum 奖品种类个数（包括kiss这样的奖励）
 * @param {number} defaultResult 默认奖励编号（一般就是kiss奖励的编号）
 * @param {boolean} flag 是否对抽奖次数做限制（true：只有第一次才会中奖；false：多次中奖机会）
 * @param {boolean} giftTable 转盘jq对象
 * @return {number} 角度
 */
function rotateDegrees(times, winningGift, prizeTypeNum, defaultResult, flag, giftTable) {
    let rotateDeg = 0;
    let prizePieceSize = 360 / prizeTypeNum; // 一个奖区所占圆盘角度
    let areaDegStart = 0; // 某一奖区起始角度
    areaDegStart = prizePieceSize * winningGift;
    let currentDeg = getRotationDegrees(giftTable);
    rotateDeg = currentDeg - (currentDeg % 360) + 360 * 6 + areaDegStart;
    return rotateDeg;
}
export default function tableRoate(options) {
    const {
        defaultResult = 2,              // 默认奖项（类似于kiss这样的佛光普照奖）
        prizeTypeNum: typeNum = 6,      // 奖品种类数目
        timesLimit: limit = false,      // 是否限制中奖次数标志，true：只有第一次才会中奖；false：多次中奖机会
        zhuanpan: giftTable,            // 转盘jq对象
        apiUrl,                         // ajax请求url
        clickTimes = 0,
        prizeIdMap,                     // 返回结果的 prizeId 与转盘奖品序号的映射表
        data: ajaxData = null           // 传入数据
    } = options;
    let rotateResult = defaultResult;
    let initDeg = ROTATE_BASE_DEG + getRotationDegrees(giftTable);
    let rotateDegree = 0;
    let ajaxReturn = null;
    $.ajax({ // 向服务器请求中奖结果
        type: 'GET',
        url: apiUrl,
        data: ajaxData,
        dataType: 'json',
        timeout: 1600, // 1600ms后没得到结果则做超时处理
        success(res) {
            ajaxReturn = res;
            if (res.errno === 0 && res.data.iswin === 1) {
                const prizeid = res.data.prize.prizeid;
                rotateResult = prizeIdMap[prizeid];
                rotateDegree = rotateDegrees(clickTimes, rotateResult, typeNum, defaultResult, limit, giftTable);
            }
            else {
                rotateResult = defaultResult;
                rotateDegree = rotateDegrees(clickTimes, rotateResult, typeNum, defaultResult, limit, giftTable);
            }
        },
        error(xhr, errorType, error) { // 超时或者其他请求错误，这设置获奖结果为未中奖
            toast('网络繁忙，请稍后再试');
            rotateResult = defaultResult;
            rotateDegree = rotateDegrees(clickTimes, rotateResult, typeNum, defaultResult, limit, giftTable);
        }
    });
    giftTable.css({
        '-webkit-transition': '-webkit-transform 3s ease-in',
        '-webkit-transform': 'rotate(' + initDeg + 'deg)'
    });
    setTimeout(function () {
        giftTable.css({'-webkit-transform': 'rotate(' + rotateDegree + 'deg)',
                        '-webkit-transition-timing-function': 'cubic-bezier(0.0, 0, 0.55, 1)'});
    }, 3000);
    setTimeout(function () {
        if (options.callback) {
            options.callback(ajaxReturn);
        }
    }, 6500);
}
/**
 * 调起手百 toast
 *
 * @param {string} str 要展示的字符串
 */
function toast(str) {
    // XXX 默认都需要做encode，但是android encode之后不会自动做decode，所以android不做encode
    if (Box.isIOS) {
        Box.ios.invokeApp('utils', {action: 'toast', string: encodeURIComponent(str), minver: '6.0.0.0'}, '');
    }
    else if (Box.isAndroid) {
        Box.android.invokeApp('Bdbox_android_utils', 'toast', [str]);
    }
}
