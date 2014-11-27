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
        label = _.isUndefined(label) ? selectedLabels.Validate : label
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
    }

    var handleMediaPath = function() {
        //Images paths
        _.each($('img:not(.rpnm-img)'), function(elem, idx) {
            var img = $(elem);
            img.attr('src', mediapathHandler($(elem).attr('src')));
            if (img.is('.modal-body img')) {
                img.addClass('img-responsive img-rounded');
            }
        });

    }

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

//marker
var rpnmarkermodule = function() {

    var datas;
    var domelem;
    var selectedMarker;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            markers: [],
            tomark: ["fill tomark to feel good please!"]
        });
        datas = _datas;
        domelem = _domelem;
        selectedMarker = -1;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('marker');
        var toolbar = $('<div>', {
            'class': 'btn-group',
            'data-toggle': 'buttons'
        });
        var availableColors = _.shuffle(['primary', 'success', 'info', 'warning', 'danger']);

        toolbar.append($('<label class="btn btn-default active"><input type="radio" name="options" id="option1" autocomplete="off" checked><i class="glyphicon glyphicon-pencil"></i> ' + rpnsequence.getLabels().Eraser + '</label>').click(function() {
            selectedMarker = -1;

        }));
        $.each(datas.markers, function(idx, marker) {
            toolbar.append($('<label class="btn btn-' + (availableColors[idx] || 'default') + '"><input type="radio" name="options" id="option3" autocomplete="off"><i class="glyphicon glyphicon-pencil"></i> ' + marker.label + '</label>').click(function() {
                selectedMarker = marker.val;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
        domelem.append($('<div id="sentences">' + datas.tomark + '</div>'));
        $.each($('#sentences b', domelem), function(idx, tomark) {
            responses[idx] = -1; //initialize all responses to unmark
            var t = $(tomark);
            t.css('cursor', 'pointer').click(function() {
                t.removeClass();
                if (selectedMarker != -1) {
                    t.addClass('marker-' + availableColors[selectedMarker]);
                }
                responses[idx] = selectedMarker;
            });
        });
        //build validation button
        validationButton = $('<button>', {
            'class': 'btn btn-primary',
            text: ' ' + rpnsequence.getLabels().Validate
        }).prepend($('<i class="glyphicon glyphicon-ok"></i>'));
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init

    };

};

//mqc
var rpnmqcmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            questions: ["No questions!"],
            answers: ["As no answers"]
        });

        datas = _datas;
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('mqc');

        //build panel with sentences
        var uilist = $('<ul>', {
            'class': 'list-unstyled'
        });
        $.each(datas.questions, function(idq, question) {
            responses[idq] = -1; //initialize all responses to uncheck
            var li = $('<li>');
            li.append($('<p>' + question.label + '</p>'));
            var answerGroup = $('<div class="btn-group" data-toggle="buttons">');
            $.each(datas.answers, function(ida, answer) {
                answerGroup.append($('<label class="btn btn-default"><input type="radio" name="question_' + idq + '" id="answer_' + idq + '_' + ida + '" autocomplete="off">' + answer.label + '</label>').click(function() {
                    responses[idq] = ida;
                }));
                li.append(answerGroup);
            });
            uilist.append(li);
        });
        domelem.append(uilist);

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};

//gapsimple
var rpngapsimplemodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });

        datas = _datas;
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('gapsimple');

        //build panel with sentences
        domelem.append($('<div id="sentences" class="form-inline">' + datas.tofill + '</div>'));
        $.each($('#sentences b', domelem), function(idx, tofill) {
            responses[idx] = -1; //initialize all responses to unmark
            var t = $(tofill);
            t.replaceWith($('<input type="text" id="' + idx + '" class="rpnm_input gapsimple form-control"> <strong>(' + t.text() + ')</strong>'));
        });
        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            $.each($('.gapsimple'), function(idx, gap) {
                responses[idx] = $(gap).val();
            });
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};

//gapfull
var rpngapfullmodule = function() {

    var datas;
    var domelem;
    var validationButton;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            sentence: "sentence not set!"
        });
        datas = _datas;
        domelem = _domelem;
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('gapfull');

        //build panel with sentence
        domelem.append($('<p>' + datas.sentence + '</p><input type="text" id="gapfullresponse" class="rpnm_input form-control">'));
        $('input',domelem).val(datas.sentence);

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule($('input',domelem).val(), function(res, sol) {
                //Try to trim and do automatic corrections here.
                return res == sol ? 1 : 0;
            });
        });
    };

    return {
        init: init
    };

};

