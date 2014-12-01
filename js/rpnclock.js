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