//gapsimple
var rpngapsimplemodule = function() {

    var datas;
    var domelem;
    var dragdrop;
    var clone;
    var maxfillength;
    var state;

    var init = function(_datas,_state, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });

        datas = _datas;
        dragdrop= !_.isUndefined(_datas.fillers);
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
        if(dragdrop){
            var toolbar = $('<div class="gapsimpleddtoolbar">');
            $.each(datas.fillers, function(idx, filler) {
                toolbar.append($('<span class="draggable ori">'+filler+'</span> ').draggable({
                    revert: "invalid",
                    appendTo: "body",
                    helper: "clone",
                    containment:domelem
                }));
            });
            maxfillength=_.max(datas.fillers, function(filler){ return filler.length; }).length;
            domelem.append(toolbar);
        }
        
        //build panel with sentences
        domelem.append($('<div class="form-inline">' + datas.tofill + '</div>'));
        $.each($('b', domelem), function(idx, tofill) {
            var t = $(tofill);
            var txt = _.isEmpty(t.text())?"":"<strong>(" + t.text() + ")</strong>";
            if(dragdrop){
                //add a drop area
                var drop=$('<b class="gapsimpleddresponse">')
                t.replaceWith(drop);
                var temp=$('<span class="'+(_.isEmpty(state[idx])?'':'draggable')+'">'+(_.isEmpty(state[idx])?'':state[idx])+'</span>');
                drop.droppable({
                    accept:'.draggable',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        $(this).empty();
                        $(this).append(((u.draggable.hasClass('ori')?u.draggable.clone():u.draggable).removeClass('ori')).draggable({
                            revert: "invalid",
                            appendTo: "body",
                            helper: "clone",
                            containment:domelem
                        }));

                    }
                });
                //and fill if there is already a response
                drop.append()
            }else{
                t.replaceWith($('<input type="text" class="rpnm_input gapsimple">' + txt));
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
        if(dragdrop){
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