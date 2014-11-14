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
        }else if(moduleDatas.type=='dragdropsorting'){
            rpndragdropsortingmodule.init(moduleDatas,mainContent);
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
    
    var genericValidateButton = function(label){
        label=_.isUndefined(label)?rpnmoduleSelectedLabels.Validate:label
        return $('<button>',{'class':'btn btn-primary',text:' '+ rpnmoduleSelectedLabels.Validate}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
    }

    return {
        init:init,
        buildUi:buildUi,
        handleEndOfModule:handleEndOfModule,
        genericValidateButton: genericValidateButton
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
        _.defaults(_datas,{
            markers:[],
            tomark:["fill tomark to feel good please!"]
        });
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
         _.defaults(_datas,{
            questions:["No questions!"],
            answers:["As no answers"]
        });
        
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
        validationButton=rpnmodule.genericValidateButton();
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
         _.defaults(_datas,{
            tofill:"tofill not set!<b>Read</b> documentation please!"
        });
        
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
        validationButton=rpnmodule.genericValidateButton();
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
        _.defaults(_datas,{
            sentence:"sentence not set!"
        });
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
        validationButton=rpnmodule.genericValidateButton();
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
        validationButton=rpnmodule.genericValidateButton();
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
        validationButton=rpnmodule.genericValidateButton();
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

var rpndragdropsortingmodule = (function(){
    var datas;
    var domelem;
    var validationButton;
    var responses;
    
    var init = function(_datas,_domelem){
        _.defaults(_datas,{
            todrag:["empty"],
            todrop:["empty too :'("]
        });
        datas=_datas;
        domelem=_domelem;
        responses=[];
        buildUi();
    };

    var buildUi = function (){
        //build marker toolbar
        domelem.addClass('rpnmodule_dnds');
        domelem.append($('<div class="row"><div class="container"><div class="col-md-12"><ul id="dragthis" class="simple_with_drop  list-unstyled"></ul></div></div><div class="row"><div class="container" id="dropzonecontainer"></div></div>'));
        
        $.each(datas.todrag,function(idx,drag){
            $('#dragthis').append('<li>'+drag+'</li>');
        });
        
        $.each(datas.todrop,function(idx,drop){
            $('#dropzonecontainer').append($('<div class="col-md-2"><ul class="simple_with_drop list-unstyled"><lh>'+drop+'</lh></ul></div>'))
        });
        
        $("ul.simple_with_drop").sortable({
            group: 'no-drop'
        });
        
        
        
        //build validation button
        validationButton=rpnmodule.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
        nextDraggable();
    };
    
    var nextDraggable = function(){
       
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


/* ===================================================
 *  jquery-sortable.js v0.9.12
 *  http://johnny.github.com/jquery-sortable/
 * ===================================================
 *  Copyright (c) 2012 Jonas von Andrian
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *  * The name of the author may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ========================================================== */


!function ( $, window, pluginName, undefined){
  var eventNames,
  containerDefaults = {
    // If true, items can be dragged from this container
    drag: true,
    // If true, items can be droped onto this container
    drop: true,
    // Exclude items from being draggable, if the
    // selector matches the item
    exclude: "",
    // If true, search for nested containers within an item
    nested: true,
    // If true, the items are assumed to be arranged vertically
    vertical: true
  }, // end container defaults
  groupDefaults = {
    // This is executed after the placeholder has been moved.
    // $closestItemOrContainer contains the closest item, the placeholder
    // has been put at or the closest empty Container, the placeholder has
    // been appended to.
    afterMove: function ($placeholder, container, $closestItemOrContainer) {
    },
    // The exact css path between the container and its items, e.g. "> tbody"
    containerPath: "",
    // The css selector of the containers
    containerSelector: "ol, ul",
    // Distance the mouse has to travel to start dragging
    distance: 0,
    // Time in milliseconds after mousedown until dragging should start.
    // This option can be used to prevent unwanted drags when clicking on an element.
    delay: 0,
    // The css selector of the drag handle
    handle: "",
    // The exact css path between the item and its subcontainers
    itemPath: "",
    // The css selector of the items
    itemSelector: "li",
    // Check if the dragged item may be inside the container.
    // Use with care, since the search for a valid container entails a depth first search
    // and may be quite expensive.
    isValidTarget: function ($item, container) {
      return true
    },
    // Executed before onDrop if placeholder is detached.
    // This happens if pullPlaceholder is set to false and the drop occurs outside a container.
    onCancel: function ($item, container, _super, event) {
    },
    // Executed at the beginning of a mouse move event.
    // The Placeholder has not been moved yet.
    onDrag: function ($item, position, _super, event) {
      $item.css(position)
    },
    // Called after the drag has been started,
    // that is the mouse button is beeing held down and
    // the mouse is moving.
    // The container is the closest initialized container.
    // Therefore it might not be the container, that actually contains the item.
    onDragStart: function ($item, container, _super, event) {
      $item.css({
        height: $item.height(),
        width: $item.width()
      })
      $item.addClass("dragged")
      $("body").addClass("dragging")
    },
    // Called when the mouse button is beeing released
    onDrop: function ($item, container, _super, event) {
      $item.removeClass("dragged").removeAttr("style")
      $("body").removeClass("dragging")
    },
    // Called on mousedown. If falsy value is returned, the dragging will not start.
    // If clicked on input element, ignore
    onMousedown: function ($item, _super, event) {
      if (!event.target.nodeName.match(/^(input|select)$/i)) {
        event.preventDefault()
        return true
      }
    },
    // Template for the placeholder. Can be any valid jQuery input
    // e.g. a string, a DOM element.
    // The placeholder must have the class "placeholder"
    placeholder: '<li class="placeholder"/>',
    // If true, the position of the placeholder is calculated on every mousemove.
    // If false, it is only calculated when the mouse is above a container.
    pullPlaceholder: true,
    // Specifies serialization of the container group.
    // The pair $parent/$children is either container/items or item/subcontainers.
    serialize: function ($parent, $children, parentIsContainer) {
      var result = $.extend({}, $parent.data())

      if(parentIsContainer)
        return [$children]
      else if ($children[0]){
        result.children = $children
      }

      delete result.subContainers
      delete result.sortable

      return result
    },
    // Set tolerance while dragging. Positive values decrease sensitivity,
    // negative values increase it.
    tolerance: 0
  }, // end group defaults
  containerGroups = {},
  groupCounter = 0,
  emptyBox = {
    left: 0,
    top: 0,
    bottom: 0,
    right:0
  },
  eventNames = {
    start: "touchstart.sortable mousedown.sortable",
    drop: "touchend.sortable touchcancel.sortable mouseup.sortable",
    drag: "touchmove.sortable mousemove.sortable",
    scroll: "scroll.sortable"
  },
  subContainerKey = "subContainers"

  /*
   * a is Array [left, right, top, bottom]
   * b is array [left, top]
   */
  function d(a,b) {
    var x = Math.max(0, a[0] - b[0], b[0] - a[1]),
    y = Math.max(0, a[2] - b[1], b[1] - a[3])
    return x+y;
  }

  function setDimensions(array, dimensions, tolerance, useOffset) {
    var i = array.length,
    offsetMethod = useOffset ? "offset" : "position"
    tolerance = tolerance || 0

    while(i--){
      var el = array[i].el ? array[i].el : $(array[i]),
      // use fitting method
      pos = el[offsetMethod]()
      pos.left += parseInt(el.css('margin-left'), 10)
      pos.top += parseInt(el.css('margin-top'),10)
      dimensions[i] = [
        pos.left - tolerance,
        pos.left + el.outerWidth() + tolerance,
        pos.top - tolerance,
        pos.top + el.outerHeight() + tolerance
      ]
    }
  }

  function getRelativePosition(pointer, element) {
    var offset = element.offset()
    return {
      left: pointer.left - offset.left,
      top: pointer.top - offset.top
    }
  }

  function sortByDistanceDesc(dimensions, pointer, lastPointer) {
    pointer = [pointer.left, pointer.top]
    lastPointer = lastPointer && [lastPointer.left, lastPointer.top]

    var dim,
    i = dimensions.length,
    distances = []

    while(i--){
      dim = dimensions[i]
      distances[i] = [i,d(dim,pointer), lastPointer && d(dim, lastPointer)]
    }
    distances = distances.sort(function  (a,b) {
      return b[1] - a[1] || b[2] - a[2] || b[0] - a[0]
    })

    // last entry is the closest
    return distances
  }

  function ContainerGroup(options) {
    this.options = $.extend({}, groupDefaults, options)
    this.containers = []

    if(!this.options.rootGroup){
      this.scrollProxy = $.proxy(this.scroll, this)
      this.dragProxy = $.proxy(this.drag, this)
      this.dropProxy = $.proxy(this.drop, this)
      this.placeholder = $(this.options.placeholder)

      if(!options.isValidTarget)
        this.options.isValidTarget = undefined
    }
  }

  ContainerGroup.get = function  (options) {
    if(!containerGroups[options.group]) {
      if(options.group === undefined)
        options.group = groupCounter ++

      containerGroups[options.group] = new ContainerGroup(options)
    }

    return containerGroups[options.group]
  }

  ContainerGroup.prototype = {
    dragInit: function  (e, itemContainer) {
      this.$document = $(itemContainer.el[0].ownerDocument)

      // get item to drag
      this.item = $(e.target).closest(this.options.itemSelector)
      this.itemContainer = itemContainer

      if(this.item.is(this.options.exclude) ||
         !this.options.onMousedown(this.item, groupDefaults.onMousedown, e)){
        return
      }

      this.setPointer(e)
      this.toggleListeners('on')

      this.setupDelayTimer()
      this.dragInitDone = true
    },
    drag: function  (e) {
      if(!this.dragging){
        if(!this.distanceMet(e) || !this.delayMet)
          return

        this.options.onDragStart(this.item, this.itemContainer, groupDefaults.onDragStart, e)
        this.item.before(this.placeholder)
        this.dragging = true
      }

      this.setPointer(e)
      // place item under the cursor
      this.options.onDrag(this.item,
                          getRelativePosition(this.pointer, this.item.offsetParent()),
                          groupDefaults.onDrag,
                          e)

      var x = e.pageX || e.originalEvent.pageX,
      y = e.pageY || e.originalEvent.pageY,
      box = this.sameResultBox,
      t = this.options.tolerance

      if(!box || box.top - t > y || box.bottom + t < y || box.left - t > x || box.right + t < x)
        if(!this.searchValidTarget())
          this.placeholder.detach()
    },
    drop: function  (e) {
      this.toggleListeners('off')

      this.dragInitDone = false

      if(this.dragging){
        // processing Drop, check if placeholder is detached
        if(this.placeholder.closest("html")[0])
          this.placeholder.before(this.item).detach()
        else
          this.options.onCancel(this.item, this.itemContainer, groupDefaults.onCancel, e)

        this.options.onDrop(this.item, this.getContainer(this.item), groupDefaults.onDrop, e)

        // cleanup
        this.clearDimensions()
        this.clearOffsetParent()
        this.lastAppendedItem = this.sameResultBox = undefined
        this.dragging = false
      }
    },
    searchValidTarget: function  (pointer, lastPointer) {
      if(!pointer){
        pointer = this.relativePointer || this.pointer
        lastPointer = this.lastRelativePointer || this.lastPointer
      }

      var distances = sortByDistanceDesc(this.getContainerDimensions(),
                                         pointer,
                                         lastPointer),
      i = distances.length

      while(i--){
        var index = distances[i][0],
        distance = distances[i][1]

        if(!distance || this.options.pullPlaceholder){
          var container = this.containers[index]
          if(!container.disabled){
            if(!this.$getOffsetParent()){
              var offsetParent = container.getItemOffsetParent()
              pointer = getRelativePosition(pointer, offsetParent)
              lastPointer = getRelativePosition(lastPointer, offsetParent)
            }
            if(container.searchValidTarget(pointer, lastPointer))
              return true
          }
        }
      }
      if(this.sameResultBox)
        this.sameResultBox = undefined
    },
    movePlaceholder: function  (container, item, method, sameResultBox) {
      var lastAppendedItem = this.lastAppendedItem
      if(!sameResultBox && lastAppendedItem && lastAppendedItem[0] === item[0])
        return;

      item[method](this.placeholder)
      this.lastAppendedItem = item
      this.sameResultBox = sameResultBox
      this.options.afterMove(this.placeholder, container, item)
    },
    getContainerDimensions: function  () {
      if(!this.containerDimensions)
        setDimensions(this.containers, this.containerDimensions = [], this.options.tolerance, !this.$getOffsetParent())
      return this.containerDimensions
    },
    getContainer: function  (element) {
      return element.closest(this.options.containerSelector).data(pluginName)
    },
    $getOffsetParent: function  () {
      if(this.offsetParent === undefined){
        var i = this.containers.length - 1,
        offsetParent = this.containers[i].getItemOffsetParent()

        if(!this.options.rootGroup){
          while(i--){
            if(offsetParent[0] != this.containers[i].getItemOffsetParent()[0]){
              // If every container has the same offset parent,
              // use position() which is relative to this parent,
              // otherwise use offset()
              // compare #setDimensions
              offsetParent = false
              break;
            }
          }
        }

        this.offsetParent = offsetParent
      }
      return this.offsetParent
    },
    setPointer: function (e) {
      var pointer = this.getPointer(e)

      if(this.$getOffsetParent()){
        var relativePointer = getRelativePosition(pointer, this.$getOffsetParent())
        this.lastRelativePointer = this.relativePointer
        this.relativePointer = relativePointer
      }

      this.lastPointer = this.pointer
      this.pointer = pointer
    },
    distanceMet: function (e) {
      var currentPointer = this.getPointer(e)
      return (Math.max(
        Math.abs(this.pointer.left - currentPointer.left),
        Math.abs(this.pointer.top - currentPointer.top)
      ) >= this.options.distance)
    },
    getPointer: function(e) {
      return {
        left: e.pageX || e.originalEvent.pageX,
        top: e.pageY || e.originalEvent.pageY
      }
    },
    setupDelayTimer: function () {
      var that = this
      this.delayMet = !this.options.delay

      // init delay timer if needed
      if (!this.delayMet) {
        clearTimeout(this._mouseDelayTimer);
        this._mouseDelayTimer = setTimeout(function() {
          that.delayMet = true
        }, this.options.delay)
      }
    },
    scroll: function  (e) {
      this.clearDimensions()
      this.clearOffsetParent() // TODO is this needed?
    },
    toggleListeners: function (method) {
      var that = this,
      events = ['drag','drop','scroll']

      $.each(events,function  (i,event) {
        that.$document[method](eventNames[event], that[event + 'Proxy'])
      })
    },
    clearOffsetParent: function () {
      this.offsetParent = undefined
    },
    // Recursively clear container and item dimensions
    clearDimensions: function  () {
      this.traverse(function(object){
        object._clearDimensions()
      })
    },
    traverse: function(callback) {
      callback(this)
      var i = this.containers.length
      while(i--){
        this.containers[i].traverse(callback)
      }
    },
    _clearDimensions: function(){
      this.containerDimensions = undefined
    },
    _destroy: function () {
      containerGroups[this.options.group] = undefined
    }
  }

  function Container(element, options) {
    this.el = element
    this.options = $.extend( {}, containerDefaults, options)

    this.group = ContainerGroup.get(this.options)
    this.rootGroup = this.options.rootGroup || this.group
    this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector

    var itemPath = this.rootGroup.options.itemPath
    this.target = itemPath ? this.el.find(itemPath) : this.el

    this.target.on(eventNames.start, this.handle, $.proxy(this.dragInit, this))

    if(this.options.drop)
      this.group.containers.push(this)
  }

  Container.prototype = {
    dragInit: function  (e) {
      var rootGroup = this.rootGroup

      if( !this.disabled &&
          !rootGroup.dragInitDone &&
          this.options.drag &&
          this.isValidDrag(e)) {
        rootGroup.dragInit(e, this)
      }
    },
    isValidDrag: function(e) {
      return e.which == 1 ||
        e.type == "touchstart" && e.originalEvent.touches.length == 1
    },
    searchValidTarget: function  (pointer, lastPointer) {
      var distances = sortByDistanceDesc(this.getItemDimensions(),
                                         pointer,
                                         lastPointer),
      i = distances.length,
      rootGroup = this.rootGroup,
      validTarget = !rootGroup.options.isValidTarget ||
        rootGroup.options.isValidTarget(rootGroup.item, this)

      if(!i && validTarget){
        rootGroup.movePlaceholder(this, this.target, "append")
        return true
      } else
        while(i--){
          var index = distances[i][0],
          distance = distances[i][1]
          if(!distance && this.hasChildGroup(index)){
            var found = this.getContainerGroup(index).searchValidTarget(pointer, lastPointer)
            if(found)
              return true
          }
          else if(validTarget){
            this.movePlaceholder(index, pointer)
            return true
          }
        }
    },
    movePlaceholder: function  (index, pointer) {
      var item = $(this.items[index]),
      dim = this.itemDimensions[index],
      method = "after",
      width = item.outerWidth(),
      height = item.outerHeight(),
      offset = item.offset(),
      sameResultBox = {
        left: offset.left,
        right: offset.left + width,
        top: offset.top,
        bottom: offset.top + height
      }
      if(this.options.vertical){
        var yCenter = (dim[2] + dim[3]) / 2,
        inUpperHalf = pointer.top <= yCenter
        if(inUpperHalf){
          method = "before"
          sameResultBox.bottom -= height / 2
        } else
          sameResultBox.top += height / 2
      } else {
        var xCenter = (dim[0] + dim[1]) / 2,
        inLeftHalf = pointer.left <= xCenter
        if(inLeftHalf){
          method = "before"
          sameResultBox.right -= width / 2
        } else
          sameResultBox.left += width / 2
      }
      if(this.hasChildGroup(index))
        sameResultBox = emptyBox
      this.rootGroup.movePlaceholder(this, item, method, sameResultBox)
    },
    getItemDimensions: function  () {
      if(!this.itemDimensions){
        this.items = this.$getChildren(this.el, "item").filter(":not(.placeholder, .dragged)").get()
        setDimensions(this.items, this.itemDimensions = [], this.options.tolerance)
      }
      return this.itemDimensions
    },
    getItemOffsetParent: function  () {
      var offsetParent,
      el = this.el
      // Since el might be empty we have to check el itself and
      // can not do something like el.children().first().offsetParent()
      if(el.css("position") === "relative" || el.css("position") === "absolute"  || el.css("position") === "fixed")
        offsetParent = el
      else
        offsetParent = el.offsetParent()
      return offsetParent
    },
    hasChildGroup: function (index) {
      return this.options.nested && this.getContainerGroup(index)
    },
    getContainerGroup: function  (index) {
      var childGroup = $.data(this.items[index], subContainerKey)
      if( childGroup === undefined){
        var childContainers = this.$getChildren(this.items[index], "container")
        childGroup = false

        if(childContainers[0]){
          var options = $.extend({}, this.options, {
            rootGroup: this.rootGroup,
            group: groupCounter ++
          })
          childGroup = childContainers[pluginName](options).data(pluginName).group
        }
        $.data(this.items[index], subContainerKey, childGroup)
      }
      return childGroup
    },
    $getChildren: function (parent, type) {
      var options = this.rootGroup.options,
      path = options[type + "Path"],
      selector = options[type + "Selector"]

      parent = $(parent)
      if(path)
        parent = parent.find(path)

      return parent.children(selector)
    },
    _serialize: function (parent, isContainer) {
      var that = this,
      childType = isContainer ? "item" : "container",

      children = this.$getChildren(parent, childType).not(this.options.exclude).map(function () {
        return that._serialize($(this), !isContainer)
      }).get()

      return this.rootGroup.options.serialize(parent, children, isContainer)
    },
    traverse: function(callback) {
      $.each(this.items || [], function(item){
        var group = $.data(this, subContainerKey)
        if(group)
          group.traverse(callback)
      });

      callback(this)
    },
    _clearDimensions: function  () {
      this.itemDimensions = undefined
    },
    _destroy: function() {
      var that = this;

      this.target.off(eventNames.start, this.handle);
      this.el.removeData(pluginName)

      if(this.options.drop)
        this.group.containers = $.grep(this.group.containers, function(val){
          return val != that
        })

      $.each(this.items || [], function(){
        $.removeData(this, subContainerKey)
      })
    }
  }

  var API = {
    enable: function() {
      this.traverse(function(object){
        object.disabled = false
      })
    },
    disable: function (){
      this.traverse(function(object){
        object.disabled = true
      })
    },
    serialize: function () {
      return this._serialize(this.el, true)
    },
    refresh: function() {
      this.traverse(function(object){
        object._clearDimensions()
      })
    },
    destroy: function () {
      this.traverse(function(object){
        object._destroy();
      })
    }
  }

  $.extend(Container.prototype, API)

  /**
   * jQuery API
   *
   * Parameters are
   *   either options on init
   *   or a method name followed by arguments to pass to the method
   */
  $.fn[pluginName] = function(methodOrOptions) {
    var args = Array.prototype.slice.call(arguments, 1)

    return this.map(function(){
      var $t = $(this),
      object = $t.data(pluginName)

      if(object && API[methodOrOptions])
        return API[methodOrOptions].apply(object, args) || this
      else if(!object && (methodOrOptions === undefined ||
                          typeof methodOrOptions === "object"))
        $t.data(pluginName, new Container($t, methodOrOptions))

      return this
    });
  };

}(jQuery, window, 'sortable');
