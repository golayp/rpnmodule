//multiplelistssync
var rpnmultiplelistssyncmodule = function() {

    var datas;
    var domelem;
    var state;
    var typeList;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            lists: {
                "title":"",
                "items":["list", "not", "set!"],
                "movable":false
            },
            vertical:true
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= {
                lists : _.map(_.filter(datas.lists,function(list){return list.items.length>1}),function(list,idx){return '';}),
                responses:_.map(_.filter(datas.responses,function(resp){return resp.length>1}),function(r,idx){return '';})
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('multiplelistssync');
        var listToSort;
        typeList = new Array();
        
        //build lists with items to sort
        _.each(datas.lists, function(li,idx){
            typeList[idx] = datas.lists[idx].type ? datas.lists[idx].type : '';
            if(datas.lists[idx].movable){
                listToSort = $('<ul class="list-unstyled'+(datas.vertical?'':' list-inline')+'" id="sortable-'+idx+'" >'+(_.isEmpty(datas.lists[idx].title) ? '' : '<li class="title">'+datas.lists[idx].title)+'</li></ul>').sortable({
                    items: "li:not(.title)",
                    placeholder: "sorting-highlight",
                    tolerance:"pointer"
                });
            }
            else{
                listToSort = $('<ul class="list-unstyled'+(datas.vertical?'':' list-inline')+' unmovable" id="sortable-'+idx+'" >'+(_.isEmpty(datas.lists[idx].title) ? '' : '<li class="title">'+datas.lists[idx].title)+'</li></ul>')
            }
            //and fill if there is already a response
            if(!_.isEmpty(state.lists[idx])){
                _.each(state.lists[idx], function(item,id) {
                    var noElem = _.indexOf(datas.lists[idx].items, item);
                    listToSort.append($('<li val=\"'+noElem+'\">'+item+'</li>'));
                });
            }
            else{
                _.each(datas.lists[idx].items, function(item,id) {
                    listToSort.append($('<li val=\"'+id+'\">'+item+'</li>'));
                });
            };
            domelem.append(listToSort);
        });
        $(domelem).disableSelection();
        
        bindUiEvents();
    };
   
    var bindUiEvents = function() {
        
    };
    
    var validate = function(){
        var answerArray = new Array();
        _.each($('ul',domelem), function(ul,idx){
            answerArray.push(_.map($('ul[id="sortable-'+idx+'"] li:not(.title)',domelem),function(ele,id){
                return (typeList[idx]=="picture") ? datas.lists[idx].items[$(ele).attr("val")] : $(ele).html()
            }));
        });
        state.lists = answerArray;
        state.responses = _.unzip(answerArray);
        return state;
    };
    
   var score = function(sols){
        var score = 0;
        _.map(sols.syncitems, function(sol) {
            _.each(state.responses, function(resp, idx){
                score += _.isEqual(resp, sol) ? 1 : 0;
            });
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score:score
    };

};