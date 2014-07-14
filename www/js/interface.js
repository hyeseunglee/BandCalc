var gFlagChked = 0;
var gPageList = new Array('', 'index.html', 'lvds.html', 'vby1.html', 'dp.html');

var app = {

    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", onExitSelect, false);
    },

    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        app.funcFirstRun();
    },

    funcFirstRun: function () {
        var flagFirst = localStorage.getItem("BANDCALC_FIRST_RUN");
        var flagItem = localStorage.getItem("BANDCALC_MYSET");

        if (flagFirst != null) {
            if (flagFirst == "yes") {
                if (flagItem != null) {
                    onSaveToLocalStorage("BANDCALC_FIRST_RUN", "no");
                    location.replace(gPageList[flagItem]);
                }
                else {
                    onSaveToLocalStorage("BANDCALC_FIRST_RUN", "no");
                    onSaveToLocalStorage("BANDCALC_MYSET", "1");
                    location.replace("index.html");
                }
            }
        }
        else {
            onSaveToLocalStorage("BANDCALC_FIRST_RUN", "no");
            onSaveToLocalStorage("BANDCALC_MYSET", "1");
            //location.replace("index.html");  
        }
    },

    funcInformDP: function () {
        var panelWord = "<b>DP(DisplayPort)</b><br>";

        panelWord = panelWord + "-정의 :  VESA(Video Electronics Standards Association)에 의해 제정된 디지털 디스플레이 인터페이스 표준<br>"
        panelWord = panelWord + "-용도 :  비디오 소스를 컴퓨터 모니터와 같은 디스플레이 장치에 전송<br>"
        panelWord = panelWord + "-버전 :  1.2까지 승인되었음(2009.12.22)<br>"
        panelWord = panelWord + "<t></t><br>"

        $("#page_view2 .panel-body").html(panelWord);
    },

    funcInformHSLVDS: function () {
        var panelWord = "<b>HS-LVDS</b>";

        $("#page_view2 .panel-body").html(panelWord);
    },

    funcInformVbyOne: function () {
        var panelWord = "<b>Vx1</b>";

        $("#page_view2 .panel-body").html(panelWord);
    },

    funcInformHDMI: function () {
        var panelWord = "<b>HDMI</b>";

        $("#page_view2 .panel-body").html(panelWord);
    },
};


function onSaveToLocalStorage(key, value) {
    if (typeof (localStorage) == 'undefined') {
        alert('HTML5 Local Storage를 지원하지 않네요...');
    } else {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('할당량 초과!');
                onExitSelect();
            }
        }
    }
}

function onExitSelect() {
    navigator.notification.confirm('종료하시겠습니까?', onExitSelectMsg, '종료', '취소, 종료');
}

function onExitSelectMsg(button) {
    if (button == 2) {
        navigator.app.exitApp();
        onSaveToLocalStorage("BANDCALC_FIRST_RUN", "yes");
    }
}

