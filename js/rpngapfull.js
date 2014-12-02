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