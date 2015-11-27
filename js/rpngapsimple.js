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
        
        //build panel with sentences
        var uicontents = $('<div>');
        
        var maxwidth=0;
        if(dragdrop){
            var toolbar = $('<div class="gapsimpleddtoolbar">');
            $.each(datas.fillers, function(idx, filler) {
                var draggable=$('<span class="draggable ori">'+filler+'</span> ').draggable({
                    revert: "invalid",
                    appendTo: uicontents,
                    helper: "clone"
                });
                toolbar.append(draggable);
                maxwidth=maxwidth<draggable.width()?draggable.width():maxwidth;
            });
            maxfillength=_.max(datas.fillers, function(filler){ return filler.length; }).length;
            uicontents.append(toolbar);
        }
        
        //build panel with sentences
        uicontents.append($('<div class="form-inline">' + datas.tofill + '</div>'));
        $.each($('b', uicontents), function(idx, tofill) {
            var t = $(tofill);
            var txt = "";
            //var txt = _.isEmpty(t.text())?"":"<strong>(" + t.text() + ")</strong>";
            if(dragdrop){
                //add a drop area
                var drop=$('<b class="gapsimpleddresponse">');
                t.replaceWith(drop);
                
                drop.droppable({
                    accept:'.draggable',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        $(this).empty();
                        $(this).append(((u.draggable.hasClass('ori')?u.draggable.clone():u.draggable).removeClass('ori')).draggable({
                            revert: "invalid",
                            appendTo: uicontents,
                            helper: "clone"
                        }));

                    }
                });
                //and fill if there is already a response
                if(!_.isEmpty(state[idx])){
                    var alreadyGivenResponse=$('<span class="'+(_.isEmpty(state[idx])?'':'draggable')+'">'+(_.isEmpty(state[idx])?'':state[idx])+'</span>');
                    drop.append(alreadyGivenResponse.draggable({
                        revert: "invalid",
                        appendTo: uicontents,
                        helper: "clone"
                    }));
                }
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
                $($('.rpnm_input',uicontents)[idx]).val(state[idx]);
            }
        });
        
        if(!_.isUndefined(datas.illustration)){
        	_.defaults(datas.illustration,{
        		position:"top",
        		url:"<img />"
        	});
        	var illus=$(datas.illustration.url).addClass('img-rounded');
        	if(datas.illustration.position=='top'){
        		domelem.append([illus,uicontents]);
        	}else if(datas.illustration.position=='bottom'){
        		domelem.append([uicontents,illus]);
        	}else if(datas.illustration.position=='right'){
        		domelem.append([$('<div class="col-md-8">').append(uicontents),$('<div class="col-md-4">').append(illus)]);
        	}else if(datas.illustration.position=='left'){
        		domelem.append([$('<div class="col-md-4">').append(illus),$('<div class="col-md-8">').append(uicontents)]);
        	}
        }else{
        	domelem.append(uicontents);
        }
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
                state[idx] = $(gap).val().trim();
            });
        }
        return state;
    };
    
    var score = function(sol) {
        var score = 0;
        _.each(sol, function(val, idx) {
            if(val.alternative){
                score += (_.contains(val.alternative,state[idx] ) ? 1 : 0);
            }else{
                score += state[idx] == val ? 1 : 0;
            }
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};