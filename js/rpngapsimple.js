//gapsimple
var rpngapsimplemodule = function() {

    var datas;
    var domelem;
    var dragdrop;
    var clone;
    var maxfillength;
    var state;
    var dragfromtext;
    var dragimage;
    var answerArray;
    var myrndval;

    var init = function(_datas,_state, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });

        datas = _datas;
        dragdrop= !_.isUndefined(_datas.fillers);
        dragfromtext = !_.isUndefined(_datas.dragfromtext);
        dragimage = !_.isUndefined(_datas.dragimage);
        singledd = !_.isUndefined(_datas.singledd);
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state=_.map($('b:not([class])',datas.tofill),function(b,idx){return '';});
        }
        buildUi();
        
    };

    var buildUi = function() {
        domelem.addClass('gapsimple');
        var maxwidth=0;
        answerArray = new Array();
        if(dragdrop || dragfromtext){
            var toolbar = $('<div class="gapsimpleddtoolbar">');
            if (singledd){
                $.each(datas.fillers, function(idx, filler) {
                    var divDrag = $('<div class="divdraggable" id="div'+idx+'" ></div>');
                    var drag = $('<span class="singledraggable" draggable="true" id="drag'+idx+'" val="'+idx+'" >'+filler+'</span>').on('dragstart', function (ev) {
                        ev.originalEvent.dataTransfer.setData("text", ev.target.id);
                    });
                    divDrag.append(drag);
                    toolbar.append(divDrag);
                });
            }
            else if(dragdrop){
            $.each(datas.fillers, function(idx, filler) {
                var draggable=$('<span class="draggable ori" val="'+idx+'" >'+filler+'</span> ').draggable({
                    revert: "invalid",
                    appendTo: domelem,
                    helper: "clone",
                    snap: true,
                    snapMode: 'inner'
                });
                toolbar.append(draggable);
                maxwidth=maxwidth<draggable.width()?draggable.width():maxwidth;
            });
            maxfillength=_.max(datas.fillers, function(filler){ return filler.length; }).length;
            }
            //build trash
            if (!datas.singledd){
                var trash = $('<i class="fa fa-trash-o"></i>').droppable({
                    accept:'.clone',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        $(u.draggable).remove();
                    }
                });
                toolbar.append(trash);
            }
            domelem.append(toolbar);
        }
        
        //build panel with sentences
        domelem.append($('<div class="form-inline">' + datas.tofill + '</div>'));
        
         $.each($('b[class=drag]', domelem), function(idx, tofill) {
            var t = $(tofill);
            var draggable=$('<span class="draggable ori">'+t.html()+'</span> ').draggable({
                revert: "invalid",
                appendTo: domelem,
                helper: "clone",
                snap: true,
                snapMode: "inner"
            });
            t.replaceWith(draggable);
            maxwidth=maxwidth<draggable.width()?draggable.width():maxwidth;
        });
        
        if(datas.validation && datas.validation.thiselement){
                var newelement=datas.validation.thiselement;
                if(datas.validation.rndval){
                    myrndval=rpnsequence.alea(datas.validation.rndval);
                }
               $.each($(newelement, domelem), function(idx, tofill) {
                   var t = $(tofill);
                   t.replaceWith($('<span class="text-nowrap">' + myrndval[idx] +'<input type="text" class="rpnm_input gapsimple form-control"></span>'));
                   
                    $($('.rpnm_input',domelem)[idx]).val(state[idx]);
                });
        }
        
        $.each($('b', domelem), function(idx, tofill) {
            var t = $(tofill);
            var txt = "";
            //var txt = _.isEmpty(t.text())?"":"<strong>(" + t.text() + ")</strong>";
            if(singledd){
                var drop = $('<b class="gapsimpleddresponse" >').on('dragover', function(ev){
                     ev.preventDefault();
                }).on('drop', function(ev) {
                    ev.preventDefault();
                    var target = ev.target;
                    var targetPlaced = target;
                    var valPlaced = ev.target.getAttribute("val");
                    
                    if(ev.target.className == "singledraggable"){
                        target = $(target).parent();
                        $("#div"+valPlaced).append($(targetPlaced));
                    }
                    var data = ev.originalEvent.dataTransfer.getData("text");
                    $(target).append($("#"+data));
                });
                t.replaceWith(drop);
            }
            else if(dragdrop || dragfromtext){
                //add a drop area
                var drop=$('<b class="gapsimpleddresponse">');
                t.replaceWith(drop);

                drop.droppable({
                    accept:'.draggable',
                    hoverClass: 'gapsimpleddresponse-hover',
                    drop: function(e,u) {
                        var nb = $(this).children('span').attr('val');
                        //$('.gapsimpleddtoolbar span[val='+nb+']').show();
                        $(this).empty();
                        //$(this).append(((u.draggable.hasClass('ori')?u.draggable.clone():u.draggable)).css("position","inherit").addClass('clone').removeClass('ori').draggable({
                        $(this).append(((u.draggable.hasClass('ori')?u.draggable.clone():u.draggable).addClass('clone').removeClass('ori')).draggable({
                            revert: "invalid",
                            appendTo: domelem,
                            helper: "clone",
                            snap: true,
                            snapMode: "inner"
                        }));
                        answerArray[idx] = dragimage?datas.fillers[u.draggable.attr("val")]:'';
                    }
                });

                //and fill if there is already a response
                if(!_.isEmpty(state[idx])){
                    var alreadyGivenResponse=$('<span class="'+(_.isEmpty(state[idx])?'':'draggable clone')+'" '+((_.isEmpty(state[idx]) && dragimage)?'':'val="'+idx+'"')+'>'+(_.isEmpty(state[idx])?'':state[idx])+'</span>');
                    drop.append(alreadyGivenResponse.draggable({
                        revert: "invalid",
                        appendTo: domelem,
                        helper: "clone"
                    }));
                    answerArray[idx] = state[idx];
                }
            }else{
                var textAlign = (_.isUndefined(datas.validation)||_.isUndefined(datas.validation.align))?"":" " + datas.validation.align;
				var textWidth = (_.isUndefined(datas.validation)||_.isUndefined(datas.validation.width))?"":" style='width:" + datas.validation.width + "'";
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
        if(dragdrop || dragfromtext){
            _.each($('.gapsimpleddresponse',domelem),function(elem,idx){
                if(dragimage){
                    state[idx] = !_.isUndefined($('.draggable',$(elem)).html()) ? ($('.draggable',$(elem)).html().length==0?'':answerArray[idx]):'';
                }else{
                    state[idx] = $('.draggable',$(elem)).html();
                }
            });
        }else{
            $.each($('.gapsimple',domelem), function(idx, gap) {
                if(isNaN($(gap).val().trim().split("'").join(""))==false){
                    state[idx] = $(gap).val().trim().split("'").join("");
                }else{
                   state[idx] = $(gap).val().trim(); 
                }
            });
        }
        return state;
    };
    
   var score = function(sol) {
       
        var score = 0;
        _.each(sol, function(val, idx) {
            if(val.alternative){
                var alternativelength=val.alternative.length;
                for (var al=0;al<alternativelength;al++){
                   if(val.alternative[al].indexOf('<script>')>-1){
                        var myval=val.alternative[al].substring(8);
                        myval=myval.substring(0,myval.length-9);
                        if (eval(myval)==state[idx]){
                            score++; 
                        } 
                    }
                    else if(val.alternative[al]==state[idx]){
                        score ++;
                    }
                }
                
            }
            else if(sol[idx].indexOf('<script>')>-1){
                var myval=sol[idx].substring(8);
                myval=myval.substring(0,myval.length-9);
                if (eval(myval)==state[idx]){
                    score++; 
                }
            }else if(sol[idx].indexOf('rndval')>-1){
                //window.alert(rpnanalyse.fouroperation(myrndval,state,sol, idx, score));
                score=rpnanalyse.fouroperation(myrndval,state,sol, idx, score);
                window.alert('score'+score);
                
               /* var mysol=NaN;
                if (sol[idx].indexOf('+')>-1){
                    
                    var n1=Number(sol[idx].split('+')[0].split('[')[1].slice(0,sol[idx].split('+')[0].split('[')[1].length-1));
                    var n2=Number(sol[idx].split('+')[1].split('[')[1].slice(0,sol[idx].split('+')[1].split('[')[1].length-1));
                    mysol=myrndval[n1]+myrndval[n2];
                    //alert('mysol: '+mysol+' state[idx]: '+state[idx])
                }
                if (sol[idx].indexOf('-')>-1){
                    
                    var n1=Number(sol[idx].split('-')[0].split('[')[1].slice(0,sol[idx].split('-')[0].split('[')[1].length-1));
                    var n2=Number(sol[idx].split('-')[1].split('[')[1].slice(0,sol[idx].split('-')[1].split('[')[1].length-1));
                    mysol=myrndval[n1]-myrndval[n2];
                }
                if (sol[idx].indexOf('*')>-1){
                    
                    var n1=Number(sol[idx].split('*')[0].split('[')[1].slice(0,sol[idx].split('*')[0].split('[')[1].length-1));
                    var n2=Number(sol[idx].split('*')[1].split('[')[1].slice(0,sol[idx].split('*')[1].split('[')[1].length-1));
                    mysol=myrndval[n1]*myrndval[n2];
                }
                if (sol[idx].indexOf('/')>-1){
                    
                    var n1=Number(sol[idx].split('/')[0].split('[')[1].slice(0,sol[idx].split('/')[0].split('[')[1].length-1));
                    var n2=Number(sol[idx].split('/')[1].split('[')[1].slice(0,sol[idx].split('/')[1].split('[')[1].length-1));
                    mysol=Math.floor(myrndval[n1]/myrndval[n2]);
                }
                if (mysol==state[idx]){
                    score++;
                    alert('+1')
                }*/
            }else{
                score += (val != "" && state[idx] == val) ? 1 : 0;
                score -= (val == "" && state[idx] != val) ? 1 : 0;
            }
        });
        score = score >= 0 ? score : 0;
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};