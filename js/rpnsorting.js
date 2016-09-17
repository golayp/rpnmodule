//sorting
var rpnsortingmodule = function() {

    var datas;
    var domelem;
    var state;
    

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

        //build sentence with items to select
        var sentenceToSort=$('<ul class="list-unstyled'+(datas.vertical?'':' list-inline')+'"></ul>');
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
        state=_.map($('li',domelem),function(ele,idx){
            return ($(ele).children().is("img")) ? datas.sentence[$(ele).attr("val")] : $(ele).html();
        });
        return state;
    };
    
   var score = function(sol){
        var score = 0;
        if(sol.alternative){
            _.each(sol.alternative, function(ssol, idx) {
                score += (_.isEqual(state,ssol) ? 1 : 0);
            });
        }else{
            score = (_.isEqual(state,sol) ? 1 : 0);
        }
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score:score
    };

};