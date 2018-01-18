/**
 * @file rem计算屏幕宽度
 * 
 */

function fixAutoResetRem() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 12 + 'px';
    setTimeout(function () {
        const oDiv = document.createElement('div');
        oDiv.style.width = '100%';
        document.body.appendChild(oDiv);
        const bDiv = document.createElement('div');
        bDiv.style.width = '12rem';
        document.body.appendChild(bDiv);

        const rfs = document.documentElement.clientWidth / 12;
        document.documentElement.style.fontSize = oDiv.clientWidth / bDiv.clientWidth * rfs + 'px';
        document.body.removeChild(oDiv);
        document.body.removeChild(bDiv);
    }, 0);
}

fixAutoResetRem();

window.addEventListener('resize', fixAutoResetRem);

