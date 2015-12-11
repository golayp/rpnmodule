less = {
    async: true
};
require.config({
    "baseUrl": "../../js",
    "shim" : {
        "bootstrap" : { "deps" :['jquery'] },
        "ext/jquery-ui": { "deps" :['jquery'] },
        "ext/jquery.maphilight":{ "deps" :['jquery'] },
        "ext/jquery-disableSelection":{ "deps" :['jquery'] }
    },
    
    "paths": {
        "jquery": "https://code.jquery.com/jquery-2.1.3",
        "bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min",
        "underscore":"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore",
        "less":"//cdnjs.cloudflare.com/ajax/libs/less.js/2.1.0/less.min",
        "fabric":"//cdnjs.cloudflare.com/ajax/libs/fabric.js/1.5.0/fabric.min"
    }
});

require([
    'jquery',
    'bootstrap',
    'underscore',
    'less',
    'fabric',
    'ext/jquery-disableSelection',
    'ext/jquery.maphilight',
    'ext/jquery-ui','rpnsequence',
    'rpnblackbox',
    'rpncardmaze',
    'rpnclock',
    'rpndragdropsorting',
    'rpngapfull',
    'rpngapsimple',
    'rpnmarker',
    'rpnmqc',
    'rpndropdown',
    'rpnsorting',
    'rpntwolists'
    ], function($) {
    $(document).ready(function(){
        rpnsequence.init({
            debug:true,
            disablestateloading:true,
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



