require.config({
    "baseUrl": "/js",
    "shim" : {
        "bootstrap" : { "deps" :['jquery'] },
        "ext/jquery-sortable":{ "deps" :['jquery'] }
    },
    
    "paths": {
        "jquery": "https://code.jquery.com/jquery-2.1.1",
        "bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min",
        "swfobject":"//cdnjs.cloudflare.com/ajax/libs/swfobject/2.2/swfobject",
        "underscore":"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore",
        "less":"//cdnjs.cloudflare.com/ajax/libs/less.js/2.1.0/less.min"
    }
});

require(['jquery','bootstrap','swfobject','underscore','less','ext/jquery-sortable','rpnsequence','rpnblackbox','rpncardmaze','rpnclock','rpndragdropsorting','rpngapfull','rpngapsimple','rpnmarker','rpnmqc'], function($) {
    $(document).ready(function(){
        rpnsequence.init({
            debug:true,
            mediapathformatter:function(url){
                return '/tests/medias/'+url;
            },
            navigationEnabled:true
        });
    });    
});



