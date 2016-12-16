//gapfull
var rpngapfullmodule = function() {

    var datas;
    var domelem;
    var gapfull;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: "sentence not set!"
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
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

        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        if(isNaN($('.rpnm_input',domelem).val().split("'").join(""))==false){
            state= $('.rpnm_input',domelem).val().split("'").join("");
        }else{
           state= $('.rpnm_input',domelem).val(); 
        }
        
        return state;
    };
    
    var score =  function(sol) {
        //Try to trim and do automatic corrections here.
        return state == sol ? 1 : 0;
    };
    var pointmax = function(sol){
        var pointmax = 1;

        return pointmax;
    };
    
    return {
        init: init,
        validate: validate,
        score: score,
        pointmax: pointmax
    };

};
