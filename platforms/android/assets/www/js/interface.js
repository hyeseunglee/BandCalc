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
        var engUrl = "영문";
        var korUrl = "국문";

        panelWord = panelWord + "- 정의 : VESA(Video Electronics Standards Association)에 의해 제정된 디지털 디스플레이 인터페이스 표준<br>"
        panelWord = panelWord + "- 용도 : 비디오 소스를 컴퓨터 모니터와 같은 디스플레이 장치에 전송<br>"
        panelWord = panelWord + "- 버전 : 1.2까지 승인되었음(2009.12.22)/ 1.3 Phase I 검토 중<br>"
        panelWord = panelWord + "- Spec<br>"
        panelWord = panelWord + " > DP v1.2<br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 5.4Gbps <br>"
        panelWord = panelWord + " > DP v1.3 Phase I<br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 6.75Gbps (27Gbps=4Lanes)<br>"
        panelWord = panelWord + " > DP v1.3 Phase II<br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 8.1Gbps (32.4Gbps=4Lanes)<br>"
        panelWord = panelWord + "<br>";
        panelWord = panelWord + engUrl.link("http://en.wikipedia.org/wiki/DisplayPort");
        panelWord = panelWord + " / ";
        panelWord = panelWord + korUrl.link("http://ko.wikipedia.org/wiki/%EB%94%94%EC%8A%A4%ED%94%8C%EB%A0%88%EC%9D%B4%ED%8F%AC%ED%8A%B8");

        $("#page_view2 .panel-body").html(panelWord);
    },

    funcInformHSLVDS: function () {
        var panelWord = "<b>HS-LVDS(HighSpeed Low Voltage Differential Signaling)</b><br>";
        var engUrl = "영문(LVDS)";
        var korUrl = "국문(낮은 전압 차분 신호)";

        panelWord = panelWord + "- 정의 : 저렴한 연선 구리 케이블에 고속으로 동작이 가능한 전기적 신호 시스템 <br>"
        panelWord = panelWord + "- 용도 : 1990년대 중반 이후에 컴퓨터 버스로 사용되거나 많은 양의 데이터 전송에 적용되었음 <br>"
        panelWord = panelWord + "- 버전 : LVDS/HS-LVDS<br>"
        panelWord = panelWord + "- Spec<br>"
        panelWord = panelWord + " > LVDS<br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : bps <br>"
        panelWord = panelWord + " > HS-LVDS<br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : bps <br>"
        panelWord = panelWord + "<br>";
        panelWord = panelWord + engUrl.link("http://en.wikipedia.org/wiki/Low-voltage_differential_signaling");
        panelWord = panelWord + " / ";
        panelWord = panelWord + korUrl.link("http://ko.wikipedia.org/wiki/%EB%82%AE%EC%9D%80_%EC%A0%84%EC%95%95_%EC%B0%A8%EB%B6%84_%EC%8B%A0%ED%98%B8");

        $("#page_view2 .panel-body").html(panelWord);
    },

    funcInformVbyOne: function () {
        var panelWord = "<b>Vx1 HS</b><br>";
        var engUrl = "영문";
        var korUrl = "국문";

        panelWord = panelWord + "- 정의 : 전기신호를 전송하는 인터페이스의 하나, THine Electronics사에 의해 개발 <br>"
        panelWord = panelWord + "- 용도 : 디지털 평판TV향으로 개발되었으나 복합기 등의 사무기기, 차량용 인포테인먼트 시스템, 로보트, 시큐리티등 폭 넓은 분야에 적용되고 있음 <br>"
        panelWord = panelWord + "- 버전 : 1.4까지 승인되었음 <br>"
        panelWord = panelWord + "- Spec<br>"
        panelWord = panelWord + " > Vx1 HS 1.4 <br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 3.75Gbps <br>"
        panelWord = panelWord + " > LGE Vx1 HS <br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 2.97Gbps <br>"
        panelWord = panelWord + "<br>";
        panelWord = panelWord + engUrl.link("http://en.wikipedia.org/wiki/V-by-One_HS");
        panelWord = panelWord + " / ";
        panelWord = panelWord + korUrl.link("http://ko.wikipedia.org/wiki/V-by-One_HS");

        $("#page_view2 .panel-body").html(panelWord);
    },

    funcInformHDMI: function () {
        var panelWord = "<b>HDMI(High Definition Multimedia Interface)</b><br>";
        var engUrl = "영문";
        var korUrl = "국문";

        panelWord = panelWord + "- 정의 : 비압축 방식의 디지털 비디오/오디오 인터페이스 규격의 하나 <br>"
        panelWord = panelWord + "- 용도 : HDMI를 지원하는 셋탑박스, DVD 재생기 등의 멀티미디어 소스에서 AV기기, 모니터, 디지털 텔레비전 등의 장치들 사이의 인터페이스를 제공 <br>"
        panelWord = panelWord + "- 버전 : 2.0까지 승인되었음(~4K@60) <br>"
        panelWord = panelWord + "- Spec<br>"
        panelWord = panelWord + " > HDMI v1.4 <br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 3.4Gbps (10.2Gbps=3Lane) <br>"
        panelWord = panelWord + " > HDMI v2.0 <br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 6Gbps (18Gbps=3Lane) <br>"
        panelWord = panelWord + "<br>";
        panelWord = panelWord + engUrl.link("http://en.wikipedia.org/wiki/HDMI");
        panelWord = panelWord + " / ";
        panelWord = panelWord + korUrl.link("http://ko.wikipedia.org/wiki/%EA%B3%A0%EC%84%A0%EB%AA%85_%EB%A9%80%ED%8B%B0%EB%AF%B8%EB%94%94%EC%96%B4_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4");

        $("#page_view2 .panel-body").html(panelWord);
    },

    funcInformEPI: function () {
        var panelWord = "<b>EPI(Embedded Point-to-point Interface)</b><br>";
        var engUrl = "영문";
        var korUrl = "국문";

        panelWord = panelWord + "- 정의 : Clock이 내장되어 있고 Data가 Point-to-Point로 전송되는 인터페이스 규격의 하나 <br>"
        panelWord = panelWord + "- 용도 : Panel과 TV Set 사이의 고속 데이터 전송에 사용됨 <br>"
        panelWord = panelWord + "- 버전 : EPI/EPI High-speed <br>"
        panelWord = panelWord + "- Spec<br>"
        panelWord = panelWord + " > EPI <br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 1.56Gbps <br>"
        panelWord = panelWord + " > EPI(High-Speed) <br>"
        panelWord = panelWord + "&nbsp&nbsp Data rate per lane : 3.05Gbps <br>"
        panelWord = panelWord + "<br>";
        panelWord = panelWord + engUrl.link("http://www.epi-standard.org/");
        panelWord = panelWord + " / ";
        panelWord = panelWord + korUrl.link("");

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

