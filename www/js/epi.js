var gListHstring = new Array("2200 [Actv:1920, 2K]", "3000 [Actv:2560, 2.5K]", "4400 [Actv:3840, 4K]" );
var gListHactive = new Array("1920", "2560", "3840" );
var gListHblank = new Array("280", "440", "560" );

var gListVstring = new Array("1125 [Blank:45, 2K]", "1100 [Blank:20, 2.5K]", "2250 [Blank:90, 4K]" );
var gListVactive = new Array("1080", "1080", "2160" );
var gListVblank = new Array("45", "20", "90" );

var gListVsync = new Array("30 Hz", "60 Hz", "120 Hz" );
var gListColor = new Array("8 Bit", "10 Bit");
var gListSDICCh = new Array("720ch", "960ch");
var gListVersion = new Array("v1.54G", "v2.1G", "v3.05G");

var gHashItems = new Array();
var gDefaultValue = new Array(2, 2, 2, 1, 1, 1);     //VSync, Color Depth, SDIC Channel, Version

var gHtotal;
var gVtotal;
var gVsync;
var gColorDepth;
var gSDICCh;
var gVersion;


Number.prototype.format = function () {
    if (this == 0) return 0;
    
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};
 
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};
 
String.prototype.byteLength = function() {
    var l= 0;
     
    for(var idx=0; idx < this.length; idx++) {
        var c = escape(this.charAt(idx));
         
        if( c.length==1 ) l ++;
        else if( c.indexOf("%u")!=-1 ) l += 2;
        else if( c.indexOf("%")!=-1 ) l += c.length/3;
    }
     
    return l;
};


