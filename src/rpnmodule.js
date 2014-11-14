$(document).ready(function(){
    rpnmodule.init({moduleend:function(res){alert('module ended!'+res);}});
});

var rpnmoduleLabels = {
    en:{
        Recall:"Recall",
        Order:"Order",
        Warning:"Warning",
        BeforeUnloadMsg:"Module running!",
        Wait:"Wait please...",
        Validate:"Validate",
        Eraser:"Eraser"
    },
    fr:{
        Recall:"Rappel",
        Order:"Consignes",
        Warning:"Attention",
        BeforeUnloadMsg:"Exercice en cours!",
        Wait:"Veuillez patienter...",
        Validate:"Valider",
        Eraser:"Effaceur"
    }
};

var rpnmoduleSelectedLabels;

var rpnmodule = (function () {

    var sequencedatas;
    var currentmod;
    var mainContent;
    var solurl;
    var backurl;
    var responses;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    

    var init = function (opts) {
        _.defaults(opts,{
                sequrl:"seq.json",
                solurl:"sol.json",
                mediaurl:"medias",
                returnurl:"../",
                warnonexit:false,
                onsequenceend:function(){},
                onmoduleend:function(){},
                language:"en"
            }
        );
        rpnmoduleSelectedLabels=rpnmoduleLabels[opts.language];
        responses=[];
        warnexit=opts.warnonexit;
        backurl=opts.returnurl;
        solurl=opts.solurl;
        sequenceendHandler=opts.onsequenceend;
        moduleendHandler=opts.onmoduleend;
        $.getJSON(opts.sequrl,function(datas){
            _.defaults(datas,{
                title:"mqc",
                modules:[]
            });
            sequencedatas=datas;
            currentmod=0;
            buildUi();
        });
    };

    var buildUi = function () {
        $('body').append($('<div class="container"><div class="row"><div class="col-md-12"><h1 id="sequenceTitle"></h1></div></div><div class="row"><div class="col-xs-8"><h2 id="moduleTitle"></h2><h3 id="moduleContext"></h3><h4 id="moduleDirective"></h4></div><div class="col-xs-4"><button class="btn btn-link" id="recallLink" data-toggle="modal" data-target="#recallModal">'+rpnmoduleSelectedLabels.Recall+'</button> <button class="btn btn-link"  id="orderLink" data-toggle="modal" data-target="#orderModal">'+rpnmoduleSelectedLabels.Order+'</button></div></div><div class="row"><div id="mainContent" class="col-md-12"></div></div></div>'));
        $('body').append($('<div id="recallModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">'+rpnmoduleSelectedLabels.Recall+'</h4></div><div class="modal-body" id="recallModalContent"></div></div></div></div>'));
        $('body').append($('<div id="orderModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">'+rpnmoduleSelectedLabels.Order+'</h4></div><div class="modal-body" id="orderModalContent"></div></div></div></div>'));
        $('body').append($('<div id="alertModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">'+rpnmoduleSelectedLabels.Warning+'</h4></div><div class="modal-body" id="orderModalContent"></div></div></div></div>'));
        $('body').append($('<div id="waitModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">'+rpnmoduleSelectedLabels.Wait+'</h4></div><div class="modal-body" id="orderModalContent"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        $('#sequenceTitle').html(sequencedatas.title);
        mainContent=$('#mainContent');
        if(warnexit){
            $(window).bind('beforeunload', function(e) {
                return rpnmoduleSelectedLabels.BeforeUnloadMsg;
            });
        }
        displayCurrentModule();
    };

    var displayCurrentModule=function(){
        var moduleDatas=sequencedatas.modules[currentmod];
        _.defaults(moduleDatas,{title:"title"});
        mainContent.empty();
        mainContent.removeClass().addClass('col-md-12');
        $('#moduleTitle').show().text(moduleDatas.title);
        _.isUndefined(moduleDatas.context)?$('#moduleContext').hide():$('#moduleContext').show().text(moduleDatas.context);
        _.isUndefined(moduleDatas.directive)?$('#moduleDirective').hide():$('#moduleDirective').show().text(moduleDatas.directive);
        $('#waitModal').modal('hide');
        if(moduleDatas.type=='marker'){
            rpnmarkermodule.init(moduleDatas,mainContent);
        }else if(moduleDatas.type=='mqc'){
            rpnmqcmodule.init(moduleDatas,mainContent);
        }else if(moduleDatas.type=='gapsimple'){
            rpngapsimplemodule.init(moduleDatas,mainContent);
        }else if(moduleDatas.type=='gapfull'){
            rpngapfullmodule.init(moduleDatas,mainContent);
        }else if(moduleDatas.type=='clock'){
            rpnclockmodule.init(moduleDatas,mainContent);
        }else if(moduleDatas.type=='blackbox'){
            rpnblackboxmodule.init(moduleDatas,mainContent);
        }else if(moduleDatas.type=='rpndraganddropsorting'){
            rpndraganddropsorting.init(moduleDatas,mainContent);
        }
        

    };
    
    var handleEndOfModule = function(res,correctionFct){
        //store result locally
        responses[currentmod]={responses:res,correctionFct:correctionFct};
        $('#waitModal').modal('show');
        currentmod++;
        moduleendHandler(res);
        if(_.isUndefined(sequencedatas.modules[currentmod])){
            handleEndOfSequence();
        }else{
            displayCurrentModule();
        }
    };
    
    var handleEndOfSequence = function(){
        
        sequenceendHandler(responses);
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl,function(ssol){
            var score=0;
            _.each(ssol.solutions,function(sol,idx){
                score+=_.isUndefined(responses[idx])?0:responses[idx].correctionFct(responses[idx].responses,sol);
            });
            if(warnexit){
               $(window).unbind('beforeunload');
            }
            window.location=backurl;
        });
    };

    return {
        init:init,
        buildUi:buildUi,
        handleEndOfModule:handleEndOfModule
    };
})();

//marker
var rpnmarkermodule = (function() {
    var datas;
    var domelem;
    var selectedMarker;
    var validationButton;
    var responses;
    var init = function(_datas,_domelem){
        datas=_datas;
        domelem=_domelem;
        selectedMarker=-1;
        responses=[];
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_marker');
        var toolbar=$('<div>',{'class':'btn-group','data-toggle':'buttons'});
        var availableColors=_.shuffle(['primary','success','info','warning','danger']);

        toolbar.append($('<label class="btn btn-default active"><input type="radio" name="options" id="option1" autocomplete="off" checked><i class="glyphicon glyphicon-pencil"></i> '+rpnmoduleSelectedLabels.Eraser+'</label>').click(function(){
                selectedMarker=-1;

        }));
        $.each(datas.markers,function(idx,marker){
            toolbar.append($('<label class="btn btn-'+(availableColors[idx]||'default')+'"><input type="radio" name="options" id="option3" autocomplete="off"><i class="glyphicon glyphicon-pencil"></i> '+marker.label+'</label>').click(function(){
                selectedMarker=marker.val;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
        domelem.append($('<div id="sentences">'+datas.tomark+'</div>'));
        $.each($('#sentences b'),function(idx,tomark){
            responses[idx]=-1; //initialize all responses to unmark
            var t=$(tomark);
            t.css('cursor','pointer').click(function(){
                t.removeClass();
                if(selectedMarker!=-1){
                    t.addClass('marker-'+availableColors[selectedMarker]);
                }
                responses[idx]=selectedMarker;
            });
        });
        //build validation button
        validationButton=$('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function(){
        validationButton.click(function(){
            rpnmodule.handleEndOfModule(responses,function(res,sol){
                var score=0;
                _.each(sol,function(val,idx){
                    score+=res[idx]==val?1:0;
                });
                return score;
            });
        });
    }

    return {
        init:init
    };

})();

//mqc
var rpnmqcmodule = (function() {
    var datas;
    var domelem;
    var validationButton;
    var responses;
    var init = function(_datas,_domelem){
        datas=_datas;
        domelem=_domelem;
        responses=[];
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_mqc');

        //build panel with sentences
        var uilist=$('<ul>',{'class':'list-unstyled'});
        $.each(datas.questions,function(idq,question){
            responses[idq]=-1; //initialize all responses to uncheck
            var li=$('<li>');
            li.append($('<p>'+question.label+'</p>'));
            var answerGroup=$('<div class="btn-group" data-toggle="buttons">');
            $.each(datas.answers,function(ida,answer){
                answerGroup.append($('<label class="btn btn-default"><input type="radio" name="question_'+idq+'" id="answer_'+idq+'_'+ida+'" autocomplete="off">' +answer.label+'</label>').click(function(){
                    responses[idq]=ida;
                }));
                li.append(answerGroup);
            });
            uilist.append(li);
        });
        domelem.append(uilist);

        //build validation button
        validationButton=$('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);
        
        bindUiEvents();
    };
    
    var bindUiEvents = function(){
        validationButton.click(function(){
            rpnmodule.handleEndOfModule(responses,function(res,sol){
                var score=0;
                _.each(sol,function(val,idx){
                    score+=res[idx]==val?1:0;
                });
                return score;
            });
        });
    }

    return {
        init:init
    };

})();

//gapsimple
var rpngapsimplemodule = (function() {
    var datas;
    var domelem;
    var validationButton;
    var responses;
    var init = function(_datas,_domelem){
        datas=_datas;
        domelem=_domelem;
        responses=[];
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_gapsimple');

        //build panel with sentences
        domelem.append($('<div id="sentences" class="form-inline">'+datas.tofill+'</div>'));
        $.each($('#sentences b'),function(idx,tofill){
            responses[idx]=-1; //initialize all responses to unmark
            var t=$(tofill);
            t.replaceWith($('<input type="text" id="'+idx+'" class="rpnmodule-input gapsimple form-control"> <strong>('+t.text()+')</strong>'));
        });
        //build validation button
        validationButton=$('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function(){
        validationButton.click(function(){
            $.each($('.gapsimple'),function(idx,gap){
                responses[idx]=$(gap).val();
            });
            rpnmodule.handleEndOfModule(responses,function(res,sol){
                var score=0;
                _.each(sol,function(val,idx){
                    score+=res[idx]==val?1:0;
                });
                return score;
            });
        });
    }

    return {
        init:init
    };

})();

//gapfull
var rpngapfullmodule = (function() {
    var datas;
    var domelem;
    var validationButton;
    var init = function(_datas,_domelem){
        datas=_datas;
        domelem=_domelem;
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_gapfull');

        //build panel with sentences
        domelem.append($('<div id="sentences"><p>'+datas.sentence+'</p><input type="text" id="gapfullresponse" class="rpnmodule-input form-control"></div>'));
        $('#gapfullresponse').val(datas.sentence);
        
        //build validation button
        validationButton=$('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function(){
        validationButton.click(function(){
            rpnmodule.handleEndOfModule($('#gapfullresponse').val(),function(res,sol){
                //Try to trim and do automatic corrections here.
                return res==sol?1:0;
            });
        });
    };

    return {
        init:init
    };

})();

//clock
var rpnclockmodule = (function(){
    
    var datas;
    var domelem;
    var validationButton;
    var init = function(_datas,_domelem){
        datas=_datas;
        domelem=_domelem;
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_clock');

        //build panel with sentences
        domelem.append($('<div id="rpnclock"></div>'));
        new ClockSelector( 'rpnclock',{background:'white',color_hour:'#333',color_minute:'#666',color_border:'#eee',highlight:'#357ebd'} );
        
        //build validation button
        validationButton=$('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function(){
        validationButton.click(function(){
            rpnmodule.handleEndOfModule($('#gapfullresponse').val(),function(res,sol){
                //Try to trim and do automatic corrections here.
                return res==sol?1:0;
            });
        });
    };

    return {
        init:init
    };
})();

//blackbox
var rpnblackboxmodule = (function() {
    var datas;
    var domelem;
    var validationButton;
    var responses;
    var init = function(_datas,_domelem){
        _.defaults(_datas,{
            inputtype:"number",
            fct:"x1",
            left:[1],
            right:[1]});
        datas=_datas;
        domelem=_domelem;
        responses={left:[],right:[]};
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_blackbox');

        var blackboxwell=$('<div class="blackbox">');
        domelem.append(blackboxwell);

        $.each(datas.left,function(idx,value){
            blackboxwell.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><span>'+value + '</span></div><div class="col-xs-2 blackbox-fct"><i class="glyphicon glyphicon-minus"></i> ('+datas.operation+') <i class="glyphicon glyphicon-arrow-right"></i></div><div class="col-xs-2"><input type="text" id="'+idx+'" class="rpnmodule-input blackbox-left form-control" style="text-align: center;"></div></div>'));
        });
         $.each(datas.right,function(idx,value){
            blackboxwell.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><input type="text" id="'+idx+'" class="rpnmodule-input blackbox-right form-control" style="text-align: center;"></div><div class="col-xs-2 blackbox-fct"><i class="glyphicon glyphicon-minus"></i> ('+datas.operation+') <i class="glyphicon glyphicon-arrow-right"></i></div><div class="col-xs-2"><span>'+value + '</span></div></div>'));
        });

        //build validation button
        validationButton=$('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function(){
        validationButton.click(function(){
            $.each($('.blackbox-left'),function(idx,gap){
                responses.left[idx]=$(gap).val();
            });
            $.each($('.blackbox-right'),function(idx,gap){
                responses.right[idx]=$(gap).val();
            });
            rpnmodule.handleEndOfModule(responses,function(res,sol){
                var score=0;
                _.each(sol.right,function(val,idx){
                    score+=res.right[idx]==val?1:0;
                });
                _.each(sol.left,function(val,idx){
                    score+=res.left[idx]==val?1:0;
                });
                return score;
            });
        });
    };

    return {
        init:init
    };

})();

var rpndraganddropsorting = (function(){
    var datas;
    var domelem;
    var validationButton;
    var responses;
    
    var init = function(_datas,_domelem){
        _.defaults(_datas,{
            inputtype:"number",
            fct:"x1",
            left:[1],
            right:[1]});
        datas=_datas;
        domelem=_domelem;
        responses={left:[],right:[]};
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_blackbox');

        var blackboxwell=$('<div class="blackbox">');
        domelem.append(blackboxwell);

        $.each(datas.left,function(idx,value){
            blackboxwell.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><span>'+value + '</span></div><div class="col-xs-2 blackbox-fct"><i class="glyphicon glyphicon-minus"></i> ('+datas.operation+') <i class="glyphicon glyphicon-arrow-right"></i></div><div class="col-xs-2"><input type="text" id="'+idx+'" class="rpnmodule-input blackbox-left form-control" style="text-align: center;"></div></div>'));
        });
         $.each(datas.right,function(idx,value){
            blackboxwell.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><input type="text" id="'+idx+'" class="rpnmodule-input blackbox-right form-control" style="text-align: center;"></div><div class="col-xs-2 blackbox-fct"><i class="glyphicon glyphicon-minus"></i> ('+datas.operation+') <i class="glyphicon glyphicon-arrow-right"></i></div><div class="col-xs-2"><span>'+value + '</span></div></div>'));
        });

        //build validation button
        validationButton=$('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function(){
        validationButton.click(function(){
            $.each($('.blackbox-left'),function(idx,gap){
                responses.left[idx]=$(gap).val();
            });
            $.each($('.blackbox-right'),function(idx,gap){
                responses.right[idx]=$(gap).val();
            });
            rpnmodule.handleEndOfModule(responses,function(res,sol){
                var score=0;
                _.each(sol.right,function(val,idx){
                    score+=res.right[idx]==val?1:0;
                });
                _.each(sol.left,function(val,idx){
                    score+=res.left[idx]==val?1:0;
                });
                return score;
            });
        });
    };

    return {
        init:init
    };
})();


function ClockSelector ( e, params ){
	var defaults = {
		auto_dt:       1000,
		automate:      true,
		background:    'black',
		callback:      function () {},
		color_border:  '#fff',
		color_hour:    '#fff',
		color_minute:  '#aaa',
		draw_hour:     null,
		draw_minute:   null,
		draw_second:   null,
		highlight:     '#f93',
		manual:        true,
		stroke_border: 3,
		stroke_hour:   2,
		stroke_minute: 0.75,
		scale_hour:    0.50,
		scale_border:  0.80,
		scale_minute:  0.65
	};

	for ( var k in defaults )
	{
		this[k] = params && k in params ? params[k] : defaults[k];
	}

	e         = document.getElementById( e );
	this.size = Math.min( e.width, e.height );
	if ( !this.size )
	{
		var style = window.getComputedStyle( e );
		this.size = Math.min( parseInt( style.width ), parseInt( style.height ) );
	}

	if ( e.tagName != 'CANVAS' )
	{
		e.appendChild( document.createElement( 'canvas' ) );
		e        = e.childNodes[e.childNodes.length - 1];
		e.width  = this.size;
		e.height = this.size;
	}

	this.canvas   = e;
	this.context  = e.getContext( '2d' );
	this.dragging = false;
	this.time     = null;
	this.color_mindef = this.color_minute;

	e.style.backgroundColor = this.background;



	ClockSelector.prototype.clockTime = function ()
	{
		return this.time;
	}



	ClockSelector.prototype.drawHand = function ( c, w, s )
	{
		var x = this.context;

		x.strokeStyle = c;
		x.fillStyle   = c;
		x.lineWidth   = w;
		x.beginPath();
		x.moveTo( 0, 0 );
		x.lineTo( 0, 100 * s );
		x.closePath();
		x.stroke();
		x.arc( 0, 0, w / 2, 0, 2 * Math.PI );
		x.fill();
	};



	ClockSelector.prototype.getCanvasOffset = function ()
	{
		var o = [ 0, 0 ];
		var e = this.canvas;

		while ( e.offsetParent )
		{
			o[0] += e.offsetLeft;
			o[1] += e.offsetTop;
			e = e.offsetParent;
		}

		return o;
	};



	ClockSelector.prototype.reset = function ()
	{
		this.setTime( new Date() );
		if ( this.automate )
		{
			this.timeout = setInterval( this.setTimeRecurring(), this.auto_dt );
		}
	};



	ClockSelector.prototype.setParam = function ( k, v )
	{
		if ( k in this ) { this[k] = v; }
	}



	ClockSelector.prototype.setTime = function ( t )
	{
		this.canvas.width = this.canvas.width;
		this.time         = t;
		t                 = t.getTime() / 1000 - t.getTimezoneOffset() * 60;

		var x  = this.context;
		var s  = this.size / 200;
		var Ts = t % 60 / 30 * Math.PI;
		var Tm = t % 3600 / 1800 * Math.PI;
		var Th = t / ( 6 * 3600 ) * Math.PI;
		this.setTransform( x, Ts, s );
		if ( this.draw_second ) { var f = this.draw_second; f( x ); }
		this.setTransform( x, Tm, s );
		if ( this.draw_minute ) { var f = this.draw_minute; f( x ); } else { this.drawHand( this.color_minute, this.stroke_minute * 2, this.scale_minute ); }
		this.setTransform( x, Th, s );
		if ( this.draw_hour ) { var f = this.drawHour; f( x ); } else { this.drawHand( this.color_hour, this.stroke_hour * 2, this.scale_hour ); }

		x.setTransform( s, 0, 0, s, 100 * s, 100 * s );
		x.strokeStyle = this.color_border;
		x.lineWidth   = this.stroke_border * 2;
		x.beginPath();
		x.arc( 0, 0, 100 * this.scale_border, 0, 2 * Math.PI );
		x.stroke();
		x.closePath();

		if ( this.callback ) { this.callback( this ); }
	};



	ClockSelector.prototype.setTimeFromEvent = function ( e )
	{
		var o = this.getCanvasOffset();
		var x = e.pageX - o[0] - this.size / 2;
		var y = this.size / 2 - ( e.pageY - o[1] );

		if ( x == 0 && y == 0 )
		{
			return;
		}

		var T  = Math.atan2( y, x );
		var h, m;
		if ( this.drag_minute )
		{
			var m1 = ( 75 - T * 30 / Math.PI ) % 60;
			var m0 = this.time.getMinutes() + this.time.getSeconds() / 60;
			h      = this.time.getHours();
			m      = m1;

			if ( m1 < m0 && m0 - m1 <= 30 ) { /**/ }
			else if ( m1 < m0 && m0 - m1 > 30 ) { h += 1; }
			else if ( m1 > m0 && m1 - m0 <= 30 ) { /**/ }
			else if ( m1 > m0 && m1 - m0 > 30 ) { h -= 1; }
			h = ( h + 24 ) % 24;
		}
		else
		{
			var h1 = 3 - T * 6 / Math.PI;
			var h0 = this.time.getHours() + this.time.getMinutes() / 60 + this.time.getSeconds() / 3600;
			h1    += h1 < h0 ? 24 : 0;

			if ( h1 < h0 + 6 ) { h = h1; }
			else if ( h1 < h0 + 12 ) { h = h1 - 12; }
			else if ( h1 < h0 + 18 ) { h = h1 + 12; }
			else { h = h1; }
			h = ( h + 24 ) % 24;
			m = ( ( ( 3 - T * 6 / Math.PI ) * 60 ) % 60 + 60 ) % 60;
		}

		var t = new Date();
		t.setHours( h );
		t.setMinutes( m );
		t.setSeconds( ( ( ( 3 - T * 6 / Math.PI ) * 3600 ) % 60 + 60 ) % 60 );

		this.setTime( t );
	};



	ClockSelector.prototype.setTimeRecurring = function ()
	{
		var _ = this;
		return function () { _.setTime( new Date() ); };
	};



	ClockSelector.prototype.setTransform = function ( x, T, s )
	{
		x.setTransform( -s * Math.cos( T ), -s * Math.sin( T ), s * Math.sin( T ), -s * Math.cos( T ), 100 * s, 100 * s );
	};



	ClockSelector.prototype.makeEndDrag = function ()
	{
		var _ = this;
		return function () { _.color_minute = _.color_mindef; _.dragging = false; _.setTime( _.clockTime() ); };
	};



	ClockSelector.prototype.makeSetTime = function ( d )
	{
		if ( !this.manual ) { return; }

		var _ = this;
		return function ()
		{
			var e = window.event;
			var o = _.getCanvasOffset();
			var x = e.pageX - o[0] - _.size / 2;
			var y = _.size / 2 - ( e.pageY - o[1] );

			if ( _.manual )
			{
				_.canvas.style.cursor = Math.sqrt( x * x + y * y ) <= ( _.size * _.scale_border + _.stroke_border ) / 2 ? 'pointer' : 'default';
			}

			if ( _.dragging != d )
			{
				if ( d && !_.dragging )
				{
					var T = Math.atan2( x, y );
					var m = ( T + 2 * Math.PI ) * 30 / Math.PI;
					var mb = [ ( m + 57.5 ) % 60, ( m + 2.5 ) % 60 ];

					m = _.clockTime().getMinutes() + _.clockTime().getSeconds() / 60;
					if ( Math.sqrt( x * x + y * y ) < _.size / 2 * _.scale_border && (
					     ( mb[0] < m && m < mb[1] ) || ( m < mb[0] && mb[1] < mb[0] && m < mb[1] ) || ( mb[0] < m && mb[1] < m && mb[1] < mb[0] )
					) )
					{
						if ( _.color_minute != _.highlight )
						{
							_.color_minute = _.highlight;
							_.drag_minute  = true;
							_.setTime( _.clockTime() );
						}
					}
					else
					{
						if ( _.color_minute != _.color_mindef )
						{
							_.color_minute = _.color_mindef;
							_.drag_minute  = false;
							_.setTime( _.clockTime() );
						}
					}
				}

				return;
			}

			if ( !_.dragging && !d )
			{
				if ( _.timeout )
				{
					clearTimeout( _.timeout );
					_.timeout = null;
				}

				_.dragging = true;
			}

			_.setTimeFromEvent( window.event );
		};
	};



	if ( this.manual )
	{
		this.canvas.onmousedown = this.makeSetTime( false );
		this.canvas.onmouseup   = this.makeEndDrag();
		this.canvas.onmouseout  = this.makeEndDrag();
		this.canvas.onmousemove = this.makeSetTime( true );

		//this.canvas.style.cursor = 'pointer';
	}



	this.reset();
}


