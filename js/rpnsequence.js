/*!
 * rpnmodule v0.0.3 (https://github.com/golayp/rpnmodule)
 * 
 * Dependencies: jquery 2.1.1, bootstrap 3.3.1, underscore 1.7.0
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
var rpnsequence = (function() {

    var sequencedatas;
    var currentmod;
    var mainContent;
    var source;
    var solurl;
    var backurl;
    var states;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    var mediapathHandler;
    var alertModal;
    var domelem;
    var validationButton;
    var navigationEnabled;
    var debug;
    var selectedLabels;
    var modules;

    var labels = {
        en: {
            Recall: "Recall",
            Order: "Order",
            Warning: "Warning",
            BeforeUnloadMsg: "Module running!",
            Wait: "Please wait...",
            Validate: "Next module",
            EndSequence:"End",
            Eraser: "Eraser",
            DragDropNotEmpty: "There are still some items to sort!",
            CardMazeNotEnded: "You have not finished the maze!",
            Sources: "Sources",
            BlackboxTableView: "Values table",
            BlackboxView: "Blackbox"
        },
        fr: {
            Recall: "Rappel",
            Order: "Consignes",
            Warning: "Attention",
            BeforeUnloadMsg: "Exercice en cours!",
            Wait: "Veuillez patienter...",
            Validate: "Exercice suivant",
            EndSequence:"Terminer",
            Eraser: "Effaceur",
            DragDropNotEmpty: "Il y a encore des éléments à trier!",
            CardMazeNotEnded: "Vous n'avez pas terminé le labyrinthe!",
            Sources: "Sources",
            BlackboxTableView: "Tableau de valeurs",
            BlackboxView: "Boîte noire"
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
            returnurl: "../",
            warnonexit: false,
            domelem: $('body'),
            onsequenceend: function() {},
            onmoduleend: function() {},
            mediapathformatter: function(val) {
                return 'medias/' + val;
            },
            language: "en",
            debug: false,
            navigationEnabled: false
        });
        selectedLabels = labels[opts.language];
        states = [];
        modules=[];
        warnexit = opts.warnonexit;
        backurl = opts.returnurl;
        solurl = opts.solurl;
        debug = opts.debug;
        domelem = opts.domelem;
        sequenceendHandler = opts.onsequenceend;
        moduleendHandler = opts.onmoduleend;
        mediapathHandler = opts.mediapathformatter;
        $.getJSON(opts.sequrl, function(datas) {
            _.defaults(datas, {
                title: "sequencetitle",
                modules: []
            });
            sequencedatas = datas;
            //add dynamically status of module to each modules to handle the status (init->started->ended)
            _.each(sequencedatas.modules, function(elem, idx) {
                elem["status"] = "init";
            });
            currentmod = 0;
            navigationEnabled = opts.navigationEnabled && sequencedatas.modules.length > 1;
            $.getJSON(opts.stateurl,function(savedStates){
                states=_.map(sequencedatas.modules,function(mod,idx){return { state:savedStates.states[idx]};});
                buildUi();
            }).error(function() {
                states=_.map(sequencedatas.modules,function(mod,idx){return { state:undefined};});
                buildUi();
            });
            
        });
    };

    var buildUi = function() {
        domelem.append($('<div class="container" id="rpnm"></div>').append([
            $('<div class="row page-header"><div class="col-md-8"><h1 id="rpnm_seq_title"></h1></div><div class="col-md-4"><nav id="rpnm_modulenav"><ul class="pagination pagination-sm"></ul></nav></div></div>'),
            $('<div class="row"><div class="col-md-12"><h2 id="rpnm_title"></h2><h3 id="rpnm_context"></h3><h4 id="rpnm_directive"></h4></div></div>'),
            $('<div class="row"><div id="rpnm_module_content" class="col-md-12"></div></div>'),
            $('<div class="row"><div class="col-md-12"><em id="rpnm_source" class="pull-right"></em></div></div>'),
            $('<div class="row"><div class="col-md-12"><button id="rpnm_validation" class="btn btn-primary pull-right"></button></div></div>'),
            ]));
            
        
        domelem.append($('<div id="rpnm_recall_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_order_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_alert_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> ' + selectedLabels.Warning + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_wait_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + selectedLabels.Wait + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        $('#rpnm_seq_title').html(sequencedatas.title);
        validationButton=$('#rpnm_validation');
        source = $('#rpnm_source');
        mainContent = $('#rpnm_module_content');
        alertModal = $('#rpnm_alert_modal');
        if (!navigationEnabled) {
            $('#rpnm_modulenav').remove();
        }

        _.each(sequencedatas.modules, function(modData, idx) {
            var div = $('<div class="rpnm_instance" id="rpnm_inst_' + idx + '">');
            mainContent.append(div);
            if(_.isNull(states[idx]).state){
                _.isNull(states[idx]).state=undefined;
            }
            if (modData.type == 'marker') {
                modules[idx]=rpnmarkermodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'mqc') {
                modules[idx]=rpnmqcmodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'gapsimple') {
                modules[idx]=rpngapsimplemodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'gapfull') {
                modules[idx]=rpngapfullmodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'clock') {
                modules[idx]=rpnclockmodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'blackbox') {
                modules[idx]=rpnblackboxmodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'dragdropsorting') {
                modules[idx]=rpndragdropsortingmodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'cardmaze') {
                modules[idx]=rpncardmazemodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            else if (modData.type == 'dropdown') {
                modules[idx]=rpndropdownmodule();
                modules[idx].init(modData,states[idx].state, div);
            }
            div.hide();
            if(modData.type!='gapfull'){
                div.disableSelection();
            }
            $('#rpnm_modulenav ul').append($('<li><a href="#">' + (idx + 1) + '</a></li>'));
            
        });

        if (warnexit) {
            $(window).bind('beforeunload', function(e) {
                return selectedLabels.BeforeUnloadMsg;
            });
        }
        bindUiEvents();
        displayCurrentModule();
    };
    
    var bindUiEvents = function() {
        //Validation
        validationButton.click(function(){
            modules[currentmod].validate();
            if(currentmod==sequencedatas.modules.length-1){
                handleEndOfSequence();
            }else{
                currentmod++;
                displayCurrentModule();
            }
        });
        //Navigation
        if (navigationEnabled && sequencedatas.modules.length > 1) {
            _.each($('#rpnm_modulenav ul li'),function(nav,idx){
                $(nav).click(function() {
                    modules[currentmod].validate();
                    currentmod = idx;
                    displayCurrentModule();
                });
            });
        }
     }

    var displayCurrentModule = function() {
        $('#rpnm_wait_modal').modal('show');
        var moduleDatas = sequencedatas.modules[currentmod];
        _.defaults(moduleDatas, {
            title: "title"
        });
        $('.rpnm_instance').hide();

        var moduleDiv = $('#rpnm_inst_' + currentmod);
        bindModuleSharedDatas(moduleDatas);
        handleMediaPath();
        //navigation
        if (navigationEnabled) {
            $('#rpnm_modulenav ul li').removeClass('active');
            $($('#rpnm_modulenav ul li')[currentmod]).addClass('active');
        }
        if(currentmod==sequencedatas.modules.length-1){
            validationButton.html('<i class="glyphicon glyphicon glyphicon-ok-circle"></i> '+selectedLabels.EndSequence).removeClass("btn-primary").addClass("btn-success");
        }else{
            validationButton.html('<i class="glyphicon glyphicon-ok"></i> '+selectedLabels.Validate).removeClass("btn-success").addClass("btn-primary");
        }
        moduleDiv.show();
        $('#rpnm_wait_modal').modal('hide');
    };

    var bindModuleSharedDatas = function(datas) {
        $('#rpnm_title').show().html(datas.title +' <button class="btn btn-default btn-sm  pull-right" href="#" id="rpnm_order_link" data-toggle="modal" data-target="#rpnm_order_modal"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</button><button class="btn btn-default btn-sm pull-right" id="rpnm_recall_link" data-toggle="modal" data-target="#rpnm_recall_modal"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</button>');
        _.isUndefined(datas.context) ? $('#rpnm_context').hide() : $('#rpnm_context').show().text(datas.context);
        _.isUndefined(datas.directive) ? $('#rpnm_directive').hide() : $('#rpnm_directive').show().text(datas.directive);

        if (_.isUndefined(datas.recall)) {
            $('#rpnm_recall_link').hide();
        }
        else {
            $('#rpnm_recall_link').show();
            $('#rpnm_recall_modal .modal-body').html(datas.recall);
        }
        if (_.isUndefined(datas.order)) {
            $('#rpnm_order_link').hide();
        }
        else {
            $('#rpnm_order_link').show();
            $('#rpnm_order_modal .modal-body').html(datas.order);
        }
        source.html(_.isUndefined(datas.sources) ? "" : (selectedLabels.Sources + ": " + datas.sources));
    };

    var handleEndOfModule = function(state) {
        $('#rpnm_wait_modal').modal('show');
        log('End of module');
        //store result locally
        states[currentmod] = {
            state:state
        };
        moduleendHandler({states:_.map(states,function(sta){return sta.state;})});
        //Save status of module
        sequencedatas.modules[currentmod].status = 'ended';
        
    };

    var handleEndOfSequence = function() {
        log('End of sequence');
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            _.each(ssol.solutions, function(sol, idx) {
                score +=modules[idx].score(sol);
            });
            log('Calculated total score for sequence ' + score);
            sequenceendHandler(states,score);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            window.location = backurl;
        });
    };

    var displayAlert = function(text, onclose) {
        $('#rpnm_alert_modal .modal-body').text(text);
        alertModal.modal();
        alertModal.on('hidden.bs.modal', function() {
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

    var handleMediaPath = function() {
        //Images paths
        _.each($('img:not(.rpnm-img, .rpnm-mediapath)'), function(elem, idx) {
            var img = $(elem);
            img.attr('src', mediapathHandler($(elem).attr('src'))).addClass('rpnm-mediapath');
            if (img.is('.modal-body img')) {
                img.addClass('img-responsive img-rounded');
            }
        });
    };

    var getLabels = function() {
        return selectedLabels;
    };
    
    var addvalidation = function(inputs,validationoptions){
        _.defaults(validationoptions,{
            mode:"lock",
            type:"integer"
        });
        //prevent copy paste cut
        $(inputs).bind("cut copy paste",function(e) {
            e.preventDefault();
        });
        if(validationoptions.mode=='lock'){
            $(inputs).keydown(function(e){
                if(validationoptions.type=='integer'){
                    /*Authorize:
                    backspace, tab, shift, arrow-left, arrow-right, delete, 
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
                    numpad-0, numpad-1, numpad-2, numpad-3, numpad-4, numpad-5, numpad-6, numpad-7, numpad-8, numpad-9, 
                    subtract, dash*/
                    //if subtract or dash try to know if we're at the begining of the input
                    if(!_.contains([8,9,16,37,39,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,109,189],e.keyCode) || ((e.keyCode==109 || e.keyCode==189) && $(this).getSelection().start!=0)){
                        log(e.keyCode);
                        e.preventDefault();    
                    }
                }
            });
            $(inputs).keyup(function(){
                
            });
            $(inputs).change(function(){
                if(validationoptions.type=='integer'){
                    var val=/(^-?[1-9]\d*)/.exec($(this).val());
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(parseInt(val));
                    }
                }
            });
        }else{
            
        }
        
    };
    
    return {
        init: init,
        buildUi: buildUi,
        handleEndOfModule: handleEndOfModule,
        displayAlert: displayAlert,
        log: log,
        getLabels: getLabels,
        addvalidation: addvalidation
    };
})();