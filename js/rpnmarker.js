//marker
var rpnmarkermodule = function() {

    var datas;
    var domelem;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            markers: [],
            tomark: ["fill tomark please!"]
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            var availableColors = _.shuffle(["#8d61a4","#01a271","#5dc2e7","#63b553","#ed656a","#e95c7b","#f5a95e","#d62b81","#eee227"]);
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
        domelem.append($('<div>' + datas.tomark + '</div>'));
        $.each($('b', domelem), function(idx, tomark) {
            var t = $(tomark);
            if(!_.isEmpty(state.responses[idx])){
                //t.addClass('marker-'+_.findWhere(state.markers,{label:state.responses[idx]}).color);
                t.css('background-color',_.findWhere(state.markers,{label:state.responses[idx]}).color);
            }
            t.css('cursor', 'pointer').click(function() {
                //t.removeClass();
                //if (state.selectedMarker != '') {
                    //t.addClass('marker-' + _.findWhere(state.markers,{label:state.selectedMarker}).color);
                //}
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
