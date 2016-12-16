/*var tempsSecondes:Number = 0;

function chronoStart() {
	Temps = getTimer();
	onEnterFrame = deroulement;
}
 
function deroulement() {
	var TotalMilli = getTimer()-Temps;
	//var MS = TotalMilli%1000;
	//var S = Math.floor(TotalMilli/1000)%60;
	//var M = Math.floor(TotalMilli/60000)%60;
	//_level0.Texte.text = M+":"+S+":"+MS;
	tempsSecondes = Math.floor(TotalMilli/1000);
}
 
function chronoStop():Number
{
	delete onEnterFrame;
	var TotalMilli = getTimer()-Temps;
	var TempsEcoule = getTimer()-Temps;
	tempsSecondes = Math.floor(TotalMilli/1000);
	//return TempsEcoule;
	return (tempsSecondes);
}

chronoStart();*/
