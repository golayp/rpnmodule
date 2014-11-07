$(document).ready(function(){
    RpnModule.init({});
});

var RpnModule = (function () {

    var currentmod;
    var mainContent;

    var init = function (opts) {
        _.defaults(opts,{modurl:"mod.json",solurl:"sol.json",mediaurl:"medias"});
        $.getJSON(opts.modurl,function(datas){
            currentmod=datas;
            buildUi();
        });
    };

    var buildUi = function () {
        $('body').html('<div class="container"><div class="row"><div class="col-md-12"><h1 id="sequenceTitle"><i class="edicons-visualidentity-rpn d2"></i> Test</h1><div class="panel panel-primary"><div class="panel-body"><div class="pull-right"><button class="btn btn-link" id="recallLink" data-toggle="modal" data-target="#recallModal">Rappel</button> <button class="btn btn-link"  id="orderLink" data-toggle="modal" data-target="#orderModal">Consigne</button></div><h2 id="moduleTitle"></h2><h3 id="moduleContext"></h3><h4 id="moduleDirective"></h4><div id="mainContent"></div></div></div></div></div></div>');
        $('body').append($('<div id="recallModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Rappel</h4></div><div class="modal-body" id="recallModalContent"></div></div></div></div>'));
        $('body').append($('<div id="orderModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Consignes</h4></div><div class="modal-body" id="orderModalContent"></div></div></div></div>'));
        $('#sequenceTitle').html('<i class="edicons-visualidentity-rpn"></i> Sequence title');
        mainContent=$('#mainContent');
        displayCurrentModule();
    };

    var displayCurrentModule=function(){
        mainContent.empty();
        $('#moduleTitle').text(currentmod.title);
        $('#moduleContext').text(currentmod.context);
        $('#moduleDirective').text(currentmod.directive);
        if(currentmod.type=='marker'){
            RpnMarkerModule.init(currentmod,mainContent);
        }

    };

    return {
        init:init,
        buildUi:buildUi
    };

})();


var RpnMarkerModule = (function() {
    var datas;
    var domelem;
    var selectedMarker;
    var init = function(_datas,_domelem){
        datas=_datas;
        domelem=_domelem;
        selectedMarker=-1;
        buildUi();
        bindUiEvents();
    };

    var buildUi = function (){
        //build marker toolbar
        var toolbar=$('<div>',{'class':'btn-group'});
        var availableColors=_.shuffle(['primary','success','info','warning','danger']);
        toolbar.append($('<button class="btn btn-default"><i class="glyphicon glyphicon-pencil"></i> Effaceur</button>').click(function(){
                selectedMarker=-1;
        }));
        $.each(datas.markers,function(idx,marker){
            toolbar.append($('<button class="btn btn-'+(availableColors[idx]||'default')+'"><i class="glyphicon glyphicon-pencil"></i> '+marker.label+'</button>').click(function(){
                selectedMarker=marker.val;
            }));
        });
        domelem.append(toolbar);

        //build panel with sentences
        domelem.append($('<div id="sentences" class="lead">'+datas.tomark+'</div>'));
        $.each($('#sentences b'),function(idx,tomark){
            var t=$(tomark);
            t.addClass('label label-default');
            t.css('cursor','pointer').click(function(){
                t.removeClass();
                if(selectedMarker!=-1){
                    t.addClass('label label-'+availableColors[selectedMarker]);
                }else{
                    t.addClass('label label-default');
                }

            });

        });

    };

    return {
        init:init
    };

})();
