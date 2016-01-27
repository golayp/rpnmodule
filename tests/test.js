/*global less*/
less = {
    async: true
};
require.config({
    "baseUrl": "../../js",
    "shim" : {
        "bootstrap" : { "deps" :['jquery'] },
        "ext/jquery-ui": { "deps" :['jquery'] },
        //"ext/jquery.maphilight": { "deps" :['jquery'] },
        "ext/jquery-disableSelection":{ "deps" :['jquery'] }
    },
    "paths": {
        "jquery": "https://code.jquery.com/jquery-2.1.4",
        "bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min",
        "underscore":"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore",
        "jsplumb":"ext/jsPlumb-2.0.4",
        "less":"//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min"
    }
});

require([
    'jquery',
    'bootstrap',
    'underscore',
    'jsplumb',
    'less',
    'ext/jquery-disableSelection',
    'ext/jquery-ui',
    //'ext/jquery.maphilight',
    'rpnsequence',
    'rpnblackbox',
    'rpncardmaze',
    'rpndragdropsorting',
    'rpngapfull',
    'rpngapsimple',
    'rpnmarker',
    //'rpnmap',
    'rpnmqc',
    'rpnplumb',
    'rpndropdown',
    'rpnsorting'
    ], function($) {
    $(document).ready(function(){
        rpnsequence.init({
            debug:true,
            disablestateloading:false,
            testMode:false,
            warnonexit:true,
            onmoduleend:function(states,nextstep){
                console.log('ok');
                nextstep();
            },
            onsequenceend:function(states,score){
                window.location.href='../';
            },
            mediapathformatter:function(url){
                return '../../tests/medias/'+url;
            },
            navigationEnabled:true
        });
    });    
});



