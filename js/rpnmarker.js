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
            var availableColors = _.shuffle(['primary', 'success', 'info', 'warning', 'danger']);
            state={
                selectedMarker : '',
                responses:_.map($('b',datas.tomark),function(b,idx){return '';}),
                markers:_.map(datas.markers,function(m,idx){return { label:m,color:(availableColors[idx] || 'default')}})
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
        
        toolbar.append($('<label class="btn btn-default '+(state.selectedMarker==''?'active':'')+'"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==''?'checked':'')+'><i class="glyphicon glyphicon-remove-sign"></i> ' + rpnsequence.getLabels().Eraser + '</label>').click(function() {
            state.selectedMarker = '';
        }));
        $.each(state.markers, function(idx, marker) {
            toolbar.append($('<label class="btn btn-' +marker.color + ' '+(state.selectedMarker==marker.label?'active':'')+'"><input type="radio" name="options" autocomplete="off" '+(state.selectedMarker==marker.label?'checked':'')+'><i class="glyphicon glyphicon-pencil"></i> ' + marker.label + '</label>').click(function() {
                state.selectedMarker = marker.label;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
        domelem.append($('<div>' + datas.tomark + '</div>'));
        $.each($('b', domelem), function(idx, tomark) {
            var t = $(tomark);
            if(!_.isEmpty(state.responses[idx])){
                t.addClass('marker-'+_.findWhere(state.markers,{label:state.responses[idx]}).color);
            }
            t.css('cursor', 'pointer').click(function() {
                t.removeClass();
                if (state.selectedMarker != '') {
                    t.addClass('marker-' + _.findWhere(state.markers,{label:state.selectedMarker}).color);
                }
                state['responses'][idx] = state.selectedMarker;
            });
        });

        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        rpnsequence.handleEndOfModule(state, function(saved_state,sol) {
            var score = 0;
            _.each(sol, function(val, idx) {
                score += saved_state.responses[idx] == val ? 1 : 0;
            });
            return score;
        });
    };
    
    return {
        init: init,
        validate: validate

    };
};