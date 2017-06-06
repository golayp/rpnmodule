//egga
var rpneggamodule = function() {
    var datas;
    var domelem;
    var swf;
    var init = function(_datas, _state, _domelem) {
        _.defaults(_datas, {
           swf:"",
           nom:displayName,
           id_eleve:cwid
        });
        datas = _datas;
        domelem = _domelem;
        swf=datas.swf;
        buildUi();
    };

    var buildUi = function() {
        domelem.addClass('egga');
        bindUiEvents();
    };

    var bindUiEvents = function() {
        swfobject.embedSWF('/medias/'+datas.swf, 'myAlternativeContent', '100%', '100%', '10.0.0', false, {
            id_eleve : datas.id_eleve,
            volume_sonore : '0.9',
            level_eleve : '1',
            nom_eleve : datas.nom
        }, {}, {});
    };

    

   
    
    return {
        init: init
    };

};
