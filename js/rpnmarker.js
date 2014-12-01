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