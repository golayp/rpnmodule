/* global _*/
/*!
 * rpnmodule 0.2.5 (https://github.com/golayp/rpnmodule)
 * 
 * Dependencies: jquery 2.1.3, bootstrap 3.3.7, underscore 1.8.3
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
var rpnsequence = (function() {

    var sequencedatas;
    var currentmod;
    var previousmod;
    var source;
    var cc;
    var solurl;
    var states;
    var successState;
    var responsesState;
    var limitedChoiceState;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    var mediapathHandler;
    var readyHandler;
    var alertModal;
    var resultModal;
    var domelem;
    var validationButton;
    var btnOrder;
    var btnRecall;
    var spanRef;
    var btnSources;
    var bypassModule;
    var testMode;
    var exerciseMode;
    var onlyForwardMode;
    var watchResultMode;
    var testAndResultMode;
    var testNumber;
    var navigationEnabled;
    var debug;
    var loadstate;
    var selectedLabels;
    var moduleLocation;
    var modules;
    var tooltipPlacement;
    var respmodulearray=new Array();
    var limitOfSufficiency;
    var finished;
    var viewResultAfterTest;
    var clickEndBtn;
    var licence;
    var returnPage;
    var docModule;
    var disablestateloading;
    var hostingMode;

    var labels = {
        en: {
            Sources:"Sources",
            Recall: "Recall",
            Order: "Order",
            Warning: "Warning",
            Result: "Result",
            Score: "You have got",
            FirstTest: "First test : ",
            SecondTest: "Second test : ",
            ThirdTest: "Third test : ",
            Correct: "There are one or more errors , corrects them.",
            Congratulations: "Congratulations, it's correct.",
            Error: "Roll over the answers to discover your mistakes.",
            Solution: "Roll over the answers to discover solutions.",
            True: "TRUE",
            False: "FALSE",
            BeforeUnloadMsg: "Module running!",
            Wait: "Please wait...",
            Next: "Next",
            Validate: "Validate",
            EndSequence:"Continue",
            EndSequenceHostingMode:"Exercise ended",
            Eraser: "Eraser",
            DragDropNotEmpty: "There are still some items to sort!",
            CardMazeNotEnded: "You have not finished the maze!",
            BlackboxTableView: "Values table",
            BlackboxView: "Blackbox",
            Quit:"Quit"
        },
        fr: {
            Sources:"sources",
            Recall: "Rappel",
            Order: "Consignes",
            Warning: "Attention",
            Result: "Résultat",
            Score: "Tu as obtenu",
            FirstTest: "Premier essai : ",
            SecondTest: "Deuxième essai : ",
            ThirdTest: "Troisième essai : ",
            Correct: "Il y a une ou plusieurs erreurs, corrige-les.",
            Congratulations: "Félicitations, c'est juste.",
            Error: "Survole les réponses pour découvrir tes erreurs.",
            Solution: "Survole les réponses pour découvrir les solutions.",
            True: "JUSTE",
            False: "FAUX",
            BeforeUnloadMsg: "Exercice en cours!",
            Wait: "Veuillez patienter...",
            Next: "Suite",
            Validate: "Valider",
            EndSequence:"Continuer",
            EndSequenceHostingMode:"Exercice terminé",
            Eraser: "Effaceur",
            DragDropNotEmpty: "Il y a encore des éléments à trier!",
            CardMazeNotEnded: "Vous n'avez pas terminé le labyrinthe!",
            BlackboxTableView: "Tableau de valeurs",
            BlackboxView: "Boîte noire",
            Quit:"Quitter"
        }
    };

    var init = function(opts) {
        if (_.isUndefined(opts)) {
            opts = {};
        }
        _.defaults(opts, {
            sequrl: "seq.json",
            solurl: "sol.json",
            stateurl:"sta.json",
            warnonexit: false,
            domelem: $('body'),
            onsequenceend: function(states, score) {},
            onmoduleend: function() {},
            onsequenceready:function(){},
            language: "en",
            debug: false,
            disablestateloading:false,
            navigationEnabled: false,
            quitDisabled:false,
            bypassModule:false,
            testMode:false,
            exerciseMode: false,
            onlyForwardMode:false,
            watchResultMode: false,
            testAndResultMode:false,
            limitOfSufficiency: 0.6,
            finished:false,
            viewResultAfterTest:false,
            clickEndBtn:false,
            licence:'<span><a target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/2.0/fr/" rel="license"><img width="57" height="20" style="border-width: 0" alt="Creative Commons License" src="http://i.creativecommons.org/l/by-nc-sa/2.0/fr/88x31.png"></a></span>',
            returnPage:"../",
            docModule:false,
            hostingMode:false
        });
        selectedLabels = labels[opts.language];
        states = [];
        modules=[];
        warnexit = opts.warnonexit;
        solurl = opts.solurl;
        debug = opts.debug;
        loadstate=!opts.disablestateloading;
        domelem = opts.domelem;
        sequenceendHandler = opts.onsequenceend;
        moduleendHandler = opts.onmoduleend;
        readyHandler = opts.onsequenceready;
        limitOfSufficiency = opts.limitOfSufficiency;
        
        bypassModule=opts.bypassModule;
        testMode=opts.testMode;
        exerciseMode=opts.exerciseMode;
        onlyForwardMode=opts.onlyForwardMode;
        watchResultMode=opts.watchResultMode;
        testAndResultMode=opts.testAndResultMode;
        finished=opts.finished;
        viewResultAfterTest=opts.viewResultAfterTest;
        clickEndBtn=opts.clickEndBtn;
        licence=opts.licence;
        returnPage=opts.returnPage;
        docModule=opts.docModule;
        hostingMode=opts.hostingMode;
        
        $.getJSON(opts.sequrl, function(datas) {
            _.defaults(datas, {
                title: "sequencetitle",
                modules: [],
                itemRef:""
            });
            sequencedatas = datas;
            //add dynamically status of module to each modules to handle the status (init->started->ended)
            _.each(sequencedatas.modules, function(elem, idx) {
                elem["status"] = "init";
            });
            currentmod = 0;
            navigationEnabled = opts.navigationEnabled && sequencedatas.modules.length > 1 && !opts.exerciseMode;
            if(loadstate){
                $.getJSON(opts.stateurl,function(savedStates){
                    states=_.map(sequencedatas.modules,function(mod,idx){return { state:savedStates.states[idx]};});
                    buildUi();
                }).error(function() {
                    states=_.map(sequencedatas.modules,function(mod,idx){return { state:undefined};});
                    buildUi();
                });
            }else{
                states=_.map(sequencedatas.modules,function(mod,idx){return { state:undefined};});
                buildUi();
            }
            
        });
    };
    var getColor = function(idx){
        return ["#8d61a4","#01a271","#5dc2e7","#ed656a","#f5a95e","#eee227","#7a5a14","#bbbbbb","#63b553","#e95c7b","#9966ff","#777777","#3366cc","#bb0000","#00bb00","#0000bb","#cccc00","#ee5500","#77aaaa","#222222"][idx];
    }
    var buildUi = function() {
        moduleLocation=$('<div class="sequencebody"></div>')
        validationButton=$('<button class="btn btn-success" id="rpnm_validation"></button>');
        btnOrder=$('<button class="btn btn-default btn-sm" data-target="#rpnm_order_modal" data-toggle="modal"><span class="visible-xs visible-sm"><i class="glyphicon glyphicon-question-sign"></i></span><span class="visible-md visible-lg"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</span></button>');
        btnRecall=$('<button class="btn btn-default btn-sm" data-target="#rpnm_recall_modal" data-toggle="modal"><span class="visible-xs visible-sm"><i class="glyphicon glyphicon-bell"></i></span><span class="visible-md visible-lg"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</span></button>');
        btnSources=$('<button class="srcbtn btn btn-default btn-sm" data-target="#rpnm_sources_modal" data-toggle="modal"><span class="visible-xs visible-sm"><i class="glyphicon glyphicon-book"></i></span><span class="visible-md visible-lg"><i class="glyphicon glyphicon-book"></i> ' + selectedLabels.Sources + '</span></button>');
        spanRef=$('<span class="itemRef"><h4>'+sequencedatas.itemRef+'</h4></span>');
        //source=$('<div class="col-md-12"></div>');
        cc=$('<div class="col-md-12" id="cc"></div>');
        var baseContainer=$('<div class="container"></div>');
        if(!_.isUndefined(sequencedatas.cssClass)){
            baseContainer.addClass(sequencedatas.cssClass);
        }
        domelem.append([
            baseContainer.append([
                $('<div class="row sequence-header"></div>').append([
                    $((exerciseMode ? '<div class="col-md-7">' : '<div class="col-md-5">') + '<h1>'+sequencedatas.title+'</h1></div>'),
                    $(exerciseMode ? '<div class="col-md-3"><nav id="rpnm_modulestate"></div>' : '<div class="col-xs-4"><nav id="rpnm_modulenav"><ul class="pagination pagination-sm"></div>'),
                    $((exerciseMode ? '<div class="col-md-1">' : '<div class="col-md-3">') + '</div>').append([
                        btnOrder,
                        btnRecall,
                        spanRef
                    ]),
                ]),
                moduleLocation,
                $('<div class="row sequence-footer"></div>').append([
                    $('<div class="col-md-12" id="rpnm_toolbar"></div>').append(
                        validationButton
                    ),
                    btnSources,
                    //source,
                    cc
                ])
            ])
        ]);
        domelem.append($('<div id="rpnm_sources_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-book"></i> ' + selectedLabels.Sources + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_recall_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_order_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_alert_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> ' + selectedLabels.Warning + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_result_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"> ' + selectedLabels.Result + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_wait_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + selectedLabels.Wait + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        alertModal = $('#rpnm_alert_modal');
        resultModal = $('#rpnm_result_modal');
        if (!navigationEnabled) {
            $('#rpnm_modulenav').remove();
        }
        _.each(sequencedatas.modules, function(modData, idx) {
            docModule = false;
            _.defaults(modData,{
                disposition:'top'
            });
            var modTitle=$('<h2 id="rpnm_title"></h2>');
            if(_.isUndefined(modData.title)){
                modTitle.hide();
            }else{
                modTitle.html(modData.title);
                modTitle.show();
            }
            var divContext=$('<div id="rpnm_context"></div>');
            var divDirective=$('<div id="rpnm_directive"></div>');
            var divPlayer=$('<div id="player">')
            var divContent=$('<div>');
            
        
            var rpnmInstance = $('<div id="rpnm_inst_' + idx + '" class="row rpnm_instance">');
                
            if(modData.disposition=='bottom'){
                divContent.addClass('col-md-12');
                rpnmInstance.append([
                    divContent,
                    $('<div class="col-md-12"></div>').append([modTitle,divContext,divDirective,divPlayer])
                ]);
            }else if(modData.disposition=='left'){
                divContent.addClass('col-md-6');
                rpnmInstance.append([
                    $('<div class="col-md-6"></div>').append([modTitle,divContext,divDirective,divPlayer]),
                    divContent
                ]);
            }else if(modData.disposition=='right'){
                divContent.addClass('col-md-6');
                rpnmInstance.append([
                    divContent,
                    $('<div class="col-md-6"></div>').append([modTitle,divContext,divDirective,divPlayer])
                ]);
            }else{
                //default top
                divContent.addClass('col-md-12');
                rpnmInstance.append([
                    $('<div class="col-md-12"></div>').append([modTitle,divContext,divDirective,divPlayer]),
                    divContent
                ]);
            }
            
            var player = _.isUndefined(modData.player)? (_.isUndefined(sequencedatas.player) || idx!=0) ? '' : sequencedatas.player : modData.player;
            
            if(player!=''){
                var controlsVal = _.isUndefined(player.controls) ? 'controls' : player.controls;
                var sourceAudioLink = hostingMode ? "../../../../medias/" : "/medias/";
                var audioTag = $("<audio " + (controlsVal=='controls' ? 'controls' : '') + "><source src='" + sourceAudioLink + player.source + ".ogg' type='audio/ogg'><source src='" + sourceAudioLink + player.source + ".mp3' type='audio/mpeg'></audio>");
                var playBtn = controlsVal=='play' ? $("<button class='play control'><span class='glyphicon glyphicon-play-circle' aria-hidden='true'></span></button>").click(function(){
                    $('audio')[idx].play();
                    $(this).attr('disabled', 'disabled').addClass('clicked')
                }) : '';
                divPlayer.show().append([audioTag, playBtn]);
            }else{
                divPlayer.hide();
            }
            
            _.isUndefined(modData.context)? _.isUndefined(sequencedatas.context) ? divContext.hide():divContext.show().html(sequencedatas.context) :divContext.show().html(modData.context);
            _.isUndefined(modData.directive)? _.isUndefined(sequencedatas.directive) ? divDirective.hide(): divDirective.show().html(sequencedatas.directive) : divDirective.show().html(modData.directive);
            
            
            
            if(_.isNull(states[idx]).state){
                _.isNull(states[idx]).state=undefined;
            }
            if (modData.type == 'marker') {
                modules[idx]=rpnmarkermodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'mqc') {
                modules[idx]=rpnmqcmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'gapsimple') {
                modules[idx]=rpngapsimplemodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'gapfull') {
                modules[idx]=rpngapfullmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'clock') {
                modules[idx]=rpnclockmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'blackbox') {
                modules[idx]=rpnblackboxmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'dragdropsorting') {
                modules[idx]=rpndragdropsortingmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'cardmaze') {
                modules[idx]=rpncardmazemodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'dropdown') {
                modules[idx]=rpndropdownmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'dropdown2') {
                modules[idx]=rpndropdown2module();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'sorting') {
                modules[idx]=rpnsortingmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'map') {
                modules[idx]=rpnmapmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'doc') {
                docModule = true;
                modules[idx]=rpndocmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'geogebra') {
                modules[idx]=rpngeogebramodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'multiplelistssync') {
                modules[idx]=rpnmultiplelistssyncmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            
            tooltipPlacement = (modData.type=='dropdown' || modData.type=='dropdown2' || modData.type=='gapsimple' || modData.type=='marker') ? 'top' : 'right';
            
            moduleLocation.append(rpnmInstance);
            //load plumb module after dom append in order to make connector available for paint
            if (modData.type == 'plumb') {
                modules[idx]=rpnplumbmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            handleMediaPath(rpnmInstance);
            rpnmInstance.hide();
            if(modData.type!='gapfull'){
                divContent.disableSelection();
            }
            $('#rpnm_modulenav ul').append($('<li><a href="#">' + (onlyForwardMode?'&nbsp;&nbsp;':(idx + 1)) + '</a></li>'));
            if(bypassModule && idx==sequencedatas.modules.length-1){
                handleEndOfSequence();
            }
            $('#rpnm_modulestate').append($('<h4><span class="label label-default">' + (idx + 1) + '</span></h4>'));
        });
        if (warnexit) {
            $(window).bind('beforeunload', function(e) {
                return selectedLabels.BeforeUnloadMsg;
            });
        }
        bindUiEvents();
        displayCurrentModule();
        ready();
    };
    
    
    var ready=function(){
        readyHandler();
    };
    
    var bindUiEvents = function() {
        //Validation
        validationButton.click(function(){
            $(this).hasClass("btn-success") ? clickEndBtn = true : '';
            if (this.id=="rpnm_validation"){
                handleEndOfModule(modules[currentmod].validate(),currentmod+1);
            }else if(currentmod>sequencedatas.modules.length-1){
                handleEndOfSequence();
            }else{
                displayCurrentModule();
            }
        });
        //Navigation
        if (navigationEnabled && sequencedatas.modules.length > 1 && !exerciseMode && !onlyForwardMode) {
            _.each($('#rpnm_modulenav ul li'),function(nav,idx){
                $(nav).click(function() {
                    modules[currentmod].validate();
                    handleEndOfModule(modules[currentmod].validate(),idx);
                });
            });
        }
    };

    var displayCurrentModule = function() {
        var moduleDatas = sequencedatas.modules[currentmod];
        _.defaults(moduleDatas, {
            title: "title"
        });
        $('.rpnm_instance').hide();

        var moduleDiv = $('#rpnm_inst_' + currentmod);
        if(!_.isUndefined(moduleDatas.cssClass)){
            moduleDiv.addClass(moduleDatas.cssClass);
        }
        bindModuleSharedDatas(moduleDatas);
        
        //navigation
        if (navigationEnabled) {
            $('#rpnm_modulenav ul li').removeClass('active');
            $($('#rpnm_modulenav ul li')[currentmod]).addClass('active');
            validationButton.attr("id","rpnm_validation");
        }
        if(exerciseMode) {
            $($('#rpnm_modulestate h4 span')[currentmod]).removeClass('label-default').addClass('label-primary');
            testNumber = 1;
        }
        
        if(currentmod==sequencedatas.modules.length-1 && !exerciseMode){
            var endButtonLabel = hostingMode ? selectedLabels.EndSequenceHostingMode : selectedLabels.EndSequence;
            validationButton.html(endButtonLabel+' <i class="glyphicon glyphicon glyphicon-ok-circle"></i>').removeClass("btn-primary").addClass("btn-success");
        }else if(exerciseMode){
            validationButton.html(selectedLabels.Validate+' <i class="glyphicon glyphicon-ok-circle"></i>').removeClass("btn-success").addClass("btn-primary").attr("id","rpnm_validation");
        }else{
            validationButton.html(selectedLabels.Next+' <i class="glyphicon glyphicon-chevron-right"></i>').removeClass("btn-success").addClass("btn-primary");
        }
        
        if(watchResultMode){
            $.getJSON(solurl, function(ssol) {
                var score = 0;
                var pointmax = 0;

                score = modules[currentmod].score(ssol.solutions[currentmod]);
                pointmax +=modules[currentmod].pointmax(ssol.solutions[currentmod]);
                modules[currentmod].validate();

                JSON.stringify({states:_.map(states,function(sta, idx){respmodulearray[idx]=(sta.state);return sta.state;})},null, '\t');
                    
                successState = modules[currentmod].successState();
                responsesState = modules[currentmod].responsesState();
                
                var text = score==pointmax ? selectedLabels.Congratulations : selectedLabels.Solution;
                
                //validationButton.html(selectedLabels.Next+' <i class="glyphicon glyphicon-chevron-right"></i>').removeClass("btn-success").addClass("btn-primary").attr("id","rpnm_next");

                $($('#rpnm_modulestate h4 span')[previousmod]).removeClass('label-default').addClass('label-success');
                _.each(responsesState, function(val, idx) {
                    var checkText = (successState[idx][0] == 'ok') ? '' : ("<div style=\"color: green;\">" + successState[idx][1] + "</div>");
                    $(val).attr('data-html', true).attr('data-placement', tooltipPlacement).attr('data-original-title', checkText).tooltip().on('mouseenter', function(){
                    $(this).tooltip('show').on('mouseleave', function(){
                        $(this).tooltip('hide');
                    });
                });
                    successState[idx][0] == 'ok' ? $(val).removeClass("error").addClass("exact") : $(val).removeClass("exact").addClass("error");
                    $(val).off("mousedown", handleErrorExact);
                });
                answersActionOff(currentmod);
            });
        }
        if(viewResultAfterTest){
            $.getJSON(solurl, function(ssol) {
                modules[currentmod].validate();
                successState = modules[currentmod].successState();
                responsesState = modules[currentmod].responsesState();
                
                _.each(responsesState, function(val, idx) {
                    var checkText = (successState[idx][0] == 'ok') ? '' : ("<div style=\"color: green;\">" + successState[idx][1] + "</div>");
                    $(val).attr('data-html', true).attr('data-placement', tooltipPlacement).attr('data-original-title', checkText).tooltip().on('mouseenter', function(){
                    $(this).tooltip('show').on('mouseleave', function(){
                        $(this).tooltip('hide');
                    });
                });
                    successState[idx][0] == 'ok' ? $(val).removeClass("error").addClass("exact") : $(val).removeClass("exact").addClass("error");
                    $(val).off("mousedown", handleErrorExact);
                });
                answersActionOff(currentmod);
            });
        }
        
        moduleDiv.show();
        if(!_.isUndefined( modules[currentmod].displayed)){
            modules[currentmod].displayed();
        }
    };

    var bindModuleSharedDatas = function(datas) {
        if (!_.isUndefined(datas.sources)){
            $('#rpnm_sources_modal .modal-body').html(datas.sources);
            btnSources.show();
        }else if(!_.isUndefined(sequencedatas.sources)){
            $('#rpnm_sources_modal .modal-body').html(sequencedatas.sources);
            btnSources.show();
        }
        if (!_.isUndefined(datas.recall)){
            $('#rpnm_recall_modal .modal-body').html(datas.recall);
            btnRecall.show();
        }else if(!_.isUndefined(sequencedatas.recall)){
            $('#rpnm_recall_modal .modal-body').html(sequencedatas.recall);
            btnRecall.show();
        }
        if (!_.isUndefined(datas.order)) {
            $('#rpnm_order_modal .modal-body').html(datas.order);
            btnOrder.show();
        }else if(!_.isUndefined(sequencedatas.order)){
            $('#rpnm_order_modal .modal-body').html(sequencedatas.order);
            btnOrder.show();
        }
        if(_.isUndefined(datas.sources)&&_.isUndefined(sequencedatas.sources)){
            btnSources.hide();  
        }else{
            handleMediaPath($('#rpnm_sources_modal .modal-body'));
        }
        if(_.isUndefined(datas.recall)&&_.isUndefined(sequencedatas.recall)){
            btnRecall.hide();  
        }else{
            handleMediaPath($('#rpnm_recall_modal .modal-body'));
        }
        if(_.isUndefined(datas.order)&&_.isUndefined(sequencedatas.order)){
            btnOrder.hide();  
        }else{
            handleMediaPath($('#rpnm_order_modal .modal-body'));
        }
        //source.html(_.isUndefined(datas.sources) ? _.isUndefined(sequencedatas.sources)?"":sequencedatas.sources :  datas.sources);
        if (exerciseMode){
            cc.html(_.isUndefined(datas.licence) ? _.isUndefined(sequencedatas.licence) ? licence : sequencedatas.licence : datas.licence);
        }
        returnPage = _.isUndefined(sequencedatas.homepage) ? returnPage : sequencedatas.homepage;
    };

    var handleEndOfModule = function(state,nextmodtoshow) {
        //store result locally
        states[currentmod] = {
            state:state
        };
        
        //check if the exercise is finished in onlyForwardMode
        if (onlyForwardMode){
            var modType = sequencedatas.modules[currentmod].type;
            var modFinished = false;
            if (modType=="gapsimple" || modType=="dropdown" || modType=="dropdown2"){
                modFinished = !_.contains(states[currentmod].state,"");
            }
            else if (modType=="mqc" || modType=="marker"){
                modFinished = !_.contains(states[currentmod].state.responses,"");
            }else if(modType=="plumb"){
                if(states[currentmod].state.responses[currentmod]){
                    rpnsequence.log('states[currentmod].state.responses[currentmod]'+states[currentmod].state.responses[currentmod])
                 modFinished = !_.contains(states[currentmod].state.responses[currentmod],"");
                }
            }else if (modType=="dragdropsorting"){
                var dragfromtext = states[currentmod].state.dragfromtext;
                if(dragfromtext){
                    var stateList = _.pairs(states[currentmod].state);
                    var todropListLength = 0;
                    _.each(stateList, function(val, idx) {
                        idx>2?todropListLength = todropListLength + val[1].length:todropListLength;
                    });
                    modFinished = states[currentmod].state.todrag.length <= todropListLength;
                }
                else{
                    modFinished = !states[currentmod].state.todrag.length;
                }
            }
            else{
                modFinished = true;
            }
            if(!modFinished){
                displayNotFinished("Tu n'as pas terminé l'exercice.",nextmodtoshow = nextmodtoshow-1);
            };
        }
        
        moduleendHandler({states:_.map(states,function(sta){return sta.state;})},function(){
            //Save status of module
            finished = currentmod==sequencedatas.modules.length-1;
            sequencedatas.modules[currentmod].status = 'ended';
            previousmod = currentmod;
            currentmod = nextmodtoshow;
            if (exerciseMode && !docModule){
                $.getJSON(solurl, function(ssol) {
                    var score = 0;
                    var score = 0;
                    var pointmax = 0;

                    score =modules[previousmod].score(ssol.solutions[previousmod]);
                    pointmax +=modules[previousmod].pointmax(ssol.solutions[previousmod]);

                    JSON.stringify({states:_.map(states,function(sta, idx){respmodulearray[idx]=(sta.state);return sta.state;})},null, '\t');
                    
                    log('SCORE: '+ score + ' / ' + pointmax);
                    if (warnexit) {
                        $(window).unbind('beforeunload');
                    }
                    
                    text = testNumber==1 ? selectedLabels.FirstTest + '<br>' : (testNumber==2 ? selectedLabels.SecondTest + '<br>' : selectedLabels.ThirdTest + '<br>' + selectedLabels.Score + ' ' + score + ' point' + (score>1?'s':'') + " / " + pointmax + ' point' + (pointmax>1?'s.<br>':'.<br>'));
                    successState = modules[previousmod].successState();
                    responsesState = modules[previousmod].responsesState();
                    limitedChoiceState = modules[previousmod].limitedChoiceState();
                    
                    if((score==pointmax && pointmax!=0) || testNumber>=3){
                        limitOfSufficiency = _.isUndefined(sequencedatas.modules[previousmod].limitOfSufficiency) ? limitOfSufficiency : sequencedatas.modules[previousmod].limitOfSufficiency;
                        text = text.concat(score==pointmax ? selectedLabels.Congratulations : selectedLabels.Solution);
                        displayResult(text,function(){
                            //sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score, returnPage);
                        });
                        if(currentmod==sequencedatas.modules.length){
                            var endButtonLabel = hostingMode ? selectedLabels.EndSequenceHostingMode : selectedLabels.EndSequence;
                            validationButton.html(endButtonLabel+' <i class="glyphicon glyphicon-chevron-right"></i>').removeClass("btn-primary").addClass("btn-success").attr("id","rpnm_next");
                        }else{
                            validationButton.html(selectedLabels.Next+' <i class="glyphicon glyphicon-chevron-right"></i>').removeClass("btn-success").addClass("btn-primary").attr("id","rpnm_next");
                        }
                         $($('#rpnm_modulestate h4 span')[previousmod]).removeClass('label-default').addClass('label-success');
                        if (testNumber>=3){
                            _.each(responsesState, function(val, idx) {
                                var checkText = (successState[idx][0] == 'ok') ? '' : ("<div style=\"color: green;\">" + successState[idx][1] + "</div>");
                                $(val).attr('data-html', true).attr('data-placement', tooltipPlacement).attr('data-original-title', checkText).tooltip().on('mouseenter', function(){
                                    $(this).tooltip('show').on('mouseleave', function(){
                                        $(this).tooltip('hide');
                                    });
                                });
                                successState[idx][0] == 'ok' ? $(val).removeClass("error").addClass("exact") : $(val).removeClass("exact").addClass("error");
                                $(val).off("mousedown", handleErrorExact);
                            });
                            answersActionOff(previousmod);
                            
                            if (score/pointmax < limitOfSufficiency){
                                $($('#rpnm_modulestate h4 span')[previousmod]).removeClass('label-default').addClass('label-danger');
                            }else if(score==pointmax){
                                $($('#rpnm_modulestate h4 span')[previousmod]).removeClass('label-default').addClass('label-success');
                            }else{
                                $($('#rpnm_modulestate h4 span')[previousmod]).removeClass('label-default').addClass('label-warning');
                            }
                        }
                        testNumber=1;
                    }else{
                        var text;
                        if (testNumber==1){
                            text = text.concat(selectedLabels.Correct);
                        }else{
                            text = text.concat(selectedLabels.Score + ' ' + score + ' point' + (score>1?'s':'') + " / " + pointmax + ' point' + (pointmax>1?'s.':'.'));
                            if (!limitedChoiceState){
                                _.each(responsesState, function(val, idx) {
                                    /*var checkText = (successState[idx][0] == 'ok') ? ("<div style=\"color: green;\"><span class=\"glyphicon glyphicon-ok-sign\" ></span></div>") : ("<div style=\"color: red;\"><span class=\"glyphicon glyphicon-remove-sign\"></span></div>");
                                    $(val).attr('data-html', true).attr('data-placement', tooltipPlacement).attr('data-original-title', checkText).tooltip();*/
                                    successState[idx][0] == 'ok' ? $(val).removeClass("error").addClass("exact") : $(val).removeClass("exact").addClass("error");
                                    $(val).on("mousedown", handleErrorExact);
                                });
                            }
                        }
                        displayResult(text,function(){
                            //sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score, returnPage);
                        });
                        currentmod = previousmod;
                        testNumber++;
                    }
                });
            }else if (testAndResultMode && finished && !viewResultAfterTest && clickEndBtn && !docModule){
                handleGoToResult();
            }else if(currentmod>sequencedatas.modules.length-1){
                handleEndOfSequence();
            }else{
                displayCurrentModule();
            }       
        });
    };
    
    var handleErrorExact = function(){
        $(this).removeClass("error").removeClass("exact");
    };
    
    var answersActionOff = function(modNum){
        var domInst = '#rpnm_inst_'+modNum;
        
        //Disable sortable
        _.each($('.ui-sortable', domInst), function(sort, id){
            $(sort).sortable({
              disabled: true
            });
        });
        //Disable input text
        _.each($('input[type="text"]', domInst), function(inp, id){
            $(inp).attr('readonly', true);
        });
        //Disable mqc
        if (sequencedatas.modules[modNum].type == 'mqc'){
            _.each($('label', domInst), function(lab, id){
                $(lab).attr('disabled', 'disabled');
            });
        };
        //Disable marker
        if (sequencedatas.modules[modNum].type == 'marker'){
            _.each($('b', domInst), function(mar, id){
                $(mar).unbind();
                var checkText = (successState[id][0] == 'ok') ? '' : ("<div style=\"color: green;\">" + successState[id][1] + "</div>");
                $(mar).attr('data-html', true).attr('data-placement', tooltipPlacement).attr('data-original-title', checkText).tooltip().on('mouseenter', function(){
                    $(this).tooltip('show').on('mouseleave', function(){
                        $(this).tooltip('hide');
                    });
                });
            });
        };
        //Disable dropdown
        _.each($('select', domInst), function(sel, id){
            var opt = $(sel).val();
            $(sel).on('change', function(){
                $(this).val(opt);
            });
        });
        //Disable draggable
        _.each($('.ui-draggable', domInst), function(drag, id){
            $(drag).draggable({
              disabled: true
            });
        });
        //Disable singledraggable
        _.each($('.singledraggable', domInst), function(sin, id){
            $(sin).attr('draggable', false);
        });
        //disable plumb
        if (sequencedatas.modules[modNum].type == 'plumb'){
            _.each($('svg', domInst), function(drag, id){
                jsPlumb.draggable($("svg"), { snap: true});
                drag.style.pointerEvents='none';

             });
            _.each($('.notif', domInst), function(drag, id){
                drag.style.pointerEvents='auto';
             });
            _.each($('li', domInst), function(drag, id){
                drag.style.pointerEvents='none';
             });
            var mynum='rpnm_inst_'+modNum;
            //$('#'+mynum).style.pointerEvents='none';
            document.getElementById(mynum).style.pointerEvents='none';
        }
           
    };
    
    var modulesresponse = function(){
        return respmodulearray;
    };
    
    var resultMode = function(){
        return (!loadstate);
    }

    var handleEndOfSequence = function() {
        log('End of sequence');
        returnPage = _.isUndefined(sequencedatas.homepage) ? returnPage : sequencedatas.homepage;
        
        if(!testMode && !bypassModule){
            log(JSON.stringify({states:_.map(states,function(sta){return sta.state;})},null, '\t'));
        }
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            var pointmax = 0;
                        
            _.each(ssol.solutions, function(sol, idx) {
                score +=modules[idx].score(sol);
                pointmax +=modules[idx].pointmax(sol);
            });
            log('SCORE: '+ score + ' / ' + pointmax);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            if(testMode && !exerciseMode && !docModule){
                displayAlert('Score :' + score + ' pt' + (score>1?'s':''),function(){
                    sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score, returnPage);
                });
            }
            else if(exerciseMode && !docModule){
                displayResult(selectedLabels.Score + ' ' + score + ' point' + (score>1?'s':'') + " / " + pointmax + ' point' + (pointmax  >1?'s':''),function(){
                    sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score, returnPage);
                });
            }
            else{
                sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score, returnPage);
            }
        });
    };
    
    var handleGoToResult = function(){
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            var pointmax = 0;

            _.each(ssol.solutions, function(sol, idx) {
                score +=modules[idx].score(sol);
                pointmax +=modules[idx].pointmax(sol);
            });
            log('SCORE: '+ score + ' / ' + pointmax);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            //Display first module with solutions
            currentmod = 0;
            successState = modules[currentmod].successState();
            responsesState = modules[currentmod].responsesState();
            displayCurrentModule();
            
            _.each(responsesState, function(val, idx) {
                var checkText = (successState[idx][0] == 'ok') ? '' : ("<div style=\"color: green;\">" + successState[idx][1] + "</div>");
                $(val).attr('data-html', true).attr('data-placement', tooltipPlacement).attr('data-original-title', checkText).tooltip().on('mouseenter', function(){
                    $(this).tooltip('show').on('mouseleave', function(){
                        $(this).tooltip('hide');
                    });
                });
                successState[idx][0] == 'ok' ? $(val).removeClass("error").addClass("exact") : $(val).removeClass("exact").addClass("error");
                $(val).off("mousedown", handleErrorExact);
            });
            answersActionOff(currentmod);

            var text = "Tu as obtenu " + score + " point" + (score>1?"s":"") + " / " + pointmax + " point" + (pointmax  >1?"s":"") + "<br>" +selectedLabels.Solution+ ".";
            
            displayResult(text, function(){
                //sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score, returnPage);
            });
            viewResultAfterTest = true;
        });
    }

    var displayAlert = function(text, onclose) {
        $('#rpnm_alert_modal .modal-body').text(text);
        alertModal.modal();
        alertModal.on('hidden.bs.modal', function() {
            if (!_.isUndefined(onclose)) {
                onclose();
            }
        });
    };
    
    var displayNotFinished = function(text, onclose) {
        $('#rpnm_alert_modal .modal-body').text(text);
        alertModal.modal();
        alertModal.on('hidden.bs.modal', function() {
            if (!_.isUndefined(onclose)) {
                onclose();
            }
        });
    };
    
    var displayResult = function(text, onclose) {
        $('#rpnm_result_modal .modal-body').html(text);
        resultModal.modal();
        resultModal.on('hidden.bs.modal', function() {
            if (!_.isUndefined(onclose)) {
                onclose();
            }
        });
    };

    var log = function(msg) {
        if (debug) {
            console.log(msg);
        }
    };

    var handleMediaPath = function(content) {
        //Images paths
        _.each($('img:not(.rpnm-img, .rpnm-mediapath)',content), function(elem, idx) {
            var img = $(elem);
            img.addClass('rpnm-mediapath');
            if (img.is('.modal-body img')) {
                img.addClass('img-responsive img-rounded');
            }
        });
    };

    var getLabels = function() {
        return selectedLabels;
    };
    
    var addvalidation = function(inputs,validationoptions){
        if(_.isUndefined(validationoptions)){
            return;
        }
        _.defaults(validationoptions,{
            mode:"lock",
            type:"natural"
        });
        
        //prevent copy paste cut
        $(inputs).bind("cut copy paste",function(e) {
            e.preventDefault();
        });
        if(validationoptions.mode=='lock'){
            
            $(inputs).bind('input propertychange',function(){
                if ($(this).val()==""){
                   $(this).val(''); 
                }else{
                    var mylength=$(this).val().length;
                    var mydecimals=0;
                    if($(this).val().split(".")[1]){
                       mydecimals=$(this).val().split(".")[1].length;
                    }
                    var myelement=document.activeElement;
                    myelement.focus();
                    var myelementcursor=myelement.selectionStart;
                    var myvalbeorenumberofchar=$(this).val();
                    if(validationoptions.numberofdecimals && validationoptions.numberofchar){
                       if(mydecimals>validationoptions.numberofdecimals && mylength+1<validationoptions.numberofchar){
                            $(this).val($(this).val().substr(0,mylength-1));
                        }
                        else if(mydecimals>validationoptions.numberofdecimals){
                              $(this).val($(this).val().substr(0,mylength-1));
                        }
                        else if(mylength>validationoptions.numberofchar){
                            if($(this).val().charAt(validationoptions.numberofchar-1)=="."){
                               $(this).val($(this).val().substr(0,mylength-2));
                            }else{
                               mylength=validationoptions.numberofchar;
                               $(this).val($(this).val().substr(0,mylength));
                            }

                        }
                    } else if(validationoptions.numberofdecimals){
                        if(mydecimals>validationoptions.numberofdecimals){
                             $(this).val($(this).val().substr(0,mylength-1));
                        }
                    }
                    if(validationoptions.numberofchar){
                        if(validationoptions.type=="natural"){
                            var mylength=$(this).val().length;
                        }else{
                            var mylength=$(this).val().length+1;
                        }
                        if(mylength>validationoptions.numberofchar){
                            if($(this).val().charAt(validationoptions.numberofchar-1)=="."){
                               $(this).val($(this).val().substr(0,mylength-2));
                            }else{
                               mylength=validationoptions.numberofchar;
                               $(this).val($(this).val().substr(0,mylength));
                            } 
                        }
                    }
                    if(validationoptions.type=="natural"){

                        if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                        var val_0=$(this).val();
                        var negative='';
                        if (val_0.match(/^-/)){
                            negative='';
                            mystring=val_0.substring(1,myelementcursor);
                            $(this).val(myvalbeorenumberofchar);
                        }

                        var stringbeforecursor= val_0.substring(0,myelementcursor);
                        var stringaftercursor= val_0.substring(myelementcursor);
                        var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                        var nbofseparator1=0;
                        if(nbofseparatorbeforearray1){
                            nbofseparator1=nbofseparatorbeforearray1.length;
                        }
                        var firstchardigit='';
                        val_0=val_0.split('\'');
                        val_0=val_0.join('');
                        var val=/^[\d]\d*/.exec(val_0);

                        if(val==null){
                            val=[myvalbeorenumberofchar.split('.').join('')];
                            val=/^[\d]\d*/.exec(val_0);
                            myelementcursor=myelementcursor-1;
                            val="";
                            $(this).val(val);
                        }
                        else if (val[0]!=val_0){
                            val[0]=val[0]+stringaftercursor;
                            myelementcursor=myelementcursor-1;
                        }
                        if (val[0].match(/^-/)){
                            negative='';
                            val[0]=val[0].substr(1);
                        }

                        firstchardigit=val[0].charAt(0);
                        var secondchar=val[0].charAt(1);
                        var digitatsepartor=myvalbeorenumberofchar.charAt(myelementcursor);
                        if(digitatsepartor){
                            if(digitatsepartor.match(/\d/)==null&&myelementcursor-1<=val[0].length){
                                val=myvalbeorenumberofchar.substr(0,myelementcursor)+myvalbeorenumberofchar.substr(myelementcursor+1);
                            }
                        }

                        if(firstchardigit=='0'){myelementcursor=myelementcursor-1};
                        if(/\d/.exec(secondchar)==null){$(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2))};

                        if(val[0].match(/^0[^,\.]/)){
                            var val=/^[\d]\d*/.exec(val[0]);
                        }

                        if(val[0].match(/^-/)){
                            var val=/[\d]\d*/.exec(val[0]);
                        }

                        if(val=='' || val==null){
                            if(/\d/.exec(secondchar)==null){
                             val=myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2);

                            }else{
                                val='';
                            }
                        }
                        $(this).val(negative+val);
                        var nb=$(this).val().split('\'');

                        nb=nb.join('');
                        if(nb.substring(0,1)=='0'||nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                            nb=nb.substring(myvalbeorenumberofchar);
                            $(this).val(myvalbeorenumberofchar.substring(1));
                        }else{
                            $(this).val(negative+parseInt(nb));
                        }

                        if(validationoptions.milleseparator==true){
                            var nb=$(this).val().split('\'');
                            nb=nb.join('');
                            var val=/(^[0-9]\d*)/.exec(nb);
                            if(/\d/.exec(secondchar)==null){$(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2))};
                            if(val=='' || val==null){
                                if(/\d/.exec(secondchar)==null){
                                    $(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2));

                                }else{
                                    $(this).val('');
                                }

                            }else if(val=='00'){
                               $(this).val('0');

                            }else if(parseInt(val) != 0 && val[0].length==2){
                               $(this).val(parseInt(val));
                            }else{
                                for (var i=val[0].length-1;i>=0;i-=3){;
                                    if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                        var avant=val[0].substring(0,i-2);
                                        var apres=val[0].substring(i-2);
                                        val[0]=avant+'\''+apres;
                                        if(i<=myelementcursor){myelementcursor=myelementcursor+1};
                                    }
                                }
                                $(this).val(val[0]);
                                var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                                var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                                var nbofseparator2=0;
                                if(nbofseparatorbeforearray2){
                                    myelementcursor=myelementcursor-nbofseparator1;
                                }
                        }

                        }else{
                            var val=/(^-?[0-9]\d*)/.exec($(this).val());
                            if(val=='' || val==null || val==0){
                                $(this).val('');
                            }else if(isNaN(val)){
                                $(this).val(parseInt(val));
                            } 
                        }
                    }
                    else if(validationoptions.type=="integer"){
                        if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                        var val_0=$(this).val();
                        var negative='';
                        if (val_0.match(/^-/)){
                            negative='-';
                            mystring=val_0.substring(1,myelementcursor);
                            $(this).val('-'+val_0.substring(myelementcursor));
                        }

                        var stringbeforecursor= val_0.substring(0,myelementcursor);
                        var stringaftercursor= val_0.substring(myelementcursor);
                        var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                        var nbofseparator1=0;
                        if(nbofseparatorbeforearray1){
                            nbofseparator1=nbofseparatorbeforearray1.length;
                        }
                        var firstchardigit='';
                        val_0=val_0.split('\'');
                        val_0=val_0.join('');
                        var val=/^[-\d]\d*/.exec(val_0);
                        if(val==null){val=['']};
                        if (val[0]!=val_0){
                            val[0]=val[0]+stringaftercursor;
                            myelementcursor=myelementcursor-1;
                        }
                        if (val[0].match(/^-/)){
                            negative='-';
                            val[0]=val[0].substr(1);
                        }
                        var firstchardigit=val[0].charAt(0);
                        var secondchar=val[0].charAt(1);
                        if(firstchardigit=='0'){myelementcursor=myelementcursor-1};
                        if(firstchardigit=='-' && secondchar=='-'){
                            val[0]=val[0].substring(1);
                        }
                        if(val[0].match(/^0[^,\.]/)){
                            var val=/^[-\d]\d*/.exec(val[0]);
                        }
                        if(val[0].match(/^-/)){
                            var val=val[0].substr(1);
                        }
                        if(val=='' || val==null){
                           if(/\d/.exec(secondchar)==null){
                                $(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2));

                            }else{
                                $(this).val('');
                            }
                        }
                        $(this).val(negative+val);
                        var nb=$(this).val().split('\'');
                        nb=nb.join('');
                        if(nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                            $(this).val(negative);
                        }else{
                            nb=Math.abs(Number(nb));
                            $(this).val(negative+parseInt(nb));
                        }
                        if(validationoptions.numberofchar){
                            if($(this).val().length>=validationoptions.numberofchar){
                                $(this).val($(this).val().substr(0,$(this).val().length-1))
                            }
                        }
                        if(validationoptions.milleseparator==true){
                            var nb=$(this).val().split('\'');
                            nb=nb.join('');
                            var val=/[-0-9']\d*/.exec(nb);
                            if(val=='' || val==null){
                               if(/\d/.exec(secondchar)==null){
                                    $(this).val(myvalbeorenumberofchar.substr(0,1)+myvalbeorenumberofchar.substr(2));

                                }else{
                                    $(this).val('');
                                }

                            }else  if(val=='-'){
                                $(this).val('-');

                            }else if(val=='-0'){
                                $(this).val('-');

                            }else if(val=='00'){
                               $(this).val('0');

                            }else if(parseInt(val) != 0 && val[0].length==2){
                               $(this).val(parseInt(val)); 

                            }else{
                                for (var i=val[0].length-1;i>=0;i-=3){
                                    if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                        var avant=val[0].substring(0,i-2);
                                        var apres=val[0].substring(i-2);
                                        val[0]=avant+'\''+apres;
                                        if(i<=myelementcursor){myelementcursor=myelementcursor+1};
                                    }
                                }
                                $(this).val(val[0]);
                                var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                                var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                                var nbofseparator2=0;
                                if(nbofseparatorbeforearray2){
                                    myelementcursor=myelementcursor-nbofseparator1;
                                }
                            }
                        }else{
                            var val=/[-0-9]\d*/.exec($(this).val());
                            if(val=='' || val==null){
                                $(this).val('');
                            }else  if(val=='-'){
                                $(this).val('-');
                            }else if(val=='-0'){
                                $(this).val('-');
                            }else if(val=='00'){
                               $(this).val('0');
                            }else{
                                $(this).val(parseInt(val));
                            }
                        }
                    }
                    else if(validationoptions.type=='posdecimal'){
                       $(this).val($(this).val().replace(',','.'));
                        if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                        var val_0=$(this).val();
                        if(val_0.match(/\./g)!=null){
                            if(val_0.match(/\./g).length>1){
                                val_0=val_0.substring(0,myelementcursor).split('.').join('')+'.'+val_0.substring(myelementcursor).split('.').join('');
                            }
                        }
                        var negative='';
                        var stringbeforecursor= val_0.substring(0,myelementcursor);
                        var stringaftercursor= val_0.substring(myelementcursor);
                        var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                        var nbofseparator1=0;
                        if(nbofseparatorbeforearray1){
                            nbofseparator1=nbofseparatorbeforearray1.length;
                        }
                        var firstchardigit='';
                        val_0=val_0.split('\'');
                        val_0=val_0.join('');
                        var val=/^[-.\d]\d*\.?\d*/.exec(val_0);
                        if(val==null){val=['']};
                        if (val[0]!=val_0){
                            val[0]=val[0]+stringaftercursor;
                            myelementcursor=myelementcursor-1;
                        }
                        if (val[0].match(/^-/)){
                            negative='-';
                            val[0]=val[0].substr(1);
                            myelementcursor=myelementcursor-1;
                        }
                        firstchardigit=val[0].charAt(0);
                        var secondchar=val[0].charAt(1);
                       // if(firstchardigit=='0'&& secondchar!='.'){myelementcursor=myelementcursor-1};
                        if(val[0].match(/^0[^,\.]/)){
                            var val=/^[-.\d]\d*.?\d*/.exec(val[0]);
                        }
                        if(val[0].match(/^-/)){
                            var val=/[.\d]\d*.?\d*/.exec(val[0]);
                        }
                        if(val=='' || val==null){
                           val='';
                        }else if(val=='.'){
                            val='0.';
                            myelementcursor=myelementcursor+1;
                        }
                        $(this).val(negative+val);
                        var point=$(this).val().match(/\./);
                        var nbInteger=$(this).val().split('.');
                        var nb=nbInteger[0].split('\'');
                        nb=nb.join('');
                        if(point==null||point==undefined){point=''};
                        if(nbInteger[1]==null||nbInteger[1]==undefined){nbInteger[1]=''};
                        if(nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                            nb='';
                            $(this).val(nb+point+nbInteger[1]);
                        }else{
                            if(nb==''){myelementcursor=1};
                            nb=Math.abs(Number(nb));
                            $(this).val(parseInt(nb)+point+nbInteger[1]);
                        }
                        if(validationoptions.numberofchar){
                            var leftpoint;
                            var thepoint=false;
                            if($(this).val().match(/\./)){
                                leftpoint=$(this).val().split('.');
                                thepoint=true;
                            }
                            if($(this).val().length>=validationoptions.numberofchar && $(this).val().charAt($(this).val().length-1)=='.'){
                                $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                            }
                            else if($(this).val().length>=Number(validationoptions.numberofchar)-1 && $(this).val().charAt($(this).val().length-1)=='.'){
                                $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                            }
                            else if ($(this).val().length<validationoptions.numberofchar){rpnsequence.log('on ne fait rien <')}
                            else if ($(this).val().length=validationoptions.numberofchar){rpnsequence.log('on ne fait rien =')}
                            else if($(this).val().length>validationoptions.numberofchar && thepoint==false){
                                $(this).val($(this).val().substr(0,$(this).val().length-1));
                            }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && validationoptions.milleseparator==true){

                                $(this).val($(this).val().substr(0,$(this).val().length-2));
                                if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};

                            }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && !validationoptions.milleseparator){
                                $(this).val($(this).val().substr(0,$(this).val().length-1));
                                if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};
                            }else if ($(this).val().length>validationoptions.numberofchar){
                                $(this).val($(this).val().substr(0,$(this).val().length-1));
                            }
                            else{
                                $(this).val($(this).val().substr(0,$(this).val().length));
                            }
                        }
                        if(validationoptions.milleseparator==true){
                            var point=$(this).val().match(/\./);
                            var nbInteger=$(this).val().split('.');
                            var nb=nbInteger[0].split('\'');
                            nb=nb.join('');
                            var val=/[0-9']\d*/.exec(nb);
                            if(val=='' || val==null){
                                $(this).val('');

                            }else  if(val=='-'){
                                $(this).val('-');

                            }else if(val=='-0'){
                                $(this).val('-');

                            }else if(val=='00'){
                               $(this).val('0');

                            }else if(parseInt(val) != 0 && val[0].length==2){
                                if(point=='' || point == null){
                                    $(this).val(parseInt(val));    
                                }else{
                                    $(this).val(parseInt(val)+point+nbInteger[1]); 
                                } 

                            }else{
                                for (var i=val[0].length-1;i>=0;i-=3){
                                    if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                        var avant=val[0].substring(0,i-2);
                                        var apres=val[0].substring(i-2);
                                        val[0]=avant+'\''+apres;
                                        if(i<=myelementcursor){myelementcursor=myelementcursor+1};
                                    }
                                }
                                if(point=='' || point == null){
                                    $(this).val(val[0]);
                                }else{
                                    $(this).val(val[0]+point+nbInteger[1]); 
                                }
                                var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                                var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                                var nbofseparator2=0;
                                if(nbofseparatorbeforearray2){
                                    myelementcursor=myelementcursor-nbofseparator1;
                                }
                            }
                        }

                    }
                    else if(validationoptions.type=='decimal'){
                        $(this).val($(this).val().replace(',','.'));
                        if($(this).val().indexOf('-')==1){$(this).val($(this).val().substring(1))};
                        var val_0=$(this).val();
                        if(val_0.match(/\./g)!=null){
                            if(val_0.match(/\./g).length>1){
                                if (val_0.match(/^-/)){
                                    mystring=val_0.substring(1,myelementcursor);
                                    if(mystring.length==1){
                                        val_0='-0.'+val_0.substring(myelementcursor).split('.').join('');
                                    }else{
                                      val_0=val_0.substring(0,myelementcursor).split('.').join('')+'.'+val_0.substring(myelementcursor).split('.').join('');   
                                    }
                                }else{
                                   val_0=val_0.substring(0,myelementcursor).split('.').join('')+'.'+val_0.substring(myelementcursor).split('.').join(''); 
                                }

                            }
                        }
                        var negative='';
                        var stringbeforecursor= val_0.substring(0,myelementcursor);
                        var stringaftercursor= val_0.substring(myelementcursor);
                        var nbofseparatorbeforearray1=stringbeforecursor.match(/\'/g);
                        var nbofseparator1=0;
                        if(nbofseparatorbeforearray1){
                            nbofseparator1=nbofseparatorbeforearray1.length;
                        }
                        var firstchardigit='';
                        val_0=val_0.split('\'');
                        val_0=val_0.join('');
                        var val=/^[-.\d]\d*\.?\d*/.exec(val_0);
                        if(val==null){val=['']};
                        if (val[0]!=val_0){
                            val[0]=val[0]+stringaftercursor;
                            myelementcursor=myelementcursor-1;
                        }
                        if (val[0].match(/^-/)){
                            negative='-';
                            val[0]=val[0].substr(1);
                        }
                        var firstchardigit=val[0].charAt(0);
                        var secondchar=val[0].charAt(1);
                        //if(firstchardigit=='0'&& secondchar!='.'){myelementcursor=myelementcursor-1;}
                        if(val[0].match(/^0[^,\.]/)){
                            var val=/^[-.\d]\d*.?\d*/.exec(val[0]);
                        }
                        if(val[0].match(/^-/)){
                            var val=/[.\d]\d*.?\d*/.exec(val[0]);
                        }
                        if(val=='' || val==null){
                           val='';
                        }else if(val=='.'){
                            val='0.';
                            myelementcursor=myelementcursor+1;
                        }
                        $(this).val(negative+val);
                        var point=$(this).val().match(/\./);
                        var nbInteger=$(this).val().split('.');
                        var nb=nbInteger[0].split('\'');
                        nb=nb.join('');
                        if(point==null||point==undefined){point=''};
                        if(nbInteger[1]==null||nbInteger[1]==undefined){nbInteger[1]=''};
                        if(nb==null||nb==undefined||isNaN(nb)||nb=='-'){
                            nb='';
                            $(this).val(negative+nb+point+nbInteger[1]);
                        }else{
                            nb=Math.abs(Number(nb));
                            $(this).val(negative+parseInt(nb)+point+nbInteger[1]);
                        }
                        if(validationoptions.numberofchar){
                            var leftpoint;
                            var thepoint=false;
                            if($(this).val().match(/\./)){
                                leftpoint=$(this).val().split('.');
                                thepoint=true;
                            }
                            if($(this).val().length>=validationoptions.numberofchar && $(this).val().charAt($(this).val().length-1)=='.'){
                                $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                            }
                            else if($(this).val().length>=Number(validationoptions.numberofchar)-1 && $(this).val().charAt($(this).val().length-1)=='.'){
                                $(this).val(myvalbeorenumberofchar.substr(0,myvalbeorenumberofchar.length-1))
                            }
                            else if ($(this).val().length<validationoptions.numberofchar){rpnsequence.log('on ne fait rien')}
                            else if($(this).val().length>=validationoptions.numberofchar && thepoint==false){
                                $(this).val($(this).val().substr(0,$(this).val().length-1));
                            }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && validationoptions.milleseparator==true){
                                $(this).val($(this).val().substr(0,$(this).val().length-2));
                                if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};

                            }else if($(this).val().length>=Number(validationoptions.numberofchar)+1 && thepoint==true && leftpoint[0].length>=4 && !validationoptions.milleseparator){
                                $(this).val($(this).val().substr(0,$(this).val().length-1));
                                if($(this).val().charAt($(this).val().length-1)=='.'){$(this).val($(this).val().substr(0,$(this).val().length-1))};
                            }else if ($(this).val().length>validationoptions.numberofchar){
                                $(this).val($(this).val().substr(0,$(this).val().length-1));
                            }
                            else{
                                $(this).val($(this).val().substr(0,$(this).val().length));
                            }
                        }
                        if(validationoptions.milleseparator==true){
                            var point=$(this).val().match(/\./);
                            var nbInteger=$(this).val().split('.');
                            var nb=nbInteger[0].split('\'');
                            nb=nb.join('');
                            var val=/[-0-9']\d*/.exec(nb);
                            if(val=='' || val==null){
                                $(this).val('');

                            }else  if(val=='-'){
                                $(this).val('-');
                            }else if(val=='00'){
                               $(this).val('0');

                            }else if(parseInt(val) != 0 && val[0].length==2){
                               if(point=='' || point == null){
                                    $(this).val(parseInt(val));    
                                }else{
                                    $(this).val(parseInt(val)+point+nbInteger[1]); 
                                }
                            }else{
                                for (var i=val[0].length-1;i>=0;i-=3){
                                    if (val[0].charAt(i-3) && val[0].charAt(i-3)!='-'){
                                        var avant=val[0].substring(0,i-2);
                                        var apres=val[0].substring(i-2);
                                        val[0]=avant+'\''+apres;
                                        if(i<=myelementcursor){
                                            myelementcursor=myelementcursor+1;
                                        }     
                                    }
                                }
                                if(point=='' || point == null){
                                    $(this).val(val[0]);    
                                }else{
                                    $(this).val(val[0]+point+nbInteger[1]);  
                                }
                                var stringbeforecursor= $(this).val().substring(0,myelementcursor);
                                var nbofseparatorbeforearray2=stringbeforecursor.match(/\'/g);
                                var nbofseparator2=0;
                                if(nbofseparatorbeforearray2){
                                    myelementcursor=myelementcursor-nbofseparator1;
                                }
                            }
                        }
                    }
                    else if(validationoptions.type=='lowercase'){
                        var val_0=$(this).val().toLowerCase();
                        var val=/[a-zâäàéèùüêëîïôöçñ]*/.exec(val_0);
                        if(val=='' || val==null){
                            $(this).val('');
                        }else{
                            $(this).val(val);
                        }
                    }
                    else if(validationoptions.type=='familycase'){
                        var val=/^[A-ZÀÂÄÉÈÙÜÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ][a-zâäàéèùüêëîïôöçñ]*/.exec($(this).val());
                        if(val=='' || val==null){
                            $(this).val('');
                        }else{
                            $(this).val(val);
                        }
                    }
                    else if(validationoptions.type=='uppercase'){
                        var val_0=$(this).val().toUpperCase()
                        var val=/[A-ZÀÂÄÉÈÙÜÊËÎÏÔÖÑ]*/.exec(val_0);
                        if(val=='' || val==null){
                            $(this).val('');
                        }else{
                            $(this).val(val);
                        }
                    }
                    else if(validationoptions.type=='letter'){
                        var val=/[A-ZÀÂÄÉÈÙÜÊËÎÏÔÖÑa-zâäàéèùüêëîïôöçñ]*/.exec($(this).val());
                        if(val=='' || val==null){
                            $(this).val('');
                        }else{
                            $(this).val(val);
                        }
                    }
                    else if(validationoptions.type=='words'){
                        var val=/[A-ZÀÂÄÉÈÙÜÊËÎÏÔÖÑa-zâäàéèùüêëîïôöçñ' ]*/.exec($(this).val().replace(/\s{2,}/g,' '));
                        if(val=='' || val==null){
                            $(this).val('');
                        }else{
                            $(this).val(val);
                        }
                    }
                    else if(validationoptions.type[0]=='list'){
                        var tablength=validationoptions.type.length;
                        var val0=$(this).val().split('^');
                        val0=val0.join('');
                        var myval=val0;
                        var mychar=myval.charAt(myelementcursor-1);
                        val0=val0.split(mychar).join('');
                        var valinliste=myval+"+";
                        var regvarinlist=new RegExp(valinliste);
                        var val='';
                        for(var i=1;i<tablength;i++){
                            if(val==''||val==null){
                                val=regvarinlist.exec(validationoptions.type[i]);
                            }
                        }
                        if(val=='' || val==null){
                            $(this).val(val0);
                            myelementcursor=myelementcursor-1;
                        }else{
                            $(this).val(val);
                        }
                    }

                    myelement.setSelectionRange(myelementcursor, myelementcursor);

                }});
        }
    };
    
    
    return {
        init: init,
        displayAlert: displayAlert,
        displayResult: displayResult,
        log: log,
        getLabels: getLabels,
        addvalidation: addvalidation,
        getColor:getColor,
        modulesresponse: modulesresponse,
        resultMode: resultMode
    };
})();
