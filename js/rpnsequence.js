/*!
 * rpnmodule v0.0.1 (https://github.com/golayp/rpnmodule)
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
    var responses;
    var warnexit;
    var sequenceendHandler;
    var moduleendHandler;
    var mediapathHandler;
    var alertModal;
    var domelem;
    var navigationEnabled;
    var debug;
    var labels = {
        en: {
            Recall: "Recall",
            Order: "Order",
            Warning: "Warning",
            BeforeUnloadMsg: "Module running!",
            Wait: "Wait please...",
            Validate: "Validate",
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
            Validate: "Valider",
            Eraser: "Effaceur",
            DragDropNotEmpty: "Il y a encore des éléments à trier!",
            CardMazeNotEnded: "Vous n'avez pas terminé le labyrinthe!",
            Sources: "Sources",
            BlackboxTableView: "Tableau de valeurs",
            BlackboxView: "Boîte noire"
        }
    };
    var selectedLabels;


    var init = function(opts) {
        if (_.isUndefined(opts)) {
            opts = {};
        }
        _.defaults(opts, {
            sequrl: "seq.json",
            solurl: "sol.json",
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
        responses = [];
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
            buildUi();
        });
    };

    var buildUi = function() {
        domelem.append($('<div class="container" id="rpnm"><div class="row page-header"><div class="col-md-8"><h1 id="rpnm_seq_title"></h1></div><div class="col-md-4"><nav id="rpnm_modulenav"><ul class="pagination pagination-sm"></ul></nav></div></div><div class="row"><div class="col-md-12"><h2 id="rpnm_title"></h2><h3 id="rpnm_context"></h3><h4 id="rpnm_directive"></h4></div></div><div class="row"><div id="rpnm_module_content" class="col-md-12"></div></div></div><div class="container"><div class="row"><div class="col-md-12"><em id="rpnm_source" class="pull-right"></em></div></div>'));
        domelem.append($('<div id="rpnm_recall_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-bell"></i> ' + selectedLabels.Recall + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_order_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-question-sign"></i> ' + selectedLabels.Order + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_alert_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><i class="glyphicon glyphicon-warning-sign"></i> ' + selectedLabels.Warning + '</h4></div><div class="modal-body"></div></div></div></div>'));
        domelem.append($('<div id="rpnm_wait_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + selectedLabels.Wait + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% completed</span></div></div></div></div></div></div>'));
        $('#rpnm_seq_title').html(sequencedatas.title);
        source = $('#rpnm_source');
        mainContent = $('#rpnm_module_content');
        alertModal = $('#rpnm_alert_modal');
        if (!navigationEnabled) {
            $('#rpnm_modulenav').remove();
        }

        _.each(sequencedatas.modules, function(elem, idx) {
            var div = $('<div class="rpnm_instance" id="rpnm_inst_' + idx + '">');
            mainContent.append(div);
            if (elem.type == 'marker') {
                rpnmarkermodule().init(elem, div);
            }
            else if (elem.type == 'mqc') {
                rpnmqcmodule().init(elem, div);
            }
            else if (elem.type == 'gapsimple') {
                rpngapsimplemodule().init(elem, div);
            }
            else if (elem.type == 'gapfull') {
                rpngapfullmodule().init(elem, div);
            }
            else if (elem.type == 'clock') {
                rpnclockmodule().init(elem, div);
            }
            else if (elem.type == 'blackbox') {
                rpnblackboxmodule().init(elem, div);
            }
            else if (elem.type == 'dragdropsorting') {
                rpndragdropsortingmodule().init(elem, div);
            }
            else if (elem.type == 'cardmaze') {
                rpncardmazemodule().init(elem, div);
            }
            div.hide();

            //navigation
            if (navigationEnabled && sequencedatas.modules.length > 1) {
                $('#rpnm_modulenav ul').append($('<li><a href="#">' + (idx + 1) + '</a></li>').click(function() {
                    currentmod = idx;
                    displayCurrentModule();
                }));
            }
        });

        if (warnexit) {
            $(window).bind('beforeunload', function(e) {
                return selectedLabels.BeforeUnloadMsg;
            });
        }
        displayCurrentModule();
    };

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
        if (moduleDatas.status != 'ended') {
            moduleDiv.show();
        }
        else {
            //module already ended... try another one or finish the sequence
            currentmod = nextNotEndedModuleIdx();
            if (currentmod >= 0) {
                displayCurrentModule();
            }
            else {
                handleEndOfSequence();
            }
        }

        $('#rpnm_wait_modal').modal('hide');
    };

    var nextNotEndedModuleIdx = function() {
        var nextNotEnded = _.find(sequencedatas.modules, function(mod, idx) {
            return mod.status != 'ended' && idx >= currentmod;
        });
        var previousNotEnded = _.find(sequencedatas.modules, function(mod, idx) {
            return mod.status != 'ended' && idx < currentmod;;
        });
        if (!_.isUndefined(nextNotEnded)) {
            return _.indexOf(sequencedatas.modules, nextNotEnded);
        }
        else if (!_.isUndefined(previousNotEnded)) {
            return _.indexOf(sequencedatas.modules, previousNotEnded);
        }
        else {
            return -1;
        }
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

    var handleEndOfModule = function(res, correctionFct) {
        log('End of module');
        //store result locally
        responses[currentmod] = {
            responses: res,
            correctionFct: correctionFct
        };
        //Save status of module
        sequencedatas.modules[currentmod].status = 'ended';
        //disable navigation
        if (navigationEnabled) {
            $($('#rpnm_modulenav ul li')[currentmod]).unbind("click").addClass('disabled')
        };


        $('#rpnm_wait_modal').modal('show');
        currentmod = nextNotEndedModuleIdx();
        moduleendHandler(res);
        if (_.isUndefined(sequencedatas.modules[currentmod])) {
            handleEndOfSequence();
        }
        else {
            displayCurrentModule();
        }
    };

    var handleEndOfSequence = function() {
        log('End of sequence');
        sequenceendHandler(responses);
        //retrieve solutions and use correction function to make score
        $.getJSON(solurl, function(ssol) {
            var score = 0;
            _.each(ssol.solutions, function(sol, idx) {
                score += _.isUndefined(responses[idx]) ? 0 : responses[idx].correctionFct(responses[idx].responses, sol);
            });
            log('Calculated total score for sequence ' + score);
            if (warnexit) {
                $(window).unbind('beforeunload');
            }
            window.location = backurl;
        });
    };

    var genericValidateButton = function(label) {
        label = _.isUndefined(label) ? selectedLabels.Validate : label;
        return $('<button>', {
            'class': 'btn btn-primary',
            text: ' ' + selectedLabels.Validate
        }).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
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

    return {
        init: init,
        buildUi: buildUi,
        handleEndOfModule: handleEndOfModule,
        genericValidateButton: genericValidateButton,
        displayAlert: displayAlert,
        log: log,
        getLabels: getLabels
    };
})();