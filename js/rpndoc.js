//doc
var rpndocmodule = function() {

    var datas;
    var domelem;
    var state;
    var object;

    var init = function(_datas,_state, _domelem) {
        _.defaults(_datas, {
            tofill: "tofill not set!<b>Read</b> documentation please!"
        });

        datas = _datas;
        object= !_.isUndefined(_datas.object);
        embed = !_.isUndefined(_datas.embed);
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
        domelem.addClass('doc');
        var doc = $('<div class="doc">');
        var objectType = (_.isUndefined(datas.object)||_.isUndefined(datas.object.type))?"":datas.object.type;
        var objectWidth = (_.isUndefined(datas.object)||_.isUndefined(datas.object.width))?"width=\"100%\"":"width=" + datas.object.width;
        var objectHeight = (_.isUndefined(datas.object)||_.isUndefined(datas.object.height))?"height=\"70%\"":"height=" + datas.object.height;
        var objectStyle = (_.isUndefined(datas.object)||_.isUndefined(datas.object.style))?"":"style=" + datas.object.style;
        var objectAttribut = (_.isUndefined(datas.object)||_.isUndefined(datas.object.attribut))?"":datas.object.attribut;
        var object = $('<'+objectType+' src="'+datas.object.url+'" '+objectWidth+' '+objectHeight+' '+objectStyle+' '+objectAttribut+' ></'+objectType+'>');
        
        doc.append(object);
        domelem.append(doc);
        
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