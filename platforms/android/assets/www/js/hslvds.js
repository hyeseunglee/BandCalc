var gListHstring = new Array("2200 [Actv:1920, 2K]", "3000 [Actv:2560, 2.5K]", "4400 [Actv:3840, 4K]", "5600 [Actv:5120, 5K]", "8800 [Actv:7680, 8K]" );
var gListHactive = new Array("1920", "2560", "3840", "5120", "7680" );
var gListHblank = new Array("280", "440", "560", "480", "1120" );

var gListVstring = new Array("1125 [Blank:45, 2K]", "1100 [Blank:20, 2.5K]", "2250 [Blank:90, 4K]", "2235 [Blank:75, 5K]", "4500 [Blank:180, 8K]" );
var gListVactive = new Array("1080", "1080", "2160", "2160", "4320" );
var gListVblank = new Array("45", "20", "90", "75", "180");

var gListVsync = new Array("30 Hz", "60 Hz", "120 Hz" );
var gListColor = new Array("8 Bit", "10 Bit");

var gHashItems = new Array();
var gDefaultValue = new Array(4, 4, 2, 1);     //VSync, Color Depth, Byte Mode

var gHtotal;
var gVtotal;
var gVsync;
var gColorDepth;


Number.prototype.format = function(){
    if(this==0) return 0;
 
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

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        appB.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        //alert('Ready');
        appB.funcMakeHash();
        appB.funcMakeList();
        appB.funcSetDefault();
        appB.funcPostInit();
    },


    funcMakeHash: function() {

        var str="";

        for(var i=0, len=gListHstring.length; i<len; i++) {
            str = gListHstring[i].split(" ")[0];
            gHashItems[str] = i;
        }

        for(var i=0, len=gListVstring.length; i<len; i++) {
            str = gListVstring[i].split(" ")[0];
            gHashItems[str] = i;
        }        

        for(var i=0; i<3; i++)
        {
            gHashItems[gListVsync[i]] = i;
        }

        for(var i=0; i<2; i++)
        {
            gHashItems[gListColor[i]] = i;
        }
    },


    funcMakeList: function() {

        for(var i=0, len=gListHstring.length; i<len; i++) {
            if(!gListHstring[i])
                continue;


            if( gListHstring[i] != "-" )
                $( "#page_view1 ul" ).append('<li><a href="#">' + gListHstring[i] + '</a></li>');
            //else
                //$( "#page_view1 ul" ).append('<li class="divider"></li>');
        }

        for(var i=0, len=gListVstring.length; i<len; i++) {
            if(!gListVstring[i])
                continue;

            if( gListVstring[i] != "-" )
                $( "#page_view2 ul" ).append('<li><a href="#">' + gListVstring[i] + '</a></li>');
            //else
                //$( "#page_view2 ul" ).append('<li class="divider"></li>');
        }

        for(var i=0, len=gListVsync.length; i<len; i++) {
            if(!gListVsync[i])
                continue;

            if( gListVsync[i] != "-" )
                $( "#page_view3 ul" ).append('<li><a href="#">' + gListVsync[i] + '</a></li>');
            //else
                //$( "#page_view3 ul" ).append('<li class="divider"></li>');

            $( "#page_view3 label:eq("+i+")" ).append('<input type="radio" name="options-3">').append(gListVsync[i]);
            $( "#page_view3 input:eq("+i+")" ).attr('value', gListVsync[i]);
        }

        for(var i=0; i<2; i++) {
            $( "#page_view4 ul" ).append('<li><a href="#">' + gListColor[i] + '</a></li>');
            $( "#page_view4 label:eq("+i+")" ).append('<input type="radio" name="options-4">').append(gListColor[i]);
            $( "#page_view4 input:eq("+i+")" ).attr('value', gListColor[i]);
        }

    },


    funcSetDefault: function() {
        $( "#page_view1 input" ).val(gListHstring[gDefaultValue[0]].split(" ")[0]);
        $( "#page_view2 input" ).val(gListVstring[gDefaultValue[1]].split(" ")[0]);
        eval( '$( "#page_view3 label:eq(' + gDefaultValue[2] + ')" ).toggleClass("active")' );  
        eval( '$( "#page_view4 label:eq(' + gDefaultValue[3] + ')" ).toggleClass("active")' );  

        $( "#page_view3 input:radio[name=options-3][value='"+gListVsync[gDefaultValue[2]]+"']" ).attr("checked", true);
        $( "#page_view4 input:radio[name=options-4][value='"+gListColor[gDefaultValue[3]]+"']" ).attr("checked", true);

        gHtotal = $( "#page_view1 input" ).val();
        gVtotal = $( "#page_view2 input" ).val();
        gVsync = eval( '$( "#page_view3 label:eq(' + gDefaultValue[2] + ')" ).text().split(" ")[0]' );
        gColorDepth = eval( '$( "#page_view4 label:eq(' + gDefaultValue[3] + ')" ).text().split(" ")[0]' );
    },


    funcPostInit: function() {

        $("#page_view1 li a").click(function () { 
            var str = $(this).text().split(' ')[0];
            $( "#page_view1 input" ).val(str);
            $( "#page_view2 input" ).val(gListVstring[gHashItems[str]].split(" ")[0]);
        });

        $("#page_view2 li a").click(function () { 
            var str = $(this).text().split(' ')[0];
            $( "#page_view2 input" ).val(str);
        });

        $("#page_view3 li a").click(function () { 
            var str = $(this).text();
            $( "input:radio[name=options-3][value='"+str+"']" ).attr("checked", true);
            $( "input:radio[name=options-3][value!='"+str+"']" ).attr("checked", false);
            eval( '$( "#page_view3 label" ).removeClass("active")' ); 
            eval( '$( "#page_view3 label:eq(' + gHashItems[str] + ')" ).addClass("active")' ); 
        });

        $("#page_view3 label").click(function () { 
            var str = $(this).text();
            $( "input:radio[name=options-3][value='"+str+"']" ).attr("checked", true);
            $( "input:radio[name=options-3][value!='"+str+"']" ).attr("checked", false);
            eval( '$( "#page_view3 label" ).removeClass("active")' ); 
            eval( '$( "#page_view3 label:eq(' + gHashItems[str] + ')" ).addClass("active")' ); 
        });


        $("#page_view4 li a").click(function () { 
            var str = $(this).text();
            $( "input:radio[name=options-4][value='"+str+"']" ).attr("checked", true);
            $( "input:radio[name=options-4][value!='"+str+"']" ).attr("checked", false);
            eval( '$( "#page_view4 label" ).removeClass("active")' ); 
            eval( '$( "#page_view4 label:eq(' + gHashItems[str] + ')" ).addClass("active")' ); 
        });


        $("#page_view4 label").click(function () { 
            var str = $(this).text();
            $( "input:radio[name=options-4][value='"+str+"']" ).attr("checked", true);
            $( "input:radio[name=options-4][value!='"+str+"']" ).attr("checked", false);
            eval( '$( "#page_view4 label" ).removeClass("active")' ); 
            eval( '$( "#page_view4 label:eq(' + gHashItems[str] + ')" ).addClass("active")' ); 
        });
    },


    funcCalculateIt: function() {

        var panelWord = "";

        gHtotal = $( "#page_view1 input" ).val();
        if(!gHtotal)
        {
            alert('H Total을 입력해주세요!');
            $( "#page_view1 input" ).focus();
            return;
        }

        gVtotal = $( "#page_view2 input" ).val();
        if(!gVtotal)
        {
            alert('V Total을 입력해주세요!');
            $( "#page_view2 input" ).focus();
            return;
        }

        gVsync = $( "#page_view3 input:radio[name=options-3][checked]" ).val().split(" ")[0];
        gColorDepth = $( "#page_view4 input:radio[name=options-4][checked]" ).val().split(" ")[0];

        //PixelFreq/////////////////////////////////////////////////////////////////////////////////////////////////
        var pixelFreq = gHtotal * gVtotal * gVsync;

        var pixelFreqType;
        if (pixelFreq >= 1000 && pixelFreq < 1000000) pixelFreqType = (pixelFreq / 1000.0) + 'K';
        if (pixelFreq >= 1000000 && pixelFreq < 1000000000) pixelFreqType = (pixelFreq / 1000000.0) + 'M';
        if (pixelFreq >= 1000000000 && pixelFreq < 1000000000000) pixelFreqType = (pixelFreq / 1000000000.0) + 'G';

        panelWord = panelWord + "<b>Pixel Color(Pixel Freq)</b><br>" + pixelFreqType.fontcolor("Red") + "Hz <br><br>";
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(gColorDepth == 10)
        {
            //VideoRate/////////////////////////////////////////////////////////////////////////////////////////////////
            var tVideoRate = pixelFreq * 7 * 5; // 7bit, RGB 30bit 5ch 

            var tVideoRateType;
            if (tVideoRate >= 1000 && tVideoRate < 1000000) tVideoRateType = (tVideoRate / 1000.0) + 'K';
            if (tVideoRate >= 1000000 && tVideoRate < 1000000000) tVideoRateType = (tVideoRate / 1000000.0) + 'M';
            if (tVideoRate >= 1000000000 && tVideoRate < 1000000000000) tVideoRateType = (tVideoRate / 1000000000.0) + 'G';

            panelWord = panelWord + "<b>Total video data rate(Payload)</b><br>" + tVideoRateType + "bps<br><br>";
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // LVDS //
            var laneCalcLVDS = tVideoRate / (74250000 * 7 * 5);
            panelWord = panelWord + "====[LVDS]====<br>";
            panelWord = panelWord + "<b>Lane Calculation</b><br>" + laneCalcLVDS.format() + "Lane<br><br>"        

            //var laneReqLVDS = Math.ceil(laneCalcLVDS);
            //panelWord = panelWord + "<b>Required # of lane in calculation</b><br>" + laneReq.format() + "Lane<br><br>"

            //var laneRealLVDS = ((laneCalcLVDS%2)?(laneCalcLVDS+1):laneCalcLVDS);
            //panelWord = panelWord + "<b>Required # of lane in real</b><br>" + laneReal.format() + "Lane<br><br>"

            // HS-LVDS //
            var laneCalcHSLVDS = tVideoRate / (74250000 * 7 * 5 * 2);
            panelWord = panelWord + "===[HS-LVDS]===<br>";
            panelWord = panelWord + "<b>Lane Calculation</b><br>" + laneCalcHSLVDS.format() + "Lane<br><br>"        

            //var laneReqHSLVDS = Math.ceil(laneCalcHSLVDS);
            //panelWord = panelWord + "<b>Required # of lane in calculation</b><br>" + laneReq.format() + "Lane<br><br>"

            //var laneRealHSLVDS = ((laneReqHSLVDS%2)?laneReqHSLVDS+1:laneReqHSLVDS);
            //panelWord = panelWord + "<b>Required # of lane in real</b><br>" + laneReal.format() + "Lane<br><br>"
        }
        else
        {
            //VideoRate/////////////////////////////////////////////////////////////////////////////////////////////////
            var tVideoRate = pixelFreq * 7 * 4; // 7bit, RGB 24bit 4ch 

            var tVideoRateType;
            if (tVideoRate >= 1000 && tVideoRate < 1000000) tVideoRateType = (tVideoRate / 1000.0) + 'K';
            if (tVideoRate >= 1000000 && tVideoRate < 1000000000) tVideoRateType = (tVideoRate / 1000000.0) + 'M';
            if (tVideoRate >= 1000000000 && tVideoRate < 1000000000000) tVideoRateType = (tVideoRate / 1000000000.0) + 'G';

            panelWord = panelWord + "<b>Total video data rate(Payload)</b><br>" + tVideoRateType + "bps<br><br>";
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // LVDS //
            var laneCalcLVDS = tVideoRate / (74250000 * 7 * 4);
            panelWord = panelWord + "====[LVDS]====<br>";
            panelWord = panelWord + "<b>Lane Calculation</b><br>" + laneCalcLVDS.format() + "Lane<br><br>"        

            //var laneReqLVDS = Math.ceil(laneCalcLVDS);
            //panelWord = panelWord + "<b>Required # of lane in calculation</b><br>" + laneReq.format() + "Lane<br><br>"

            //var laneRealLVDS = ((laneCalcLVDS%2)?(laneCalcLVDS+1):laneCalcLVDS);
            //panelWord = panelWord + "<b>Required # of lane in real</b><br>" + laneReal.format() + "Lane<br><br>"

            // HS-LVDS //
            var laneCalcHSLVDS = tVideoRate / (74250000 * 7 * 4 * 2);
            panelWord = panelWord + "===[HS-LVDS]===<br>";
            panelWord = panelWord + "<b>Lane Calculation</b><br>" + laneCalcHSLVDS.format() + "Lane<br><br>"        

            //var laneReqHSLVDS = Math.ceil(laneCalcHSLVDS);
            //panelWord = panelWord + "<b>Required # of lane in calculation</b><br>" + laneReq.format() + "Lane<br><br>"

            //var laneRealHSLVDS = ((laneReqHSLVDS%2)?laneReqHSLVDS+1:laneReqHSLVDS);
            //panelWord = panelWord + "<b>Required # of lane in real</b><br>" + laneReal.format() + "Lane<br><br>"    

        }

        $( "#page_view6 .panel-body" ).html(panelWord);
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

