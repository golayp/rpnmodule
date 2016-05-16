//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            todrag: ["empty"],
            todrop: ["empty too :'("]
        });
        datas = _datas;
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = {
                todrag:datas.todrag,
                todrop:datas.todrop
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('dragdropsorting');
        domelem.append($('<div class="row"><div class="container"><div class="col-md-2 col"><ul id="drag_this_'+domelem.attr('id')+'" class="dragthis list-unstyled"></ul></div></div><div class="row"><div class="container dropzonecontainer"></div></div>'));
        var nbcol=datas.todrop.length
        $.each(datas.todrop, function(idx, drop) {
            $('.dropzonecontainer',domelem).append($('<div class="col-xs-'+(nbcol<5?'3':'2')+(idx==0?(nbcol==2?' col-xs-offset-3':(nbcol==3||nbcol==5)?' col-xs-offset-1':''):'')+'"><div class="droppable"><span class="lead">' + drop + '</span><ul class="list-unstyled"></ul></div></div>'));
            if(!_.isUndefined(state[drop])){
                _.each(state[drop],function(dropped,idxi){
                    $('ul',$('.droppable',domelem)[idx]).append('<li class="draggable">'+dropped+'</li>');
                });
            }
        });
        $('.droppable ul',domelem).sortable({
            connectWith: '.droppable ul',
            dropOnEmpty: true,
            placeholder:'droppable-placeholder',
            forcePlaceholderSize :true,
            distance: 0.5,
            receive:function  (event, ui) {
                if($(ui.sender[0]).hasClass('dragthis')){
                    state.todrag.pop();
                }
                nextDraggable();
            }
        });
        bindUiEvents();
        nextDraggable();
    };

    var nextDraggable = function() {
        if ($('.dragthis li',domelem).length == 0 && state.todrag.length > 0) {
            var itemToDrag = _.last(state.todrag);
            $('.dragthis',domelem).append($('<li class="draggable">' + itemToDrag + '</li>'));
            $('.dragthis',domelem).sortable({
                connectWith: '.droppable ul',
                appendTo:'body',
                placeholder:'droppable-placeholder',
                forcePlaceholderSize :true,
                dropOnEmpty: true,
                distance: 0.5
            });
        }
    };

    var bindUiEvents = function() {

    };
    
    var validate = function(){
        _.each($('.droppable',domelem), function(elem, idx) {
            var txts = [];
            $.each($(elem).find('li'), function(idx, txt) {
                txts.push($(txt).html());
            });
            state[$(elem).find('span').html()] = txts;
        });
        return state;
    };
    
    var score = function(sols) {
        var score = 0;
        _.map(sols, function(sol, drop) {
            score += _.intersection(state[drop], sol).length;
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };
};