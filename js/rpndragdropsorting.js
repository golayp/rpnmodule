//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var state;
    var dragfromtext;
    var singledd;
    var itemSortedState;
    var itemToSortArray;
    var successArray;
    var responsesArray;
    var limitedChoice;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            todrag: ["empty"],
            todrop: ["empty too :'("],
            tosort: "empty"
        });
        datas = _datas;
        dragfromtext = !_.isUndefined(_datas.dragfromtext);
        singledd = !_.isUndefined(_datas.singledd) ? _datas.singledd : false;
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = {
                todrag:datas.todrag,
                todrop:datas.todrop,
                dragfromtext:!_.isUndefined(_datas.dragfromtext)
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('dragdropsorting');
        if (dragfromtext){
            //build trash
            if (!singledd){
                var dragdropsortingtoolbar = $('<div class="dragdropsortingtoolbar"></div>');
                var trash = $('<i class="fa fa-trash-o"></i>').droppable({
                    accept:'.sorted',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        $(u.draggable, domelem).remove();
                        handleToDragState();
                    }
                });
                dragdropsortingtoolbar.append(trash);
                domelem.append(dragdropsortingtoolbar);
            }
            
            //build panel with sentences and items to sort
            domelem.append($('<div class="form-inline">' + datas.tosort + '</div><div class="row"><div class="container dropzonecontainer"></div></div>'));
            
            itemSortedState = new Array();
            itemToSortArray = new Array();
            
            $.each($('b', domelem), function(idx, todragg) {
                var t = $(todragg);

                itemSortedState[idx] = (_.indexOf(state.todrag, t.html())>-1 || state.todrag.toString()=="empty") ? 0 : 1;
                itemToSortArray[idx] = t.html();
                
                var draggable=$('<ul id="drag_this_'+idx+'" class="dragthis list-unstyled list-inline fromtext '+((itemSortedState[idx])?"dropped":"")+'"><li class="draggable">'+t.html()+'</li></ul>').sortable({
                    connectWith: '.droppable ul',
                    appendTo:'body',
                    placeholder:'droppable-placeholder',
                    forcePlaceholderSize :true,
                    dropOnEmpty: true,
                    distance: 0.5,
                    remove: function(e,li) {
                        copyHelper= li.item.clone().insertAfter(li.item);
                        $(this).sortable('cancel');
                    },
                    items:"li:not(.disabled)"
                }).disableSelection();
                if(singledd && itemSortedState[idx]){
                        draggable.sortable('destroy');
                    }
                t.replaceWith(draggable);
            });
        }else{
            //build panel for items to sort
            domelem.append($('<div class="row"><div class="container"><div class="col-md-2 col"><ul id="drag_this_'+domelem.attr('id')+'" class="dragthis list-unstyled"></ul></div></div><div class="row"><div class="container dropzonecontainer"></div></div>'));
        }
        //Build panel for dropzone
        var nbcol=datas.todrop.length
        limitedChoice = nbcol <= 2 ? true : false;
        $.each(datas.todrop, function(idx, drop) {
            $('.dropzonecontainer',domelem).append($('<div class="col-xs-'+(nbcol<5?'3':'2')+(idx==0?(nbcol==2?' col-xs-offset-3':(nbcol==3||nbcol==5)?' col-xs-offset-1':''):'')+'"><div class="droppable"><span class="lead">' + drop + '</span><ul class="list-unstyled"></ul></div></div>'));
            if(!_.isUndefined(state[drop])){
                _.each(state[drop],function(dropped,idxi){
                    $('ul',$('.droppable',domelem)[idx]).append('<li class="draggable sorted">'+dropped+'</li>');
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
                if(dragfromtext && $(ui.sender[0], domelem).hasClass('fromtext')){
                    $(ui.sender[0], domelem).addClass('dropped');
                    if(singledd){
                        $(ui.sender[0], domelem).sortable('destroy');
                    }
                    removeDuplicates();
                }else if(dragfromtext){
                    removeDuplicates();
                }else{
                    if($(ui.sender[0], domelem).hasClass('dragthis')){
                        state.todrag.pop();
                    }
                    nextDraggable();
                }
            }
        }).droppable({
            drop: function(event,ui) {
                ui.draggable.addClass('sorted');
            }
        });
        bindUiEvents();
        if(!dragfromtext){
            nextDraggable();
        }
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
        responsesArray = new Array();
        var i = 0;
        _.each($('.droppable',domelem), function(elem, idx) {
            var list = [];
            $.each($(elem).find('li'), function(id, txt) {
                list.push($(txt).html());
                responsesArray[i] = txt;
                i++;
            });
            state[$(elem).find('span').html()] = list;
        });
        if (dragfromtext){
            state.todrag = _.difference(itemToSortArray, _.uniq(responsesArray));
        }
        return state;
    };
    
    var removeDuplicates = function(){
        _.each($('.droppable',domelem), function(elem, idx) {
            var list = new Array();
            $.each($(elem).find('li'), function(id, txt) {
                var item = $(txt).html();
                if (_.indexOf(list, item)>-1){
                    this.remove();
                }else{
                    list.push(item);               
                }
            });
        });
    };
    
    var handleToDragState = function(){
        var itemSorted = new Array();
        _.each($('.droppable',domelem), function(elem, idx) {
            $.each($(elem).find('li'), function(idx, txt) {
                itemSorted.push($(txt).html());
            });
        });
        itemSorted = _.compact(_.uniq(itemSorted));
        console.log(itemSorted)
        $.each($('li', '.form-inline'), function(idx, todrag){
            console.log($(todrag).html())
            if (_.indexOf(itemSorted, $(todrag).html())==-1){
                 itemSortedState[idx] = 0;
                $(todrag).hasClass('sorted') ? $(todrag).removeClass('sorted') : '';
                $(todrag).parent().hasClass('dropped') ? $(todrag).parent().removeClass('dropped') : '';
            }
        });
    };
    
    var score = function(sols) {
        var score = 0;
        successArray = new Array();
        var solution = "x";
        var i = 0;
        
        _.map(sols, function(sol, drop) {
            score += _.intersection(state[drop], sol).length;
        });
        
        _.each($('.droppable',domelem), function(elem, idx) {
            var list = [];
            $.each($(elem).find('li'), function(id, txt) {
                list.push($(txt).html());
                var drop = $(elem).find('span').html();
                if (_.contains(sols[drop], $(txt).html())){
                    solution = drop;
                    successArray[i] = ["ok",solution];
                }else{
                    solution = _.map(sols, function(sol, item){
                        if(_.contains(sol, $(txt).html())){
                            return item;
                        }
                    });
                    successArray[i] = [drop,_.compact(solution)];
                }
                i++;
            });
            state[$(elem).find('span').html()] = list;
        });
        return score;
    };
    var pointmax = function(sol){
        var pointmax = _.flatten(_.toArray(sol)).length;
        
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
