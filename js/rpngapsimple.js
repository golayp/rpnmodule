//gapsimple
var rpngapsimplemodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;
    var ddmode;
    var maxfillength;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });

        datas = _datas;
        ddmode= !_.isUndefined(_datas.fillers);
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('gapsimple');
        var availableColors = _.shuffle(['primary', 'success', 'info', 'warning', 'danger']);

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
                            // Clone item
                            item.clone().insertAfter(item);
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
                })
            );
        }
        
        //build panel with sentences
        domelem.append($('<div id="sentences" class="form-inline">' + datas.tofill + '</div>'));
        $.each($('#sentences b', domelem), function(idx, tofill) {
            responses[idx] = -1; //initialize all responses to unmark
            var t = $(tofill);
            if(ddmode){
                //add a white space for drag and drop
                t.replaceWith($('<b class="gapsimpleddresponse">').append('<span>'+Array(maxfillength).join("_")+'</span>').sortable({
                    group: 'drop',
                    itemSelector:'span',
                    containerSelector:'b',
                    vertical:false
                }));
            }else{
                t.replaceWith($('<input type="text" id="' + idx + '" class="rpnm_input gapsimple form-control"> <strong>(' + t.text() + ')</strong>'));    
            }
            
        });
        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            if(ddmode){
                _.each($('.gapsimpleddresponse',$('#sentences',domelem)),function(elem,idx){
                    responses[idx] = $('.draggable',$(elem)).text();
                });
                
            }else{
                $.each($('.gapsimple',domelem), function(idx, gap) {
                    responses[idx] = $(gap).val();
                });
            }
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};