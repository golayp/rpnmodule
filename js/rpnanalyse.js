var rpnanalyse = (function() {
    var thisscore;
    var fouroperation = function(thisrndval,thisstate,thissol,thisidx,thisscore){
        var mythissol=NaN;
                if (thissol[thisidx].indexOf('+')>-1){
                    
                    var n1=Number(thissol[thisidx].split('+')[0].split('[')[1].slice(0,thissol[thisidx].split('+')[0].split('[')[1].length-1));
                    var n2=Number(thissol[thisidx].split('+')[1].split('[')[1].slice(0,thissol[thisidx].split('+')[1].split('[')[1].length-1));
                    mythissol=thisrndval[n1]+thisrndval[n2];
                    rpnsequence.log('+ mythissol: '+mythissol+' thisstate[thisidx]: '+thisstate[thisidx])
                }
                if (thissol[thisidx].indexOf('-')>-1){
                    
                    var n1=Number(thissol[thisidx].split('-')[0].split('[')[1].slice(0,thissol[thisidx].split('-')[0].split('[')[1].length-1));
                    var n2=Number(thissol[thisidx].split('-')[1].split('[')[1].slice(0,thissol[thisidx].split('-')[1].split('[')[1].length-1));
                    mythissol=thisrndval[n1]-thisrndval[n2];
                    rpnsequence.log('- mythissol: '+mythissol+' thisstate[thisidx]: '+thisstate[thisidx])
                }
                if (thissol[thisidx].indexOf('*')>-1){
                    
                    var n1=Number(thissol[thisidx].split('*')[0].split('[')[1].slice(0,thissol[thisidx].split('*')[0].split('[')[1].length-1));
                    var n2=Number(thissol[thisidx].split('*')[1].split('[')[1].slice(0,thissol[thisidx].split('*')[1].split('[')[1].length-1));
                    mythissol=thisrndval[n1]*thisrndval[n2];
                    rpnsequence.log('* mythissol: '+mythissol+' thisstate[thisidx]: '+thisstate[thisidx])
                }
                if (thissol[thisidx].indexOf('/')>-1){
                    
                    var n1=Number(thissol[thisidx].split('/')[0].split('[')[1].slice(0,thissol[thisidx].split('/')[0].split('[')[1].length-1));
                    var n2=Number(thissol[thisidx].split('/')[1].split('[')[1].slice(0,thissol[thisidx].split('/')[1].split('[')[1].length-1));
                    mythissol=Math.floor(thisrndval[n1]/thisrndval[n2]);
                    rpnsequence.log('/ mythissol: '+mythissol+' thisstate[thisidx]: '+thisstate[thisidx])
                }
                if (mythissol==thisstate[thisidx]){
                    thisscore++;
                    rpnsequence.log('+1')
                }
        return thisscore;//on remonte le score
    }
     return {
         
        fouroperation: fouroperation
    };
})();
