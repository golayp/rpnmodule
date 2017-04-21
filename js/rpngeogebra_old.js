//doc
var rpngeogebramodule = function() {

    var datas;
    var domelem;
    var state;
    var object;

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
            state={
                seen : ''
            };
        }
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('geogebraint');
        var geogebraint = $('<div class="geogebraint">');
        var objectType = (_.isUndefined(datas.object)||_.isUndefined(datas.object.type))?"":datas.object.type;
        var objectWidth = (_.isUndefined(datas.object)||_.isUndefined(datas.object.width))?"":"width=100%";
        var objectHeight = (_.isUndefined(datas.object)||_.isUndefined(datas.object.height))?"":"height=100%";
     /*   var objectStyle = (_.isUndefined(datas.object)||_.isUndefined(datas.object.style))?"":"style=" + datas.object.style;
        var objectAttribut = (_.isUndefined(datas.object)||_.isUndefined(datas.object.attribut))?"":datas.object.attribut;
        //var object = $('<'+objectType+' src="'+datas.object.url+'" '+objectWidth+' '+objectHeight+' '+objectStyle+' '+objectAttribut+' ></'+objectType+'>');
        */
        var object = $('<script src="'+datas.object.media+' ></script>');
        var applet_container=$("DIV id='applet_container1'></DIV>");
        var buttons=$('<p>'+datas.object.question+'</p>');
         $.each(datas.buttons, function(idx, buttons) {
             if(buttons[0]=="Montre"){
                //on mettra setVisible true
             }else if(buttons[0]=="Cache"){
                 //on mettra setVisible false
             }
             var point=buttons[1];
                var input=$('<span class="draggable ori" val="'+idx+'" >'+filler+'</span> ').draggable({
                    revert: "invalid",
                    appendTo: domelem,
                    helper: "clone",
                    snap: true,
                    snapMode: 'inner'
                });
                toolbar.append(draggable);
                maxwidth=maxwidth<draggable.width()?draggable.width():maxwidth;
            });
   /*   <FORM><INPUT onclick="document.ggbApplet.setVisible('A', false);" type="button" value="Hide A"> 
      <INPUT onclick="document.ggbApplet.setVisible('A', true);" type="button" value="Show A"> 
      <INPUT onclick="document.ggbApplet.setColor('A', 255, 0, 0);" type="button" value="A red"> 
      <INPUT onclick="document.ggbApplet.setColor('A', 0, 0, 255);" type="button" value="A blue"> 
      <INPUT onclick="document.ggbApplet.deleteObject('A');" type="button" value="Delete A"> 
      <INPUT onclick="document.ggbApplet.reset();" type="button" value="Reset"> 
      </FORM>
    */    
        geogebraint.append(object);
        domelem.append(geogebraint);
        geogebraint.append(applet_container);
        
        var applet1 = new GGBApplet({material_id: "122728", width:500, height:500}, true);
        window.onload = function() {
                applet1.inject('applet_container1', 'preferHTML5');
            }

        function getCoords(objName) {
          var applet = document.ggbApplet;
          var x = applet.getXcoord(objName);    
          var y = applet.getYcoord(objName);    

          document.coordForm.getXfield.value = x;
          document.coordForm.getYfield.value = y;
        }
        
        
        
        bindUiEvents();
    };

    var bindUiEvents = function() {

    };
    
    var validate = function(){
        state.seen = true;
        return state;
    };
    
   var score = function(sol) {
        var score = 0;
        return score;
    };
    
    return {
        init: init,
        validate: validate,
        score: score
    };

};