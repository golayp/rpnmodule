//twolists
/*jQuery.fn.resizeDelayed = (function(){

    // >>> THIS PART RUNS ONLY ONCE - RIGHT NOW

    var rd_funcs = [], rd_counter = 1, foreachResizeFunction = function( func ){ for( var index in rd_funcs ) { func(index); } };

    // REGISTER JQUERY RESIZE EVENT HANDLER
    jQuery(window).resize(function() {

        // SET/RESET TIMEOUT ON EACH REGISTERED FUNCTION
        foreachResizeFunction(function(index){

            // IF THIS FUNCTION IS MANUALLY DISABLED ( by calling jQuery(window).resizeDelayed(false, 'id') ),
            // THEN JUST CONTINUE TO NEXT ONE
            if( rd_funcs[index] === false )
                return; // CONTINUE;

            // IF setTimeout IS ALREADY SET, THAT MEANS THAT WE SHOULD RESET IT BECAUSE ITS CALLED BEFORE DURATION TIME EXPIRES
            if( rd_funcs[index].timeout !== false )
                clearTimeout( rd_funcs[index].timeout );

            // SET NEW TIMEOUT BY RESPECTING DURATION TIME
            rd_funcs[index].timeout = setTimeout( rd_funcs[index].func, rd_funcs[index].delay );

        });

    });

    // <<< THIS PART RUNS ONLY ONCE - RIGHT NOW

    // RETURN THE FUNCTION WHICH JQUERY SHOULD USE WHEN jQuery(window).resizeDelayed(...) IS CALLED
    return function( func_or_false, delay_or_id, id ){

        // FIRST PARAM SHOULD BE SET!
        if( typeof func_or_false == "undefined" ){

            console.log( 'jQuery(window).resizeDelayed(...) REQUIRES AT LEAST 1 PARAMETER!' );
            return this; // RETURN JQUERY OBJECT

        }

        // SHOULD WE DELETE THE EXISTING FUNCTION(S) INSTEAD OF CREATING A NEW ONE?
        if( func_or_false == false ){

            // DELETE ALL REGISTERED FUNCTIONS?
            if( typeof delay_or_id == "undefined" ){

                // CLEAR ALL setTimeout's FIRST
                foreachResizeFunction(function(index){

                    if( typeof rd_funcs[index] != "undefined" && rd_funcs[index].timeout !== false )
                        clearTimeout( rd_funcs[index].timeout );

                });

                rd_funcs = [];

                return this; // RETURN JQUERY OBJECT

            }
            // DELETE ONLY THE FUNCTION WITH SPECIFIC ID?
            else if( typeof rd_funcs[delay_or_id] != "undefined" ){

                // CLEAR setTimeout FIRST
                if( rd_funcs[delay_or_id].timeout !== false )
                    clearTimeout( rd_funcs[delay_or_id].timeout );

                rd_funcs[delay_or_id] = false;

                return this; // RETURN JQUERY OBJECT

            }

        }

        // NOW, FIRST PARAM MUST BE THE FUNCTION
        if( typeof func_or_false != "function" )
            return this; // RETURN JQUERY OBJECT

        // SET THE DEFAULT DELAY TIME IF ITS NOT ALREADY SET
        if( typeof delay_or_id == "undefined" || isNaN(delay_or_id) )
            delay_or_id = 500;

        // SET THE DEFAULT ID IF ITS NOT ALREADY SET
        if( typeof id == "undefined" )
            id = rd_counter;

        // ADD NEW FUNCTION TO RESIZE EVENT
        rd_funcs[id] = {
            func : func_or_false,
            delay: delay_or_id,
            timeout : false
        };

        rd_counter++;

        return this; // RETURN JQUERY OBJECT

    }

})();*/
var rpntwolistsmodule = function() {
	rpnsequence.log('Dans twolistsmodule')
    var datas;
    var domelem;
    var state;
    var bezier=new Array();
    var windowWidth=window.innerWidth;
    var windowHeight=window.innerHeight;
    //Pour buidUI
    var leftdiv, 
	    rightdiv, 
	    centerdiv,
	    L_items,
	    R_items;

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
            //rpnsequence.log('state: '+state)
        }else{
            state = [];
 
            if (datas.leftitems.length<datas.rightitems.length){
                _.each(datas.leftitems, function(val, idx) {
                    state.push({
                        listL:null,
                        listR:null,
                        color:null,
                        //positionLY:0,
                        //positionRX:0,
                        //positionRY:0,
                        response:null
                    })
                });
            }else{
                _.each(datas.rightitems, function(val, idx) {
                    state.push({
                        listR:null,
                        listR:null,
                        color:null,
                        //positionLY:0,
                        //positionRX:0,
                        //positionRY:0,
                        response:null
                    })
                });
            }
           // if(datas.shuffle){
           //     state=_.shuffle(state);
           // }
        }
        buildUi();
        
    };
	
    
    var buildUi = function() {
    	$('span').css({
         	background:'none',
		  	border: 'none'
		});
    	
        var myCanvasPositionHeight=window.innerHeight,
        	//myCanvasPositionHeight=(datas.rightitems.length+datas.leftitems.length)*100/2,
        	myCanvasPositionwidth=$('#rpnm_inst_'+datas.idmodule).width();
        	//rpnsequence.log('myCanvasPositionwidth'+myCanvasPositionHeight)
        	//rpnsequence.log('myCanvasPositionwidth'+myCanvasPositionwidth)
        domelem.addClass('twolists');
        var math=$('<div class="row"><math  display="block"><mspace height="40px"/><mfrac linethickness="2px" numalign="left" denomalign="left"><mrow><mfrac bevelled="true"><mn>1</mn><mi>x</mi></mfrac><mo>+</mo><mfrac bevelled="true"><mn>2</mn><mi>x</mi></mfrac><mo>+</mo><mo>&hellip;</mo></mrow><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>x</mi><mn>4</mn></msup><mo>+</mo><mo>&hellip;</mo></mrow></mfrac></math></div>');
        //domelem.append(math);
        
        leftdiv=$('<div id="leftdiv_'+datas.idmodule+'" class="col-xs-4">');
        centerdiv=$('<div id="centerdiv_'+datas.idmodule+'" class="col-xs-4">');
        rightdiv=$('<div id="rightdiv_'+datas.idmodule+'" class="col-xs-4">');
        
       // var myCanvas=$('<canvas id="c'+datas.idmodule+'" height="'+myCanvasPositionHeight+'px" width="1000px"  position="fixed" top="0px">'),
        var targetsName=new Array(),
        targets=new Array(),
        nbleft,
        nbbezier,
        nbBiggerItemSize,
        nbright,
        stateContent=false,
        availableColors=new Array();
        if(nbleft<nbright){
    	   nbBiggerItemSize=nbright;
        }
		targetsName[datas.idmodule]=new Array();
        targets[datas.idmodule]=new Array();
        
        //var myCanvas=$('<canvas id="c'+datas.idmodule+'" height="'+nbBiggerItemSize*200+'px" width="'+myCanvasPositionwidth+'px" top="0px">');
        
        for (var i=0;i<state.length;i++){
        	//rpnsequence.log('sate intitial: '+state[i].response)
        	if (!_.isNull(state[i].response)){
        		stateContent=true;
        	//	rpnsequence.log('state.reponse: '+state[i].response)
        		L_items=state[i].listL;
        		R_items=state[i].listR;
        	//	rpnsequence.log('state L_items: '+L_items[state[i].response[0][0]])
        	//	rpnsequence.log('state R_items: '+R_items[state[i].response[1][0]])
        		nbleft=datas.leftitems.length,
		        nbbezier=nbleft,
		        nbright=datas.rightitems.length,
		        availableColors.push(state[i].color);
		        
        	}
        }
        
        if (stateContent!=true){
	        L_items=_.shuffle(datas.leftitems);
	        R_items=_.shuffle(datas.rightitems);
	        nbleft=datas.leftitems.length,
	        nbbezier=nbleft,
	        nbright=datas.rightitems.length,
	        availableColors = _.shuffle(["#8d61a4","#01a271","#5dc2e7","#63b553","#ed656a","#e95c7b","#f5a95e","#d62b81","#eee227"]);
	        
        }
        
        

        _.each(L_items, function(item,idx) {
           leftdiv.append($('<div id="inputgrpleft_'+idx+'_'+datas.idmodule+'" class="input-group"><span id="l_'+idx+'_'+datas.idmodule+'">' + L_items[idx] + '</span><span class="input-group-addon" border="none" ><input  type="radio" id="radleft_'+idx+'_'+datas.idmodule+'" name="l'+idx+'_'+datas.idmodule+'"></span></div>'));
           targetsName[datas.idmodule].push('#radleft_'+idx+'_'+datas.idmodule);
          
        });

        _.each(R_items, function(item,idx) {
            //rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span>' + datas.rightitems[idx] + '</div>'));
            rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span><span id="r_'+idx+'_'+datas.idmodule+'">'+ R_items[idx] + '</span></div>'));
            targetsName[datas.idmodule].push('#radright_'+idx+'_'+datas.idmodule);
            
        });
       // rpnsequence.log('targetsName'+targetsName)
        domelem.append(leftdiv);
        domelem.append(centerdiv);
        domelem.append(rightdiv);
        if($("#leftdiv_"+datas.idmodule).height()<$('#rightdiv_'+datas.idmodule).height()){
    	   	nbBiggerItemSize=$('#rightdiv_'+datas.idmodule).height()+50;
        }else{
        	nbBiggerItemSize=$('#leftdiv_'+datas.idmodule).height()+50;
        }
		
        var myCanvas=$('<canvas id="c'+datas.idmodule+'" height="'+window.innerHeight*0.78+'px" width="'+myCanvasPositionwidth+'px" top="0px">');
        domelem.append(myCanvas);
        
	//	$(document).ready(function(){
	
		var myheight=$('#rpnm_module_content').height();
		$('.row:last').css({
			position:'fixed',
			top:window.innerHeight*0.91+'px',
			//top:myheight*0.82,
			left:'75%'
			
		})

        
        buildBezier(targetsName, datas, targets, nbleft, nbright, nbbezier, state, bezier, availableColors, myCanvas);
	//	});
		//if(bezier[0]){
		//	rpnsequence.log('bezier[0].target'+bezier[0].target)
	     //   bezier[0].drawCubicNewPosition(30,50, 100, 80, 100, 80, 30, 50);	
		//}
		//rpnsequence.log("$('#c'+datas.idmodule)"+$('#c'+datas.idmodule).attr('id'))
		//rpnsequence.log("$('#c'+datas.idmodule)"+$('#c'+datas.idmodule).attr('selection'))
	//	resizeW($('#c'+datas.idmodule), windowWidth, windowHeight);
	//rpnsequence.log('datas.idmodule'+datas.idmodule)
	//rpnsequence.log('datas.nbmodules'+datas.nbmodules)
		resizeWindow(bezier, datas);
		
    };
    
   

    var validate = function(){
        //var k=0;
         $.each(bezier, function(idx) {
            //var myid=k+10*datas.idmodule;
             var myid=idx;
            // rpnsequence.log('idx: '+idx)
        /*     rpnsequence.log('L_items: '+L_items)
             rpnsequence.log('R_items: '+R_items)
             rpnsequence.log('bezier[myid].target: '+bezier[myid].target)
             rpnsequence.log('bezier[myid].target[0][0]: '+bezier[myid].target[0][0])
             rpnsequence.log('bezier[myid].target[1][0]: '+bezier[myid].target[1][0])
             rpnsequence.log('L_items[bezier[myid].target[0][0]]: '+L_items[bezier[myid].target[0][0]])
             rpnsequence.log('R_items[bezier[myid].target[1][0]]: '+R_items[bezier[myid].target[1][0]])    */
            // if(bezier[myid] && bezier[myid].target[0]!=-3 && bezier[myid].target[1]!=-3){
                //state[idx].response =[L_items[bezier[myid].target[0][0]],R_items[bezier[myid].target[1][0]]];
                state[idx].response =bezier[myid].target;
                //rpnsequence.log('state[idx].response: '+state[idx].response)
                state[idx].color =bezier[myid].color;
                //rpnsequence.log('state[idx].response: '+state[idx].color)
                state[idx].listL =L_items;
               // rpnsequence.log('state[idx].response: '+state[idx].listL)
                state[idx].listR =R_items;
                //rpnsequence.log('state[idx].response: '+state[idx].listR)
                
                //state[idx].positionLX =bezier[myid].fromX;
                //state[idx].positionLX =$("#inputgrpleft_"+bezier[myid].target).offset().left;
               //rpnsequence.log('state[idx].positionLX: '+state[idx].positionLX)
                //state[idx].positionLY =bezier[myid].fromY;
                //state[idx].positionRX =bezier[myid].toX;
                //state[idx].positionRY =bezier[myid].toY;
               // k++;
            // }
        });
        rpnsequence.handleEndOfModule(state);
        
    };

    var score = function(sol) {
      var score = 0;
      for (i=0;i<bezier.length;i++){
          for (j=0;j<sol.length;j++){
              if(state[i].response!=null){
              	var test=score;
                score+=(L_items[state[i].response[0][0]]==sol[j][0]&&R_items[state[i].response[1][0]]==sol[j][1]?1:0);
             /*   if (test!=score){
	                rpnsequence.log('L_items[state[i].response[0][0]]'+L_items[state[i].response[0][0]])
	              	rpnsequence.log('sol[j][0]'+sol[j][0])
	              	rpnsequence.log('R_items[state[i].response[1][0]]'+R_items[state[i].response[1][0]])
	              	rpnsequence.log('sol[j][1]'+sol[j][1])
	              	rpnsequence.log(' ')
	              	rpnsequence.log('score '+score)
	              	rpnsequence.log(' ')
                }*/
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

function buildBezier(targetsName, datas, targets, nbleft, nbright, nbbezier, state, bezier, availableColors, myCanvas){ 
        	//rpnsequence.log('buildBezier')
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
        		//var myid=i+10*datas.idmodule;
        		var myid=i;
        		var test=$('#radright_'+i+'_'+datas.idmodule);
        		//rpnsequence.log("offset().top: "+$('#radright_'+i+'_'+datas.idmodule).offset().top)
        		//rpnsequence.log('!_.isNull(state[i].response: '+!_.isNull(state[i].response))
        		//rpnsequence.log('offset().left: '+test.height())
       	    
       	    
       	    	if(nbleft<nbright){
       	    		//rpnsequence.log('ici')
        	    	if(!_.isNull(state[i].response)){
        	    		//rpnsequence.log('state[myid].response: '+state[i].response)
        	    		//rpnsequence.log('#radright_3_'+$('#radright_3_'+datas.idmodule).offset().left)
        	    		//rpnsequence.log('state[myid].response[0][0]'+state[myid].response[1])
        	    		//var thisId='#radright_'+state[myid].response[1];
        	    		if(i>1){
        	    		rpnsequence.log('#rpnm_module_content+thisId'+$('#rpnm_module_content').offset().top+5)
        	    		rpnsequence.log('#radleft_state[1].response[0]'+$('#radleft_'+state[i].response[0]).offset().top)
        	    		}
        	        	//var myTopL=$('#radleft_'+state[i].response[0]).offset().top;
        	        	//var myTopR=$('#radright_'+state[i].response[1]).offset().top;
        	        	var myTopL=$('#radleft_'+state[i].response[0]).offset().top-$('#rpnm_module_content').offset().top+5;
        	        	var myTopR=$('#radright_'+state[i].response[1]).offset().top-$('#rpnm_module_content').offset().top+5;
        	        }else{
        	        	var myTopL=$('#radleft_0_'+datas.idmodule).height()+5+i*20;
        	        	//var myTopL=$('#radleft_'+i+'_'+datas.idmodule).offset().top-$('#rpnm_module_content').offset().top+5;
        	        	//var myTopR=$('#radright_'+i+'_'+datas.idmodule).offset().top-$('#rpnm_module_content').offset().top+5;
        	        	var myTopR=myTopL;
        	        }
        	        
        	    }else{
        	    	if(!_.isNull(state[i].response)){
        	        	var myTopL=$('#radleft_'+state[i].response[0]).offset().top+i*20;
        	        	var myTopR=$('#radright_'+state[i].response[1]).offset().top+i*20;
        	       	}else{
        	       		var myTopL=$('#radleft_'+datas.idmodule).height()+5+i*20;
        	       		var myTopR=myTopL;
        	       	}
        	    }
        	    
        	    if(!_.isNull(state[i].response)){
        	    	//rpnsequence.log('state[i].response[0][2]'+state[i].response[0][2])
        	    //rpnsequence.log('datas.idmodule'+datas.idmodule)
        	    	//var myLeftL=0.8*$('#centerdiv_'+state[i].response[0][2]).offset().left;
        	    	//var myLeftR=0.8*$('#centerdiv_'+state[i].response[1][2]).offset().left;
        	    	//rpnsequence.log('myLeftL'+myLeftL)
        	    	//rpnsequence.log('myLeftR'+myLeftR)
        	    	var myLeftL=$('#inputgrpleft_'+i+'_'+state[i].response[0][2]).width()-5;
                	var myLeftR=$('#inputgrpright_'+i+'_'+state[i].response[0][2]).offset().left-$('#rpnm_module_content').offset().left+3;
        	    }else{
                	var myLeftL=0.8*$('#centerdiv_'+datas.idmodule).offset().left;
                	//var myLeftL=$('#inputgrpleft_'+i+'_'+datas.idmodule).width()-5;
                	var myLeftR=myLeftL+100;
                	//var myLeftR=$('#inputgrpright_'+i+'_'+datas.idmodule).offset().left-$('#rpnm_module_content').offset().left+5;
            	}
            	if (state[i].response){
            		var target=state[i].response;
            	}else{
            		var target=[-3,-3];
            	}
                bezier[i]=new Bezier(canvas,myLeftL,myTopL,myLeftR,myTopR,myLeftR,myTopL,myLeftL,myTopR,availableColors[i],targets[datas.idmodule], target ,myCanvas, i, datas.idmodule);
               
       	//  	bezier[i+10*datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],myCanvas);
        	}
}

function coordsBezier(num, mod, bezier, scalx, scaly){
	rpnsequence.log('coordsBezier: '+num+'_'+mod)
	//rpnsequence.log('coordsBezier: '+mod)
	//rpnsequence.log("$('#rpnm_module_content').offset().top"+$('#rpnm_module_content').offset().top)
	//rpnsequence.log("$('#radright_0_0').offset().top"+$('#radright_0_0').offset().top)
	//var myid=num+10*mod;
	var screenscale=window.innerHeight;
	
	var id0='#radleft_'+num+'_'+mod;
	var id1='#radright_'+num+'_'+mod;
	var id2='#inputgrpleft_'+num+'_'+mod;
	var id3='#inputgrpright_'+num+'_'+mod;
	rpnsequence.log("scalx"+scalx)
	//rpnsequence.log("scaly"+scaly)
	//rpnsequence.log("bezier["+num+"].fromY"+bezier[num].fromY)
	
	var myLeftL=bezier[num].fromX*scalx;
	var myTopL=bezier[num].fromY*scaly;
	var myLeftR=bezier[num].toX*scalx;
	var myTopR=bezier[num].toY*scaly;
	
//	rpnsequence.log('bezier[num].target[0]'+bezier[num].target[0])
	if(bezier[num].target[0]!=-3){
		//rpnsequence.log('bezier[num].target[0]'+bezier[num].target[0])
		id0='#radleft_'+bezier[num].target[0];
		myTopL=$(id0).offset().top-$('#rpnm_module_content').offset().top+4;
		myLeftL=$(id2).width()-6;	
	}
	if(bezier[num].target[1]!=-3){
		//rpnsequence.log('bezier[num].target[1][0]'+bezier[num].target[1])
		id1='#radright_'+bezier[num].target[1];
		//rpnsequence.log('id1'+id1)
		myTopR=$(id1).offset().top-$('#rpnm_module_content').offset().top+4;
		myLeftR=$(id3).offset().left-$('#rpnm_module_content').offset().left+4;	
	}
	
	//var myG1X=bezier[num].g1X*scalx;
	//var myG1Y=bezier[num].g1Y*scaly;
	//var myG2X=bezier[num].g2X*scalx;
	//var myG2Y=bezier[num].g2Y*scaly;
	
	//rpnsequence.log('myTopL'+Math.round(myTopL))
	//rpnsequence.log('myTopR'+Math.round(myTopR))
	//rpnsequence.log('myLeftL'+Math.round(myLeftL))
	//rpnsequence.log('myLeftR'+Math.round(myLeftR))
	
	//if (Math.abs($(id0).offset().top-$('#rpnm_module_content').offset().top+4-myTopL)<10 && Math.round($(id2).width()-6-myLeftL)<10){
/*	if (Math.abs($(id0).offset().top-$('#rpnm_module_content').offset().top+4-myTopL)<10 && Math.round($(id2).width()-6-myLeftL)<10){
		myTopL=$(id0).offset().top-$('#rpnm_module_content').offset().top+4;
		myLeftL=$(id2).width()-6;
		rpnsequence.log('dans if sur les points debut')
	}
	//if (Math.abs($(id1).offset().top-$('#rpnm_module_content').offset().top+4-myTopR)<10 && Math.round($(id3).offset().left-$('#rpnm_module_content').offset().left+4-myLeftR)<10){
	if (Math.abs($(id1).offset().top-$('#rpnm_module_content').offset().top+4-myTopR)<10 && Math.round($(id3).offset().left-$('#rpnm_module_content').offset().left+4-myLeftR)<10){
		myTopR=$(id1).offset().top-$('#rpnm_module_content').offset().top+4;
		myLeftR=$(id3).offset().left-$('#rpnm_module_content').offset().left+4;
		rpnsequence.log('dans if sur les points fin')
	}
*/
	
	var myreturn=new Array(Math.round(myLeftL), Math.round(myTopL), Math.round(myLeftR), Math.round(myTopR));
	//var myreturn=new Array(Math.round(myLeftL), Math.round(myTopL), Math.round(myLeftR), Math.round(myTopR), Math.round(myG1X), Math.round(myG1Y), Math.round(myG2X), Math.round(myG2X));
	//if(mod==0){
	//	rpnsequence.log('myreturn, scalx: '+myreturn+' '+scalx)	
	//}
	//rpnsequence.log('myTopL'+Math.round(myTopL))
	//rpnsequence.log('myTopR'+Math.round(myTopR))
	//rpnsequence.log('myLeftL'+Math.round(myLeftL))
	//rpnsequence.log('myLeftR'+Math.round(myLeftR))
	return myreturn;
}
function Bezier(canvas,fromX,fromY,toX,toY,g1X,g1Y,g2X,g2Y,color,targets,target,myContainer,num,mod){
	var myline=this;
	this.myContainer=myContainer,
	this.canvas=canvas,
	this.fromX=fromX,
	this.fromY=fromY,
	this.toX=toX,
	this.toY=toY,
	this.g1X=g1X,
	this.g1Y=g1Y,
	this.g2X=g2X,
	this.g2Y=g2Y,
	this.color=color,
	this.targets=targets,
	this.target=target,
	this.num=num,
	this.mod=mod,
	//console.log('this.target'+this.target)
	this.make=function(fX,fY,gX1,gY1,gX2,gY2,tX,tY,color){
		//M Début de la ligne X, Y, C les autre points, dans l'ordre 1ere poignée X, 1ere poignée Y, 2e poignée X, 2e poignée Y, fin de la ligne X, Y
		//Autrement dit
		//M path[0][1] path[0][2] C path[1[1] path[1][2] path[1][3] path[1][4] path[1][5] path[1][6]
		 var b = new fabric.Path('M 65 0 C 100, 100, 100, 200, 200, 0', { 
			fill: '', 
			stroke: color, 
			strokeWidth: 3,
			opacity:1
			});

		b.path[0][1] = fX;
		b.path[0][2] = fY;

		b.path[1][1] = gX1;
		b.path[1][2] = gY1;

		b.path[1][3] = gX2;
		b.path[1][4] = gY2;
		
		b.path[1][5] = tX;
		b.path[1][6] = tY;
		
		//b.hasBorders = b.hasControls = false;
		//b.perPixelTargetFind = true;
		return b;
	},

	this.makeLine=function(coords, myId) {
		 var dashL= new fabric.Line(coords, {
		  fill: 'black',
		  stroke: 'red',
		  strokeWidth: 1,
		  strokeDashArray: [5, 5],
		  opacity:0
		});
		//dashL.hasBorders = dashL.hasControls = false;
		//dashL.perPixelTargetFind = true;
		return dashL;
	  },

	this.makeCurveCircle=function (left, top, line1, line2, line3, line4, guide, color,target,targets,cont, num, mod, guideX, guideY) {
		var c = new fabric.Circle({
		  radius: 5,
		  left: left-5,
		  top: top-5,
		  strokeWidth: 3,
		  fill: color,
		  stroke: color,
		  opacity:1
		});

		c.line1 = line1;
		c.line2 = line2;
		c.line3 = line3;
		c.line4 = line4;
		c.guide=guide;
		c.target=target;
		c.targets=targets;
		c.cont=cont;
		c.num=num;
		c.mod=mod;
		c.gx=guideX;
		c.gy=guideY;
		

		return c;
	  },
	this.makeCurvePoint=function(left, top, line1, line2, line3, line4, guide, color,myId) {
		var d = new fabric.Circle({
		  left: left,
		  top: top,
		  strokeWidth: 3,
		  radius: 2,
		  fill: color,
		  stroke: color,
		  opacity:0
		  
		});

		d.line1 = line1;
		d.line2 = line2;
		d.line3 = line3;
		d.line4 = line4;
		d.guide=guide;

		return d;
	  },
	  
	this.onBeforeSelectionCleared=function(e) {
	    var activeObject = e.target;
	    if(activeObject.num==myline.num && activeObject.mod==myline.mod){
		//	console.log ('before selected Cleared myline.fromY: '+myline.fromY);
		    if (activeObject.name == "p0") {
		    	//console.log ('before selected Cleared myline.fromY: '+myline.fromY);
		      activeObject.line2.animate('opacity', '0', {
		        duration: 200,
		        onChange: canvas.renderAll.bind(canvas),
		      });
			  activeObject.line2.selectable = false;
			  activeObject.guide.animate('opacity', '0', {
		        duration: 200,
		        onChange: canvas.renderAll.bind(canvas),
		      });
		    }
		    else if (activeObject.name == "p3") {
		    	//console.log ('before selected Cleared myline.toY: '+myline.toY);
		      activeObject.line3.animate('opacity', '0', {
		        duration: 200,
		        onChange: canvas.renderAll.bind(canvas),
		      });
		      activeObject.line3.selectable = false;
			  activeObject.guide.animate('opacity', '0', {
		        duration: 200,
		        onChange: canvas.renderAll.bind(canvas),
		      });
		    }
		    else if (activeObject.name == "p1" || activeObject.name == "p2") {
		      activeObject.animate('opacity', '0', {
		        duration: 200,
		        onChange: canvas.renderAll.bind(canvas),
		      });
		      activeObject.selectable = false;
			  activeObject.guide.animate('opacity', '0', {
		        duration: 200,
		        onChange: canvas.renderAll.bind(canvas),
		      });
		    }
	    }
	  },
	this.onObjectSelected=function(e){
		var activeObject = e.target;
		if(activeObject.num==myline.num && activeObject.mod==myline.mod){
			if (activeObject.name == "p0") {
				//console.log ('selected myline.fromY: '+myline.fromY);
				activeObject.line2.animate('opacity', '0', {
				duration: 200,
				onChange: canvas.renderAll.bind(canvas),
				});
				activeObject.line2.selectable = true;
				activeObject.guide.animate('opacity', '0', {
				duration: 200,
				onChange: canvas.renderAll.bind(canvas),
			  });
			}
			if (activeObject.name == "p3") {
				//console.log ('selected myline.toY: '+myline.toY);
				activeObject.line3.animate('opacity', '0', {
					duration: 200,
					onChange: canvas.renderAll.bind(canvas),
				}); 
				activeObject.line3.selectable = true;
				activeObject.guide.animate('opacity', '0', {
				duration: 200,
				onChange: canvas.renderAll.bind(canvas),
			  });
			}
		}
	},
	this.onObjectMoving=function(e) {
	//On va faire ici le snap sur le point et empêcher que le point sorte du canvas
	//console.log('nom du target'+e.target.name)
		if (e.target.name == "p0" || e.target.name == "p3") {
			var p = e.target,
				topRel=p.top+p.cont.offset().top,
				leftRel=p.left+p.cont.offset().left;
				if(p.num==myline.num && p.mod==myline.mod){
					//console.log('p.num'+p.num)
					if(p.name=="p0"){
						myline.fromX=p.left;
						myline.fromY=p.top;
						//myline.g1X=p.gx;
						//myline.g1Y=p.gy;
						//console.log('p0 '+p.num+' '+p.mod)
						//console.log('num_mod'+myline.num+'_'+myline.mod)
						//console.log('myline.toX'+myline.toX)
						//console.log('myline.toY'+myline.toY)
						//console.log('myline.fromX'+myline.fromX)
						//console.log('myline.fromY'+myline.fromY)
					}else if(p.name=="p3"){
						myline.toX=p.left;
						myline.toY=p.top;
						//myline.g2X=p.gx;
						//myline.g2Y=p.gy;
						//console.log('p3 '+p.num+' '+p.mod)
						//console.log('num_mod'+myline.num+'_'+myline.mod)
						//console.log('myline.toX'+myline.toX)
						//console.log('myline.toY'+myline.toY)
						//console.log('myline.fromX'+myline.fromX)
						//console.log('myline.fromY'+myline.fromY)
					}
				}
				
			for (var i=0;i<p.targets.length;i++){
				var cDiv=p.cont;

				if (Math.abs(leftRel-p.targets[i].offset().left)<20 && Math.abs(topRel-p.targets[i].offset().top)<20){
					p.left=-2-p.radius-p.cont.offset().left+p.targets[i].offset().left+p.targets[i].width()/2;
					p.top=-3-p.radius-p.cont.offset().top+p.targets[i].offset().top+p.targets[i].height()/2;
					if(p.targets[i].attr('name').substring(0, 1)=="l"){
						p.target[0]=p.targets[i].attr('name').substring(1);
					}else if(p.targets[i].attr('name').substring(0, 1)=="r"){
						p.target[1]=p.targets[i].attr('name').substring(1);
					}
					//console.log('p.target[0]: '+p.target[0]);
					//console.log('p.target[1]: '+p.target[1]);
					//console.log('p.target: '+p.target);
					//console.log('myline.target: '+myline.target);
				}
				if(p.left<=10){
					p.left=10;
				}
				if(p.left>=cDiv.width()){
					p.left=cDiv.width()-10;
				}
				if(p.top<=8){
					p.top=8;
				}
				if(p.top>=cDiv.height()-10){
					p.top=cDiv.height()-10;
				}
			}
			if(p.name=="p0"){
				p.guide.set({'x1':p.left,'y1':p.top, 'x2':p.p3.left,'y2':p.top});
			}else{
				p.guide.set({'x1':p.left,'y1':p.top, 'x2':p.p0.left,'y2':p.top});
			}
			if (p.line1) {
				p.line1.path[0][1] = p.left+p.radius;
				p.line1.path[0][2] = p.top+p.radius;
				p.line1.path[1][1] = p.p3.left+p.radius;
				p.line1.path[1][2] = p.top+p.radius;
				p.line2.left=p.p3.left+p.radius;
				p.line2.top=p.top+p.radius;
			//	console.log(' ')
			//	console.log('p.left'+p.left)
			//	console.log('fromX'+myline.fromX)
			//	console.log('p.line1.path[0][1]'+p.line1.path[0][1]);
				p.guide.set({ 'x1': p.left, 'y1': p.top });
			}
			else if (p.line4) {
				p.line4.path[1][5] = p.left+p.radius;
				p.line4.path[1][6] = p.top+p.radius;
				p.line4.path[1][3] = p.p0.left+p.radius;
				p.line4.path[1][4] = p.top+p.radius;
				p.line3.left=p.p0.left+p.radius;
				p.line3.top=p.top+p.radius;
				p.guide.set({ 'x1': p.left, 'y1': p.top });
			}
			canvas.renderAll()
		}
	},
	this.onObjectmousedown=function(e){
	//	console.log('mousedown')
		if (e.target && (e.target.name == "p0" || e.target.name == "p3")) {
			var p = e.target;
			if(p.num==myline.num && p.mod==myline.mod){
			/*	if(p.name=='p0'){
					myline.fromX=p.left;
					myline.fromY=p.top;
				}else if(p.name=='p3'){
					myline.toX=p.left;
					myline.toY=p.top;
				}*/
			//	console.log('myline.fromX: '+myline.fromX+' myline.fromY: '+myline.fromY)
			//	console.log('myline.toX: '+myline.toX+' myline.toY: '+myline.toY)
			//	console.log('myline.g1X: '+myline.g1X+' myline.g1Y: '+myline.g1Y)
			//	console.log('myline.g2X: '+myline.g2X+' myline.g2Y: '+myline.g2Y)
			}
		}
	},
	this.onObjectmouseup=function(e){
	//	console.log ('mouseup')
		if (e.target && (e.target.name == "p0" || e.target.name == "p3")) {
			var p = e.target;
			if(p.num==myline.num && p.mod==myline.mod){
				/*if(p.name=='p0'){
					myline.fromX=p.left;
					myline.fromY=p.top;
				}else if(p.name=='p3'){
					myline.toX=p.left;
					myline.toY=p.top;
				}*/
			//	console.log('myline.fromX: '+myline.fromX+' myline.fromY: '+myline.fromY)
			//	console.log('myline.toX: '+myline.toX+' myline.toY: '+myline.toY)
			//	console.log('myline.g1X: '+myline.g1X+' myline.g1Y: '+myline.g1Y)
			//	console.log('myline.g2X: '+myline.g2X+' myline.g2Y: '+myline.g2Y)
			}
		}
	},

	this.canvas.on({
		'object:selected': this.onObjectSelected,
		'object:moving': this.onObjectMoving,
	//	'mouse:up':this.onObjectmouseup,
	//	'mouse:down':this.onObjectmousedown,
		'before:selection:cleared': this.onBeforeSelectionCleared
	}),
	this.drawCubic=function () {
		this.guide1 =this.makeLine([this.fromX,this.fromY, this.g1X, this.g1Y]);
		this.guide1.name="guide1";
		
		this.guide2 =this.makeLine([this.toX,this.toY,this.g2X,this.g2Y]);
		this.guide2.name="guide2";
		
		this.line=this.make(this.fromX,this.fromY,this.g1X,this.g1Y,this.g2X,this.g2Y,this.toX,this.toY,this.color);
		this.line.name="bezier";
	 
		this.p1 = this.makeCurvePoint(this.g1X, this.g1Y, null, this.line, null, null, this.guide1,this.color)
		this.p1.name = "p1";

		this.p0 = this.makeCurveCircle(this.fromX, this.fromY, this.line, this.p1, null, null, this.guide1,this.color, this.target,this.targets,this.myContainer, this.num, this.mod, this.g1X, this.g1Y);
		this.p0.name = "p0";

		this.p2 = this.makeCurvePoint(this.g2X, this.g2Y, null, null, this.line, null, this.guide2,this.color );
		this.p2.name = "p2";

		this.p3 = this.makeCurveCircle(this.toX, this.toY, null, null, this.p2, this.line, this.guide2,this.color, this.target, this.targets,this.myContainer, this.num, this.mod, this.g2X, this.g2Y);
		this.p3.name = "p3";

		this.line.p0=this.p0;
		this.line.p3=this.p3;
		this.p3.p0=this.p0;
		this.p0.p3=this.p3;
		
		this.line.selectable=this.guide1.selectable=this.guide2.selectable=this.p0.selectable=this.p1.selectable=this.p2.selectable=this.p3.selectable=true;
		this.line.hasBorders=this.guide1.hasBorders=this.guide2.hasBorders=this.p0.hasBorders=this.p1.hasBorders=this.p2.hasBorders=this.p3.hasBorders=false;
		this.line.hasControls=this.guide1.hasControls=this.guide2.hasControls=this.p0.hasControls=this.p1.hasControls=this.p2.hasControls=this.p3.hasControls=false;
		this.line.perPixelTargetFind=this.guide1.perPixelTargetFind=this.guide2.perPixelTargetFind=this.p0.perPixelTargetFind=this.p1.perPixelTargetFind=this.p2.perPixelTargetFind=this.p3.perPixelTargetFind=true;
		this.canvas.add(this.line, this.guide1, this.guide2, this.p0, this.p1, this.p2, this.p3);


	},
	this.drawCubicNewPosition=function (no, modu, fx,fy,tx,ty,gfx, gfy, gtx, gty) {
		this.canvas.remove(this.line, this.guide1, this.guide2, this.p0, this.p1, this.p2, this.p3);
		this.fromX=fx;
		this.fromY=fy;
		this.toX=tx;
		this.toY=ty;
		this.g1X=gfx;
		this.g1Y=gfy;
		this.g2X=gtx;
		this.g2Y=gty;
		this.num=no;
		this.mod=modu;
	/*	console.log('draweCubicNewPosition')
		console.log('myline.fromX: '+myline.fromX+' myline.fromY: '+myline.fromY)
		console.log('myline.fromX: '+this.fromX+' myline.fromY: '+this.fromY)
		console.log('myline.toX: '+myline.toX+' myline.toY: '+myline.toY)
		console.log('myline.g1X: '+myline.g1X+' myline.g1Y: '+myline.g1Y)
		console.log('myline.g2X: '+myline.g2X+' myline.g2Y: '+myline.g2Y)
		//Point de départ
		this.line.path[0][1] = this.fromX+this.p0.radius;
		this.line.path[0][2] = this.fromY+this.p0.radius;
		//1ere poingnée tangeante
		this.line.path[1][1] = this.g1X;
		this.line.path[1][2] = this.g1Y;
		//1ere poignée
		this.p2.left=this.g1X;
		this.p2.top=this.g1Y;
		//2e poingnée tangeante
		this.line.path[1][3] = this.g2X;
		this.line.path[1][4] = this.g2Y;
		//point d'arrivée
		this.line.path[1][5] = this.toX;
		this.line.path[1][6] = this.toY;
		//2e poignée
		this.p3.left=this.g2X;
		this.p3.top=this.g2Y;
	*/	
		this.guide1 =this.makeLine([this.fromX,this.fromY, this.g1X, this.g1Y]);
		this.guide1.name="guide1";
		
		this.guide2 =this.makeLine([this.toX,this.toY,this.g2X,this.g2Y]);
		this.guide2.name="guide2";
		
		this.line=this.make(this.fromX,this.fromY,this.g1X,this.g1Y,this.g2X,this.g2Y,this.toX,this.toY,this.color);
		this.line.name="bezier";
	 
		this.p1 = this.makeCurvePoint(this.g1X, this.g1Y, null, this.line, null, null, this.guide1,this.color)
		this.p1.name = "p1";

		this.p0 = this.makeCurveCircle(this.fromX, this.fromY, this.line, this.p1, null, null, this.guide1,this.color, this.target,this.targets,this.myContainer, this.num, this.mod, this.g1X, this.g1Y);
		this.p0.name = "p0";

		this.p2 = this.makeCurvePoint(this.g2X, this.g2Y, null, null, this.line, null, this.guide2,this.color );
		this.p2.name = "p2";

		this.p3 = this.makeCurveCircle(this.toX, this.toY, null, null, this.p2, this.line, this.guide2,this.color, this.target, this.targets,this.myContainer, this.num, this.mod, this.g2X, this.g2Y );
		this.p3.name = "p3";

		this.line.p0=this.p0;
		this.line.p3=this.p3;
		this.p3.p0=this.p0;
		this.p0.p3=this.p3;
		
		this.line.selectable=this.guide1.selectable=this.guide2.selectable=this.p0.selectable=this.p1.selectable=this.p2.selectable=this.p3.selectable=true;
		this.line.hasBorders=this.guide1.hasBorders=this.guide2.hasBorders=this.p0.hasBorders=this.p1.hasBorders=this.p2.hasBorders=this.p3.hasBorders=false;
		this.line.hasControls=this.guide1.hasControls=this.guide2.hasControls=this.p0.hasControls=this.p1.hasControls=this.p2.hasControls=this.p3.hasControls=false;
		this.line.perPixelTargetFind=this.guide1.perPixelTargetFind=this.guide2.perPixelTargetFind=this.p0.perPixelTargetFind=this.p1.perPixelTargetFind=this.p2.perPixelTargetFind=this.p3.perPixelTargetFind=true;
		this.canvas.add(this.line, this.guide1, this.guide2, this.p0, this.p1, this.p2, this.p3);

		
			
	},
	
	this.drawCubic()
};

function resizeWindow(bezier, datas){
	//rpnsequence.log('bezier'+bezier)
	var wwidth=$('#rpnm_module_content').width();
	var wheight=$('#rpnm_module_content').height();
	var c=0;
	var myobject = {};
	myobject.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if ( !immediate ) {
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait || 200);
			if ( callNow ) { 
				func.apply(context, args);
			}
		};
	};
	myobject.resizeBezier = function() {
		//rpnsequence.log('$(#rpnm_module_content).width'+ $('#rpnm_module_content').width())
		var scalx=$('#rpnm_module_content').width()/wwidth;
		var scaly=$('#rpnm_module_content').height()/wheight;
		wwidth=$('#rpnm_module_content').width();
		wheight=$('#rpnm_module_content').height();
		
	
		//rpnsequence.log('scalx'+scalx)
		//rpnsequence.log('scaly'+scaly)
		//rpnsequence.log('$(#rightdiv_+datas.idmodule).height():'+$('#rightdiv_'+datas.idmodule).height())
	/*	if($('#leftdiv_'+datas.idmodule).height()<$('#rightdiv_'+datas.idmodule).height()){
    	   	nbBiggerItemSize=$('#rightdiv_'+datas.idmodule).height()+50;
        }else{
        	nbBiggerItemSize=$('#leftdiv_'+datas.idmodule).height()+50;
        }
        rpnsequence.log('nbBiggerItemSize resize'+nbBiggerItemSize)
      */  
        
        //rpnsequence.log('size canvas resize'+$('canvas').css('height'))
	    _.each(bezier, function(item,idx) {
				//rpnsequence.log('idx: '+idx)
			  	if(bezier[idx]){
			  		var coor=coordsBezier(idx,bezier[idx].mod, bezier, scalx, scaly);
			  		var fx=coor[0];
			  		var fy=coor[1];
			  		var tx=coor[2];
			  		var ty=coor[3];
			  		var gfx=coor[2];
			  		var gfy=coor[1];
			  		var gtx=coor[0];
			  		var gty=coor[3];
			  		//$('canvas').css({
			       // 	height:window.innerHeight+'px'
			      //  });
			        //rpnsequence.log('idx, num, mod:'+idx+', '+bezier[idx].num+', '+bezier[idx].mod)
			        bezier[idx].drawCubicNewPosition(idx, bezier[idx].mod, fx, fy, tx, ty, gfx, gfy, gtx, gty);
			  	} 
		});
		jQuery(function($) {
			var myid="#rpnm_modulenav";
	        //$( myid ).bind( "mouseenter mouseover mouseleave", function() {
        	$( myid ).bind( "mouseenter mouseover click", function(){
	        	//rpnsequence.log('///////////////////////////////////////////////////////////////////////////////sur le module '+datas.idmodule)
	        	
				//rpnsequence.log('$(#rpnm_module_content).width'+ $('#rpnm_module_content').width())
				var scalx=$('#rpnm_module_content').width()/wwidth;
				var scaly=$('#rpnm_module_content').height()/wheight;
				wwidth=$('#rpnm_module_content').width();
				wheight=$('#rpnm_module_content').height();
				//rpnsequence.log('scalx'+scalx)
				//rpnsequence.log('scaly'+scaly)
			    _.each(bezier, function(item,idx) {
						//rpnsequence.log('idx: '+idx)
					  	if(bezier[idx]){
					  		var coor=coordsBezier(idx,bezier[idx].mod, bezier, scalx, scaly);
					  		var fx=coor[0];
					  		var fy=coor[1];
					  		var tx=coor[2];
					  		var ty=coor[3];
					  		var gfx=coor[2];
					  		var gfy=coor[1];
					  		var gtx=coor[0];
					  		var gty=coor[3];
					        //rpnsequence.log('idx, num, mod:'+idx+', '+bezier[idx].num+', '+bezier[idx].mod)
					        bezier[idx].drawCubicNewPosition(idx, bezier[idx].mod, fx, fy, tx, ty, gfx, gfy, gtx, gty);
					  	} 
				});
			
			});
			var myid2="#rpnm_validation";
				$( myid2 ).bind( "mouseenter mouseover click", function(){
	        	rpnsequence.log('///////////////////////////////////////////////////////////////////////////////sur le module '+datas.idmodule)
	        	
				//rpnsequence.log('$(#rpnm_module_content).width'+ $('#rpnm_module_content').width())
				var scalx=$('#rpnm_module_content').width()/wwidth;
				var scaly=$('#rpnm_module_content').height()/wheight;
				wwidth=$('#rpnm_module_content').width();
				wheight=$('#rpnm_module_content').height();
				//rpnsequence.log('scalx'+scalx)
				//rpnsequence.log('scaly'+scaly)
			    _.each(bezier, function(item,idx) {
						//rpnsequence.log('idx: '+idx)
					  	if(bezier[idx]){
					  		var coor=coordsBezier(idx,bezier[idx].mod, bezier, scalx, scaly);
					  		var fx=coor[0];
					  		var fy=coor[1];
					  		var tx=coor[2];
					  		var ty=coor[3];
					  		var gfx=coor[2];
					  		var gfy=coor[1];
					  		var gtx=coor[0];
					  		var gty=coor[3];
					        //rpnsequence.log('idx, num, mod:'+idx+', '+bezier[idx].num+', '+bezier[idx].mod)
					        bezier[idx].drawCubicNewPosition(idx, bezier[idx].mod, fx, fy, tx, ty, gfx, gfy, gtx, gty);
					  	} 
				});
			
			});
			
		});
        
		//mysizes=new Array($('#rpnm_module_content').width(),$('#rpnm_module_content').height());
		//return mysizes;
	};
	window.addEventListener('resize', myobject.debounce(myobject.resizeBezier, 100));
	//Ca Foncionne aussi avec buildUi
	//window.addEventListener('resize', myobject.debounce(func, 400));
}