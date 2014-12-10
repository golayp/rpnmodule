//gapfull
var rpngapfullmodule = function() {

    var datas;
    var domelem;
    var gapfull;
    var validationButton;
    var state;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            sentence: "sentence not set!"
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(datas.state)){
            state=datas.state;
        }else{
            state=datas.sentence;
        }
        
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('gapfull');

        //build panel with sentence
        domelem.append($('<p>' + datas.sentence + '</p><input type="text" class="rpnm_input form-control">'));
        gapfull=$('.rpnm_input',domelem);
        gapfull.val(state);
        
        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            state=$('.rpnm_input',domelem).val();
            rpnsequence.handleEndOfModule(state, function(saved_state, sol) {
                //Try to trim and do automatic corrections here.
                return saved_state == sol ? 1 : 0;
            });
        });
    };

    return {
        init: init
    };

};