//mqc
var rpnmqcmodule = function() {

    var datas;
    var domelem;
    var state;

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
        
        if(!_.isUndefined(datas.illustration)){
        	_.defaults(datas.illustration,{
        		position:"top",
        		url:"<img />"
        	});
        	var illus=$(datas.illustration.url).addClass('img-rounded');
        	if(datas.illustration.position=='top'){
        		domelem.append([illus,uilist]);
        	}else if(datas.illustration.position=='bottom'){
        		domelem.append([uilist,illus]);
        	}else if(datas.illustration.position=='right'){
        		domelem.append([$('<div class="col-md-8">').append(uilist),$('<div class="col-md-4">').append(illus)]);
        	}else if(datas.illustration.position=='left'){
        		domelem.append([$('<div class="col-md-4">').append(illus),$('<div class="col-md-8">').append(uilist)]);
        	}
        }else{
        	domelem.append(uilist);
        }
        bindUiEvents();
    };

    var bindUiEvents = function() {
    };
    
    var validate = function(){
        return state;
    };
    
    var score= function(sol) {
        var score = 0;
        _.each(sol, function(val, idx) {
            score += _.isEqual(state.responses[idx],val) ? 1 : 0;
        });
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};