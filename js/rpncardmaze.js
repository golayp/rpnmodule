//cardmaze
var rpncardmazemodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;
    var currentHead;
    var height;
    var width;
    var snake;
    var startid;
    var endid;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            mazewidth: 6,
            mazeheight: 4,
            cards: [{
                label: "label",
                clue: "clue"
            }]
        });
        datas = _datas;
        height = datas.mazeheight;
        width = datas.mazewidth;
        domelem = _domelem;
        responses = [];
        buildUi();
        snake = [];
    };

    var buildUi = function() {
        //build card maze
        domelem.addClass('cardmaze');
        domelem.append($('<div class="row"><div class="container maze"></div></div>'));
        _.each(datas.cards, function(card, idx) {
            $('.maze',domelem).append($('<div class="col-xs-2 nopadding"></div>').append($('<div class="card' + (card.start ? ' start selectable' : '') + (card.end ? ' end' : '') + '"><p>' + card.label + '</p><p>' + card.clue + '</p></div>').data('cardId',idx)));
            if (card.start) {
                currentHead = idx;
                startid = idx;
            }
            if (card.end) {
                endid = idx;
            }

        });
        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);
        bindUiEvents();

    };


    var bindUiEvents = function() {
        _.each($('.card'), function(card, idx) {
            $(card).click(function() {
                if ($(card).hasClass('start') || $(card).hasClass('selectable') || $(card).hasClass('selected')) {
                    if (((idx == currentHead && $(card).hasClass('start') ) ||idx == currentHead + width || idx == currentHead - width || idx == currentHead - 1 || idx == currentHead + 1) && !$(card).hasClass('selected')) {
                        snake.push(card);

                    }else if($(card).hasClass('selected')){
                        snake=snake.slice(0,_.indexOf(snake,card)+1);
                    }
                    currentHead = idx;
                    $('.selected').removeClass('selected');
                    $('.selectable').removeClass('selectable');
                    $('.card').removeClass('fromtop frombottom fromleft fromright totop tobottom toleft toright');
                    _.each(snake,function(icard,ii){
                        if(ii>0){
                            var dif=$(icard).data('cardId')-$(snake[ii-1]).data('cardId');
                            if(dif==width){
                                $(icard).addClass('fromtop');
                            }else if(dif==-width){
                                $(icard).addClass('frombottom');
                            }else if(dif==1){
                                $(icard).addClass('fromleft');
                            }else if(dif==-1){
                                $(icard).addClass('fromright');
                            }
                        }
                        if(ii<snake.length-1){
                            var dif=$(icard).data('cardId')-$(snake[ii+1]).data('cardId');
                            if(dif==-width){
                                $(icard).addClass('tobottom');
                            }else if(dif==width){
                                $(icard).addClass('totop');
                            }else if(dif==-1){
                                $(icard).addClass('toright');
                            }else if(dif==1){
                                $(icard).addClass('toleft');
                            }
                        }
                        $(icard).addClass('selected');
                    });
                    if (idx != endid) {
                        if (!((idx + width) > (width * height))) {
                            $($('.card')[idx + width]).addClass('selectable');
                        }
                        if (!((idx - width) < 0)) {
                            $($('.card')[idx - width]).addClass('selectable');
                        }
                        if (idx % width != 0) {
                            $($('.card')[idx - 1]).addClass('selectable');
                        }
                        if ((idx + 1) % width != 0) {
                            $($('.card')[idx + 1]).addClass('selectable');
                        }
                    }
                }
            });
        });
        validationButton.click(function() {
            if (!$(snake[snake.length - 1]).hasClass('end')) {
                rpnsequence.displayAlert(rpnsequence.getLabels().CardMazeNotEnded);
            } else {
                _.each(snake,function(card,idx){
                    responses[idx]=$(card).data("cardId");
                });
                rpnsequence.handleEndOfModule(responses, function(res, sol) {
                    var score = 0;
                    _.each(sol, function(cardIdx, idx) {
                        score += (res[idx] == cardIdx ? 1 : 0);
                    })
                    return score;
                });
            }
        });
    };

    return {
        init: init
    };
};