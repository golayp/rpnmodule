/*global rpnsequence, jsPlumb, _*/
//plumb
var rpnplumbmodule = function() {

    var datas;
    var domelem;
    var state;
    var plumb;
    var successArray;
    var responsesArray;
    var limitedChoice;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            left: ["item1", "item2", "item3"],
            right: ["item1", "item2", "item3"],
            multipleTarget:false,
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
        var leftItems=$('<ul class="list-unstyled plumbsource"></ul>');
        var rightItems=$('<ul class="list-unstyled plumbtarget"></ul>');
        if (datas.mathjax==true){
            _.each(state.left, function(item, idx) {
                var contentmat=MathJax.HTML.Element("span",{class:"form-inline"},[datas.left[item]]);
                leftItems.append($('<div class="notif"></div>').append($('<li>').html(contentmat).data( 'idx', item )));
            });
            _.each(state.right, function(item, idx) {
                var contentmat=MathJax.HTML.Element("span",{class:"form-inline"},[datas.right[item]]);
                rightItems.append($('<li>').html(contentmat).data( 'idx', item ));
            });
            domelem.append([$('<div class="col-xs-5"></div>').append(leftItems),$('<div class="col-xs-2"></div>'),$('<div class="col-xs-5"></div>').append(rightItems)]);   
        }
        else{
            _.each(state.left, function(item, idx) {
                leftItems.append($('<div class="notif"></div>').append($('<li>').html(datas.left[item]).data( 'idx', item )));
            });
            _.each(state.right, function(item, idx) {
                rightItems.append($('<li>').html(datas.right[item]).data( 'idx', item ));
            });

            domelem.append([$('<div class="col-xs-5"></div>').append(leftItems),$('<div class="col-xs-2"></div>'),$('<div class="col-xs-5"></div>').append(rightItems)]);
        }
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
                    connectorStyle:{ strokeStyle:rpnsequence.getColor(i), lineWidth:10},
                    anchor: "Right"
                });
            });
            $('li',rightItems).each(function(i,li){
               plumb.makeTarget(li, {
                    maxConnections:datas.multipleTarget?-1:1,
                    anchor:"Left"
                });
            });
            
            //try to remount sta given
            _.each(state.responses,function(target,source){
                if(target !=null){
                    var srcElem=_.filter($('ul.plumbsource li',domelem),function(li){
                        return $(li).data('idx')==source;
                    });
                    var targetElem=_.filter($('ul.plumbtarget li',domelem),function(li){
                        return $(li).data('idx')==target
                    });
                    plumb.connect({
                       source:$(srcElem[0]).attr('id'),
                       target:$(targetElem[0]).attr('id')
                    });
                }
            });
        });
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

        $(window).resize(function(){
            plumb.repaintEverything();
        });
        limitedChoice = (state.left.length <= 2 && state.right.length <= 2) ? true : false;
    };
    var validate = function(){
        responsesArray = new Array();

        _.each($('ul.list-unstyled.plumbsource div', domelem),function(elemL,idx){
            responsesArray[idx] = elemL;
        });
    };
    
   var score = function(sol){
        var score = 0;
       successArray = new Array();
        _.each(sol,function(target,source){
            var scoreIni = score;
            var mylength=state.left.length;
            solution = datas.right[target[1]];
            
                if(state.responses[source]==target[1]){
                     score++;
                    
                    for(i=0;i<mylength;i++){
                        if(source==state.left[i]){
                            successArray[i] = new Array();
                            successArray[i] = ["ok",solution];
                        }
                    }
                }else{

                    for(i=0;i<mylength;i++){
                        if(source==state.left[i]){
                            successArray[i] = new Array();
                            successArray[i] = ["faux",solution];
                        }
                    }
                }
        });
        return score;
    };
    var pointmax = function(sol){
        var pointmax = sol.length;
        
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
    
    var displayed = function(){
         plumb.repaintEverything();
    }
    return {
        displayed:displayed,
        init: init,
        validate: validate,
        score:score,
        pointmax: pointmax,
        successState: successState,
        responsesState: responsesState,
        limitedChoiceState: limitedChoiceState
    };

};
