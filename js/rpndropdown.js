//dropdown
var rpndropdownmodule = function() {

    var datas;
    var domelem;
    var state;
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: "",
            circumstance:["",""]
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= _.map(_.filter(datas.items,function(item){return item.choice.length>1}),function(item,idx){return '';});
        }
        buildUi();
    };

    var buildUi = function() {
        var uicontents = $('<div class="form-inline">');

        //build panel with sentence
        if(!_.isEmpty(datas.circumstance[0])) {uicontents.append($('<hr style="border-top: 5px solid #ccc;"><p><b>' + datas.circumstance[0] + '</b></p>'));}
		if(!_.isEmpty(datas.sentence)) {uicontents.append($('<p>' + datas.sentence + '</p>'));}
        if(!_.isEmpty(datas.circumstance[1])) {uicontents.append($('<hr style="border-top: 5px solid #ccc;"><p><b>' + datas.circumstance[1] + '</b></p>'));}

        //build sentence with items to select
        var internalCounter=0;
        $.each(datas.items, function(idx, item) {
            if(item.choice.length==1){
                uicontents.append(" " + item.choice[0] + " ");
            }else{
                var opts=[];
                
                opts[0]=$('<option value="" '+(state[internalCounter]==''?'selected':'')+'> ?</option>');
                $.each(datas.items[idx].choice, function(id, choice){
                    opts[id+1]=$('<option value="' + choice+ '" '+(state[internalCounter]==choice?'selected':'')+'>' + choice + '</option>');
                });
                uicontents.append($('<select class="rpnm-input dropdown form-control">').append(opts));
                internalCounter++;
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
        
    };
    
    var validate = function(){
        state=_.map($('select',domelem),function(ele,idx){return $(ele).val()});
        return state;
    };
    
    var score = function(sol){
        var score=0;
        _.each(sol,function(s,idx){
            if(s.alternative){
                score += (_.contains(s.alternative,state[idx] ) ? 1 : 0);
            }else{
                score += state[idx] == s ? 1 : 0;
            }
        });
        return score;
    };
    

    return {
        init: init,
        validate: validate,
        score:score
    };

};