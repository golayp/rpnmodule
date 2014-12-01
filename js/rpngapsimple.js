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