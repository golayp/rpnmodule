//clock
var rpnclockmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var clock;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            random: true,
            hour:'10:10'
        });
        datas = _datas;
        if(datas.random){
            datas.hour=Math.floor((Math.random() * 24) + 1)+':'+Math.floor(Math.random() * 59);
        }
        
        domelem = _domelem;
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('clock');

        //build panel with sentences
        domelem.append($('<div id="rpnclock"></div>'));
        clock=EduClock();
        clock.init({},$('#rpnclock'));

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            var time=clock.getCurrentTime()
            rpnsequence.handleEndOfModule(time.hour+':'+time.minute, function(res, sol) {
                return res == sol ? 1 : 0;
            });
        });
    };

    return {
        init: init
    };
};

var EduClock = function() {

    var domelem;
    var opts;
    var sunCanvas;
    var dialCanvas;
    var handCanvas;
    var changeState=false;
    var size;
    var ctxSun;
    var ctxDial;
    var ctxHands;
    var radius;
    var handradius;
    var currentHours;
    var currentMinutes;
    var actuallyMoving;
    var angleHour;
    var angleMinutes;
    var PM;
    
    var init = function(_opts,_domelem){
        _.defaults(_opts,{
            margin: 10,
            marginnumbers:-30,
            fontheight:15,
            hour:10,
            minute:10
        });
        opts=_opts;
        PM=opts.hour>12;
        domelem=_domelem;
        actuallyMoving='nothing';
        buildUi();
    };

    var buildUi = function (){
        //build dialCanvas
        sunCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 0;"})
        dialCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 1;"});
        handCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 2;"})
        domelem.append([sunCanvas, dialCanvas,handCanvas]);
        sunCanvas=sunCanvas[0];
        dialCanvas=dialCanvas[0];
        handCanvas=handCanvas[0];
        size=Math.min(domelem.width(),domelem.height());
        
        
        sunCanvas.width=size;
        sunCanvas.height=size;
        dialCanvas.width=size;
        dialCanvas.height=size;
        handCanvas.width=size;
        handCanvas.height=size;
        
        radius=size/2 - opts.margin;
        handradius=radius + opts.marginnumbers;
        
        ctxSun=sunCanvas.getContext( '2d' );
        ctxDial=dialCanvas.getContext( '2d' );
        ctxHands=handCanvas.getContext( '2d' );
        ctxHands.translate(size/2,size/2);
        
        currentHours=opts.hour;
        currentMinutes=opts.minute;
        drawDial();
        drawHands();
        
        bindUiEvents();
    };
    
    var drawDial = function(){
        ctxDial.save();
        ctxDial.font = '15px Arial';
        ctxDial.lineWidth=3;
        ctxDial.beginPath();
   		ctxDial.arc(size/2, size/2, size/2-opts.margin, 0, Math.PI*2, true);
   		ctxDial.stroke();
   		
   		//center
   		ctxDial.beginPath();
		ctxDial.arc(size/2, size/2, 10, 0, Math.PI*2, true);
		ctxDial.fill();
		
		//moon
		ctxDial.fillStyle='#fff';
		ctxDial.beginPath();
		ctxDial.arc(size/2, size/2 + radius/2,radius/4,0,Math.PI*2,true);
		ctxDial.fill();
		
		ctxDial.fillStyle='#000';
		//numbers 1 to 12
		var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
		var angle = 0;
		var numeralWidth = 0;
		ctxDial.font= opts.fontheight + 'px Arial';
		$.each(numerals,function(idx,numeral) {
			angle = Math.PI/6 * (numeral-3);
			numeralWidth = ctxDial.measureText(numeral).width;
			ctxDial.fillText(
			    numeral,
                dialCanvas.width/2 + Math.cos(angle)*(handradius) -
                numeralWidth/2,
                dialCanvas.height/2 + Math.sin(angle)*(handradius) +
                opts.fontheight/3);
		});
		
		//tiles
		ctxDial.translate(size/2,size/2);
		angle=Math.PI/30;
		for(var til=1;til<=60;til++){
		    var isbig=(til%5==0);
		    ctxDial.rotate(angle);
		    var rectWidth=isbig?8:2;
		    var rectHeight=isbig?15:8;
            ctxDial.fillRect(radius-rectHeight, -rectWidth/2, rectHeight,rectWidth);
		}
		ctxDial.translate(-size/2,-size/2);
		ctxDial.restore();
    };
	
	var drawHands = function () {
	    ctxHands.save();
	    ctxHands.clearRect(-size/2, -size/2, size, size);
	    
	    angleHour=(((currentHours*60)+currentMinutes) * 0.5)%360 * Math.PI/180 - (Math.PI/2);
	    if(angleHour<0){
	        angleHour+=(2*Math.PI);
	    }
	    angleMinutes=(currentMinutes * 6)%360 * Math.PI/180 - (Math.PI/2);
	    if(angleMinutes<0){
	        angleMinutes+=(2*Math.PI);
	    }
	    
	    //Hours
	    ctxHands.rotate(angleHour);
	    ctxHands.fillStyle="#000";
	    ctxHands.fillRect(5, -4, radius*0.6,8);
	    ctxHands.rotate(-angleHour);
	    
	    //Minutes
	    ctxHands.fillStyle="#f00";
	    ctxHands.rotate(angleMinutes);
	    ctxHands.fillRect(5, -2, radius*0.85,4);
	    ctxHands.rotate(-angleMinutes);
	    ctxHands.restore();
	    
	    drawMoon();
	};
	
	var drawMoon = function(){
	    //background
	    //from #ffffff to #428bca in percent
	    var time=getCurrentTime();
	    //console.log(time.hour+':'+time.minute + (PM?'PM':'AM'));
	    var minutes=time.hour*60 + time.minute;
	    var weight=0;
	    if(minutes>960 && minutes<1200){
	        weight=(1200-minutes)/2.4;
	    }
	    if(minutes>240 && minutes<480){
	        weight=Math.abs((minutes - 480)/2.4);
	        weight=100-weight;
	    }
	    if(minutes>=480 && minutes<=960){
	        weight=100;
	    }
	    var col=mixColors(new Color('ffffff'),new Color('428bca'),weight);
        ctxSun.fillStyle =  col.toRGB();
        ctxSun.fillRect(0,0,size,size);
        
	};
	
	var mixColors = function (color1, color2, weight) {
        var p = weight / 100.0;
        var w = p * 2 - 1;
        var a = color1.toHSL().a - color2.toHSL().a;

        var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;

        var rgb = [color1.rgb[0] * w1 + color2.rgb[0] * w2,
            color1.rgb[1] * w1 + color2.rgb[1] * w2,
            color1.rgb[2] * w1 + color2.rgb[2] * w2];

        var alpha = color1.alpha * p + color2.alpha * (1 - p);

        return new Color(rgb, alpha);
    };
    
    var getAngleFromCoordinates=function(x,y){
        var a= Math.atan2(y-(size/2),x-(size/2));
        if(a<0){
            a= a+(2*Math.PI);
        }
        return a
    };
    
    var findWhatToChange = function(x,y){
        //Based on coordinates, try to find if we move minutes or hours or nothing
        actuallyMoving='nothing';
        var angle=getAngleFromCoordinates(x,y);
        var radiusAsked=Math.sqrt(Math.pow(y-(size/2),2)+Math.pow(x-(size/2),2));
        if(radiusAsked<=(size/2-opts.margin)){
            if(angle>(angleMinutes-(Math.PI/12)) && angle<(angleMinutes+(Math.PI/12))){
                actuallyMoving = 'minutes';
            }else if(angle>(angleHour-(Math.PI/6)) && angle<(angleHour+(Math.PI/6))){
                actuallyMoving ='hours';
            }else{
                actuallyMoving ='nothing';
            }
        }
    };
    
	var changeTime = function(x,y) {
	    var radiusAsked=Math.sqrt(Math.pow(y-(size/2),2)+Math.pow(x-(size/2),2));
	    if(radiusAsked<=(size/2-opts.margin)){
    	    var angle=getAngleFromCoordinates(x,y);
    	    angle=angle+(Math.PI/2)
    	    if(angle>(2*Math.PI)){
    	        angle=angle-(2*Math.PI);
    	    }
    	    if(actuallyMoving=='minutes'){
    	        var storedCM=currentMinutes;
    	        currentMinutes  =  Math.round(30/Math.PI * angle);
    	        if(currentMinutes>=60){
    	            currentMinutes=0;
    	        }
    	        if(currentMinutes<=15 && storedCM>=45){
    	            currentHours++;
    	        }else if(currentMinutes>=45 && storedCM<=15){
    	            currentHours--;
    	        }
    	        if(currentHours>11){
    	            console.log('currentHours:'+currentHours+', PM:'+PM);
                    PM=!PM;
                    currentHours=0;
        	    }else if(currentHours<0){
        	        console.log('currentHours:'+currentHours+', PM:'+PM);
        	        PM=!PM;
        	        currentHours=11;
        	    }
    	    }else if(actuallyMoving=='hours'){
    	        var storedCH=currentHours;
    	        var step=Math.round(360/Math.PI * angle);
    	        currentMinutes=step%60;
    	        var newHour=Math.floor((step-currentMinutes)/60);
    	        if(newHour==12){
    	            newHour=0;
    	        }
    	        //PM if storedCH<=11 and newHour==0
    	        if((storedCH<=11 && storedCH>=9 && newHour>=0 && newHour<=3) || (storedCH>=0 && storedCH<=3 && newHour>=9 && newHour<=11)){
    	            PM=!PM;
    	        }
    	        //console.log(newHour);
    	        currentHours=newHour;
    	    }
    	    
    		drawHands();
	    }
	};
	

    var bindUiEvents = function(){
        $(handCanvas).on('mousedown',function(e){
            findWhatToChange(e.offsetX,e.offsetY);
            if(actuallyMoving!='nothing'){
                changeState=true;
            }
        });
        $(handCanvas).on('mouseup',function(){changeState=false;});
        $(handCanvas).on('mouseout',function(){changeState=false;});
        $(handCanvas).on('mousemove',function(e){
            if(changeState && actuallyMoving!='nothing'){
                changeTime(e.offsetX,e.offsetY);
            }
        });
    };
    
    var getCurrentTime = function(){
        return {hour:currentHours + (PM?12:0),minute:currentMinutes};
    };
    
    return {
        init:init,
        getCurrentTime:getCurrentTime
    };

};

