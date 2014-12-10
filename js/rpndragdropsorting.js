//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            todrag: ["empty"],
            todrop: ["empty too :'("]
        });
        datas = _datas;
        domelem = _domelem;
        if(!_.isUndefined(_state)){
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
        domelem.append($('<div class="row"><div class="container"><div class="col-md-2 col"><ul class="dragthis list-unstyled"></ul></div></div><div class="row"><div class="container" id="dropzonecontainer"></div></div>'));

        $.each(datas.todrop, function(idx, drop) {
            $('#dropzonecontainer').append($('<div class="col-md-2"><div class="droppable"><span class="lead">' + drop + '</span><ul class="list-unstyled"></ul></div></div>'));
            if(!_.isUndefined(state[drop])){
                _.each(state[drop],function(dropped,idxi){
                    $('ul',$('.droppable')[idx]).append('<li class="draggable">'+dropped+'</li>');
                });
            }
        });
        $(".droppable ul").sortable({
            group: 'drop',
            onDrop:function  (item, targetContainer, _super) {
                nextDraggable();
                _super(item);
            }
        });

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);
        
        bindUiEvents();
        nextDraggable();
    };

    var nextDraggable = function() {
        if ($('.dragthis li').length == 0 && state.todrag.length > 0) {
            var itemToDrag = state.todrag.pop();
            $('.dragthis').append($('<li class="draggable">' + itemToDrag + '</li>'));
            $(".dragthis").sortable({
                group: 'drop',
                drop: false
            });
        }
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            _.each($('.droppable'), function(elem, idx) {
                var txts = [];
                $.each($(elem).find('li'), function(idx, txt) {
                    txts.push($(txt).text());
                });
                state[$(elem).find('span').text()] = txts;
            });
            
            rpnsequence.handleEndOfModule(state, function(saved_state, sols) {
                var score = 0;
                _.map(sols, function(sol, drop) {
                    score += _.intersection(saved_state[drop], sol).length;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };
};