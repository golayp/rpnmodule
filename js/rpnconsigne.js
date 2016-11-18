var rpnconsigne = (function() {
    var thisscore;
    var varaleaarray=new Array();
    var analyseeachmod = function(){
        document.addEventListener('click', displayResponse);
    }
    var displayResponse = function() {
        var myresponse=rpnsequence.modulesresponse();
        if(myresponse){
            document.getElementById('rep3').innerHTML ='module 1:'+myresponse;
        }
    }   
        //Si on veut de l'aléatoire'
    var alea = function(valalea){
        for(var i=0;i<valalea[2];i++){
            varaleaarray[i]=valalea[0]+Math.floor(Math.random()*valalea[1]);
        }
        return varaleaarray;
    }
        
     return {
        analyseeachmod: analyseeachmod,
        alea:alea
    };
        
})();