//clock
var rpnclockmodule = function() {

    var datas;
    var domelem;
    var validationButton;

    var init = function(_datas, _domelem) {
        datas = _datas;
        domelem = _domelem;
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('clock');

        //build panel with sentences
        domelem.append($('<div id="rpnclock"></div>'));
        new ClockSelector('rpnclock', {
            background: 'white',
            color_hour: '#333',
            color_minute: '#666',
            color_border: '#eee',
            highlight: '#357ebd'
        });

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule($('#gapfullresponse').val(), function(res, sol) {
                //Try to trim and do automatic corrections here.
                return res == sol ? 1 : 0;
            });
        });
    };

    return {
        init: init
    };
};

//blackbox
var rpnblackboxmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;
    var boxes;
    var shuffle;
    var toggleViewButton;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            inputtype: "number",
            operation: "x1",
            left: [1],
            right: [1],
            shuffle: false
        });
        datas = _datas;
        domelem = _domelem;
        shuffle = _datas.shuffle;
        boxes = [];
        responses = {
            left: [],
            right: []
        };

        _.each(datas.right, function(val, idx) {
            boxes.push({
                position: "right",
                originalposition: idx,
                value: val
            })
        });
        _.each(datas.left, function(val, idx) {
            boxes.push({
                position: "left",
                originalposition: idx,
                value: val
            })
        });
        if (shuffle)
            boxes = _.shuffle(boxes);
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('blackbox');

        domelem.append($('<div class="row header"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">x</p></div><div class="col-xs-2 operation"></div><div class="col-xs-2"><p class="text-center">y</p></div></div>'));
        $('.header', domelem).hide();

        _.each(boxes, function(box, idx) {
            if (box.position == 'left') {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><input type="text" id="' + idx + '" class="rpnm_input form-control" style="text-align: center;"></div></div>'));
            }
            else {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><input type="text" id="' + idx + '" class="rpnm_input form-control" style="text-align: center;"></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div></div>'));
            }
        });
        toggleViewButton = $('<button>', {
            'data-toggle': 'button',
            'class': 'btn btn-link btn-xs',
            text: ' ' + rpnsequence.getLabels().BlackboxTableView
        }).prepend($('<i class="glyphicon glyphicon-resize-small"></i>'));
        domelem.append($('<p class="text-center"></p>').append(toggleViewButton));

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);
        bindUiEvents();
    };

    var toggleView = function() {
        $('.operation', domelem).slideToggle();
        $('.header', domelem).slideToggle();
    };

    var bindUiEvents = function() {
        toggleViewButton.click(function() {
            var $el = $(this),
                textNode = this.lastChild;
            $el.find('i').toggleClass('glyphicon-resize-small glyphicon-resize-full');
            textNode.nodeValue = ' ';
            textNode.nodeValue = ' ' + ($el.hasClass('showArchieved') ? rpnsequence.getLabels().BlackboxTableView : rpnsequence.getLabels().BlackboxView)
            $el.toggleClass('showArchieved');
            toggleView();
        });
        validationButton.click(function() {
            $.each($('.rpnm_input', domelem), function(idx, gap) {
                var t = boxes[idx];
                responses[t.position][t.originalposition] = $(gap).val();
            });

            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol.right, function(val, idx) {
                    score += res.right[idx] == val ? 1 : 0;
                });
                _.each(sol.left, function(val, idx) {
                    score += res.left[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};

//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            todrag: ["empty"],
            todrop: ["empty too :'("]
        });
        datas = _datas;
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('dragdropsorting');
        domelem.append($('<div class="row"><div class="container"><div class="col-md-12"><ul id="dragthis" class="list-unstyled"></ul></div></div><div class="row"><div class="container" id="dropzonecontainer"></div></div>'));

        $.each(datas.todrop, function(idx, drop) {
            $('#dropzonecontainer').append($('<div class="col-md-2"><ul class="droppable list-unstyled"><lh>' + drop + '</lh></ul></div>'))
        });

        $("ul.droppable").sortable({
            group: 'no-drop',
            onDrop: function() {
                nextDraggable()
            }
        });

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
        nextDraggable();
    };

    var nextDraggable = function() {
        if ($('#dragthis li').length == 0 && datas.todrag.length > 0) {
            var itemToDrag = datas.todrag.pop();
            $('#dragthis').append($('<li>' + itemToDrag + '</li>'))
            $("#dragthis").sortable({
                group: 'no-drop',
                drop: false
            });
        }
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            if (datas.todrag.length > 0) {
                rpnsequence.displayAlert(rpnsequence.getLabels().DragDropNotEmpty);
            }
            else {
                _.each($('.droppable'), function(elem, idx) {
                    var txts = [];
                    $.each($(elem).find('li'), function(idx, txt) {
                        txts.push($(txt).text());
                    });
                    responses[$(elem).find('lh').text()] = txts;
                })
                rpnsequence.handleEndOfModule(responses, function(res, sols) {
                    var score = 0;
                    _.map(sols, function(sol, drop) {
                        score += _.intersection(res[drop], sol).length;
                    });
                    return score;
                });
            }
        });
    };

    return {
        init: init
    };
};

