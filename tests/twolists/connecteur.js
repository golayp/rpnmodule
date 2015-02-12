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
	this.onBeforeSelectionCleared=function(e) {
	//On va faire ici l'analyse de la targetqui se trouve sous le point du connecteur
		var activeObject = e.target;
		
		if (activeObject.name == "p0") {
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
		'before:selection:cleared': this.onBeforeSelectionCleared
	}),
	this.drawCubic=function () {
		this.guide1 =this.makeLine([fromX,fromY, g1X, g1Y]);
		this.guide1.name="guide1";
		
		this.guide2 =this.makeLine([toX,toY,g2X,g2Y]);
		this.guide2.name="guide2";
		
		this.line=this.make(fromX,fromY,g1X,g1Y,g2X,g2Y,toX,toY,color);
		this.line.name="bezier";
	 
		this.p1 = this.makeCurvePoint(g1X, g1Y, null, this.line, null, null, this.guide1,color)
		this.p1.name = "p1";

		this.p0 = this.makeCurveCircle(fromX, fromY, this.line, this.p1, null, null, this.guide1,color, this.target,this.targets,this.myContainer);
		this.p0.name = "p0";

		this.p2 = this.makeCurvePoint(g2X, g2Y, null, null, this.line, null, this.guide2,color );
		this.p2.name = "p2";

		this.p3 = this.makeCurveCircle(toX, toY, null, null, this.p2, this.line, this.guide2,color, this.target, this.targets,this.myContainer );
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
		
		
	

	},
	this.drawCubic()
};
