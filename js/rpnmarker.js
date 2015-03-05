//marker
var rpnmarkermodule = function() {

    var datas;
    var domelem;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            markers: [],
            tomark: ["fill tomark please!"],
            hidden:false
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            var availableColors = ["#8d61a4","#01a271","#5dc2e7","#ed656a","#f5a95e","#eee227","#63b553","#e95c7b","#f5a95e","#d62b81","#eee227"];
            state={
                selectedMarker : '',
                responses:_.map($('b',datas.tomark),function(b,idx){return '';}),
                markers:_.map(datas.markers,function(m,idx){return { label:m,color:(availableColors[idx] || '#222')}})
            };
        }
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('marker');
        var toolbar = $('<div>', {
            'class': 'btn-group',
            'data-toggle': 'buttons'
        });
        
        toolbar.append($('<label class="btn btn-default  btn-lg '+(state.selectedMarker==''?'active':'')+' eraser"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==''?'checked':'')+'><span class="edicons-tool-eraser"></span> ' + rpnsequence.getLabels().Eraser + '</label>').click(function() {
            state.selectedMarker = {color:'',label:''};
        }));
        $.each(state.markers, function(idx, marker) {
            toolbar.append($('<label class="btn btn-default btn-lg '+(state.selectedMarker==marker.label?'active':'')+' stab"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==marker.label?'checked':'')+'><span class="edicons-tool-stab" style="color:'+marker.color+'"></span> ' + marker.label + '</label>').click(function() {
                state.selectedMarker = marker;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
        if(!_.isUndefined(datas.background)){
            if(_.isUndefined(datas.background.url)){
                rpnsequence.log('background defined without url!');
                domelem.append($('<div class="markable" >' + datas.tomark + '</div>'));
            }else{
                _.defaults(datas.background,{
    				"width":"0px",
    				"height":"0px",
    				"paddingTop":"0px",
    				"paddingRight":"0px",
    				"paddingBottom":"0px",
    				"paddingLeft":"0px"
                });
                domelem.append($('<div class="markable" style="width:'+datas.background.width+';height:'+datas.background.height+';padding-top:'+datas.background.paddingTop+';padding-right:'+datas.background.paddingRight+';padding-bottom:'+datas.background.paddingBottom+';padding-left:'+datas.background.paddingLeft+';background-image:url('+rpnsequence.computeMediaUrl(datas.background.url)+');background-repeat:no-repeat;background-size:contain">' + datas.tomark + '</div>'));    
            }
        }else{
            domelem.append($('<div class="markable" >' + datas.tomark + '</div>'));
        }
        $.each($('b', domelem), function(idx, tomark) {
            var t = $(tomark);
            if(!_.isEmpty(state.responses[idx])){
                t.css('background-color',_.findWhere(state.markers,{label:state.responses[idx]}).color);
            }
            if(!datas.hidden){
                t.css('cursor', 'pointer');
            }else{
                t.css('font-weight','normal');
            }
            t.click(function() {
                t.css('background-color',state.selectedMarker.color);
                state['responses'][idx] = state.selectedMarker.label;
            });
        });
        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        rpnsequence.handleEndOfModule(state);
    };
    
    var score =  function(sol) {
        var score = 0;
        _.each(sol, function(val, idx) {
            score += state.responses[idx] == val ? 1 : 0;
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score

    };
};
