//dropdown
var rpndropdownmodule = function() {

    var datas;
    var domelem;
    var state;
    var successArray;
    var responsesArray;
    var limitedChoice;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: "",
            circumstance:["",""]
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
        var choiceLength = new Array();

        //build panel with sentence
        if(!_.isEmpty(datas.circumstance[0])) {domelem.append($('<hr style="border-top: 5px solid #ccc;"><p><b>' + datas.circumstance[0] + '</b></p>'));}
		if(!_.isEmpty(datas.sentence)) {domelem.append($('<p>' + datas.sentence + '</p>'));}
        if(!_.isEmpty(datas.circumstance[1])) {domelem.append($('<hr style="border-top: 5px solid #ccc;"><p><b>' + datas.circumstance[1] + '</b></p>'));}

        //build sentence with items to select
        var sentenceToComplete=$('<div class="form-inline">');
        var internalCounter=0;
        $.each(datas.items, function(idx, item) {
            if(item.choice.length==1){
                sentenceToComplete.append(" " + item.choice[0] + " ");
            }else{
                var opts=[];
                choiceLength.push(datas.items[idx].choice.length);
                opts[0]=$('<option value="" '+(state[internalCounter]==''?'selected':'')+'> ?</option>');
                $.each(datas.items[idx].choice, function(id, choice){
                    opts[id+1]=$('<option value="' + choice+ '" '+(state[internalCounter]==choice?'selected':'')+'>' + choice + '</option>');
                });
                sentenceToComplete.append($('<select class="rpnm-input dropdown form-control">').append(opts));
                internalCounter++;
            }
        });
        limitedChoice = _.min(choiceLength) <= 2 ? true : false;
        domelem.append(sentenceToComplete);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        responsesArray = new Array();
        _.each($('select', domelem), function(elem, idx){
            responsesArray[idx] = elem;
        });
        state=_.map($('select',domelem),function(ele,idx){return $(ele).val()});
        return state;
    };
    
    var score = function(sol){
        var score=0;
        successArray = new Array();
        var solution;
        
        _.each(sol,function(s,idx){
            var scoreIni = score;
            
            if(s.alternative){
                score += (_.contains(s.alternative,state[idx] ) ? 1 : 0);
                solution = s.alternative[0];
            }else{
                score += state[idx] == s ? 1 : 0;
                solution = s;
            }
            successArray[idx] = new Array();
            if (score > scoreIni || (s == "" && state[idx] == s)){
                successArray[idx] = ["ok",solution];
            }else{
                successArray[idx] = [state[idx],solution];
            }
        });
        return score;
    };
    var pointmax = function(sol){
        var pointmax = sol.length;
        
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
        score: score,
        pointmax: pointmax,
        successState: successState,
        responsesState: responsesState,
        limitedChoiceState: limitedChoiceState
    };

};
