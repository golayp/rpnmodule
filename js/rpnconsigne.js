var rpnconsigne = (function() {
    var thisscore;
    var analyseeachmod = function(){
        document.addEventListener('click', displayResponse);function displayResponse() {var myresponse=rpnsequence.modulesresponse();if(myresponse){document.getElementById('rep3').innerHTML ='module 1:'+myresponse}};
     return {
        analyseeachmod: analyseeachmod
    };
})();