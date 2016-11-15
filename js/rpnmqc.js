//mqc
var rpnmqcmodule = function() {

    var datas;
    var domelem;
    var state;
    var successArray;
    var responsesArray;

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            questions: ["No questions!"],
            answers: ["As no answers"],
            vertical:false,
            mqcmultiple:false
        });

        datas = _datas;
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state={
                responses:_.map(datas.questions,function(q,idx){return'';})
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('mqc');
		
        //build panel with sentences
        var uilist = $('<ul>', {
            'class': 'list-unstyled'
        });
    
        $.each(datas.questions, function(idq, question) {
            var li = $('<li>');
            li.append($('<p>' + question + '</p>'));
            var answerGroup = $('<div class="'+(datas.vertical?'btn-group-vertical':'btn-group')+'" role="group" data-toggle="buttons">');
            var idmqc = datas.answers.length==1?0:idq;
            //multiple responses allowed
            if(datas.mqcmultiple){
                var answerArray = new Array(datas.answers.length);
                answerArray = _.map(answerArray,function(aa,idaa){return'';});
                $.each(datas.answers[idmqc].choice, function(ida, answer) {
                    answerArray[ida] = (!_.isEmpty(state.responses[idq][ida])&&state.responses[idq][ida]==answer)? state.responses[idq][ida] : '';
                    answerGroup.append($('<label class="btn btn-default '+((!_.isEmpty(state.responses[idq][ida])&&state.responses[idq][ida]==answer)?'active':'')+'"><input type="checkbox" autocomplete="off" '+((!_.isEmpty(state.responses[idq][ida])&&state.responses[idq][ida]==answer)?'checked':'')+'>' + answer + '</label>').click(function(lab) {
                        answerArray[ida] = !$(lab.currentTarget).hasClass('active')? answer : '';
                        state.responses[idq] = answerArray;
                    }));
                    li.append(answerGroup);
                });
            }
            else{
                $.each(datas.answers[idmqc].choice, function(ida, answer) {
                    answerGroup.append($('<label class="btn btn-default '+((!_.isEmpty(state.responses[idq])&&state.responses[idq]==answer)?'active':'')+'"><input type="radio" autocomplete="off" '+((!_.isEmpty(state.responses[idq])&&state.responses[idq]==answer)?'checked':'')+'>' + answer + '</label>').click(function() {
                        state.responses[idq] = answer;
                    }));
                    li.append(answerGroup);
                });
            }
            uilist.append(li);
        });
        
        domelem.append(uilist);
        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        responsesArray = new Array();
        _.each($('.btn-group, .btn-group-vertical', domelem), function(elem, idx){
            responsesArray[idx] = elem;
        });
        return state;
    };
    
    var score= function(sol) {
        var score = 0;
        successArray = new Array();
        _.each(sol, function(val, idx) {
            var scoreIni = score;
            var solution = "";
            var nbSol = _.compact(val).length-1;
            if (_.isArray(val)){
                solution = _.compact(val).join(' / ')
            }else{
                solution = val;
            }
            score += _.isEqual(state.responses[idx],val) ? 1 : 0;
            successArray[idx] = new Array();
            if (score > scoreIni){
                successArray[idx] = ["ok",solution];
            }else{
                successArray[idx] = [state.responses[idx],solution];
            }
        });
        return score;
    };
    var pointmax = function(sol){
        var pointmax = sol.length;

        return pointmax;
    };
     var successState = function(){
        return successArray;
    };
    var responsesState = function(){
        return responsesArray;
    }
    
    return {
        init: init,
        validate: validate,
        score: score,
        pointmax: pointmax,
        successState: successState,
        responsesState: responsesState
    };

};
