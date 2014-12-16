//blackbox
var rpnblackboxmodule = function() {

    var datas;
    var domelem;
    var shuffle;
    var toggleViewButton;
    var state;
    
    var addComment=function(inputId, classDiv, buttonId, position, t1, t2, t3, t4, t5, t6, t7, t8, t9){
    	
    	var chooseTest=function(arg, idInput,divClass, idButton){
    		switch(arg){
    		case 'isNumberN':
    			isNumberN(idInput, divClass, idButton);
    		break;
    		case 'isNumberZ':
    			isNumberZ(idInput, divClass, idButton);
    		break;
    		case 'isNumberD':
    			isNumberD(idInput, divClass, idButton);
    		break;
    		case 'isNumberQ':
    			isNumberQ(idInput, divClass, idButton);
    		break;
    		case 'isNumber':
    			isNumber(idInput, divClass, idButton);
    		break;
    		case 'withComma':
    			withComma(idInput);
    		break;
    		case 'firstPoint':
    			firstPoint(idInput);
    		break;
    		case 'firstComma':
    			firstComma(idInput);
    		break;
    		case 'firstPointComma':
    			firstPointComma(idInput);
    		break;
    		default:
    		break;
    		}
    	}
    	$(inputId).bind('input propertychange', function(){
    		chooseTest(t1, inputId,classDiv, buttonId);
    		chooseTest(t2, inputId,classDiv, buttonId);
    		chooseTest(t3, inputId,classDiv, buttonId);
    		chooseTest(t4, inputId,classDiv, buttonId);
    		chooseTest(t5, inputId,classDiv, buttonId);
    		chooseTest(t6, inputId,classDiv, buttonId);
    		chooseTest(t7, inputId,classDiv, buttonId);
    		chooseTest(t8, inputId,classDiv, buttonId);
    		chooseTest(t9, inputId,classDiv, buttonId);
    	});
    }
    
    var isNumberN=function(str, myClass, myButton){
    	var rep=$(str).val();
    	var lastOfRep=rep.charAt(rep.length-1);
    	var prevOfRep=rep.substring(0,rep.length-1);
    		
    	if(/[0-9]/.test(lastOfRep)){
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    	}
    	else if(/\./.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    	}
    	else if(/-/.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));	
    	}else{
    		$(str).val(prevOfRep);
    	}
    }
    
    var isNumberZ=function(str, myClass, myButton){
    	var rep=$(str).val();
    	var lastOfRep=rep.charAt(rep.length-1);
    	var prevOfRep=rep.substring(0,rep.length-1);
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));

    	}
    	else if(/\./.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else{
    		$(str).val(prevOfRep);
    	}
    }
    
    var isNumberQ=function(str, myClass, myButton){//à Faire
    	var rep=$(str).val();
    	var lastOfRep=rep.charAt(rep.length-1);
    	var prevOfRep=rep.substring(0,rep.length-1);
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    		$(myButton).text(monTexte);
    		$(myClass).css("display", "block");
    	}
    	else if(/\./.test(lastOfRep)){
    		$(str).val(rep.substring(0,rep.length-1));
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else{
    		$(str).val(prevOfRep);
    	}
    }
    
    var isNumberD=function(str, myClass, myButton){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){//On teste s'il y a plusieurs virgules
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else if(/\./.test(lastOfRep)){//On teste s'il y a plusieurs points
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}	
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else{
    		$(str).val(prevOfRep);
    	}
    }
    
    var isNumber=function(str, myClass, myButton){//Il faut encore faire si on met une puisance de 10
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/[0-9]/.test(lastOfRep)){//On test si le chiffre d'avant est un 0
    		if(/0/.test(prevOfRep)&&prevOfRep.length==1){
    			$(str).val(lastOfRep);
    		}
    		if(/-0/.test(prevOfRep)&&prevOfRep.length==2){
    			$(str).val('-'+lastOfRep);
    		}
    		$(myClass).css("display", "none");
    	}else if(/,/.test(lastOfRep)){//On teste s'il y a plusieurs virgules
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else if(/\./.test(lastOfRep)){//On teste s'il y a plusieurs points
    		if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    			$(str).val(rep.substring(0,rep.length-1));
    		}	
    	}
    	else if(/-/.test(lastOfRep)){//On teste s'il y a un - seulement au début
    		if(rep.length>1){
    			$(str).val(rep.substring(0,rep.length-1));
    		}
    	}
    	else{
    		$(str).val(prevOfRep);
    	}
    }
    
    var withComma=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    		if(/,/.test(lastOfRep)){
    			if(/,/.test(prevOfRep.substring(0,rep.length-1))){
    				$(str).val(rep.substring(0,rep.length-1));
    			}
    		}
    		if(/\./.test(lastOfRep)){//On remplace le . par une , s'il n'y en pas déjà une
    			if(/,/.test(prevOfRep)){
    				$(str).val(prevOfRep.substring(0,prevOfRep.length-1));
    			}else{//Sinon on l'efface
    				$(str).val(rep.substring(0,rep.length-1).concat(','));
    			}	
    		}
    }
    
    var firstPoint=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/-/.test(prevOfRep)&&/^\./.test(lastOfRep)){
    		$(str).val("-0.");
    	}
    	if(/^\./.test(rep)){//On remplace le . 0.
    		$(str).val("0.");
    	}
    }
    
    var firstComma=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/-/.test(prevOfRep)&&/^,/.test(lastOfRep)){
    		$(str).val("-0,");
    	}
    	if(/^,/.test(rep)){//On remplace le , 0,
    		$(str).val("0,");
    	}		
    }
    
    var firstPointComma=function(str){
    	var rep=$(str).val(),
    		lastOfRep=rep.charAt(rep.length-1),
    		prevOfRep=rep.substring(0,rep.length-1);
    	if(/-/.test(prevOfRep)&&/^\./.test(lastOfRep)){
    		$(str).val("-0,");
    	}
    	if(/^\./.test(rep)){//On remplace le . 0.
    		$(str).val("0,");
    	}
    }
    
    

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
        domelem.addClass('blackbox');

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
            state[idx].response = $(gap).val();
        });
        rpnsequence.handleEndOfModule(state);
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