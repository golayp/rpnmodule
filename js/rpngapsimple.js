//gapsimple
var rpngapsimplemodule = function() {

    var datas;
    var domelem;
    var ddmode;
    var maxfillength;
    var state;

    var init = function(_datas,_state, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!",
        });

        datas = _datas;
        ddmode= !_.isUndefined(_datas.fillers);
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state=_.map($('b',datas.tofill),function(b,idx){return '';});
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('gapsimple');
        if(ddmode){
            var toolbar = $('<div class="gapsimpleddtoolbar">');
            $.each(datas.fillers, function(idx, filler) {
                toolbar.append($('<span class="draggable">'+filler+'</span> '));
            });
            maxfillength=_.max(datas.fillers, function(filler){ return filler.length; }).length;
            
            domelem.append(toolbar.sortable({
                group: 'drop',
                drop: false,
                itemSelector:'span',
                containerSelector:'div',
                placeholder:'<span class="placeholder"/>',
                onDragStart: function (item, container, _super) {
                    if(!container.options.drop){
                        if(!datas.single){
                            // Clone item
                            item.clone().insertAfter(item);
                        }
                    }else{
                        // Remove item and restore white space
                        $('<span>'+Array(maxfillength).join("_")+'</span>').insertAfter(item);
                    }
                    _super(item);
                },
                onDrop:function($item, container, _super, event){
                    $item.parent().empty().append($item);
                    _super($item);
                }
            }));
        }
        
        //build panel with sentences
        domelem.append($('<div class="form-inline">' + datas.tofill + '</div>'));
        $.each($('b', domelem), function(idx, tofill) {
            var t = $(tofill);
			var txt = "";
            if(ddmode){
                //add a white space for drag and drop
                t.replaceWith($('<b class="gapsimpleddresponse">').append('<span class="'+(_.isEmpty(state[idx])?'':'draggable')+'">'+(_.isEmpty(state[idx])?Array(maxfillength).join("_"):state[idx])+'</span>').sortable({
                    group: 'drop',
                    itemSelector:'span',
                    containerSelector:'b',
                    vertical:false
                }));
            }else{
				var textAlign = _.isUndefined(datas.validation.align)?"":" " + datas.validation.align;
				var textWidth = _.isUndefined(datas.validation.width)?"":" style='width:" + datas.validation.width + "'";
				if(t.text().substr(-1)!="_"){
					txt = _.isEmpty(t.text())?"":"<strong>(" + t.text() + ")</strong>";
					t.replaceWith($('<span class="text-nowrap"><input type="text" class="rpnm_input gapsimple form-control' + textAlign + '"' + textWidth + '>' + txt + '</span>'));
                }else{
					txt = t.text().slice(0,-1);
					t.replaceWith($('<span class="text-nowrap">' + txt +'<input type="text" class="rpnm_input gapsimple form-control' + textAlign + '"' + textWidth + '></span>'));
				}
				$($('.rpnm_input',domelem)[idx]).val(state[idx]);
            }
        });

        bindUiEvents();
    };

    var bindUiEvents = function() {
        //Input validation
        rpnsequence.addvalidation($('.rpnm_input',domelem),datas.validation);
    };
    
    var validate = function(){
        if(ddmode){
            _.each($('.gapsimpleddresponse',domelem),function(elem,idx){
                state[idx] = $('.draggable',$(elem)).text();
            });
        }else{
            $.each($('.gapsimple',domelem), function(idx, gap) {
                state[idx] = $(gap).val();
            });
        }
        rpnsequence.handleEndOfModule(state);
    };
    
    var score = function(sol) {
        var score = 0;
        _.each(sol, function(val, idx) {
            score += state[idx] == val ? 1 : 0;
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};