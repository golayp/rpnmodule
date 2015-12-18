//twolists

var rpntwolistsmodule = function() {
	rpnsequence.log('Dans twolistsmodule')
    var datas,
	    domelem,
    	state,
    	bezier = new Array(),
    	windowWidth = window.innerWidth,
    	windowHeight = window.innerHeight,
    	canvaswidth,
    	canvasheight,
    //Pour buidUI
    	leftdiv, 
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
            state = _state;
            rpnsequence.log('state exise')

        }else{
            state = [];
            
 
            if (datas.nbbinds=="left"){
                _.each(datas.leftitems, function(val, idx) {
                    state.push({
                        listL:null,
                        listR:null,
                        color:null,
                        response:null
                    })
                });
            }else{
                _.each(datas.rightitems, function(val, idx) {
                    state.push({
                        listR:null,
                        listR:null,
                        color:null,
                        response:null
                    })
                });
            }
        }
        buildUi();
        
    };
	
    
    var buildUi = function() {
    	domelem.addClass('twolists');
    	
    /*	$('span').css({
         	background:'none',
		  	border: 'none'
		});*/
    	
        var myCanvasPositionHeight=window.innerHeight,
        	myCanvasPositionwidth=$('#rpnm_inst_'+datas.idmodule).width();

        

        
        leftdiv=$('<div id="leftdiv_'+datas.idmodule+'" class="col-xs-4">');
        centerdiv=$('<div id="centerdiv_'+datas.idmodule+'" class="col-xs-4">');
        rightdiv=$('<div id="rightdiv_'+datas.idmodule+'" class="col-xs-4">');

        var targetsName=new Array(),
        targets=new Array(),
        nbleft,
        nbbezier,
        nbBiggerItemSize,
        nbright,
        stateContent=false,
        availableColors=new Array();
        if(nbleft<nbright){
            rpnsequence.log('nbbinds='+datas.nbbinds)
    	   nbBiggerItemSize=nbright;
        }
		targetsName[datas.idmodule]=new Array();
        targets[datas.idmodule]=new Array();
        
        if (datas.nbbinds=="left"){
            rpnsequence.log('left nbbinds='+datas.nbbinds)
            nbbezier=datas.leftitems.length;
        }else if(datas.nbbinds=="right"){
            rpnsequence.log('right nbbinds='+datas.nbbinds)
            nbbezier=datas.rightitems.length;
        }else{
            nbbezier=datas.leftitems.length;
        }
        for (var i=0;i<state.length;i++){
        	if (!_.isNull(state[i].response)){
        		stateContent=true;
        		L_items=state[i].listL;
        		R_items=state[i].listR;
        		nbleft=datas.leftitems.length,
		        //nbbezier=nbleft,
		        nbright=datas.rightitems.length,
		        availableColors.push(state[i].color);
		        
        	}
        }
        
        if (stateContent!=true){
	        L_items=_.shuffle(datas.leftitems);
	        R_items=_.shuffle(datas.rightitems);
	        nbleft=datas.leftitems.length,
	        //nbbezier=nbleft,
	        nbright=datas.rightitems.length,
	        availableColors = _.shuffle(["#8d61a4","#01a271","#5dc2e7","#63b553","#ed656a","#e95c7b","#f5a95e","#d62b81","#eee227"]);
	        
        }
        _.each(L_items, function(item,idx) {
           leftdiv.append($('<div id="inputgrpleft_'+idx+'_'+datas.idmodule+'" class="input-group"><span id="l_'+idx+'_'+datas.idmodule+'">' + L_items[idx] + '</span><span class="input-group-btn" border="none" ><input  type="radio" id="radleft_'+idx+'_'+datas.idmodule+'" name="l'+idx+'_'+datas.idmodule+'"></span></div>'));
           targetsName[datas.idmodule].push('#radleft_'+idx+'_'+datas.idmodule);
          
        });
        _.each(R_items, function(item,idx) {
            rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-btn" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span><span id="r_'+idx+'_'+datas.idmodule+'">'+ R_items[idx] + '</span></div>'));
            targetsName[datas.idmodule].push('#radright_'+idx+'_'+datas.idmodule);
            
        });
        mytwolists=$('<div id="mytwolists_'+datas.idmodule+'"/>');
        
        mytwolists.append(leftdiv);
        mytwolists.append(centerdiv);
        mytwolists.append(rightdiv);
        
        domelem.append(mytwolists);
     /*   mytwolists.css({
        	width:window.innerWidth*0.85,
        	height:window.innerHeight
        })*/
        if($("#leftdiv_"+datas.idmodule).height()<$('#rightdiv_'+datas.idmodule).height()){
    	   	nbBiggerItemSize=$('#rightdiv_'+datas.idmodule).height()+50;
        }else{
        	nbBiggerItemSize=$('#leftdiv_'+datas.idmodule).height()+50;
        }
		
        //var myCanvas=$('<canvas id="c'+datas.idmodule+'" height="'+window.innerHeight+'px" width="'+myCanvasPositionwidth+'px" top="0px">');
        var myCanvas=$('<canvas id="c'+datas.idmodule+'" height="1200px" width="'+myCanvasPositionwidth+'px" top="0px">');
        domelem.append(myCanvas);

		//var myheight=$('.twolists').height();
	/*	$('.row:last').css({
			position:'absolute',
			//top:window.innerHeight-35,
			left:'85%'
		})*/ 
        
		//rpnsequence.log('.width: '+$('#mytwolists_'+datas.idmodule).width())
        //rpnsequence.log('.height: '+$('#mytwolists_'+datas.idmodule).height())
        buildBezier(targetsName, datas, targets, nbleft, nbright, nbbezier, state, bezier, availableColors, myCanvas);
		resizeWindow(bezier, datas);
		
    };
    
   

    var validate = function(){
         $.each(bezier, function(idx) {
            state[idx].response =bezier[idx].target;
            state[idx].color =bezier[idx].color;
            state[idx].listL =L_items;
            state[idx].listR =R_items;
        });
        rpnsequence.log('state='+state)
        //rpnsequence.handleEndOfModule(state);
        return state;
    };

    var score = function(sol) {
      var score = 0;
      for (i=0;i<bezier.length;i++){
          for (j=0;j<sol.length;j++){
              if(state[i].response!=null){
              	var test=score;
                score+=(L_items[state[i].response[0][0]]==sol[j][0]&&R_items[state[i].response[1][0]]==sol[j][1]?1:0);
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
        	//rpnsequence.log('buildBezier'+nbbezier)
		    for (var i = 0; i < targetsName[datas.idmodule].length; i++) {
		        targets[datas.idmodule].push($(targetsName[datas.idmodule][i]));
		    }
		    
		    
		     
        	var canvas = new fabric.Canvas('c'+datas.idmodule,{
        		hoverCursor:'pointer',
        		selection: false
        	});

        	/*if(nbleft>nbright){
        	    nbbezier=nbright;
        	}*/

        	for (var i=0;i<nbbezier;i++){
                //rpnsequence.log('i='+ i)
                //rpnsequence.log('state[i]='+ state[i])
        		//var myid=i+10*datas.idmodule;
        		var myid=i;
        		var test=$('#radright_'+i+'_'+datas.idmodule);
        		//rpnsequence.log("[0].offset().top: "+$('.twolists')[0].offset().top.offset().top)
        		//rpnsequence.log('!_.isNull(state[i].response: '+!_.isNull(state[i].response))
        		
       	    
       	    
       	    	if(nbleft<nbright){
       	    		//rpnsequence.log('ici')
        	    	if(!_.isNull(state[i].response)){
        	    		//rpnsequence.log('state[myid].response: '+$('.twolists').offset().top)
        	    		//rpnsequence.log('#radright_3_'+$('#radright_3_'+datas.idmodule).offset().left)
        	    		//rpnsequence.log('state[myid].response[0][0]'+state[myid].response[1])
        	    		//var thisId='#radright_'+state[myid].response[1];
        	    		if(i>1){
        	    		//rpnsequence.log('.twolists+thisId'+$('.twolists').offset().top+5)
        	    		//rpnsequence.log('#radleft_state[1].response[0]'+$('#radleft_'+state[i].response[0]).offset().top)
        	    		}
        	        	//var myTopL=$('#radleft_'+state[i].response[0]).offset().top;
        	        	//var myTopR=$('#radright_'+state[i].response[1]).offset().top;
        	        	var myTopL=$('#radleft_'+state[i].response[0]).offset().top-$('#mytwolists_'+datas.idmodule).offset().top+5;
        	        	var myTopR=$('#radright_'+state[i].response[1]).offset().top-$('#mytwolists_'+datas.idmodule).offset().top+5;
        	        	//var myTopL=$('#radleft_'+state[i].response[0]).offset().top-$('#leftdiv_'+datas.idmodule).offset().top+5;
        	        	//var myTopR=$('#radright_'+state[i].response[1]).offset().top-$('#rightdiv_'+datas.idmodule).offset().top+5;
        	        }else{
        	        	var myTopL=$('#radleft_0_'+datas.idmodule).height()+5+i*20;
        	        	//var myTopL=$('#radleft_'+i+'_'+datas.idmodule).offset().top-$('.twolists').offset().top+5;
        	        	//var myTopR=$('#radright_'+i+'_'+datas.idmodule).offset().top-$('.twolists').offset().top+5;
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
        	    //	rpnsequence.log('myLeftR'+$('#radright_'+state[i].response[1]).offset().left)
        	    	var myLeftL=$('#inputgrpleft_'+i+'_'+state[i].response[0][2]).width()+5;
                	var myLeftR=$('#inputgrpright_'+i+'_'+state[i].response[0][2]).offset().left-$('#mytwolists_'+datas.idmodule).offset().left+5;
                	//var myLeftR=$('#inputgrpright_'+i+'_'+state[i].response[0][2]).offset().left-$('#inputgrpright_'+i+'_'+state[i].response[0][2]).width()/2+5;
        	    }else{
                	var myLeftL=0.8*$('#centerdiv_'+datas.idmodule).offset().left;
                	//var myLeftL=$('#inputgrpleft_'+i+'_'+datas.idmodule).width()-5;
                	var myLeftR=myLeftL+100;
                	//var myLeftR=$('#inputgrpright_'+i+'_'+datas.idmodule).offset().left-$('.twolists').offset().left+5;
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
	rpnsequence.log('num'+num)
	var id0='#radleft_'+num+'_'+mod;
	var id1='#radright_'+num+'_'+mod;
	var id2='#inputgrpleft_'+num+'_'+mod;
	//var id3='#inputgrpright_'+num+'_'+mod;
    var id3='#inputgrpright_0_'+mod;
    //rpnsequence.log('id3'+$(id3))

	var myLeftL=bezier[num].fromX*scalx;
	var myTopL=bezier[num].fromY*scaly;
	var myLeftR=bezier[num].toX*scalx;
	var myTopR=bezier[num].toY*scaly;
	/*if(window.innerWidth<530){
		rpnsequence.log('<530 ')
        var mypositiontop;
		if($('.pagination').offset.top){
			mypositiontop=$('.pagination').offset().top;
		}else{
			mypositiontop=$('#rpnm_inst_'+mod).offset().top;
		}
		$('.row:last').css({
			position:'absolute',
			//top:'15%',
			top:mypositiontop,
			left:'85%'
		})
		
		
		
	}else{
		rpnsequence.log('>530'+$('#rightdiv_'+mod).height())
        mypositiontop = $('#rightdiv_'+mod).height();
		$('.row:last').css({
			position:'absolute',
			top:mypositiontop*1.2,
			left:'85%'
		})
		
	}*/
//rpnsequence.log('bezier.target'+bezier[num].target)
	if(bezier[num].target[0]!=-3){
		id0='#radleft_'+bezier[num].target[0];
		
		//rpnsequence.log('id0'+id0)
		//rpnsequence.log('$(.twolists).offset().top'+$('.twolists').offset().top)
		myTopL=$(id0).offset().top-$('#mytwolists_'+mod).offset().top+4;
		myLeftL=$(id2).width()+5;	
	}
	if(bezier[num].target[1]!=-3){
		id1='#radright_'+bezier[num].target[1];
		myTopR=$(id1).offset().top-$('#mytwolists_'+mod).offset().top+4;
         //rpnsequence.log('$(id3).offset().left='+$(id3).offset().left)
		myLeftR=$(id3).offset().left-$('#mytwolists_'+mod).offset().left+5;	
	}
	
	var myreturn=new Array(Math.round(myLeftL), Math.round(myTopL), Math.round(myLeftR), Math.round(myTopR));

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
		c.mytarget=-3;
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
			var	target0=false,
				target1=false;
				p.mytarget=-3;
			for (var i=0;i<p.targets.length;i++){
				var cDiv=p.cont;
				
				if (Math.abs(leftRel-p.targets[i].offset().left)<20 && Math.abs(topRel-p.targets[i].offset().top)<20){
					p.left=-2-p.radius-p.cont.offset().left+p.targets[i].offset().left+p.targets[i].width()/2;
					p.top=-3-p.radius-p.cont.offset().top+p.targets[i].offset().top+p.targets[i].height()/2;
					
					if(p.targets[i].attr('name').substring(0, 1)=="l"){
						p.mytarget=p.targets[i].attr('name').substring(1);
						target0=true
					}else if(p.targets[i].attr('name').substring(0, 1)=="r"){
						p.mytarget=p.targets[i].attr('name').substring(1);
						target1=true;
					}
				}

				if(target0==true && target1==false){
					//console.log('t0=true t1=false')
					p.target[0]=p.mytarget;
				}else if(target0==false && target1==true){
					//console.log('t0=false t1=true')
					p.target[1]=p.mytarget;
				}else {
					if(p.name=="p0"){
						//console.log('c\'est p0')
						p.target[0]=p.mytarget;
					}
					if(p.name=="p3"){
						//console.log('c\'est p1')
						p.target[1]=p.mytarget;
					}
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
	var wwidth=$('#mytwolists_'+datas.idmodule).width();
	var wheight=$('#mytwolists_'+datas.idmodule).height();
	if (isNaN(wheight) || wheight==0){
		wheight=1;
	}
	//rpnsequence.log('wwidth'+wwidth)
	//rpnsequence.log('wheight'+wheight)
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
		var scalx=$('#mytwolists_'+datas.idmodule).width()/wwidth;
		var scaly=$('#mytwolists_'+datas.idmodule).height()/wheight;
		if (scaly==0 || isNaN(scaly)){
			scaly=1;
		}
		if (scalx==0 || isNaN(scalx)){
			scalx=1;
		}
		wwidth=$('#mytwolists_'+datas.idmodule).width();
		wheight=$('#mytwolists_'+datas.idmodule).height();
		//rpnsequence.log('scalx'+scalx)
		//rpnsequence.log('scaly'+scaly)
	    _.each(bezier, function(item,idx) {
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
			        bezier[idx].drawCubicNewPosition(idx, bezier[idx].mod, fx, fy, tx, ty, gfx, gfy, gtx, gty);
			  	} 
		});
		jQuery(function($) {
			var myid="#rpnm_modulenav";
        	$( myid ).bind( "mouseenter mouseover click", function(){
        		//rpnsequence.log('sur num modules')
				var scalx=$('#mytwolists_'+datas.idmodule).width()/wwidth;
				var scaly=$('#mytwolists_'+datas.idmodule).height()/wheight;
				if (scaly==0 || isNaN(scaly)){
					scaly=1;
				}
				if (scalx==0 || isNaN(scalx)){
					scalx=1;
				}
				wwidth=$('#mytwolists_'+datas.idmodule).width();
				wheight=$('#mytwolists_'+datas.idmodule).height();
				
			    _.each(bezier, function(item,idx) {
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
					        bezier[idx].drawCubicNewPosition(idx, bezier[idx].mod, fx, fy, tx, ty, gfx, gfy, gtx, gty);
					  	} 
				});
			
			});
			var myid2="#rpnm_validation";
			$( myid2 ).bind( "mouseenter mouseover click", function(){
				//rpnsequence.log('sur validation')
        		var scalx=$('#mytwolists_'+datas.idmodule).width()/wwidth;
				var scaly=$('#mytwolists_'+datas.idmodule).height()/wheight;
				if (scaly==0 || isNaN(scaly)){
					scaly=1;
				}
				if (scalx==0 || isNaN(scalx)){
					scalx=1;
				}
				wwidth=$('#mytwolists_'+datas.idmodule).width();
				wheight=$('#mytwolists_'+datas.idmodule).height();

			    _.each(bezier, function(item,idx) {
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
					        bezier[idx].drawCubicNewPosition(idx, bezier[idx].mod, fx, fy, tx, ty, gfx, gfy, gtx, gty);
					  	} 
				});
		
			});
			
		});
	};
	window.addEventListener('resize', myobject.debounce(myobject.resizeBezier, 100));
}