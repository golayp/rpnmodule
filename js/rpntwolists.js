//twolists
var rpntwolistsmodule = function() {
	rpnsequence.log('Dans twolistsmodule')

    var datas;
    var domelem;
    var state;
    var bezier=new Array();
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            leftitems:["<p>what have you said?</p>"],
			rightitems:["<p> I don't remember!</p>"],
            shuffle:false
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state = [];
            //A COMPLETER!!!!!!!!!!!!!!!!!!!!!!!
            _.each(datas.leftitems, function(val, idx) {
                state.push({
                    positionLX:0,
                    positionLY:0,
                    response:null
                })
            });
            _.each(datas.rightitems, function(val, idx) {
                state.push({
                    positionRX:0,
                    positionRY:0,
                    response:null
                })
            });
            if(datas.shuffle){
                state=_.shuffle(state);
            }
        }
        rpnsequence.log('state'+state);
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('twolists');
        var math=$('<div class="row"><math  display="block"><mspace height="40px"/><mfrac linethickness="2px" numalign="left" denomalign="left"><mrow><mfrac bevelled="true"><mn>1</mn><mi>x</mi></mfrac><mo>+</mo><mfrac bevelled="true"><mn>2</mn><mi>x</mi></mfrac><mo>+</mo><mo>&hellip;</mo></mrow><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>x</mi><mn>4</mn></msup><mo>+</mo><mo>&hellip;</mo></mrow></mfrac></math></div>');
        domelem.append(math);
        var   leftdiv=$('<div id="leftdiv" class="col-md-4">'),
        centerdiv=$('<div id="centerdiv_'+datas.idmodule+'" class="col-md-4">'),
        rightdiv=$('<div id="rightdiv" class="col-md-4">'),
        myCanvas=$('<canvas id="c'+datas.idmodule+'"  height="1000px" width="1000px">'),
        targetsName=new Array(),
        targets=new Array(),
        nbleft=datas.leftitems.length,
        nbbezier=nbleft,
        nbright=datas.rightitems.length,
        availableColors = _.shuffle(["#8d61a4","#01a271","#5dc2e7","#63b553","#ed656a","#e95c7b","#f5a95e","#d62b81","#eee227"]);
        targetsName[datas.idmodule]=new Array();
        targets[datas.idmodule]=new Array();
        _.each(datas.leftitems, function(item,idx) {
            leftdiv.append($('<div id="inputgrpleft_'+idx+'_'+datas.idmodule+'" class="input-group">' + datas.leftitems[idx] + '<span class="input-group-addon"><input  type="radio" id="radleft_'+idx+'_'+datas.idmodule+'" name="l'+idx+'_'+datas.idmodule+'"></span></div>'));
            targetsName[datas.idmodule].push('#radleft_'+idx+'_'+datas.idmodule);
            rpnsequence.log('idx'+idx);
        });
        _.each(datas.rightitems, function(item,idx) {
            rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span>' + datas.rightitems[idx] + '</div>'));
            targetsName[datas.idmodule].push('#radright_'+idx+'_'+datas.idmodule);
        });
        
        domelem.append(leftdiv);
        domelem.append(centerdiv);
        domelem.append(rightdiv);
        domelem.append(myCanvas);
        var nom='#radleft_'+0+'_'+datas.idmodule;
		var myId=$(nom).offset().left;
		$(document).ready(function(){
            
		    for (var i = 0; i < targetsName[datas.idmodule].length; i++) {
                //targets[i+datas.idmodule]=new Array();
		        //targets[i+datas.idmodule].push($(targetsName[i]));
		        targets[datas.idmodule].push($(targetsName[datas.idmodule][i]));
		    }
		    rpnsequence.log('targetsName'+targetsName);
        	var canvas = new fabric.Canvas('c'+datas.idmodule,{
        		hoverCursor:'pointer',
        		selection: false
        	});

        	if(nbleft<nbright){
        	    nbbezier=nbright;
        	}
        	for (var i=0;i<nbbezier;i++){
        	    if(nbleft<nbright){
        	        var myTop=$('#inputgrpright_0_'+datas.idmodule).offset().top+i*40;
        	    }else{
        	        var myTop=$('#inputgrpleft_0_'+datas.idmodule).offset().top+i*40;
        	    }
                var myLeft=0.8*$('#centerdiv_'+datas.idmodule).offset().left;
                //rpnsequence.log('idmodule'+datas.idmodule);
                //rpnsequence.log('myTop'+myTop);
                //rpnsequence.log('myTop'+myLeft);
                //var myId=i+datas.idmodule;
        	    bezier[i+datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],$('.canvas-container'));
        	    //bezier[i+datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[i+datas.idmodule],$('.canvas-container'));
        	}
		});
        
   };

    var validate_ = function(){
         $.each(bezier, function(idx, item) {
            //rpnsequence.log('validate bezier[idx].target'+bezier[idx+datas.idmodule].target);
            //rpnsequence.log('validate [idx+datas.idmodule]'+[idx+datas.idmodule]);
            state[idx+datas.idmodule].response =bezier[idx+datas.idmodule].target;
            state[idx+datas.idmodule].positionLX =bezier[idx+datas.idmodule].fromX;
            state[idx+datas.idmodule].positionLY =bezier[idx+datas.idmodule].fromY;
            state[idx+datas.idmodule].positionRX =bezier[idx+datas.idmodule].toX;
            state[idx+datas.idmodule].positionRY =bezier[idx+datas.idmodule].toY;
            rpnsequence.log('validate state[idx+datas.idmodule].positionLX'+state[idx+datas.idmodule].positionLX);
            rpnsequence.log('validate state[idx+datas.idmodule].positionLY'+state[idx+datas.idmodule].positionLY);
            rpnsequence.log('validate state[idx+datas.idmodule].positionRX'+state[idx+datas.idmodule].positionRX);
            rpnsequence.log('validate state[idx+datas.idmodule].positionRY'+state[idx+datas.idmodule].positionRY);
        });
        rpnsequence.handleEndOfModule(state);
    };
    var validate = function(){
    }
    var score = function(sol) {
       // rpnsequence.log('scorte sol[ida]'+sol)
       // rpnsequence.log('bezier.target'+bezier[1].target)
        var score = 0;
        _.each(sol, function(item, ida){
            _.each(bezier, function(item, idx) {
              //  rpnsequence.log(idx)
              //  rpnsequence.log('sol[ida]'+sol)
              //  rpnsequence.log('bezier.target'+bezier[idx].target)
                
                score+=(((bezier[idx].target[datas.idmodule][ida]==sol[ida][0]&&bezier[idx].target[datas.idmodule][1]==sol[ida][1])||(bezier[idx].target[datas.idmodule][1]==sol[ida][0]&&bezier[idx].target[datas.idmodule][0]==sol[ida][1]))?1:0);
               
            });
      });
        return score;
    };
    
    return {
        init: init,
        validate:validate,
        score:score
    };

};