//cardmaze
var rpncardmazemodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;
    var currentHead;
    var height;
    var width;
    var snake;
    var startid;
    var endid;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            mazewidth: 6,
            mazeheight: 4,
            cards: [{
                label: "label",
                clue: "clue"
            }]
        });
        datas = _datas;
        height = datas.mazeheight;
        width = datas.mazewidth;
        domelem = _domelem;
        responses = [];
        buildUi();
        snake = [];
    };

    var buildUi = function() {
        //build card maze
        domelem.addClass('cardmaze');
        domelem.append($('<div class="row"><div class="container" id="maze"></div></div>'));
        _.each(datas.cards, function(card, idx) {
            $('#maze').append($('<div class="col-xs-2"><div class="card' + (card.start ? ' start selectable' : '') + (card.end ? ' end' : '') + '"><p>' + card.label + '</p><p>' + card.clue + '</p></div></div>'));
            if (card.start) {
                currentHead = idx;
                startid = idx;
            }
            if (card.end) {
                endid = idx;
            }

        });
        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);
        bindUiEvents();

    };


    var bindUiEvents = function() {
        _.each($('.card'), function(card, idx) {
            $(card).click(function() {
                if ($(card).hasClass('selectable')) {
                    if ((idx == currentHead || idx == currentHead + width || idx == currentHead - width || idx == currentHead - 1 || idx == currentHead + 1) && !$(card).hasClass('selected')) {
                        if (currentHead != idx) {
                            snake.push(card);
                        }
                        currentHead = idx;
                        $('.snakehead').removeClass('snakehead');
                        $(card).addClass('selected snakehead');
                        $('.selectable').removeClass('selectable');
                        if (idx != endid) {
                            if (!((idx + width) > (width * height))) {
                                $($('.card')[idx + width]).addClass('selectable');
                            }
                            if (!((idx - width) < 0)) {
                                $($('.card')[idx - width]).addClass('selectable');
                            }
                            if (idx % width != 0) {
                                $($('.card')[idx - 1]).addClass('selectable');
                            }
                            if ((idx + 1) % width != 0) {
                                $($('.card')[idx + 1]).addClass('selectable');
                            }
                        }
                        responses.push(idx);
                    }
                }


            });
        });
        validationButton.click(function() {
            if (!$(snake[snake.length - 1]).hasClass('end')) {
                rpnsequence.displayAlert(rpnsequence.getLabels().CardMazeNotEnded);
            }
            else {
                rpnsequence.handleEndOfModule(responses, function(res, sol) {
                    var score = 0;
                    _.each(sol, function(cardIdx, idx) {
                        score += (res[idx] == cardIdx ? 1 : 0);
                    })
                    return score;
                });
            }
        });
    };

    return {
        init: init
    };
};


