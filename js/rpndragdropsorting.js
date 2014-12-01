//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            todrag: ["empty"],
            todrop: ["empty too :'("]
        });
        datas = _datas;
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('dragdropsorting');
        domelem.append($('<div class="row"><div class="container"><div class="col-md-2"><ul class="dragthis list-unstyled"></ul></div></div><div class="row"><div class="container" id="dropzonecontainer"></div></div>'));

        $.each(datas.todrop, function(idx, drop) {
            $('#dropzonecontainer').append($('<div class="col-md-2"><div class="droppable"><span class="lead">' + drop + '</span><ul class="list-unstyled"></ul></div></div>'))
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
        if ($('.dragthis li').length == 0 && datas.todrag.length > 0) {
            var itemToDrag = datas.todrag.pop();
            $('.dragthis').append($('<li class="draggable">' + itemToDrag + '</li>'))
            $(".dragthis").sortable({
                group: 'drop',
                drop: false
            });
        }
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            if (datas.todrag.length > 0) {
                rpnsequence.displayAlert(rpnsequence.getLabels().DragDropNotEmpty);
            }
            else {
                _.each($('.droppable'), function(elem, idx) {
                    var txts = [];
                    $.each($(elem).find('li'), function(idx, txt) {
                        txts.push($(txt).text());
                    });
                    responses[$(elem).find('lh').text()] = txts;
                })
                rpnsequence.handleEndOfModule(responses, function(res, sols) {
                    var score = 0;
                    _.map(sols, function(sol, drop) {
                        score += _.intersection(res[drop], sol).length;
                    });
                    return score;
                });
            }
        });
    };

    return {
        init: init
    };
};