//
// RGB Colors - #ff0014, #eee
//
var Color = function (rgb, a) {
    //
    // The end goal here, is to parse the arguments
    // into an integer triplet, such as `128, 255, 0`
    //
    // This facilitates operations and conversions.
    //
    if (Array.isArray(rgb)) {
        this.rgb = rgb;
    } else if (rgb.length == 6) {
        this.rgb = rgb.match(/.{2}/g).map(function (c) {
            return parseInt(c, 16);
        });
    } else {
        this.rgb = rgb.split('').map(function (c) {
            return parseInt(c + c, 16);
        });
    }
    this.alpha = typeof(a) === 'number' ? a : 1;
};
Color.prototype.type = "Color";
function toHex(v) {
    return '#' + v.map(function (c) {
        c = Math.min(Math.max(Math.round(c), 0), 255);
        return (c < 16 ? '0' : '') + c.toString(16);
    }).join('');
}
Color.prototype.luma = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255;

    r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
    g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
    b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
Color.prototype.toRGB = function () {
    return toHex(this.rgb);
};
Color.prototype.toHSL = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255,
        a = this.alpha;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2, d = max - min;

    if (max === min) {
        h = s = 0;
    } else {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2;               break;
            case b: h = (r - g) / d + 4;               break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, l: l, a: a };
};
Color.prototype.toHSV = function () {
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255,
        a = this.alpha;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    if (max === 0) {
        s = 0;
    } else {
        s = d / max;
    }

    if (max === min) {
        h = 0;
    } else {
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, v: v, a: a };
};
Color.prototype.toARGB = function () {
    return toHex([this.alpha * 255].concat(this.rgb));
};
Color.prototype.compare = function (x) {
    return (x.rgb &&
        x.rgb[0] === this.rgb[0] &&
        x.rgb[1] === this.rgb[1] &&
        x.rgb[2] === this.rgb[2] &&
        x.alpha  === this.alpha) ? 0 : undefined;
};