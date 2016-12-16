//sorting
var rpnsortingmodule = function() {

    var datas;
    var domelem;
    var state;
    var successArray;
    var responsesArray;
    var limitedChoice;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: ["sentence", "not", "set!"],
            shuffle:false,
            vertical:false
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= datas.sentence;
            if(datas.shuffle){
                state=_.shuffle(state);
            }
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('sorting');
        limitedChoice = state.length <= 2 ? true : false;

        //build sentence with items to select
        var sentenceToSort=$('<ul class="list-unstyled'+(datas.vertical?'" ':' list-inline" ')+(_.isUndefined(datas.grid)? '' : 'style="width:'+datas.grid+';"')+'></ul>');
        _.each(state, function(item, idx) {
            var noElem = _.indexOf(datas.sentence, item);
            sentenceToSort.append($('<li val="'+noElem+'">'+item+'</li>'));
        });
        domelem.append(sentenceToSort);
        sentenceToSort.sortable({
          placeholder: "sorting-highlight",
          tolerance:"pointer"
        });
        $(domelem).disableSelection();
        bindUiEvents();
    };

    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        responsesArray = new Array();
        _.each($('.ui-sortable', domelem),function(elem,idx){
            responsesArray[idx] = elem;
        });
        
        state=_.map($('li',domelem),function(ele,idx){
            return ($(ele).children().is("img")) ? datas.sentence[$(ele).attr("val")] : $(ele).html();
        });
        return state;
    };
    
   var score = function(sol){
        var score = 0;
        successArray = new Array();
        var solution; 
       
        if(sol.alternative){
            _.each(sol.alternative, function(ssol, idx) {
                score += (_.isEqual(state,ssol) ? 1 : 0);
                solution = sol.alternative[0].toString();
            });
        }else{
            score = (_.isEqual(state,sol) ? 1 : 0);
            solution = sol.toString();
        }
       
        successArray[0] = new Array();
        if (score > 0){
            successArray[0] = ["ok", solution];
        }else{
            successArray[0] = [state.toString(), solution];
        }
        return score;
    };
    var pointmax = function(sol){
        var pointmax = 1;
        
        return pointmax;
    };
    var successState = function(){
        return successArray;
    };
    var responsesState = function(){
        return responsesArray;
    };
    var limitedChoiceState = function(){
        return limitedChoice;
    };
    
    return {
        init: init,
        validate: validate,
        score:score,
        pointmax: pointmax,
        successState: successState,
        responsesState: responsesState,
        limitedChoiceState: limitedChoiceState
    };

};
