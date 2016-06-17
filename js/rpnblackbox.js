//blackbox
var rpnblackboxmodule = function() {

    var datas;
    var domelem;
    var shuffle;
    var toggleViewButton;
    var state;

    var init = function(_datas,_state, _domelem) {
        _.defaults(_datas, {
            operation: "x1",
            left: [1],
            right: [1],
            shuffle: false,
            validation:{
                mode:"lock",
                type:"integer"
            }
        });
        datas = _datas;
        domelem = _domelem;
        shuffle = _datas.shuffle;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = [];
            _.each(datas.right, function(val, idx) {
                state.push({
                    position: "right",
                    originalposition: idx,
                    value: val,
                    response:null
                })
            });
            _.each(datas.left, function(val, idx) {
                state.push({
                    position: "left",
                    originalposition: idx,
                    value: val,
                    response:null
                })
            });
            if (shuffle)
                state = _.shuffle(state);
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('blackbox text-center');

        domelem.append($('<div class="row header"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">x</p></div><div class="col-xs-2 operation"></div><div class="col-xs-2"><p class="text-center">y</p></div></div>'));
        $('.header', domelem).hide();

        _.each(state, function(box, idx) {
            if (box.position == 'left') {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><input type="text" data-bind="" class="rpnm_input form-control" style="text-align: center;"></div></div>'));
            }
            else {
                domelem.append($('<div class="row"><div class="col-md-3 hidden-xs hidden-sm"></div><div class="col-xs-2"><input type="text" class="rpnm_input form-control" style="text-align: center;"></div><div class="col-xs-2 operation"><p class="text-center"><i class="glyphicon glyphicon-minus"></i>' + datas.operation + '<i class="glyphicon glyphicon-arrow-right"></i></p></div><div class="col-xs-2"><p class="text-center">' + box.value + '</p></div></div>'));
            }
        });
       
        $.each($('.rpnm_input', domelem),function(idx, gap){
            $(gap).val(state[idx].response);
        });
        
        
        toggleViewButton = $('<button>', {
            'data-toggle': 'button',
            'class': 'btn btn-link btn-xs',
            text: ' ' + rpnsequence.getLabels().BlackboxTableView
        }).prepend($('<i class="glyphicon glyphicon-resize-small"></i>'));
        domelem.append($('<p class="text-center"></p>').append(toggleViewButton));
        bindUiEvents();
    };

    var toggleView = function() {
        $('.operation', domelem).slideToggle();
        $('.header', domelem).slideToggle();
    };

    var bindUiEvents = function() {
        //Change view mode
        toggleViewButton.click(function() {
            var $el = $(this),
                textNode = this.lastChild;
            $el.find('i').toggleClass('glyphicon-resize-small glyphicon-resize-full');
            textNode.nodeValue = ' ';
            textNode.nodeValue = ' ' + ($el.hasClass('showArchieved') ? rpnsequence.getLabels().BlackboxTableView : rpnsequence.getLabels().BlackboxView);
            $el.toggleClass('showArchieved');
            toggleView();
        });
        
        //Input validation
        rpnsequence.addvalidation($('.rpnm_input',domelem),datas.validation);
    };
    
    var validate = function(){
        $.each($('.rpnm_input', domelem), function(idx, gap) {
            if(isNaN(state[idx].response = $(gap).val().split("'").join(""))==false){
                state[idx].response = $(gap).val().split("'").join("");
            }else{
               state[idx].response = $(gap).val(); 
            }
        });
        return state;
    };
    
    var score = function(sol) {
        var score = 0;
        
        _.each(sol.right, function(val, idx) {
            score+=(_.findWhere(state, {position: "right", originalposition: idx}).response==val?1:0);
        });
        _.each(sol.left, function(val, idx) {
            score+=(_.findWhere(state, {position: "left", originalposition: idx}).response==val?1:0);
        });
        return score;
    };
    
    return {
        init: init,
        validate:validate,
        score:score
    };

};