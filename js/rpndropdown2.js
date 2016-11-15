//dropdown2
var rpndropdown2module = function() {

    var datas;
    var domelem;
    var state;
    var successArray;
    var responsesArray;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            toselect: "toselect not set!<b>Read</b> documentation please!",
            items:[]
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
        domelem.addClass('dropdown2');

        //build sentence with items to select
        domelem.append($('<div class="form-inline">' + datas.toselect + '</div>'));
        $.each($('b', domelem), function(idx, toselect) {
            var t =$(toselect);
            var opts=[];
            $.each(datas.items[idx].choice, function(id, choice){
                opts[id]=$('<option value="' + choice+ '" '+(state[idx]==choice?'selected':'')+'>' + choice + '</option>');
            });
            t.append($('<select class="rpnm-input dropdown form-control">').append(opts));
        });

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

    return {
        init: init,
        validate: validate,
        score: score,
        pointmax: pointmax,
        successState: successState,
        responsesState: responsesState
    };

};
