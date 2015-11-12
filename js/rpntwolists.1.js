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
                        listL:null,
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
                        //positionLY:0,
                        //positionRX:0,
                        //positionRY:0,
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
        
        var myCanvas=$('<canvas id="c'+datas.idmodule+'" height="'+myCanvasPositionHeight+'px" width="1000px"  position="fixed" top="0px">'),
        targetsName=new Array(),
        targets=new Array(),
        nbleft=datas.leftitems.length,
        nbbezier=nbleft,
        nbright=datas.rightitems.length,
        availableColors = _.shuffle(["#8d61a4","#01a271","#5dc2e7","#63b553","#ed656a","#e95c7b","#f5a95e","#d62b81","#eee227"]);
        
        if (state.length>0){
        	L_items=state.listL;
        	R_items=state.listR;	
        }else{
	        L_items=_.shuffle(datas.leftitems);
	        R_items=_.shuffle(datas.rightitems);
        }
        
        targetsName[datas.idmodule]=new Array();
        targets[datas.idmodule]=new Array();

        _.each(L_items, function(item,idx) {
           leftdiv.append($('<div id="inputgrpleft_'+idx+'_'+datas.idmodule+'" class="input-group"><span id="l_'+idx+'_'+datas.idmodule+'">' + L_items[idx] + '</span><span class="input-group-addon"><input  type="radio" id="radleft_'+idx+'_'+datas.idmodule+'" name="l'+idx+'_'+datas.idmodule+'"></span></div>'));
            targetsName[datas.idmodule].push('#radleft_'+idx+'_'+datas.idmodule);
          
        });

        _.each(R_items, function(item,idx) {
            //rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span>' + datas.rightitems[idx] + '</div>'));
            rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span><span id="r_'+idx+'_'+datas.idmodule+'">'+ R_items[idx] + '</span></div>'));
            targetsName[datas.idmodule].push('#radright_'+idx+'_'+datas.idmodule);
            
        });
        
        domelem.append(leftdiv);
        domelem.append(centerdiv);
        domelem.append(rightdiv);
        domelem.append(myCanvas);
	
	//	$(document).ready(function(){
            
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
        		var myid=i+10*datas.idmodule;
        		var test='#radright_'+i+'_'+datas.idmodule;
        		test="#radright_0_0";
        		rpnsequence.log('test: '+test)
        		rpnsequence.log(test.id)
        		rpnsequence.log('$("#radright_"+i+"_"+datas.idmodule): '+$("#radright_0_0").offset().top)
        	    if(nbleft<nbright){
        	    	if(state[myid].response!=null){
        	        	var myTopL=$('#radright_'+state[myid].response[0]).offset().top+i*40;
        	        }else{
        	        	var myTop=$('#radright_'+i+'_'+datas.idmodule).offset().top+i*40;
        	        }
        	        
        	    }else{
        	    	if(state[myid].response!=null){
        	        	var myTopL=$('#radleft_'+state[myid].response[0]).offset().top+i*40;
        	        	var myTopR=$('#radleft_'+state[myid].response[1]).offset().top+i*40;
        	       	}else{
        	       		var myTop=$('#radleft_'+i+'_'+datas.idmodule).offset().top+i*40;
        	       	}
        	    }
        	    if(state[myid].response!=null){
        	    	var myLeftL=0.8*$('#centerdiv_'+state[myid].response[0]).offset().left;
        	    	var myLeftR=0.8*$('#centerdiv_'+state[myid].response[1]).offset().left;
        	    	bezier[i+10*datas.idmodule]=new Bezier(canvas,myLeftL,myTopL,myLeftR,myTopR,myLeftR,myTopR,myLeftL,myTopL,availableColors[i],targets[datas.idmodule],myCanvas);
        	    }else{
                	var myLeft=0.8*$('#centerdiv_'+datas.idmodule).offset().left;
                	bezier[i+10*datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],myCanvas);
        	    }
                //bezier[i+10*datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],myCanvas);

        	}
	//	});
        
    };

    var validate = function(){
        var k=0;
         $.each(bezier, function(idx) {
             var myid=k+10*datas.idmodule;
             rpnsequence.log('L_items: '+L_items)
             rpnsequence.log('R_items: '+R_items)
             rpnsequence.log('bezier[myid].target: '+bezier[myid].target)
             rpnsequence.log('bezier[myid].target[0][0]: '+bezier[myid].target[0][0])
             rpnsequence.log('bezier[myid].target[1][0]: '+bezier[myid].target[1][0])
             rpnsequence.log('L_items[bezier[myid].target[0][0]]: '+L_items[bezier[myid].target[0][0]])
             rpnsequence.log('R_items[bezier[myid].target[1][0]]: '+R_items[bezier[myid].target[1][0]])
             if(bezier[myid] && bezier[myid].target[0]!=-3 && bezier[myid].target[1]!=-3){
                //state[idx].response =[L_items[bezier[myid].target[0][0]],R_items[bezier[myid].target[1][0]]];
                state[idx].response =bezier[myid].target
                rpnsequence.log('state[idx].response: '+state[idx].response)
                //state[idx].positionLX =bezier[myid].fromX;
                //state[idx].positionLX =$("#inputgrpleft_"+bezier[myid].target).offset().left;
               //rpnsequence.log('state[idx].positionLX: '+state[idx].positionLX)
                //state[idx].positionLY =bezier[myid].fromY;
                //state[idx].positionRX =bezier[myid].toX;
                //state[idx].positionRY =bezier[myid].toY;
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
function Bezier(canvas,fromX,fromY,toX,toY,g1X,g1Y,g2X,g2Y,color,targets,myContainer){
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
	this.target1=[-1,-1, 'vide1'],
	this.target2=[-2,-2, 'vide2'],
	this.target=[-3,-3],
	this.make=function(fX,fY,gX1,gY1,gX2,gY2,tX,tY,color){
	/*	console.log('Connecteur, this.make: '+this);
		for(i=0;i>this.targets.length;i++){
			console.log('Connecteur, this.targets: '+this.targets[i].offset().top);
		}*/
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
		dashL= new fabric.Line(coords, {
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
	this.makeCurveCircle=function (left, top, line1, line2, line3, line4, guide, color,target,targets,cont) {
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
	this.onObjectSelected=function(e){
		var activeObject = e.target;

		if (activeObject.name == "p0") {
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
	},
	this.onObjectMoving=function(e) {
	//On va faire ici le snap sur le point et empêcher que le point sorte du canvas

		if (e.target.name == "p0" || e.target.name == "p3") {
			var p = e.target,
				topRel=p.top+p.cont.offset().top,
				leftRel=p.left+p.cont.offset().left;

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
				fromX=p.line1.path[0][1];
			}
			else if (p.line4) {
				p.line4.path[1][5] = p.left+p.radius;
				p.line4.path[1][6] = p.top+p.radius;
				p.line4.path[1][3] = p.p0.left+p.radius;
				p.line4.path[1][4] = p.top+p.radius;
				p.line3.left=p.p0.left+p.radius;
				p.line3.top=p.top+p.radius;
			}
		}
	},
	this.canvas.on({
		'object:selected': this.onObjectSelected,
		'object:moving': this.onObjectMoving,
	//	'before:selection:cleared': this.onBeforeSelectionCleared
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

		this.p0 = this.makeCurveCircle(this.fromX, this.fromY, this.line, this.p1, null, null, this.guide1,this.color, this.target,this.targets,this.myContainer);
		this.p0.name = "p0";

		this.p2 = this.makeCurvePoint(this.g2X, this.g2Y, null, null, this.line, null, this.guide2,this.color );
		this.p2.name = "p2";

		this.p3 = this.makeCurveCircle(this.toX, this.toY, null, null, this.p2, this.line, this.guide2,this.color, this.target, this.targets,this.myContainer );
		this.p3.name = "p3";

		this.line.p0=this.p0;
		this.line.p3=this.p3;
		this.p3.p0=this.p0;
		this.p0.p3=this.p3;
		
		this.line.selectable=this.guide1.selectable=this.guide2.selectable=this.p0.selectable=this.p1.selectable=this.p2.selectable=this.p3.selectable=true;
		this.line.hasBorders=this.guide1.hasBorders=this.guide2.hasBorders=this.p0.hasBorders=this.p1.hasBorders=this.p2.hasBorders=this.p3.hasBorders=false;
		this.line.hasControls=this.guide1.hasControls=this.guide2.hasControls=this.p0.hasControls=this.p1.hasControls=this.p2.hasControls=this.p3.hasControls=false;
		this.line.perPixelTargetFind=this.guide1.perPixelTargetFind=this.guide2.perPixelTargetFind=this.p0.perPixelTargetFind=this.p1.perPixelTargetFind=this.p2.perPixelTargetFind=this.p3.perPixelTargetFind=true;
		canvas.add(this.line, this.guide1, this.guide2, this.p0, this.p1, this.p2, this.p3);
		
	/*	for (i=0;i<targets.length;i++){
			console.log('dans connecteur, target'+this.target[i]);
		}
	*/

	},
	this.drawCubic()
};
