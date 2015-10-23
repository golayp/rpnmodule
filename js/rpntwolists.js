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
        //bezier[datas.idmodule]=new Array();
        //rpnsequence.log('state'+state);
        buildUi();
    };
var leftdiv, 
    rightdiv, 
    centerdiv,
    L_items,
    R_items;
    
    var buildUi = function() {
        domelem.addClass('twolists');
        var math=$('<div class="row"><math  display="block"><mspace height="40px"/><mfrac linethickness="2px" numalign="left" denomalign="left"><mrow><mfrac bevelled="true"><mn>1</mn><mi>x</mi></mfrac><mo>+</mo><mfrac bevelled="true"><mn>2</mn><mi>x</mi></mfrac><mo>+</mo><mo>&hellip;</mo></mrow><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>x</mi><mn>4</mn></msup><mo>+</mo><mo>&hellip;</mo></mrow></mfrac></math></div>');
        domelem.append(math);
        
        leftdiv=$('<div id="leftdiv" class="col-md-4">');
        centerdiv=$('<div id="centerdiv_'+datas.idmodule+'" class="col-md-4">');
        rightdiv=$('<div id="rightdiv" class="col-md-4">');
        
        var myCanvas=$('<canvas id="c'+datas.idmodule+'"  height="1000px" width="1000px">'),
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
        //rpnsequence.log('datas.leftitems'+datas.leftitems);
        //rpnsequence.log('L_items[0]'+L_items[0]);

        
        //_.each(datas.leftitems, function(item,idx) {
        _.each(L_items, function(item,idx) {
            //leftdiv.append($('<div id="inputgrpleft_'+idx+'_'+datas.idmodule+'" class="input-group">' + datas.leftitems[idx] + '<span class="input-group-addon"><input  type="radio" id="radleft_'+idx+'_'+datas.idmodule+'" name="l'+idx+'_'+datas.idmodule+'"></span></div>'));
            leftdiv.append($('<div id="inputgrpleft_'+idx+'_'+datas.idmodule+'" class="input-group"><span id="l_'+idx+'_'+datas.idmodule+'">' + L_items[idx][1] + '</span><span class="input-group-addon"><input  type="radio" id="radleft_'+idx+'_'+datas.idmodule+'" name="l'+idx+'_'+datas.idmodule+'"></span></div>'));
            targetsName[datas.idmodule].push('#radleft_'+idx+'_'+datas.idmodule);
           // rpnsequence.log('idx: '+idx);
           // rpnsequence.log('datas.idmodule: '+datas.idmodule);
           
        });
        //_.each(datas.rightitems, function(item,idx) {
        _.each(R_items, function(item,idx) {
            //rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span>' + datas.rightitems[idx] + '</div>'));
            rightdiv.append($('<div id="inputgrpright_'+idx+'_'+datas.idmodule+'" class="input-group"><span class="input-group-addon" ><input  type="radio" id="radright_'+idx+'_'+datas.idmodule+'" name="r'+idx+'_'+datas.idmodule+'"></span><span id="r_'+idx+'_'+datas.idmodule+'">'+ R_items[idx][1] + '</span></div>'));
            targetsName[datas.idmodule].push('#radright_'+idx+'_'+datas.idmodule);
        });
        
        //rpnsequence.log("leftdiv.innerHtml()"+leftdiv.html());
        domelem.append(leftdiv);
        domelem.append(centerdiv);
        domelem.append(rightdiv);
        domelem.append(myCanvas);
        
        //rpnsequence.log("leftdiv.lastChild.html()"+leftdiv.contents().find("#l_0_0").html());
      /*  var nom='#radleft_'+0+'_'+datas.idmodule;
        rpnsequence.log("nom: "+nom);
		var myId=$(nom).offset().left;
		rpnsequence.log("myId: "+myId);
	*/	
	/*	var innerInputLeftId="#inputgrpleft_"+i+"_"+datas.idmodule;
                    rpnsequence.log('innerInputgrpleftId: '+innerInputLeftId);
                    rpnsequence.log('contenu de inputgrpleft_: '+ $(innerInputLeftId));
                    //rpnsequence.log('FIREFOX contenu de inputgrpleft_: '+$('#innerInputLeftId').textContent.innerHtml);
                    //targets[i+datas.idmodule]=new Array();
    		        //targets[i+datas.idmodule].push($(targetsName[i]));
	*/	
		$(document).ready(function(){
            
		    for (var i = 0; i < targetsName[datas.idmodule].length; i++) {
		        targets[datas.idmodule].push($(targetsName[datas.idmodule][i]));
		        //rpnsequence.log('targets[datas.idmodule]'+targets[datas.idmodule][i].offset().top);
		    }
          
		    //rpnsequence.log('targetsName'+targetsName[datas.idmodule]);
        	var canvas = new fabric.Canvas('c'+datas.idmodule,{
        		hoverCursor:'pointer',
        		selection: false
        	});

        	if(nbleft>nbright){
        	    nbbezier=nbright;
        	}
        	//rpnsequence.log("nbleft"+nbleft);
        	//rpnsequence.log("nbright"+nbright);
        	//rpnsequence.log("nbbezier"+nbbezier);
        	for (var i=0;i<nbbezier;i++){
        	    if(nbleft<nbright){
        	        var myTop=$('#inputgrpright_0_'+datas.idmodule).offset().top+i*40;
        	    }else{
        	        var myTop=$('#inputgrpleft_0_'+datas.idmodule).offset().top+i*40;
        	    }
                var myLeft=0.8*$('#centerdiv_'+datas.idmodule).offset().left;
                //rpnsequence.log('idmodule'+datas.idmodule);
                //rpnsequence.log('id bezier'+(i+10*datas.idmodule));
                //rpnsequence.log('myTop'+myTop);
                //rpnsequence.log('myTop'+myLeft);
                //var myId=i+datas.idmodule;
                //rpnsequence.log('datas.idmodule: '+datas.idmodule);
                //rpnsequence.log('targets[datas.idmodule]'+targets[datas.idmodule][i].offset().top);
                //rpnsequence.log('targets[datas.idmodule]'+targets[datas.idmodule][i+nbleft].offset().top);
                bezier[i+10*datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],myCanvas);
                //bezier[datas.idmodule].push(new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],myCanvas));
        	    //bezier[i]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[datas.idmodule],myCanvas);
        	    //bezier[i+datas.idmodule]=new Bezier(canvas,myLeft,myTop,myLeft+100,myTop,myLeft+100,myTop,myLeft,myTop,availableColors[i],targets[i+datas.idmodule],$('.canvas-container'));
        	    /*bezier=$.grep(bezier, function(n,i){  
                  return n =='';  
                },true); 
        	    rpnsequence.log('bezier: '+bezier);
        	    rpnsequence.log('bezier.length: '+bezier.length);*/
        	}
		});
        
    };
    //var validate = function(){
    var validate = function(){
        var k=0;
        //rpnsequence.log('L_items: '+L_items)
         $.each(bezier, function(idx) {
             //rpnsequence.log('L_items[0][0]: '+L_items[0][0])
             var myid=k+10*datas.idmodule;
             //var myid=k;
             //var myid=idx;
             //rpnsequence.log('myid (k+10*datas.idmodule): '+myid);
             //rpnsequence.log('bezier[myid].target: '+bezier[myid].target)
            //rpnsequence.log('bezier[myid].target[1]: '+bezier[myid].target[1])
             //rpnsequence.log('bezier[myid].target[1][0]: '+bezier[myid].target[1][0])
             //rpnsequence.log('L_items[bezier[myid].target[1][0]]: '+L_items[bezier[myid].target[1][0]])
             //rpnsequence.log('L_items[bezier[myid].target[1][0]][0]: '+L_items[bezier[myid].target[1][0]][0])
             if(bezier[myid] && bezier[myid].target[0]!=-3 && bezier[myid].target[1]!=-3){
                 //rpnsequence.log('bezier[myid].target[1][0]: '+bezier[myid].target[1][0])
                 //rpnsequence.log('L_items: '+L_items[bezier[myid].target[0][0]][0])
                 //rpnsequence.log('R_items: '+R_items[bezier[myid].target[1][0]][0])
                 state[idx].response =[L_items[bezier[myid].target[0][0]][0],R_items[bezier[myid].target[1][0]][0]];
               /* //state[idx].response =bezier[myid].target;
                if (L_items[bezier[myid].target[0][0]][0]<=R_items[bezier[myid].target[1][0]][0]){
                    rpnsequence.log('normal')
                    state[idx].response =[L_items[bezier[myid].target[0][0]][0],R_items[bezier[myid].target[1][0]][0]];
                }else{
                    rpnsequence.log('inversé')
                    //state[idx].response =[bezier[myid].target[1][0],bezier[myid].target[0][0]];
                    state[idx].response =[L_items[bezier[myid].target[1][0]][0],R_items[bezier[myid].target[0][0]][0]];
                }*/
                state[idx].positionLX =bezier[myid].fromX;
                state[idx].positionLY =bezier[myid].fromY;
                state[idx].positionRX =bezier[myid].toX;
                state[idx].positionRY =bezier[myid].toY;
                //rpnsequence.log('reponse: '+state[idx].response)
                k++;
             }
        });
        rpnsequence.handleEndOfModule(state);
        
    };
    
    
    //var score = function(sol) {
    //}
    var score = function(sol) {
      /*rpnsequence.log('sol.length'+sol.length)
      rpnsequence.log('sol'+sol)
      
      rpnsequence.log('state.length'+state.length)
      rpnsequence.log('state'+state)
      
      rpnsequence.log('bezier.length'+bezier.length)
      rpnsequence.log('bezier'+bezier)
      
      rpnsequence.log('index depart'+(10*datas.idmodule))
      */
      score = 0;
      for (i=10*datas.idmodule;i<bezier.length;i++){
          for (j=0;j<sol.length;j++){
              if(state[i-10*datas.idmodule].response!=null){
                //rpnsequence.log('item: '+sol[j]);
                //rpnsequence.log('item: '+sol[j][0]);
                //rpnsequence.log('item: '+sol[j][1]);
                //rpnsequence.log('state[j].reponse: '+state[i-10*datas.idmodule].response);
                //rpnsequence.log('state[j].reponse: '+state[i-10*datas.idmodule].response[0]);
                //rpnsequence.log('state[j].reponse: '+state[i-10*datas.idmodule].response[1]);
               /* if(state[i-10*datas.idmodule].response[0]==sol[j][0]){
                    rpnsequence.log('egalite')
                }else{
                    rpnsequence.log('pas egal')
                }*/
                //score+=(state[i-10*datas.idmodule].reponse==sol[j]?1:0);
                score+=(state[i-10*datas.idmodule].response[0]==sol[j][0]&&state[i-10*datas.idmodule].response[1]==sol[j][1]?1:0);
                //score+=(_.findWhere(state).response==sol[i]?1:0);
              }
          }
      }
       // rpnsequence.log('bezier.target'+bezier[1].target)
        
     /*   _.each(sol, function(item){
            //rpnsequence.log('ida num sol'+ida)
             //rpnsequence.log('item sol'+item)
             var c2=0;
             rpnsequence.log('bezier.length'+bezier.length)
            _.each(bezier, function(itemb, idx) {
                rpnsequence.log(c2)
                //rpnsequence.log('idx: num bez'+idx)
                //rpnsequence.log('item bez: '+itemb)
               // rpnsequence.log('sol[ida]'+sol)
                //rpnsequence.log('bezier[idx].target'+bezier[idx].target);
                //rpnsequence.log('bezier[idx].target[datas.idmodule][0]: '+bezier[idx].target[datas.idmodule][ida]);
                //rpnsequence.log('bezier[idx].target[datas.idmodule][1]: '+sol[ida][0]);
                //var idContentL="#l_"+bezier[idx].target[0];
                //var idContentR="#r_"+bezier[idx].target[1];
               //rpnsequence.log('idContentL: '+idContentL);
               //rpnsequence.log('idContentR: '+idContentR);
               //rpnsequence.log('')
                //rpnsequence.log('leftdiv.contents().find(idContentL).html(): '+leftdiv.contents().find(idContentL).html());
                //rpnsequence.log('sol[ida][0]: '+sol[ida][0]);
                //rpnsequence.log('')
                //rpnsequence.log('rightdiv.contents().find(idContentR).html(): '+rightdiv.contents().find(idContentR).html())
                //rpnsequence.log('sol[ida][1]: '+sol[ida][1])
                //rpnsequence.log('')
                if(leftdiv.contents().find(idContentL).html()==sol[ida][0]){
                    rpnsequence.log('bezier'+idx+'gauche egal solution gauche');
                    if(rightdiv.contents().find(idContentR).html()==sol[ida][1]){
                       rpnsequence.log('bezier'+idx+'droite egal aussi solution droite, on ajoute 1 au score');
                       score++;
                    }
                    
                }
                else if(rightdiv.contents().find(idContentR).html()==sol[ida][0]){
                    rpnsequence.log('bezier'+idx+'droite egal solution gauche');
                    if(leftdiv.contents().find(idContentL).html()==sol[ida][1]){
                        rpnsequence.log('bezier'+idx+'gauche egal aussi solution droite, on ajoute 1 au score');
                       score++;
                    }
                }else{
                    rpnsequence.log('bezier'+idx+'aucune égalié/////////////////////////////////////////////////////////');
                       score=1000+score;
                }
                
                //rpnsequence.log('bezier[idx].target'+bezier[idx].target);
                //rpnsequence.log('bezier[idx].target[datas.idmodule]'+bezier[idx].target[datas.idmodule]);
                //rpnsequence.log('bezier[idx].target[0]: '+bezier[idx].target[0][0]);
                //if (typeof bezier[idx] !== 'undefined' &&
                        //typeof L_items[bezier[idx].target[0][0]] !== 'undefined' &&
                        //typeof R_items[bezier[idx].target[1][0]] !== 'undefined' &&
                        //typeof R_items[bezier[idx].target[0][0]] !== 'undefined' &&
                        //typeof L_items[bezier[idx].target[1][0]] !== 'undefined' ){
                //rpnsequence.log('');
                //rpnsequence.log('sol[ida][0]: '+sol[ida][0]);
                //rpnsequence.log('');
                //rpnsequence.log('bezier[idx].target[datas.idmodule][1]: '+bezier[idx].target[1][0]);
                //rpnsequence.log('sol[ida][1]: '+sol[ida][1]);
                
                //rpnsequence.log('L_items[bezier[idx].target[0][0]][0]: '+L_items[bezier[idx].target[0][0]][0]);
                //rpnsequence.log('R_items[bezier[idx].target[1][0]][0]: '+R_items[bezier[idx].target[1][0]][0]);
                //rpnsequence.log('R_items[bezier[idx].target[0][0]][0]: '+R_items[bezier[idx].target[0][0]][0]);
                //rpnsequence.log('L_items[bezier[idx].target[1][0]][0]: '+L_items[bezier[idx].target[1][0]][0]);
                //rpnsequence.log('');
                //}
                //score+=(((leftdiv.contents().find(idContentL).html()==sol[ida][0]&&rightdiv.contents().find(idContentR).html()==sol[ida][1])||(rightdiv.contents().find(idContentR).html()==sol[ida][0]&&leftdiv.contents().find(idContentL).html()==sol[ida][1]))?1:0);
                score+=(
                        (
                            (typeof bezier[idx] !== 'undefined' &&
                            typeof L_items[bezier[idx].target[0][0]] !== 'undefined' &&
                            typeof R_items[bezier[idx].target[1][0]] !== 'undefined' &&
                            typeof R_items[bezier[idx].target[0][0]] !== 'undefined' &&
                            typeof L_items[bezier[idx].target[1][0]] !== 'undefined' ) &&
                        (
                            (L_items[state[idx][0]][0]==sol[ida][0] && R_items[bezier[idx].target[1][0]][0]==sol[ida][1])||
                            (L_items[state[idx][1]][0]==sol[ida][0] && R_items[bezier[idx].target[0][0]][0]==sol[ida][1])
                            //(L_items[bezier[idx].target[0][0]][0]==sol[ida][0] && R_items[bezier[idx].target[1][0]][0]==sol[ida][1])||
                            //(L_items[bezier[idx].target[1][0]][0]==sol[ida][0] && R_items[bezier[idx].target[0][0]][0]==sol[ida][1])
                        )
                    )?1:0);
                    rpnsequence.log('item: '+item)
                    rpnsequence.log('_.findWhere(state).response: '+_.findWhere(state).response)
                    score+=(_.findWhere(state).response==item?1:0);
                    c2++;
               //score++;
               
              
            });
            c1++;
        }); */
        rpnsequence.log('score intermédiaire: '+score)
        //rpnsequence.log('score: '+score);
       // bonjour=test();
        return score;
    };
    
    return {
        init:init,
        validate:validate,
        score:score
    };

};