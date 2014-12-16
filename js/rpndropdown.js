//dropdown
var rpndropdownmodule = function() {

    var datas;
    var domelem;
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
            state= _.map(_.filter(datas.items,function(item){return item.choice.length>1}),function(item,idx){return '';});
        }
        
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('dropdown');

        //build panel with sentence
        domelem.append($('<p>' + datas.circumstance[0] + '</p>'));
        domelem.append($('<p>' + datas.sentence + '</p>'));
        domelem.append($('<p>' + datas.circumstance[1] + '</p>'));

        //build sentence with items to select
        var sentenceToComplete=$('<div class="form-inline">');
        var internalCounter=0;
        $.each(datas.items, function(idx, item) {
            if(item.choice.length==1){
                sentenceToComplete.append(" " + item.choice[0] + " ");
            }else{
                var opts=[];
                
                opts[0]=$('<option value="" '+(state[internalCounter]==''?'selected':'')+'>- ? -</option>');
                $.each(datas.items[idx].choice, function(id, choice){
                    opts[id+1]=$('<option value="' + choice+ '" '+(state[internalCounter]==choice?'selected':'')+'>' + choice + '</option>');
                });
                sentenceToComplete.append($('<select class="rpnm-input dropdown form-control">').append(opts));
                internalCounter++;
            }
        });
        domelem.append(sentenceToComplete);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        state=_.map($('select',domelem),function(ele,idx){return $(ele).val()});
        rpnsequence.handleEndOfModule(state);
    };
    
    var score = function(sol){
        var score=0;
        _.each(sol,function(s,idx){
            score+=(state[idx]==s?1:0);
        });
        return score;
    };
    

    return {
        init: init,
        validate: validate,
        score:score
    };

};