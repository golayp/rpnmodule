//dragdropsorting
var rpndragdropsortingmodule = function() {

    var datas;
    var domelem;
    var state;
    var dragfromtext;
    var singledd;
    var itemSortedState;
    var itemToSortArray;

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
                todrop:datas.todrop
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
                    hoverClass: 'dragdropsortingtoolbar-hover',
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
        var itemSorted = new Array();
        _.each($('.droppable',domelem), function(elem, idx) {
            var txts = [];
            $.each($(elem).find('li'), function(idx, txt) {
                txts.push($(txt).html());
                itemSorted.push($(txt).html());
            });
            state[$(elem).find('span').html()] = txts;
        });
        if (dragfromtext){
            state.todrag = _.difference(itemToSortArray, _.uniq(itemSorted));
        }
        console.log(state)
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
        _.map(sols, function(sol, drop) {
            score += _.intersection(state[drop], sol).length;
            if (!singledd && dragfromtext){
                score -= _.difference(state[drop], sol).length;
            }
        });
        score = score >= 0 ? score : 0;
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };
};