
/* global _*/
/*!
 * rpnmodule 0.1.8 (https://github.com/golayp/rpnmodule)
 * 
 * Dependencies: jquery 2.1.3, bootstrap 3.3.2, underscore 1.7.0
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
var rpnsequence = (function() {

    var sequencedatas;
    var currentmod;
    var mainContent;
    var source;
    var solurl;
    var states;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    var mediapathHandler;
    var alertModal;
    var domelem;
    var validationButton;
    var quitButton;
    var quitDisabled;
    var bypassModule;
    var navigationEnabled;
    var debug;
    var loadstate;
    var selectedLabels;
    var modules;

    var labels = {
        en: {
            Recall: "Recall",
            Order: "Order",
            Warning: "Warning",
            BeforeUnloadMsg: "Module running!",
            Wait: "Please wait...",
            Validate: "Next",
            EndSequence:"Continue",
            Eraser: "Eraser",
            DragDropNotEmpty: "There are still some items to sort!",
            CardMazeNotEnded: "You have not finished the maze!",
            BlackboxTableView: "Values table",
            BlackboxView: "Blackbox",
            Quit:"Quit"
        },
        fr: {
            Recall: "Rappel",
            Order: "Consignes",
            Warning: "Attention",
            BeforeUnloadMsg: "Exercice en cours!",
            Wait: "Veuillez patienter...",
            Validate: "Suite",
            EndSequence:"Continuer",
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
            mediapathformatter: function(val) {
                return 'medias/' + val;
            },
            language: "en",
            debug: false,
            disablestateloading:false,
            navigationEnabled: false,
            quitDisabled:false,
            bypassModule:false
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
        mediapathHandler = opts.mediapathformatter;
        quitDisabled=opts.quitDisabled;
        bypassModule=opts.bypassModule;
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
        return ["#8d61a4","#01a271","#5dc2e7","#ed656a","#f5a95e","#eee227","#7a5a14","#bbbbbb","#63b553","#e95c7b","#f5a95e"][idx];
    }
    var buildUi = function() {
        mainContent=$('<div></div>');
        domelem.append([
            $('<button id="rpnm_quit" class="btn btn-link pull-right hidden-xs hidden-sm">' +selectedLabels.Quit+' <i class="glyphicon glyphicon-remove-circle"></i></button>'),
            $('<div class="container" id="rpnm"></div>').append([
                $('<div class="row page-header"><div class="col-md-7"><h1 id="rpnm_seq_title"></h1></div><div class="col-md-5"><nav id="rpnm_modulenav"><ul class="pagination pagination-sm"></ul></nav></div></div>'),
                mainContent,
                $('<div class="row"><div class="col-md-12"><em id="rpnm_source" class="pull-right"></em></div></div>'),
                $('<div class="row"><div class="col-md-12"><button id="rpnm_validation" class="btn btn-primary pull-right"></button></div></div>'),
            ])
        ]);
        
        domelem.append($('<div id="rpnm_recall_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_order_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_alert_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> ' + selectedLabels.Warning + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_wait_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + selectedLabels.Wait + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        
        $('#rpnm_seq_title').html(sequencedatas.title);
        validationButton=$('#rpnm_validation');
        quitButton=$('#rpnm_quit');
        if(quitDisabled){
            quitButton.hide();
        }
        
        source = $('#rpnm_source');
        alertModal = $('#rpnm_alert_modal');
        if (!navigationEnabled) {
            $('#rpnm_modulenav').remove();
        }

        _.each(sequencedatas.modules, function(modData, idx) {
            _.defaults(modData,{
                disposition:'top'
            })
            
            var btnOrder=$('<button class="btn btn-default btn-sm pull-right" href="#" data-toggle="modal" data-target="#rpnm_order_modal"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</button>');
            var btnRecall=$('<button class="btn btn-default btn-sm pull-right" href="#" data-toggle="modal" data-target="#rpnm_recall_modal"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</button>')
            var divContext=$('<div id="rpnm_context"></div>');
            var divDirective=$('<div id="rpnm_directive"></div>');
            divContext.html(_.isUndefined(modData.context)?_.isUndefined(sequencedatas.context)?"":sequencedatas.context:modData.context);
            divDirective.html(modData.directive);
            var row=$('<div class="row">');
            var divContent=$('<div class="col-md-12">');
            row.append(divContent);
            var titleLine=$('<div class="row"></div>').append($('<div class="col-md-12"></div>').append($('<h2 id="rpnm_title">'+(_.isUndefined(modData.title)?'':modData.title)+'</h2>').append([
                btnOrder,
                btnRecall
            ])));
            
            if(_.isUndefined(modData.recall)&&_.isUndefined(sequencedatas.recall)){
              btnRecall.hide();  
            }
            if(_.isUndefined(modData.order)&&_.isUndefined(sequencedatas.order)){
              btnOrder.hide();  
            } 
            
            var globaldiv = $('<div id="rpnm_inst_' + idx + '" class="rpnm_instance">').append(titleLine);
                
            if(modData.disposition=='bottom'){
                globaldiv.append($('<div class="row"></div>').append($('<div class="col-md-12"></div>').append([row,divContext,divDirective])));
            }else if(modData.disposition=='left'){
                globaldiv.append($('<div class="row"></div>').append([
                    $('<div class="col-md-6"></div>').append([divContext,divDirective]),
                    $('<div class="col-md-6"></div>').append(row)
                ]));
            }else if(modData.disposition=='right'){
                globaldiv.append($('<div class="row"></div>').append([
                    $('<div class="col-md-6"></div>').append(row),
                    $('<div class="col-md-6"></div>').append([divContext,divDirective])
                ]));
            }else{
                //default top
                globaldiv.append($('<div class="row"></div>').append($('<div class="col-md-12"></div>').append([divContext,divDirective,row])));
            }
            
            _.isUndefined(modData.context)? _.isUndefined(sequencedatas.context) ? divContext.hide():divContext.show().html(sequencedatas.context) :divContext.show().html(modData.context);
            _.isUndefined(modData.directive)? _.isUndefined(sequencedatas.directive) ? divDirective.hide(): divDirective.show().html(sequencedatas.directive) : divDirective.show().html(modData.directive);
    
            mainContent.append(globaldiv);
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
            else if (modData.type == 'sorting') {
                modules[idx]=rpnsortingmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'twolists') {
                modules[idx]=rpntwolistsmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }else if (modData.type == 'plumb') {
                modules[idx]=rpnplumb();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            
            globaldiv.hide();
            if(modData.type!='gapfull'){
                divContent.disableSelection();
            }
            $('#rpnm_modulenav ul').append($('<li><a href="#">' + (idx + 1) + '</a></li>'));
            if(bypassModule){
                handleEndOfSequence();
            }
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
            handleEndOfModule(modules[currentmod].validate(),currentmod+1);
        });
        quitButton.click(function(){
            handleEndOfModule(modules[currentmod].validate(),currentmod+1);
        });
        //Navigation
        if (navigationEnabled && sequencedatas.modules.length > 1) {
            _.each($('#rpnm_modulenav ul li'),function(nav,idx){
                $(nav).click(function() {
                    modules[currentmod].validate();
                    handleEndOfModule(modules[currentmod].validate(),idx);
                });
            });
        }
    }

    var displayCurrentModule = function() {
        $('#rpnm_wait_modal').modal({show:true,backdrop:'static',keyboard:false});
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
            validationButton.html(selectedLabels.EndSequence+' <i class="glyphicon glyphicon glyphicon-ok-circle"></i>').removeClass("btn-primary").addClass("btn-success");
        }else{
            validationButton.html(selectedLabels.Validate+' <i class="glyphicon glyphicon-chevron-right"></i>').removeClass("btn-success").addClass("btn-primary");
        }
        moduleDiv.show();
        $('#rpnm_wait_modal').modal('hide');
    };

    var bindModuleSharedDatas = function(datas) {
        if (!_.isUndefined(datas.recall)){
            $('#rpnm_recall_modal .modal-body').html(datas.recall);
        }else if(!_.isUndefined(sequencedatas.recall)){
            $('#rpnm_recall_modal .modal-body').html(sequencedatas.recall);
        }
        if (!_.isUndefined(datas.order)) {
            $('#rpnm_order_modal .modal-body').html(datas.order);
        }else if(!_.isUndefined(sequencedatas.order)){
            $('#rpnm_order_modal .modal-body').html(sequencedatas.order);
        }
        source.html(_.isUndefined(datas.sources) ? _.isUndefined(sequencedatas.sources)?"":sequencedatas.sources :  datas.sources);
    };

    var handleEndOfModule = function(state,nextmodtoshow) {
        $('#rpnm_wait_modal').modal({show:true,backdrop:'static',keyboard:false});
        log('End of module');
        //store result locally
        states[currentmod] = {
            state:state
        };
        moduleendHandler({states:_.map(states,function(sta){return sta.state;})},function(){
            //Save status of module
            sequencedatas.modules[currentmod].status = 'ended';
            currentmod=nextmodtoshow;
            if(currentmod>sequencedatas.modules.length-1){
                handleEndOfSequence();
            }else{
                displayCurrentModule();
            }        
        });
    };

    var handleEndOfSequence = function() {
        log('End of sequence');
        log(JSON.stringify({states:_.map(states,function(sta){return sta.state;})},null, '\t'));
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            _.each(ssol.solutions, function(sol, idx) {
                score +=modules[idx].score(sol);
            });
            log('Calculated total score for sequence ' + score);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score);
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
                if(validationoptions.type=='natural'){
                    var val=/(^-?[0-9]\d*)/.exec($(this).val());
                    if(val=='' || val==null || val==0){
                        $(this).val('');
                    }else if(isNaN(val)){
                        $(this).val(parseInt(val));
                    }
                }
                else if(validationoptions.type=='integer'){ 
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
                else if(validationoptions.type=='posdecimal'){
                	var val_0=$(this).val().replace(',','.');
                	var val=/^[.\d]\d*\.?\d*/.exec(val_0);
                	if($(this).val().match(/^0[^,\.]/)){
                		var val_1=$(this).val().replace(',','.').substring(0,1);
                		var val=/^[-.\d]\d*.?\d*/.exec(val_1);
                	}
                	if($(this).val().match(/^-/)){
                		var val_1=$(this).val().replace(',','.');
                		var val=/[.\d]\d*.?\d*/.exec(val_1);
                	}
                	if(val=='' || val==null){
                		val='';
                	}else  if(val=='.'){
                        val='0.';
                    }
                    $(this).val(val);
                }
                else if(validationoptions.type=='decimal'){
                  var val_0=$(this).val().replace(',','.');
                   var val=/^[-.\d]\d*\.?\d*/.exec(val_0);
                   if ($(this).val().match(/^-/)){
                       if($(this).val().substring(1).match(/^0[^,\.]/)){
                           var val_1=$(this).val().replace(',','.').substring(2);
                           var val=/^[-.\d]\d*.?\d*/.exec(val_1);
                       }else{
                           var val_1=$(this).val().replace(',','.').substring(1);
                           var val=/^[-.\d]\d*.?\d*/.exec(val_1);
                       }
                       var negative=true;
                   }
                   if($(this).val().match(/^0[^,\.]/)){
                       var val_1=$(this).val().replace(',','.').substring(0,1);
                       var val=/^[-.\d]\d*.?\d*/.exec(val_1);
                   }
				   if($(this).val().match(/^-/)){
                       var val_1=$(this).val().replace(',','.');
                       var val=/[.\d]\d*.?\d*/.exec(val_1);
                   }
				    if(val=='' || val==null){
                        val='';
                    }else  if(val=='.'){
                        val='0.';
                    }
                    if(negative){
                        $(this).val('-'+val);
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='lowercase'){
                    var val_0=$(this).val().toLowerCase();
                    var val=/[a-zâäàéèùêëîïôöçñ]*/.exec(val_0);
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }else if(validationoptions.type=='familycase'){
                    var val=/^[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ][a-zâäàéèùêëîïôöçñ]*/.exec($(this).val());
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }else if(validationoptions.type=='uppercase'){
                    var val_0=$(this).val().toUpperCase()
                    var val=/[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑ]*/.exec(val_0);
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }else if(validationoptions.type=='letter'){
                    var val=/[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ]*/.exec($(this).val());
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='words'){
                    var val=/[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ' ]*/.exec($(this).val().replace(/\s{2,}/g,' '));
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
            });
        }
    };
    
    var computeMediaUrl= function(url){
        return mediapathHandler(url);
    };
    
    return {
        init: init,
        buildUi: buildUi,
        displayAlert: displayAlert,
        log: log,
        getLabels: getLabels,
        addvalidation: addvalidation,
        computeMediaUrl:computeMediaUrl,
        getColor:getColor
    };
})();