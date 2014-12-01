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