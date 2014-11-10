$(document).ready(function(){
    RpnModule.init({});
});

var RpnModule = (function () {

    var sequencedatas;
    var currentmod;
    var mainContent;
    var solurl;
    var backurl;
    var responses;
    var warnexit;

    var init = function (opts) {
        _.defaults(opts,{sequrl:"seq.json",solurl:"sol.json",mediaurl:"medias",returnurl:"../",warnonexit:false});
        responses=[];
        warnexit=opts.warnonexit;
        backurl=opts.returnurl;
        solurl=opts.solurl;
        $.getJSON(opts.sequrl,function(datas){
            sequencedatas=datas;
            currentmod=0;
            buildUi();
        });
    };

    var buildUi = function () {
        $('body').append($('<div class="container"><div class="row"><div class="col-md-12"><h1 id="sequenceTitle"></h1></div></div><div class="row"><div class="col-md-8"><h2 id="moduleTitle"></h2><h3 id="moduleContext"></h3><h4 id="moduleDirective"></h4></div><div class="col-md-4"><button class="btn btn-link" id="recallLink" data-toggle="modal" data-target="#recallModal">Rappel</button> <button class="btn btn-link"  id="orderLink" data-toggle="modal" data-target="#orderModal">Consigne</button></div></div><div class="row"><div id="mainContent" class="col-md-12"></div></div></div>'));
        $('body').append($('<div id="recallModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Rappel</h4></div><div class="modal-body" id="recallModalContent"></div></div></div></div>'));
        $('body').append($('<div id="orderModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Consignes</h4></div><div class="modal-body" id="orderModalContent"></div></div></div></div>'));
        $('body').append($('<div id="alertModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Attention</h4></div><div class="modal-body" id="orderModalContent"></div></div></div></div>'));
        $('body').append($('<div id="waitModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Veuillez patienter...</h4></div><div class="modal-body" id="orderModalContent"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        $('#sequenceTitle').html('<i class="edicons-visualidentity-rpn"></i> '+sequencedatas.title);
        mainContent=$('#mainContent');
        if(warnexit){
            $(window).bind('beforeunload', function(e) {
                return "Exercice en cours!";
            });
        }
        displayCurrentModule();
    };

    var displayCurrentModule=function(){
        var mod=sequencedatas.modules[currentmod];
        mainContent.removeClass();
        mainContent.empty();
        $('#moduleTitle').text(mod.title);
        $('#moduleContext').text(mod.context);
        $('#moduleDirective').text(mod.directive);
        $('#waitModal').modal('hide');
        if(mod.type=='marker'){
            RpnMarkerModule.init(mod,mainContent);
        }else if(mod.type=='mqc'){
            RpnMqcModule.init(mod,mainContent);
        }
    };
    
    var handleEndOfModule = function(res,correctionFct){
        //store result locally
        responses[currentmod]={responses:res,correctionFct:correctionFct};
        $('#waitModal').modal('show');
        currentmod++;
        if(_.isUndefined(sequencedatas.modules[currentmod])){
            handleEndOfSequence();
        }else{
            displayCurrentModule();
        }
    };
    
    var handleEndOfSequence = function(){
        //Store responses on server
        
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

//marker module
var RpnMarkerModule = (function() {
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
        var toolbar=$('<div>',{'class':'btn-group'});
        var availableColors=_.shuffle(['primary','success','info','warning','danger']);
        toolbar.append($('<button class="btn btn-default"><i class="glyphicon glyphicon-pencil"></i> Eraser</button>').click(function(){
                selectedMarker=-1;
        }));
        $.each(datas.markers,function(idx,marker){
            toolbar.append($('<button class="btn btn-'+(availableColors[idx]||'default')+'"><i class="glyphicon glyphicon-pencil"></i> '+marker.label+'</button>').click(function(){
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
        validationButton=$('<button>',{'class':'btn btn-primary',text:'Valider'}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function(){
        validationButton.click(function(){
            RpnModule.handleEndOfModule(responses,function(res,sol){
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

//mqc module
var RpnMqcModule = (function() {
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
        var uilist=$('<ul>');
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
        validationButton=$('<button>',{'class':'btn btn-primary',text:' Valider'}).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);
        
        bindUiEvents();
    };
    
    var bindUiEvents = function(){
        validationButton.click(function(){
            RpnModule.handleEndOfModule(responses,function(res,sol){
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
