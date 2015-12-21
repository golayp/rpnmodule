//marker
var rpnmapmodule = function() {

    var datas;
    var domelem;
    var state;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            markers: [],
            map: ["fill map please!"]
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            var availableColors = ["#8d61a4","#01a271","#5dc2e7","#ed656a","#f5a95e","#eee227","#7a5a14","#bbbbbb","#63b553","#e95c7b","#f5a95e"];
            state={
                selectedMarker : '',
                markers:_.map(datas.markers,function(m,idx){return { label:m,color:(rpnsequence.getColor([idx]) || '#222')}})
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
        
        toolbar.append($('<label class="btn btn-default '+(datas.smallButtons?'':'btn-lg ') + (state.selectedMarker.label==''?'active':'')+' eraser"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==''?'checked':'')+'><span class="edicons-tool-eraser"></span> ' + rpnsequence.getLabels().Eraser + '</label>').click(function() {
            state.selectedMarker = {color:'',label:''};
        }));
        $.each(state.markers, function(idx, marker) {
            toolbar.append($('<label class="btn btn-default '+(datas.smallButtons?'':'btn-lg ') + (state.selectedMarker.label==marker.label?'active':'')+' stab"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==marker.label?'checked':'')+'><span class="edicons-tool-stab" style="color:'+marker.color+'"></span> ' + marker.label + '</label>').click(function() {
                state.selectedMarker = marker;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
       
        domelem.append($('<div class="map" >' + datas.map + '</div>'));
        
        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        return state;
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
