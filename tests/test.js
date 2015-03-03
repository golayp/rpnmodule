require.config({
    "baseUrl": "../../js",
    "shim" : {
        "bootstrap" : { "deps" :['jquery'] },
        "ext/jquery-sortable":{ "deps" :['jquery'] },
        "ext/rangyinputs-jquery-src":{ "deps" :['jquery'] },
        "ext/jquery-disableSelection":{ "deps" :['jquery'] },
        "ext/jquery.maphilight":{ "deps" :['jquery'] },
        "ext/fabric":{ "deps" :['jquery'] },
        //"ext/MathJax/mathjax":{ "deps" :['jquery'] }
    },
    
    "paths": {
        "jquery": "https://code.jquery.com/jquery-2.1.1",
        "bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min",
        "swfobject":"//cdnjs.cloudflare.com/ajax/libs/swfobject/2.2/swfobject",
        "underscore":"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore",
        "less":"//cdnjs.cloudflare.com/ajax/libs/less.js/2.1.0/less.min",
        "mathjax":"https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMM"
    }
});

require(['jquery','bootstrap','swfobject','underscore','less','mathjax','ext/jquery-sortable','ext/rangyinputs-jquery-src','ext/jquery-disableSelection','ext/jquery.maphilight','ext/fabric','ext/MathJax/mathjax','rpnsequence','rpnblackbox','rpncardmaze','rpnclock','rpndragdropsorting','rpngapfull','rpngapsimple','rpnmarker','rpnmqc','rpndropdown','rpnsorting','rpntwolists'], function($) {
    $(document).ready(function(){
        rpnsequence.init({
            debug:true,
            disablestateloading:true,
            mediapathformatter:function(url){
                return '../../tests/medias/'+url;
            },
            navigationEnabled:true
        });
    });    
});


