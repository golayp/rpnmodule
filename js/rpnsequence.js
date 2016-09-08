/* global _*/
/*!
 * rpnmodule 0.2.2 (https://github.com/golayp/rpnmodule)
 * 
 * Dependencies: jquery 2.1.3, bootstrap 3.3.6, underscore 1.8.3
 * 
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
var rpnsequence = (function() {

    var sequencedatas;
    var currentmod;
    var source;
    var solurl;
    var states;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    var mediapathHandler;
    var readyHandler;
    var alertModal;
    var domelem;
    var validationButton;
    var btnOrder;
    var btnRecall;
    var bypassModule;
    var testMode;
    var navigationEnabled;
    var debug;
    var loadstate;
    var selectedLabels;
    var moduleLocation;
    var modules;
   // var respmodulearray=new Array();

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
            onsequenceready:function(){},
            mediapathformatter: function(val) {
                return 'medias/' + val;
            },
            language: "en",
            debug: false,
            disablestateloading:false,
            navigationEnabled: false,
            quitDisabled:false,
            bypassModule:false,
            testMode:false
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
        readyHandler = opts.onsequenceready;
        
        bypassModule=opts.bypassModule;
        testMode=opts.testMode;
        
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
        moduleLocation=$('<div></div>')
        validationButton=$('<button class="btn btn-success" id="rpnm_validation"></button>');
        btnOrder=$('<button class="btn btn-default btn-sm" data-target="#rpnm_order_modal" data-toggle="modal"><span class="visible-xs visible-sm"><i class="glyphicon glyphicon-question-sign"></i></span><span class="visible-md visible-lg"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</span></button>');
        btnRecall=$('<button class="btn btn-default btn-sm" data-target="#rpnm_recall_modal" data-toggle="modal"><span class="visible-xs visible-sm"><i class="glyphicon glyphicon-bell"></i></span><span class="visible-md visible-lg"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</span></button>');
        source=$('<div class="col-md-12"></div>');
        var baseContainer=$('<div class="container"></div>');
        if(!_.isUndefined(sequencedatas.cssClass)){
            baseContainer.addClass(sequencedatas.cssClass);
        }
        domelem.append([
            baseContainer.append([
                $('<div class="row sequence-header"></div>').append([
                    $('<div class="col-md-5"><h1>'+sequencedatas.title+'</h1></div>'),
                    $('<div class="col-xs-4"><nav id="rpnm_modulenav"><ul class="pagination pagination-sm"></div>'),
                    $('<div class="col-md-3"></div>').append([
                        btnOrder,
                        btnRecall
                    ]),
                ]),
                moduleLocation,
                $('<div class="row sequence-footer"></div>').append([
                    $('<div class="col-md-12" id="rpnm_toolbar"></div>').append(
                        validationButton
                    ),
                    source
                ])
            ])
        ]);
        domelem.append($('<div id="rpnm_recall_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_order_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_alert_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> ' + selectedLabels.Warning + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_wait_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + selectedLabels.Wait + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        alertModal = $('#rpnm_alert_modal');
        if (!navigationEnabled) {
            $('#rpnm_modulenav').remove();
        }
        _.each(sequencedatas.modules, function(modData, idx) {
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
            var divContent=$('<div>');
            
           
            
            
            var rpnmInstance = $('<div id="rpnm_inst_' + idx + '" class="row rpnm_instance">');
                
            if(modData.disposition=='bottom'){
                divContent.addClass('col-md-12');
                rpnmInstance.append([
                    divContent,
                    $('<div class="col-md-12"></div>').append([modTitle,divContext,divDirective])
                ]);
            }else if(modData.disposition=='left'){
                divContent.addClass('col-md-6');
                rpnmInstance.append([
                    $('<div class="col-md-6"></div>').append([modTitle,divContext,divDirective]),
                    divContent
                ]);
            }else if(modData.disposition=='right'){
                divContent.addClass('col-md-6');
                rpnmInstance.append([
                    divContent,
                    $('<div class="col-md-6"></div>').append([modTitle,divContext,divDirective])
                ]);
            }else{
                //default top
                divContent.addClass('col-md-12');
                rpnmInstance.append([
                    $('<div class="col-md-12"></div>').append([modTitle,divContext,divDirective]),
                    divContent
                ]);
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
                modules[idx]=rpndocmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            else if (modData.type == 'multiplelistssync') {
                modules[idx]=rpnmultiplelistssyncmodule();
                modules[idx].init(modData,states[idx].state, divContent);
            }
            
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
            $('#rpnm_modulenav ul').append($('<li><a href="#">' + (idx + 1) + '</a></li>'));
            if(bypassModule && idx==sequencedatas.modules.length-1){
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
        ready();
    };
    
    
    var ready=function(){
        readyHandler();
    };
    
    var bindUiEvents = function() {
        //Validation
        validationButton.click(function(){
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
        }
        if(currentmod==sequencedatas.modules.length-1){
            validationButton.html(selectedLabels.EndSequence+' <i class="glyphicon glyphicon glyphicon-ok-circle"></i>').removeClass("btn-primary").addClass("btn-success");
        }else{
            validationButton.html(selectedLabels.Validate+' <i class="glyphicon glyphicon-chevron-right"></i>').removeClass("btn-success").addClass("btn-primary");
        }
        moduleDiv.show();
        if(!_.isUndefined( modules[currentmod].displayed)){
            modules[currentmod].displayed();
        }
    };

    var bindModuleSharedDatas = function(datas) {
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
        if(!_.isUndefined(datas.background) || !_.isUndefined(sequencedatas.background)){
            moduleLocation.css({
                    'background-image':'url(' + mediapathHandler(_.isUndefined(datas.background)?sequencedatas.background:datas.background) + ')',
                    'background-repeat': 'no-repeat',
                    'background-position': 'top center',
                    'background-size':'cover'
            });
        }else{
            moduleLocation.css({
                'background-image':'none'
            });
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
        source.html(_.isUndefined(datas.sources) ? _.isUndefined(sequencedatas.sources)?"":sequencedatas.sources :  datas.sources);
    };

    var handleEndOfModule = function(state,nextmodtoshow) {
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
        
       /* $.getJSON(solurl, function(ssol) {
            var score = 0;
            _.each(ssol.solutions, function(sol, idx) {
                score +=modules[idx].score(sol); });
                JSON.stringify({states:_.map(states,function(sta, idx){respmodulearray[idx]=(sta.state);return sta.state;})},null, '\t');
                var mylength=respmodulearray.length;
                for (var i=0;i<mylength;i++){
                  log('reponses: '+respmodulearray[i]);  
                }
                log('SCORE: '+ score);
                if (warnexit) {
                    $(window).unbind('beforeunload');
                }
                if(testMode){
                    displayAlert('Score :' + score + ' pt' + (score>1?'s':''),function(){
                        sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score);
                    });
                }  
            });
    };
    var modulesresponse = function(){
        return respmodulearray;*/
    };

    var handleEndOfSequence = function() {
        log('End of sequence');
        if(!testMode && !bypassModule){
            log(JSON.stringify({states:_.map(states,function(sta){return sta.state;})},null, '\t'));
        }
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            _.each(ssol.solutions, function(sol, idx) {
                score +=modules[idx].score(sol);
            });
            log('SCORE: '+ score);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            if(testMode){
                displayAlert('Score :' + score + ' pt' + (score>1?'s':''),function(){
                    sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score);
                });
            }
            else
            {
                sequenceendHandler({states:_.map(states,function(sta){return sta.state;})},score);
            }
            
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

    var handleMediaPath = function(content) {
        //Images paths
        _.each($('img:not(.rpnm-img, .rpnm-mediapath)',content), function(elem, idx) {
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
                var mylength=$(this).val().length;
                var myelement=document.activeElement;
                myelement.focus();
                var myelementcursor=myelement.selectionStart;
                var myvalbeorenumberofchar=$(this).val();
                if(validationoptions.numberofchar){
                    if(validationoptions.type=="natural"){
                        var mylength=$(this).val().length;
                    }else{
                        var mylength=$(this).val().length+1;
                    }
                    if(mylength>validationoptions.numberofchar){
                        $(this).val($(this).val().substr(0,mylength-1));
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
                        myelementcursor=myelementcursor-1;
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
                    //if(validationoptions.milleseparator=='bonjour'){
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
                    if(firstchardigit=='0'&& secondchar!='.'){myelementcursor=myelementcursor-1};
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
                    //if(validationoptions.milleseparator=='bonjour'){
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
                    if(firstchardigit=='0'&& secondchar!='.'){myelementcursor=myelementcursor-1;}
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
                    var val=/[a-zâäàéèùêëîïôöçñ]*/.exec(val_0);
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='familycase'){
                    var val=/^[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑa-zâäàéèùêëîïôöçñ][a-zâäàéèùêëîïôöçñ]*/.exec($(this).val());
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='uppercase'){
                    var val_0=$(this).val().toUpperCase()
                    var val=/[A-ZÀÂÄÉÈÙÊËÎÏÔÖÑ]*/.exec(val_0);
                    if(val=='' || val==null){
                        $(this).val('');
                    }else{
                        $(this).val(val);
                    }
                }
                else if(validationoptions.type=='letter'){
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
                else if(validationoptions.type[0]=='list'){
                    //window.alert('list');
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
                
            });
        }
    };
    
    
    var computeMediaUrl= function(url){
        return mediapathHandler(url);
    };
    
    return {
        init: init,
        displayAlert: displayAlert,
        log: log,
        getLabels: getLabels,
        addvalidation: addvalidation,
        computeMediaUrl:computeMediaUrl,
        getColor:getColor,
        //modulesresponse: modulesresponse
    };
})();