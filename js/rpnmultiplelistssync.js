//multiplelistssync
var rpnmultiplelistssyncmodule = function() {

    var datas;
    var domelem;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            lists: ["list", "not", "set!"],
            shuffle:false,
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
            /*datas.lists;
            if(datas.shuffle){
                state=_.shuffle(state);
            }*/
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('multiplelistssync');
        var listToSort;
        
        //build lists with items to sort
        _.each(datas.lists, function(li,idx){
            listToSort = $('<ul class="list-unstyled'+(datas.vertical?'':' list-inline')+'" id="sortable-'+idx+'" ></ul>').sortable({
                placeholder: "sorting-highlight",
                tolerance:"pointer"
            });
            //and fill if there is already a response
            if(!_.isEmpty(state.lists[idx])){
                _.each(state.lists[idx], function(item) {
                    listToSort.append($('<li>'+item+'</li>'));
                });
            }
            else{
                _.each(datas.lists[idx].items, function(item, idx) {
                    listToSort.append($('<li>'+item+'</li>'));
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
        var syncitems = new Array();
        _.each($('ul',domelem), function(ul,idx){
            syncitems.push(_.map($('ul[id="sortable-'+idx+'"] li',domelem),function(ele,idx){return $(ele).html()}));
        });
        state.lists = syncitems;
        state.responses = _.unzip(syncitems);
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