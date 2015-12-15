/*global rpnsequence, jsPlumb, _*/
//plumb
var rpnplumb = function() {

    var datas;
    var domelem;
    var state;
    var plumb;
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            left: ["item1", "item2", "item3"],
            right: ["item1", "item2", "item3"],
            shuffle:false
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = {};
            _.defaults(state, {
                left: [],
                right: [],
                responses:[]
            });
            state.left=_.map(datas.left, function(d,i){
                return i;
            });
            state.right=_.map(datas.right, function(d,i){
                return i;
            });
            state.left=datas.shuffle?_.shuffle(state.left):state.left;
            state.right=datas.shuffle?_.shuffle(state.right):state.right;
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('plumb');
        
        //build sentence with items to select
        var leftItems=$('<ul class="list-unstyled plumbsource"></ul>');
        var rightItems=$('<ul class="list-unstyled plumbtarget"></ul>');
        _.each(state.left, function(item, idx) {
            leftItems.append($('<li>').html(datas.left[item]).data( 'idx', item ));
        });
        _.each(state.right, function(item, idx) {
            rightItems.append($('<li>').html(datas.right[item]).data( 'idx', item ));
        });
        domelem.append([$('<div class="col-xs-5"></div>').append(leftItems),$('<div class="col-xs-2"></div>'),$('<div class="col-xs-5"></div>').append(rightItems)]);
        plumb=jsPlumb.getInstance();
        plumb.importDefaults({
            Connector : [ "Bezier", { curviness: 0 } ],
            PaintStyle : {
                lineWidth:4
            },
            DragOptions : { cursor: "crosshair" },
            Endpoint : [ "Dot", { radius:10 } ]
        });
        plumb.ready(function(){
            plumb.setContainer(domelem);
            //handle change style on target endpoint
            plumb.bind("connection",function(info){
                //rpnsequence.log($(info.source).data('idx') + ' -> ' + $(info.target).data('idx'));
                var srcIdx=$(info.source).data('idx');
                state.responses[srcIdx]=$(info.target).data('idx');
                info.targetEndpoint.setPaintStyle({
                    fillStyle:info.sourceEndpoint.connectorStyle.strokeStyle
                });
            });
            //handle change style on target endpoint and on connector style
            plumb.bind("connectionMoved",function(info){
                info.connection.setPaintStyle({strokeStyle:info.newSourceEndpoint.connectorStyle.strokeStyle});
                info.newTargetEndpoint.setPaintStyle({
                    fillStyle:info.newSourceEndpoint.connectorStyle.strokeStyle
                });
            });
            $('li',leftItems).each(function(i,li){
                plumb.makeSource(li, {
                    maxConnections:1,
                    endpointStyle:{ fillStyle:rpnsequence.getColor(i)},
                    connectorStyle:{ strokeStyle:rpnsequence.getColor(i), lineWidth:2 },
                    anchor: "Right"
                });
            });
            $('li',rightItems).each(function(i,li){
               plumb.makeTarget(li, {
                    maxConnections:1,
                    anchor:"Left"
                });
            });
            //try to remount sta given
            _.each(state.responses,function(target,source){
                if(target !=null){
                    var srcElem=_.filter($('ul.plumbsource li'),function(li){
                        return $(li).data('idx')==source;
                    });
                    var targetElem=_.filter($('ul.plumbtarget li'),function(li){
                        return $(li).data('idx')==target
                    });
                    plumb.connect({
                       source:$(srcElem[0]).attr('id'),
                       target:$(targetElem[0]).attr('id')
                    });
                }
            });
        });
        
        $(window).resize(function(){
            plumb.repaintEverything();
        });
    };
    var validate = function(){
        return state;
    };
    
   var score = function(sol){
        var score = 0;
        _.each(sol,function(target,source){
            if(state.responses[source]==target[1]){
                score++;
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