function ClockSelector(e, params) {
    var defaults = {
        auto_dt: 1000,
        automate: true,
        background: 'black',
        callback: function() {},
        color_border: '#fff',
        color_hour: '#fff',
        color_minute: '#aaa',
        draw_hour: null,
        draw_minute: null,
        draw_second: null,
        highlight: '#f93',
        manual: true,
        stroke_border: 3,
        stroke_hour: 2,
        stroke_minute: 0.75,
        scale_hour: 0.50,
        scale_border: 0.80,
        scale_minute: 0.65
    };

    for (var k in defaults) {
        this[k] = params && k in params ? params[k] : defaults[k];
    }

    e = document.getElementById(e);
    this.size = Math.min(e.width, e.height);
    if (!this.size) {
        var style = window.getComputedStyle(e);
        this.size = Math.min(parseInt(style.width), parseInt(style.height));
    }

    if (e.tagName != 'CANVAS') {
        e.appendChild(document.createElement('canvas'));
        e = e.childNodes[e.childNodes.length - 1];
        e.width = this.size;
        e.height = this.size;
    }

    this.canvas = e;
    this.context = e.getContext('2d');
    this.dragging = false;
    this.time = null;
    this.color_mindef = this.color_minute;

    e.style.backgroundColor = this.background;



    ClockSelector.prototype.clockTime = function() {
        return this.time;
    }



    ClockSelector.prototype.drawHand = function(c, w, s) {
        var x = this.context;

        x.strokeStyle = c;
        x.fillStyle = c;
        x.lineWidth = w;
        x.beginPath();
        x.moveTo(0, 0);
        x.lineTo(0, 100 * s);
        x.closePath();
        x.stroke();
        x.arc(0, 0, w / 2, 0, 2 * Math.PI);
        x.fill();
    };



    ClockSelector.prototype.getCanvasOffset = function() {
        var o = [0, 0];
        var e = this.canvas;

        while (e.offsetParent) {
            o[0] += e.offsetLeft;
            o[1] += e.offsetTop;
            e = e.offsetParent;
        }

        return o;
    };



    ClockSelector.prototype.reset = function() {
        this.setTime(new Date());
        if (this.automate) {
            this.timeout = setInterval(this.setTimeRecurring(), this.auto_dt);
        }
    };



    ClockSelector.prototype.setParam = function(k, v) {
        if (k in this) {
            this[k] = v;
        }
    }



    ClockSelector.prototype.setTime = function(t) {
        this.canvas.width = this.canvas.width;
        this.time = t;
        t = t.getTime() / 1000 - t.getTimezoneOffset() * 60;

        var x = this.context;
        var s = this.size / 200;
        var Ts = t % 60 / 30 * Math.PI;
        var Tm = t % 3600 / 1800 * Math.PI;
        var Th = t / (6 * 3600) * Math.PI;
        this.setTransform(x, Ts, s);
        if (this.draw_second) {
            var f = this.draw_second;
            f(x);
        }
        this.setTransform(x, Tm, s);
        if (this.draw_minute) {
            var f = this.draw_minute;
            f(x);
        }
        else {
            this.drawHand(this.color_minute, this.stroke_minute * 2, this.scale_minute);
        }
        this.setTransform(x, Th, s);
        if (this.draw_hour) {
            var f = this.drawHour;
            f(x);
        }
        else {
            this.drawHand(this.color_hour, this.stroke_hour * 2, this.scale_hour);
        }

        x.setTransform(s, 0, 0, s, 100 * s, 100 * s);
        x.strokeStyle = this.color_border;
        x.lineWidth = this.stroke_border * 2;
        x.beginPath();
        x.arc(0, 0, 100 * this.scale_border, 0, 2 * Math.PI);
        x.stroke();
        x.closePath();

        if (this.callback) {
            this.callback(this);
        }
    };



    ClockSelector.prototype.setTimeFromEvent = function(e) {
        var o = this.getCanvasOffset();
        var x = e.pageX - o[0] - this.size / 2;
        var y = this.size / 2 - (e.pageY - o[1]);

        if (x == 0 && y == 0) {
            return;
        }

        var T = Math.atan2(y, x);
        var h, m;
        if (this.drag_minute) {
            var m1 = (75 - T * 30 / Math.PI) % 60;
            var m0 = this.time.getMinutes() + this.time.getSeconds() / 60;
            h = this.time.getHours();
            m = m1;

            if (m1 < m0 && m0 - m1 <= 30) { /**/ }
            else if (m1 < m0 && m0 - m1 > 30) {
                h += 1;
            }
            else if (m1 > m0 && m1 - m0 <= 30) { /**/ }
            else if (m1 > m0 && m1 - m0 > 30) {
                h -= 1;
            }
            h = (h + 24) % 24;
        }
        else {
            var h1 = 3 - T * 6 / Math.PI;
            var h0 = this.time.getHours() + this.time.getMinutes() / 60 + this.time.getSeconds() / 3600;
            h1 += h1 < h0 ? 24 : 0;

            if (h1 < h0 + 6) {
                h = h1;
            }
            else if (h1 < h0 + 12) {
                h = h1 - 12;
            }
            else if (h1 < h0 + 18) {
                h = h1 + 12;
            }
            else {
                h = h1;
            }
            h = (h + 24) % 24;
            m = (((3 - T * 6 / Math.PI) * 60) % 60 + 60) % 60;
        }

        var t = new Date();
        t.setHours(h);
        t.setMinutes(m);
        t.setSeconds((((3 - T * 6 / Math.PI) * 3600) % 60 + 60) % 60);

        this.setTime(t);
    };



    ClockSelector.prototype.setTimeRecurring = function() {
        var _ = this;
        return function() {
            _.setTime(new Date());
        };
    };



    ClockSelector.prototype.setTransform = function(x, T, s) {
        x.setTransform(-s * Math.cos(T), -s * Math.sin(T), s * Math.sin(T), -s * Math.cos(T), 100 * s, 100 * s);
    };



    ClockSelector.prototype.makeEndDrag = function() {
        var _ = this;
        return function() {
            _.color_minute = _.color_mindef;
            _.dragging = false;
            _.setTime(_.clockTime());
        };
    };



    ClockSelector.prototype.makeSetTime = function(d) {
        if (!this.manual) {
            return;
        }

        var _ = this;
        return function() {
            var e = window.event;
            var o = _.getCanvasOffset();
            var x = e.pageX - o[0] - _.size / 2;
            var y = _.size / 2 - (e.pageY - o[1]);

            if (_.manual) {
                _.canvas.style.cursor = Math.sqrt(x * x + y * y) <= (_.size * _.scale_border + _.stroke_border) / 2 ? 'pointer' : 'default';
            }

            if (_.dragging != d) {
                if (d && !_.dragging) {
                    var T = Math.atan2(x, y);
                    var m = (T + 2 * Math.PI) * 30 / Math.PI;
                    var mb = [(m + 57.5) % 60, (m + 2.5) % 60];

                    m = _.clockTime().getMinutes() + _.clockTime().getSeconds() / 60;
                    if (Math.sqrt(x * x + y * y) < _.size / 2 * _.scale_border && (
                            (mb[0] < m && m < mb[1]) || (m < mb[0] && mb[1] < mb[0] && m < mb[1]) || (mb[0] < m && mb[1] < m && mb[1] < mb[0])
                        )) {
                        if (_.color_minute != _.highlight) {
                            _.color_minute = _.highlight;
                            _.drag_minute = true;
                            _.setTime(_.clockTime());
                        }
                    }
                    else {
                        if (_.color_minute != _.color_mindef) {
                            _.color_minute = _.color_mindef;
                            _.drag_minute = false;
                            _.setTime(_.clockTime());
                        }
                    }
                }

                return;
            }

            if (!_.dragging && !d) {
                if (_.timeout) {
                    clearTimeout(_.timeout);
                    _.timeout = null;
                }

                _.dragging = true;
            }

            _.setTimeFromEvent(window.event);
        };
    };



    if (this.manual) {
        this.canvas.onmousedown = this.makeSetTime(false);
        this.canvas.onmouseup = this.makeEndDrag();
        this.canvas.onmouseout = this.makeEndDrag();
        this.canvas.onmousemove = this.makeSetTime(true);

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
! function($, window, pluginName, undefined) {
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
            afterMove: function($placeholder, container, $closestItemOrContainer) {},
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
            isValidTarget: function($item, container) {
                return true
            },
            // Executed before onDrop if placeholder is detached.
            // This happens if pullPlaceholder is set to false and the drop occurs outside a container.
            onCancel: function($item, container, _super, event) {},
            // Executed at the beginning of a mouse move event.
            // The Placeholder has not been moved yet.
            onDrag: function($item, position, _super, event) {
                $item.css(position)
            },
            // Called after the drag has been started,
            // that is the mouse button is beeing held down and
            // the mouse is moving.
            // The container is the closest initialized container.
            // Therefore it might not be the container, that actually contains the item.
            onDragStart: function($item, container, _super, event) {
                $item.css({
                    height: $item.height(),
                    width: $item.width()
                })
                $item.addClass("dragged")
                $("body").addClass("dragging")
            },
            // Called when the mouse button is beeing released
            onDrop: function($item, container, _super, event) {
                $item.removeClass("dragged").removeAttr("style")
                $("body").removeClass("dragging")
            },
            // Called on mousedown. If falsy value is returned, the dragging will not start.
            // If clicked on input element, ignore
            onMousedown: function($item, _super, event) {
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
            serialize: function($parent, $children, parentIsContainer) {
                var result = $.extend({}, $parent.data())

                if (parentIsContainer)
                    return [$children]
                else if ($children[0]) {
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
            right: 0
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
    function d(a, b) {
        var x = Math.max(0, a[0] - b[0], b[0] - a[1]),
            y = Math.max(0, a[2] - b[1], b[1] - a[3])
        return x + y;
    }

    function setDimensions(array, dimensions, tolerance, useOffset) {
        var i = array.length,
            offsetMethod = useOffset ? "offset" : "position"
        tolerance = tolerance || 0

        while (i--) {
            var el = array[i].el ? array[i].el : $(array[i]),
                // use fitting method
                pos = el[offsetMethod]()
            pos.left += parseInt(el.css('margin-left'), 10)
            pos.top += parseInt(el.css('margin-top'), 10)
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

        while (i--) {
            dim = dimensions[i]
            distances[i] = [i, d(dim, pointer), lastPointer && d(dim, lastPointer)]
        }
        distances = distances.sort(function(a, b) {
            return b[1] - a[1] || b[2] - a[2] || b[0] - a[0]
        })

        // last entry is the closest
        return distances
    }

    function ContainerGroup(options) {
        this.options = $.extend({}, groupDefaults, options)
        this.containers = []

        if (!this.options.rootGroup) {
            this.scrollProxy = $.proxy(this.scroll, this)
            this.dragProxy = $.proxy(this.drag, this)
            this.dropProxy = $.proxy(this.drop, this)
            this.placeholder = $(this.options.placeholder)

            if (!options.isValidTarget)
                this.options.isValidTarget = undefined
        }
    }

    ContainerGroup.get = function(options) {
        if (!containerGroups[options.group]) {
            if (options.group === undefined)
                options.group = groupCounter++

                containerGroups[options.group] = new ContainerGroup(options)
        }

        return containerGroups[options.group]
    }

    ContainerGroup.prototype = {
        dragInit: function(e, itemContainer) {
            this.$document = $(itemContainer.el[0].ownerDocument)

            // get item to drag
            this.item = $(e.target).closest(this.options.itemSelector)
            this.itemContainer = itemContainer

            if (this.item.is(this.options.exclude) ||
                !this.options.onMousedown(this.item, groupDefaults.onMousedown, e)) {
                return
            }

            this.setPointer(e)
            this.toggleListeners('on')

            this.setupDelayTimer()
            this.dragInitDone = true
        },
        drag: function(e) {
            if (!this.dragging) {
                if (!this.distanceMet(e) || !this.delayMet)
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

            if (!box || box.top - t > y || box.bottom + t < y || box.left - t > x || box.right + t < x)
                if (!this.searchValidTarget())
                    this.placeholder.detach()
        },
        drop: function(e) {
            this.toggleListeners('off')

            this.dragInitDone = false

            if (this.dragging) {
                // processing Drop, check if placeholder is detached
                if (this.placeholder.closest("html")[0])
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
        searchValidTarget: function(pointer, lastPointer) {
            if (!pointer) {
                pointer = this.relativePointer || this.pointer
                lastPointer = this.lastRelativePointer || this.lastPointer
            }

            var distances = sortByDistanceDesc(this.getContainerDimensions(),
                    pointer,
                    lastPointer),
                i = distances.length

            while (i--) {
                var index = distances[i][0],
                    distance = distances[i][1]

                if (!distance || this.options.pullPlaceholder) {
                    var container = this.containers[index]
                    if (!container.disabled) {
                        if (!this.$getOffsetParent()) {
                            var offsetParent = container.getItemOffsetParent()
                            pointer = getRelativePosition(pointer, offsetParent)
                            lastPointer = getRelativePosition(lastPointer, offsetParent)
                        }
                        if (container.searchValidTarget(pointer, lastPointer))
                            return true
                    }
                }
            }
            if (this.sameResultBox)
                this.sameResultBox = undefined
        },
        movePlaceholder: function(container, item, method, sameResultBox) {
            var lastAppendedItem = this.lastAppendedItem
            if (!sameResultBox && lastAppendedItem && lastAppendedItem[0] === item[0])
                return;

            item[method](this.placeholder)
            this.lastAppendedItem = item
            this.sameResultBox = sameResultBox
            this.options.afterMove(this.placeholder, container, item)
        },
        getContainerDimensions: function() {
            if (!this.containerDimensions)
                setDimensions(this.containers, this.containerDimensions = [], this.options.tolerance, !this.$getOffsetParent())
            return this.containerDimensions
        },
        getContainer: function(element) {
            return element.closest(this.options.containerSelector).data(pluginName)
        },
        $getOffsetParent: function() {
            if (this.offsetParent === undefined) {
                var i = this.containers.length - 1,
                    offsetParent = this.containers[i].getItemOffsetParent()

                if (!this.options.rootGroup) {
                    while (i--) {
                        if (offsetParent[0] != this.containers[i].getItemOffsetParent()[0]) {
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
        setPointer: function(e) {
            var pointer = this.getPointer(e)

            if (this.$getOffsetParent()) {
                var relativePointer = getRelativePosition(pointer, this.$getOffsetParent())
                this.lastRelativePointer = this.relativePointer
                this.relativePointer = relativePointer
            }

            this.lastPointer = this.pointer
            this.pointer = pointer
        },
        distanceMet: function(e) {
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
        setupDelayTimer: function() {
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
        scroll: function(e) {
            this.clearDimensions()
            this.clearOffsetParent() // TODO is this needed?
        },
        toggleListeners: function(method) {
            var that = this,
                events = ['drag', 'drop', 'scroll']

            $.each(events, function(i, event) {
                that.$document[method](eventNames[event], that[event + 'Proxy'])
            })
        },
        clearOffsetParent: function() {
            this.offsetParent = undefined
        },
        // Recursively clear container and item dimensions
        clearDimensions: function() {
            this.traverse(function(object) {
                object._clearDimensions()
            })
        },
        traverse: function(callback) {
            callback(this)
            var i = this.containers.length
            while (i--) {
                this.containers[i].traverse(callback)
            }
        },
        _clearDimensions: function() {
            this.containerDimensions = undefined
        },
        _destroy: function() {
            containerGroups[this.options.group] = undefined
        }
    }

    function Container(element, options) {
        this.el = element
        this.options = $.extend({}, containerDefaults, options)

        this.group = ContainerGroup.get(this.options)
        this.rootGroup = this.options.rootGroup || this.group
        this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector

        var itemPath = this.rootGroup.options.itemPath
        this.target = itemPath ? this.el.find(itemPath) : this.el

        this.target.on(eventNames.start, this.handle, $.proxy(this.dragInit, this))

        if (this.options.drop)
            this.group.containers.push(this)
    }

    Container.prototype = {
        dragInit: function(e) {
            var rootGroup = this.rootGroup

            if (!this.disabled &&
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
        searchValidTarget: function(pointer, lastPointer) {
            var distances = sortByDistanceDesc(this.getItemDimensions(),
                    pointer,
                    lastPointer),
                i = distances.length,
                rootGroup = this.rootGroup,
                validTarget = !rootGroup.options.isValidTarget ||
                rootGroup.options.isValidTarget(rootGroup.item, this)

            if (!i && validTarget) {
                rootGroup.movePlaceholder(this, this.target, "append")
                return true
            }
            else
                while (i--) {
                    var index = distances[i][0],
                        distance = distances[i][1]
                    if (!distance && this.hasChildGroup(index)) {
                        var found = this.getContainerGroup(index).searchValidTarget(pointer, lastPointer)
                        if (found)
                            return true
                    }
                    else if (validTarget) {
                        this.movePlaceholder(index, pointer)
                        return true
                    }
                }
        },
        movePlaceholder: function(index, pointer) {
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
            if (this.options.vertical) {
                var yCenter = (dim[2] + dim[3]) / 2,
                    inUpperHalf = pointer.top <= yCenter
                if (inUpperHalf) {
                    method = "before"
                    sameResultBox.bottom -= height / 2
                }
                else
                    sameResultBox.top += height / 2
            }
            else {
                var xCenter = (dim[0] + dim[1]) / 2,
                    inLeftHalf = pointer.left <= xCenter
                if (inLeftHalf) {
                    method = "before"
                    sameResultBox.right -= width / 2
                }
                else
                    sameResultBox.left += width / 2
            }
            if (this.hasChildGroup(index))
                sameResultBox = emptyBox
            this.rootGroup.movePlaceholder(this, item, method, sameResultBox)
        },
        getItemDimensions: function() {
            if (!this.itemDimensions) {
                this.items = this.$getChildren(this.el, "item").filter(":not(.placeholder, .dragged)").get()
                setDimensions(this.items, this.itemDimensions = [], this.options.tolerance)
            }
            return this.itemDimensions
        },
        getItemOffsetParent: function() {
            var offsetParent,
                el = this.el
                // Since el might be empty we have to check el itself and
                // can not do something like el.children().first().offsetParent()
            if (el.css("position") === "relative" || el.css("position") === "absolute" || el.css("position") === "fixed")
                offsetParent = el
            else
                offsetParent = el.offsetParent()
            return offsetParent
        },
        hasChildGroup: function(index) {
            return this.options.nested && this.getContainerGroup(index)
        },
        getContainerGroup: function(index) {
            var childGroup = $.data(this.items[index], subContainerKey)
            if (childGroup === undefined) {
                var childContainers = this.$getChildren(this.items[index], "container")
                childGroup = false

                if (childContainers[0]) {
                    var options = $.extend({}, this.options, {
                        rootGroup: this.rootGroup,
                        group: groupCounter++
                    })
                    childGroup = childContainers[pluginName](options).data(pluginName).group
                }
                $.data(this.items[index], subContainerKey, childGroup)
            }
            return childGroup
        },
        $getChildren: function(parent, type) {
            var options = this.rootGroup.options,
                path = options[type + "Path"],
                selector = options[type + "Selector"]

            parent = $(parent)
            if (path)
                parent = parent.find(path)

            return parent.children(selector)
        },
        _serialize: function(parent, isContainer) {
            var that = this,
                childType = isContainer ? "item" : "container",

                children = this.$getChildren(parent, childType).not(this.options.exclude).map(function() {
                    return that._serialize($(this), !isContainer)
                }).get()

            return this.rootGroup.options.serialize(parent, children, isContainer)
        },
        traverse: function(callback) {
            $.each(this.items || [], function(item) {
                var group = $.data(this, subContainerKey)
                if (group)
                    group.traverse(callback)
            });

            callback(this)
        },
        _clearDimensions: function() {
            this.itemDimensions = undefined
        },
        _destroy: function() {
            var that = this;

            this.target.off(eventNames.start, this.handle);
            this.el.removeData(pluginName)

            if (this.options.drop)
                this.group.containers = $.grep(this.group.containers, function(val) {
                    return val != that
                })

            $.each(this.items || [], function() {
                $.removeData(this, subContainerKey)
            })
        }
    }

    var API = {
        enable: function() {
            this.traverse(function(object) {
                object.disabled = false
            })
        },
        disable: function() {
            this.traverse(function(object) {
                object.disabled = true
            })
        },
        serialize: function() {
            return this._serialize(this.el, true)
        },
        refresh: function() {
            this.traverse(function(object) {
                object._clearDimensions()
            })
        },
        destroy: function() {
            this.traverse(function(object) {
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

        return this.map(function() {
            var $t = $(this),
                object = $t.data(pluginName)

            if (object && API[methodOrOptions])
                return API[methodOrOptions].apply(object, args) || this
            else if (!object && (methodOrOptions === undefined ||
                    typeof methodOrOptions === "object"))
                $t.data(pluginName, new Container($t, methodOrOptions))

            return this
        });
    };

}(jQuery, window, 'sortable');
