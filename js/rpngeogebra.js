var rpngeogebramodule = function() {

    var datas;
    var domelem;
    var state;
    var object;
    var myApplets=new Array();
    var containerid;
    var a=new Array();
    var b=new Array();
    var pente=new Array();
    var ordOri=new Array();
    

    var init = function(_datas,_state, _domelem) {
        /*_.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });*/

        datas = _datas;
        object= !_.isUndefined(_datas.object);
        domelem = _domelem;
        if(!_.isUndefined(_state) && !_.isNull(_state) && !_.isEmpty(_state)){
            state=_state;
        }
        else{
            state="";
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('geogebraint');
        var signe=function(){
            var S=Math.round(Math.random());
            if(S==0){
                S=1;
            }
            else {
                S=-1;
            }
            return S;
          }
        var containerid="applet_container"+datas.object.idggb;
        var geogebraint = $('<div id="geogebraint'+datas.object.idggb+'" class="geogebraint">');
        var geogebrabuttons = $('<form></form>');
        var geogebracontainer=$("<div id="+containerid+"></div>");
       if(datas.object.kind=="ExpFonctAff"){
          
            a[datas.object.idggb]=signe()*Math.ceil(Math.random()*5);
            b[datas.object.idggb]=signe()*Math.ceil(Math.random()*5);
            if(b[datas.object.idggb]<0){
                var geogebradonnee=$('<p class="expression">$$f: x\\rightarrow y='+a[datas.object.idggb]+'x'+b[datas.object.idggb]+'$$</p>'); 
            }else{
                var geogebradonnee=$('<p class="expression">$$f: x\\rightarrow y='+a[datas.object.idggb]+'x+'+b[datas.object.idggb]+'$$</p>');
            }
            
            //ptA="A";
            //ptB="B";
            geogebraint.append(geogebradonnee);
            geogebraint.append(geogebracontainer);
            //geogebraint.append(myinfos);
            
           var appletid="applet"+datas.object.idggb;
           
           //createGGB(geogebracontainer,geogebraint,datas.object.idggb, datas.object.appliquette, ptB);
            
            var parameters = {"id":containerid, 
                           "prerelease":false,
                           "width":1000,
                           "height":450,
                           "showToolBar":false,
                           "borderColor":null,
                           "showMenuBar":false,
                           "showAlgebraInput":false,
                           "showResetIcon":true,
                           "filename":datas.object.appliquette
                          };
        
        
            myApplets[datas.object.idggb] = new GGBApplet('5.0', parameters);
            myApplets[datas.object.idggb].setJavaCodebase('GeoGebra/Java/5.0');
           var readyStateCheckInterval = setInterval(function() {
                if (document.readyState === "complete") {
                    clearInterval(readyStateCheckInterval);
                    myApplets[datas.object.idggb].inject(geogebracontainer, 'preferHTML5');
                    console.log( "complete!" );
                }
            }, 2000);
          /* $( document ).ready(function() {
                console.log( "ready!" );
               var mylength=document.getElementsByTagName("div");
               for(i=0;i<mylength.length;i++){
                   console.log('div id= '+mylength[i].id)
                   
               }
               console.log("avant"+document.getElementsByTagName("div"));
           });
           
           
           //myApplets[datas.object.idggb].inject(geogebracontainer, 'preferJava');
           
           if (parameters && typeof parameters.appletOnLoad === "function" && typeof renderGGBElement === "function") {
                myApplets[datas.object.idggb].renderGGBElement(article, parameters.appletOnLoad);
               console.log('parmaeters render')
            }else{
               console.log('not render'+typeof parameters.appletOnLoad) 
               console.log('not render 2'+typeof renderGGBElement) 
            }*/
          //var test=myApplets[datas.object.idggb];
          
          
            //geogebrabuttons.append($('</br><form> <input type="button" value="Réinitialiser" onclick="'+containerid+'.reset()"></form>'));
            //geogebrabuttons.append($('<form> <input type="button" value="Afficher les coordonnées de B" onclick="getCoords(ptB,'+containerid+', '+datas.object.idggb+')"><input type="button" value="Cacher A" onclick="'+containerid+'.setVisible(ptA, false)"></form>'));
            
           createbuttons(datas.object.buttons,containerid, datas.object.idggb, geogebrabuttons);
           geogebraint.append(geogebrabuttons);
           geogebraint.append($('<span id="myinfos'+datas.object.idggb+'"></span>'));
           //geogebraint.append($('<span id="myinfos'+datas.object.idggb+'">'+datas.object.idggb+'</span>'));
           //geogebraint.append($('<input type="button" value="setValue(Pente,4)" onclick="'+containerid+'.setValue(\'Pente\',4)">'));
            domelem.append(geogebraint);
           
        }
        
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        //bindUiEvents();
    };

    var bindUiEvents = function() {
        window.alert('bindUiEvents')
    };
    var createbuttons=function(buttonsarray, appletname, id , container){
        var nbbuttons=buttonsarray.length;
        for(i=0;i<nbbuttons;i++){
            if(buttonsarray[i][0]=="getCoords"){
                container.append($('</br><input type="button" value="'+buttonsarray[i][1]+'" onclick="'+buttonsarray[i][0]+'('+buttonsarray[i][2]+','+appletname+','+id+')">'));
            }
            else{
               container.append($('</br><input type="button" value="'+buttonsarray[i][1]+'" onclick="'+appletname+'.'+buttonsarray[i][0]+'('+buttonsarray[i][2]+')">')); 
            }
        }
        
    };
    var createGGB=function(myappletcontainer,mygeogebraint, myid, appletfile, myptB){
        var parameters = {"id":"applet", 
                           "prerelease":false,
                           "width":1000,
                           "height":450,
                           "showToolBar":false,
                           "borderColor":null,
                           "showMenuBar":false,
                           "showAlgebraInput":false,
                           "showResetIcon":true,
                           "filename":appletfile
                          };
        
        //myApplets[myid] = new GGBApplet('5.0', parameters);
        //myApplets[myid].setJavaCodebase('GeoGebra/Java/5.0');
        var applet = new GGBApplet('5.0', parameters);
        applet.setJavaCodebase('GeoGebra/Java/5.0');
            
       var myform=$('<form> <input type="button" value="Réinitialiser" onclick="applet.reset()"></form><form> <input type="button" value="Afficher les coordonnées de B" onclick="getCoords('+myptB+',applet,'+myid+')"><input type="button" value="Cacher A" onclick="applet.setVisible(ptA, false)"></form>');
        mygeogebraint.append(myform);
        applet.inject(myappletcontainer, 'preferHTML5');
    };
    
    getCoords=function(objName, applet, id) { 
        var x = applet.getXcoord(objName);    
        var y = applet.getYcoord(objName);
        var val='('+x+';'+y+')';
        var mytext=$('#myinfos'+id);
        mytext.html(val);
        pente[id]=((applet.getYcoord("A")-applet.getYcoord("B"))/(applet.getXcoord("A")-applet.getXcoord("B")));
            console.log('pente: '+pente[id])
        ordOri[id]=applet.getYcoord("A")-pente[id]*applet.getXcoord("A");
            console.log('ordonnée à l\'Origine: '+ordOri[id])
    }
   var validate = function(){
      /*  $.each($('.rpnm_input', domelem), function(idx, gap) {
            if(isNaN(state[idx].response = $(gap).val().split("'").join(""))==false){
                state[idx].response = $(gap).val().split("'").join("");
            }else{
               state[idx].response = $(gap).val(); 
            }
        });*/
        return state;
    };
    
    var score = function(sol) {
        var score = 0;
        
        _.each(sol, function(val, idx) {
            alert("sol:"+val)
            if(val=="ExpFonctAff_points"){
                if (pente[idx]==a[idx]) {
                    score+=1;
                }
                if (OrdOri[idx]==b[idx]){///OrdOri not defined
                    score+=1;
                }
                alert('score ExpFonctAff_points: '+a[idx]+'x+'+b[idx])
            }else if(val=="ExpFonctAff_cursor"){
                if (pente[idx]==a[idx]) {
                    score+=1;
                }
                if (OrdOri[idx]==b[idx]){
                    score+=1;
                }
               alert('score ExpFonctAff_cursor: '+a[idx]+'x+'+b[idx]) 
            }
        });
        console.log("score:"+score)
        return score;
    };
    var pointmax = function(sol){
        var pointmax = _.flatten(_.toArray(sol)).length;
        
        return pointmax;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};