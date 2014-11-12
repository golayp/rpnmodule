$(document).ready(function(){
	EduClock.init({},$('#clock'));
	//alert(EduClock.getCurrentTime().hour + ' '  + EduClock.getCurrentTime().minute);
});
var EduClock = (function() {

    var domelem;
    var opts;
    var dialCanvas;
    var handCanvas;
    var changeState=false;
    var size;
    var ctxDial;
    var ctxHands;
    var radius;
    var handradius;
    var currentHours;
    var currentMinutes;
    var actuallyMoving;
    var angleHour;
    var angleMinutes;
    
    var init = function(_opts,_domelem){
        _.defaults(_opts,{
            margin: 10,
            marginnumbers:-30,
            fontheight:15,
            hour:7,
            minute:55,
            callback:      function () {}
        });
        opts=_opts;
        domelem=_domelem;
        actuallyMoving='nothing';
        buildUi();
    };

    var buildUi = function (){
        //build dialCanvas
        dialCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 0;"});
        handCanvas=$('<canvas>',{style:"position: absolute; left: 0; top: 0; z-index: 1;"})
        domelem.append([dialCanvas,handCanvas]);
        dialCanvas=dialCanvas[0];
        handCanvas=handCanvas[0];
        size=Math.min(domelem.width(),domelem.height());
        dialCanvas.width=size;
        dialCanvas.height=size;
        handCanvas.width=size;
        handCanvas.height=size;
        
        radius=size/2 - opts.margin;
        handradius=radius + opts.marginnumbers;
        
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
      
        ctxDial.font = '15px Arial';
        
        //circle
        ctxDial.lineWidth=3;
        ctxDial.beginPath();
   		ctxDial.arc(size/2, size/2,
   		size/2-opts.margin, 0, Math.PI*2, true);
   		ctxDial.stroke();
   		
   		//center
   		ctxDial.beginPath();
		ctxDial.arc(size/2, size/2, 10, 0, Math.PI*2, true);
		ctxDial.fill();
		
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
	    console.log(currentHours + ":"+currentMinutes);
	    
	    ctxHands.save();
	    ctxHands.clearRect(-size/2, -size/2, size, size);
	    
	    angleHour=(((currentHours*60)+currentMinutes) * 0.5)%360 * Math.PI/180 - (Math.PI/2);
	    angleMinutes=angleHour+(currentMinutes * 6)%360 * Math.PI/180 - (Math.PI/2);
	    
	    //Hours
	    ctxHands.rotate(angleHour);
	    ctxHands.fillStyle="#000";
	    ctxHands.fillRect(5, -4, 100,8);
	    ctxHands.restore();
	    ctxHands.rotate(-angleHour);
	    
	    //Minutes
	    ctxHands.fillStyle="#f00";
	    ctxHands.rotate(angleMinutes);
	    ctxHands.fillRect(5, -2, 150,4);
	    ctxHands.restore();
	    ctxHands.rotate(-angleMinutes);
	};
    
    var getAngleFromCoordinates=function(x,y){
        return Math.atan2(y-(size/2),x-(size/2));
    };
    
    var findWhatToChange = function(x,y){
        //Based on coordinates, try to find if we move minutes or hours or nothing
        actuallyMoving='nothing';
        var angle=getAngleFromCoordinates(x,y);
        if(angle>(angleMinutes-(Math.PI/12)) && angle<(angleMinutes+(Math.PI/12))){
            actuallyMoving = 'minutes';
        }else if(angle>(angleHour-(Math.PI/6)) && angle<(angleHour+(Math.PI/6))){
            actuallyMoving ='hours';
        }else{
            actuallyMoving ='nothing';
        }
        console.log(actuallyMoving);
        
    };
	var changeTime = function(x,y) {
	    var angle=getAngleFromCoordinates(x,y);
	    while(angle>2*Math.PI)
	        angle=angle-2*Math.PI;
	    if(actuallyMoving=='minutes'){
	        currentMinutes  =  Math.round(30/Math.PI * angle)+15;
	    }else if(actuallyMoving=='hours'){
	        
	    }
		drawHands();
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
    
    var test=function(){
        currentHours=11;
        currentMinutes=15;
        drawHands();
    }
    
    var getCurrentTime = function(){
        return {hour:currentHours,minute:currentMinutes};
    };
    
    return {
        init:init,
        getCurrentTime:getCurrentTime,
        test:test
    };

})();