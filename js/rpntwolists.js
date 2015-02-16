//twolists
var rpntwolistsmodule = function() {
	console.log('Dans twolistsmodule')

    var datas;
    var domelem;
    var state;
    var bezier=new Array();
    

    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
            sentence: ["sentence", "not", "set!"],
            shuffle:false
        });
        datas = _datas;
        domelem = _domelem;
        
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }else{
            state= datas.sentence;
            if(datas.shuffle){
                state=_.shuffle(state);
            }
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('twolists');
        var   leftdiv=$('<div id="leftdiv" class="col-md-4">'),
        centerdiv=$('<div id="centerdiv" class="col-md-4">'),
        rightdiv=$('<div id="rightdiv" class="col-md-4">'),
        myCanvas=$('<canvas id="c"  height="1000px" width="1000px">'),
        targetsName=new Array(),
        targets=new Array(),
        nbleft=datas.leftitems.length,
        nbbezier=nbleft,
        nbright=datas.rightitems.length,
        availableColors = _.shuffle(["#8d61a4","#01a271","#5dc2e7","#63b553","#ed656a","#e95c7b","#f5a95e","#d62b81","#eee227"]);
        _.each(datas.leftitems, function(item,idx) {
            leftdiv.append($('<div id="inputgrpleft_'+idx+'" class="input-group">' + datas.leftitems[idx] + '<span class="input-group-addon"><input  type="radio" id="radleft_'+idx+'" name="l'+idx+'"></span></div>'));
            targetsName.push('#radleft_'+idx);
        });
        _.each(datas.rightitems, function(item,idx) {
            rightdiv.append($('<div id="inputgrpright_'+idx+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'" name="r'+idx+'"></span>' + datas.rightitems[idx] + '</div>'));
            targetsName.push('#radright_'+idx);
        });
        domelem.append(leftdiv);
        domelem.append(centerdiv);
        domelem.append(rightdiv);
        domelem.append(myCanvas);
        var nom='#radleft_'+0;
		var myId=$(nom).offset().left;
		$(document).ready(function(){
		    for (var i = 0; i < targetsName.length; i++) {
		        targets.push($(targetsName[i]));
		    }
        	var canvas = new fabric.Canvas('c',{
        		hoverCursor:'pointer'
        	});

        	if(nbleft<nbright){
        	    nbbezier=nbright;
        	}
        	for (var i=0;i<nbbezier;i++){
        	    if(nbleft<nbright){
        	        var myTop=$('#inputgrpright_0').offset().top+i*40;
        	    }else{
        	        var myTop=$('#inputgrpleft_0').offset().top+i*40;
        	    }
                var myLeft=0.8*$('#centerdiv').offset().left;
        	    bezier[i]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets,$('.canvas-container'));
        	}
		});
        
   };

    var validate = function(){
         $.each(bezier, function(idx, item) {
            state[idx].response =bezier[idx].target;
            console.log('validate bezier[idx].target'+bezier[idx].target);
        });
        rpnsequence.handleEndOfModule(state);
    };

    var score = function(sol) {
       // console.log('scorte sol[ida]'+sol)
       // console.log('bezier.target'+bezier[1].target)
        var score = 0;
        _.each(sol, function(item, ida){
            _.each(bezier, function(item, idx) {
              //  console.log(idx)
              //  console.log('sol[ida]'+sol)
              //  console.log('bezier.target'+bezier[idx].target)
                
                score+=(((bezier[idx].target[ida]==sol[ida][0]&&bezier[idx].target[1]==sol[ida][1])||(bezier[idx].target[1]==sol[ida][0]&&bezier[idx].target[0]==sol[ida][1]))?1:0);
               
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