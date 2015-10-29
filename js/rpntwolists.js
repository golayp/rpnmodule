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
 
            if (datas.leftitems.length<datas.rightitems.length){
                _.each(datas.leftitems, function(val, idx) {
                    state.push({
                        positionLX:0,
                        positionLY:0,
                        positionRX:0,
                        positionRY:0,
                        response:null
                    })
                });
            }else{
                _.each(datas.rightitems, function(val, idx) {
                    state.push({
                        positionLX:0,
                        positionLY:0,
                        positionRX:0,
                        positionRY:0,
                        response:null
                    })
                });
            }
            if(datas.shuffle){
                state=_.shuffle(state);
            }
        }
        buildUi();
    };
var leftdiv, 
    rightdiv, 
    centerdiv,
    L_items,
    R_items;
    
    var buildUi = function() {
        var myCanvasPositionHeight=(datas.rightitems.length+datas.leftitems.length)*100/2;
        domelem.addClass('twolists');
        var math=$('<div class="row"><math  display="block"><mspace height="40px"/><mfrac linethickness="2px" numalign="left" denomalign="left"><mrow><mfrac bevelled="true"><mn>1</mn><mi>x</mi></mfrac><mo>+</mo><mfrac bevelled="true"><mn>2</mn><mi>x</mi></mfrac><mo>+</mo><mo>&hellip;</mo></mrow><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>x</mi><mn>4</mn></msup><mo>+</mo><mo>&hellip;</mo></mrow></mfrac></math></div>');
        domelem.append(math);
        
        leftdiv=$('<div id="leftdiv" class="col-md-4">');
        centerdiv=$('<div id="centerdiv_'+datas.idmodule+'" class="col-md-4">');
        rightdiv=$('<div id="rightdiv" class="col-md-4">');
        
        var myCanvas=$('<canvas id="c'+datas.idmodule+'"  height="'+myCanvasPositionHeight+'px" width="1000px">'),
        targetsName=new Array(),
        targets=new Array(),
        nbleft=datas.leftitems.length,
        nbbezier=nbleft,
        nbright=datas.rightitems.length,
        availableColors = _.shuffle(["#8d61a4","#01a271","#5dc2e7","#63b553","#ed656a","#e95c7b","#f5a95e","#d62b81","#eee227"]);
        L_items=_.shuffle(datas.leftitems);
        R_items=_.shuffle(datas.rightitems);
        targetsName[datas.idmodule]=new Array();
        targets[datas.idmodule]=new Array();

        _.each(L_items, function(item,idx) {
           leftdiv.append($('<div id="inputgrpleft_'+idx+'_'+datas.idmodule+'" class="input-group"><span id="l_'+idx+'_'+datas.idmodule+'">' + L_items[idx][1] + '</span><span class="input-group-addon"><input  type="radio" id="radleft_'+idx+'_'+datas.idmodule+'" name="l'+idx+'_'+datas.idmodule+'"></span></div>'));
            targetsName[datas.idmodule].push('#radleft_'+idx+'_'+datas.idmodule);
          
        });

        _.each(R_items, function(item,idx) {
            //rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span>' + datas.rightitems[idx] + '</div>'));
            rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span><span id="r_'+idx+'_'+datas.idmodule+'">'+ R_items[idx][1] + '</span></div>'));
            targetsName[datas.idmodule].push('#radright_'+idx+'_'+datas.idmodule);
        });
        
        domelem.append(leftdiv);
        domelem.append(centerdiv);
        domelem.append(rightdiv);
        domelem.append(myCanvas);
	
		$(document).ready(function(){
            
		    for (var i = 0; i < targetsName[datas.idmodule].length; i++) {
		        targets[datas.idmodule].push($(targetsName[datas.idmodule][i]));
		    }

        	var canvas = new fabric.Canvas('c'+datas.idmodule,{
        		hoverCursor:'pointer',
        		selection: false
        	});

        	if(nbleft>nbright){
        	    nbbezier=nbright;
        	}

        	for (var i=0;i<nbbezier;i++){
        	    if(nbleft<nbright){
        	        var myTop=$('#inputgrpright_0_'+datas.idmodule).offset().top+i*40;
        	    }else{
        	        var myTop=$('#inputgrpleft_0_'+datas.idmodule).offset().top+i*40;
        	    }
                var myLeft=0.8*$('#centerdiv_'+datas.idmodule).offset().left;
                bezier[i+10*datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],myCanvas);

        	}
		});
        
    };

    var validate = function(){
        var k=0;
         $.each(bezier, function(idx) {
             var myid=k+10*datas.idmodule;
             if(bezier[myid] && bezier[myid].target[0]!=-3 && bezier[myid].target[1]!=-3){
                state[idx].response =[L_items[bezier[myid].target[0][0]][0],R_items[bezier[myid].target[1][0]][0]];
                state[idx].positionLX =bezier[myid].fromX;
                state[idx].positionLY =bezier[myid].fromY;
                state[idx].positionRX =bezier[myid].toX;
                state[idx].positionRY =bezier[myid].toY;
                k++;
             }
        });
        rpnsequence.handleEndOfModule(state);
        
    };

    var score = function(sol) {
      score = 0;
      for (i=10*datas.idmodule;i<bezier.length;i++){
          for (j=0;j<sol.length;j++){
              if(state[i-10*datas.idmodule].response!=null){
                score+=(state[i-10*datas.idmodule].response[0]==sol[j][0]&&state[i-10*datas.idmodule].response[1]==sol[j][1]?1:0);
              }
          }
      }

        return score;
    };
    
    return {
        init:init,
        validate:validate,
        score:score
    };

};