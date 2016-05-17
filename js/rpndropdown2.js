//dropdown
var rpndropdown2module = function() {

    var datas;
    var domelem;
    var state;
    

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
        state=_.map($('select',domelem),function(ele,idx){return $(ele).val()});
        return state;
    };
    
    var score = function(sol){
        var score=0;
        _.each(sol,function(s,idx){
            if(s.alternative){
                score += (_.contains(s.alternative,state[idx] ) ? 1 : 0);
            }else{
                score += state[idx] == s ? 1 : 0;
            }
        });
        return score;
    };
    

    return {
        init: init,
        validate: validate,
        score:score
    };

};