var appB = {

    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        appB.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        //alert('Ready');
        appB.funcMakeHash();
        appB.funcMakeList();
        appB.funcSetDefault();
        appB.funcPostInit();
    },


    funcMakeHash: function () {

        var str = "";

        for (var i = 0, len = gListHstring.length; i < len; i++) {
            str = gListHstring[i].split(" ")[0];
            gHashItems[str] = i;
        }

        for (var i = 0, len = gListVstring.length; i < len; i++) {
            str = gListVstring[i].split(" ")[0];
            gHashItems[str] = i;
        }

        for (var i = 0; i < 3; i++) {
            gHashItems[gListVsync[i]] = i;
            gHashItems[gListVersion[i]] = i;
        }

        for (var i = 0; i < 2; i++){
            gHashItems[gListSDICCh[i]] = i;
            gHashItems[gListColor[i]] = i;
        }
    },


    funcMakeList: function () {

        for (var i = 0, len = gListHstring.length; i < len; i++) {
            if (!gListHstring[i])
                continue;


            if (gListHstring[i] != "-")
                $("#page_view1 ul").append('<li><a href="#">' + gListHstring[i] + '</a></li>');
            //else
            //$( "#page_view1 ul" ).append('<li class="divider"></li>');
        }

        for (var i = 0, len = gListVstring.length; i < len; i++) {
            if (!gListVstring[i])
                continue;

            if (gListVstring[i] != "-")
                $("#page_view2 ul").append('<li><a href="#">' + gListVstring[i] + '</a></li>');
            //else
            //$( "#page_view2 ul" ).append('<li class="divider"></li>');
        }

        for (var i = 0, len = gListVsync.length; i < len; i++) {
            if (!gListVsync[i])
                continue;

            if (gListVsync[i] != "-")
                $("#page_view3 ul").append('<li><a href="#">' + gListVsync[i] + '</a></li>');
            //else
            //$( "#page_view3 ul" ).append('<li class="divider"></li>');

            $("#page_view3 label:eq(" + i + ")").append('<input type="radio" name="options-3">').append(gListVsync[i]);
            $("#page_view3 input:eq(" + i + ")").attr('value', gListVsync[i]);
        }

        for (var i = 0; i < 2; i++) {
            $("#page_view4 ul").append('<li><a href="#">' + gListColor[i] + '</a></li>');
            $("#page_view4 label:eq(" + i + ")").append('<input type="radio" name="options-4">').append(gListColor[i]);
            $("#page_view4 input:eq(" + i + ")").attr('value', gListColor[i]);

            $("#page_view5 ul").append('<li><a href="#">' + gListSDICCh[i] + '</a></li>');
            $("#page_view5 label:eq(" + i + ")").append('<input type="radio" name="options-5">').append(gListSDICCh[i]);
            $("#page_view5 input:eq(" + i + ")").attr('value', gListSDICCh[i]);
        }

        for (var i = 0; i < 3; i++) {
            $("#page_view6 ul").append('<li><a href="#">' + gListVersion[i] + '</a></li>');
            $("#page_view6 label:eq(" + i + ")").append('<input type="radio" name="options-6">').append(gListVersion[i]);
            $("#page_view6 input:eq(" + i + ")").attr('value', gListVersion[i]);
        }
    },


    funcSetDefault: function () {
        $("#page_view1 input").val(gListHstring[gDefaultValue[0]].split(" ")[0]);
        $("#page_view2 input").val(gListVstring[gDefaultValue[1]].split(" ")[0]);
        eval('$( "#page_view3 label:eq(' + gDefaultValue[2] + ')" ).toggleClass("active")');
        eval('$( "#page_view4 label:eq(' + gDefaultValue[3] + ')" ).toggleClass("active")');
        eval('$( "#page_view5 label:eq(' + gDefaultValue[4] + ')" ).toggleClass("active")');
        eval('$( "#page_view6 label:eq(' + gDefaultValue[5] + ')" ).toggleClass("active")');

        $("#page_view3 input:radio[name=options-3][value='" + gListVsync[gDefaultValue[2]] + "']").attr("checked", true);
        $("#page_view4 input:radio[name=options-4][value='" + gListColor[gDefaultValue[3]] + "']").attr("checked", true);
        $("#page_view5 input:radio[name=options-5][value='" + gListSDICCh[gDefaultValue[4]] + "']").attr("checked", true);
        $("#page_view6 input:radio[name=options-6][value='" + gListVersion[gDefaultValue[5]] + "']").attr("checked", true);

        gHtotal = $("#page_view1 input").val();
        gVtotal = $("#page_view2 input").val();
        gVsync = eval('$( "#page_view3 label:eq(' + gDefaultValue[2] + ')" ).text().split(" ")[0]');
        gColorDepth = eval('$( "#page_view4 label:eq(' + gDefaultValue[3] + ')" ).text().split(" ")[0]');
        gSDICCh = 1;
        gVersion = 1;
    },


    funcPostInit: function () {

        $("#page_view1 li a").click(function () {
            var str = $(this).text().split(' ')[0];
            $("#page_view1 input").val(str);
            $("#page_view2 input").val(gListVstring[gHashItems[str]].split(" ")[0]);
        });

        $("#page_view2 li a").click(function () {
            var str = $(this).text().split(' ')[0];
            $("#page_view2 input").val(str);
        });

        $("#page_view3 li a").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-3][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-3][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view3 label" ).removeClass("active")');
            eval('$( "#page_view3 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });

        $("#page_view3 label").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-3][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-3][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view3 label" ).removeClass("active")');
            eval('$( "#page_view3 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });


        $("#page_view4 li a").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-4][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-4][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view4 label" ).removeClass("active")');
            eval('$( "#page_view4 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });


        $("#page_view4 label").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-4][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-4][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view4 label" ).removeClass("active")');
            eval('$( "#page_view4 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });


        $("#page_view5 li a").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-5][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-5][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view5 label" ).removeClass("active")');
            eval('$( "#page_view5 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });


        $("#page_view5 label").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-5][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-5][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view5 label" ).removeClass("active")');
            eval('$( "#page_view5 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });

        $("#page_view6 li a").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-6][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-6][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view6 label" ).removeClass("active")');
            eval('$( "#page_view6 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });


        $("#page_view6 label").click(function () {
            var str = $(this).text();
            $("input:radio[name=options-6][value='" + str + "']").attr("checked", true);
            $("input:radio[name=options-6][value!='" + str + "']").attr("checked", false);
            eval('$( "#page_view6 label" ).removeClass("active")');
            eval('$( "#page_view6 label:eq(' + gHashItems[str] + ')" ).addClass("active")');
        });
    },


    funcCalculateIt: function () {

        var panelWord = "";

        gHtotal = $("#page_view1 input").val();
        if (!gHtotal) {
            alert('H Total을 입력해주세요!');
            $("#page_view1 input").focus();
            return;
        }

        gVtotal = $("#page_view2 input").val();
        if (!gVtotal) {
            alert('V Total을 입력해주세요!');
            $("#page_view2 input").focus();
            return;
        }

        gVsync = $("#page_view3 input:radio[name=options-3][checked]").val().split(" ")[0];

        var gPacketSize;
        gColorDepth = $("#page_view4 input:radio[name=options-4][checked]").val().split(" ")[0];
        if (gColorDepth == 8) {
            gPacketSize = 28;   // (8bit x 3) + 2(front) + 2(end)
        }
        else {
            gPacketSize = 34;   // (10bit x 3) + 2(front) + 2(end) + 2(front)
        }

        var inputStr5 = $("#page_view5 input:radio[name=options-5][checked]").val();
        if (inputStr5 == "720ch") {
            gSDICCh = 16;
        }
        else {
            gSDICCh = 12;
        }

        var inputStr6 = $("#page_view6 input:radio[name=options-6][checked]").val();
        if (inputStr6 == "v1.54G") {
            gVersion = 1540000000;
        }
        else if (inputStr6 == "v2.1G") {
            gVersion = 2100000000;
        }
        else {
            gVersion = 3050000000;
        }

        //PixelFreq/////////////////////////////////////////////////////////////////////////////////////////////////
        var pixelFreq = gHtotal * gVtotal * gVsync;

        var pixelFreqType;
        if (pixelFreq >= 1000 && pixelFreq < 1000000) pixelFreqType = (pixelFreq / 1000.0) + 'K';
        if (pixelFreq >= 1000000 && pixelFreq < 1000000000) pixelFreqType = (pixelFreq / 1000000.0) + 'M';
        if (pixelFreq >= 1000000000 && pixelFreq < 1000000000000) pixelFreqType = (pixelFreq / 1000000000.0) + 'G';

        panelWord = panelWord + "<b>Pixel Color(Pixel Freq)</b><br>" + pixelFreqType + "Hz <br><br>";
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //VideoRate/////////////////////////////////////////////////////////////////////////////////////////////////
        var tVideoRate = pixelFreq * gPacketSize;

        var tVideoRateType;
        if (tVideoRate >= 1000 && tVideoRate < 1000000) tVideoRateType = (tVideoRate / 1000.0) + 'K';
        if (tVideoRate >= 1000000 && tVideoRate < 1000000000) tVideoRateType = (tVideoRate / 1000000.0) + 'M';
        if (tVideoRate >= 1000000000 && tVideoRate < 1000000000000) tVideoRateType = (tVideoRate / 1000000000.0) + 'G';

        panelWord = panelWord + "<b>Total video data rate</b><br>" + tVideoRateType + "bps<br><br>";
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //BitRate///////////////////////////////////////////////////////////////////////////////////////////////////
        var tBitRate = tVideoRate / (gSDICCh * 2);

        var tBitRateType;
        if (tBitRate >= 1000 && tBitRate < 1000000) tBitRateType = (tBitRate / 1000.0) + 'K';
        if (tBitRate >= 1000000 && tBitRate < 1000000000) tBitRateType = (tBitRate / 1000000.0) + 'M';
        if (tBitRate >= 1000000000 && tBitRate < 1000000000000) tBitRateType = (tBitRate / 1000000000.0) + 'G';

        panelWord = panelWord + "<b>Total bit rate required</b><br>" + tBitRateType.fontcolor("red") + "bps<br><br>"
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var gVersionType;
        if (gVersion >= 1000 && gVersion < 1000000) gVersionType = (gVersion / 1000.0) + 'K';
        if (gVersion >= 1000000 && gVersion < 1000000000) gVersionType = (gVersion / 1000000.0) + 'M';
        if (gVersion >= 1000000000 && gVersion < 1000000000000) gVersionType = (gVersion / 1000000000.0) + 'G';

        panelWord = panelWord + "Bandwidth per lane : " + tBitRateType.fontcolor("red") + "bps / Spec : " + gVersionType.fontcolor("red") + "bps<br><br>";

        if (tBitRate <= gVersion)
        {
            panelWord = panelWord + "<u>This version of EPI can send this video format!</u><br><br>";
            var laneCalc = tVideoRate / gVersion;
            panelWord = panelWord + "<b>Lane Calculation</b><br>" + laneCalc.format() + " lane<br><br>"

            var laneReq = Math.ceil(tVideoRate / gVersion);
            //panelWord = panelWord + "<b>Required # of lane in calculation</b><br>" + laneReq.format() + "Lane<br><br>"

            var laneReal = ((laneReq % 2) ? laneReq + 1 : laneReq);
            //panelWord = panelWord + "<b>Required # of lane in real</b><br>" + laneReal.format() + "Lane<br><br>"

            panelWord = panelWord + "<b><u>Required # of lane in real</u></b><br>" + laneReal.format().fontcolor("red") + "Lane / " + (gSDICCh*2) + "Lane <br><br>"
        }
        else
        {
            panelWord = panelWord + "<u>This version of EPI can not send this video format!!</u><br><br>";
        }

        $("#page_view8 .panel-body").html(panelWord);
    }

};

function onSaveToLocalStorage(key, value)
{
    if (typeof(localStorage) == 'undefined' ) 
    {
        alert('HTML5 Local Storage를 지원하지 않네요...');
    } else 
    {
        try 
        {
            localStorage.setItem(key, value);
        } catch (e) 
        {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('할당량 초과!'); 
                onExitSelect();
            }
        }
    }
}

function onExitSelect()
{
    navigator.notification.confirm('종료하시겠습니까?', onExitSelectMsg, '종료', '취소, 종료');
}

function onExitSelectMsg(button)
{
    if(button == 2)
    {
        navigator.app.exitApp();
        onSaveToLocalStorage("QTGATE_FIRST_RUN", "yes");        
    }
}

