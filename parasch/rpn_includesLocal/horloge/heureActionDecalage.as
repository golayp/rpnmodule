/**
 * ...
 * @author J-M.Luthi
 */
_level0.retour = "Tout est faux, tu n'as encore rien rempli!";
var positionS:Array = new Array();
var maDestination1:String = "Départ";
var fuseau1:Number = 0;
var fuseau2:Number = 0;
//trace ("maDestination1: " + maDestination1);
var maDestination2:String = "Arrivée";
//trace ("maDestination2: " + maDestination2);
/*var decala1H:Number = decalage[0][0];
var decala2H:Number = decalage[0][1];
var decala1M:Number = decalage[0][0];
var decala2M:Number = decalage[0][1];*/

var decala1H:Number = 0;
var decala2H:Number = 0;
var decala1M:Number = 0;
var decala2M:Number = 0;
var decaH:Number;
var decaM:Number;

var reponse:Array = new Array();
//trace("temps de vol"+tempsVol0)
//fondMc.tempsDeVol.text = "Temps de vol:" +tempsVol[fuseau1][fuseau2][0] + "h " + tempsVol[fuseau1][fuseau2][1] + "min";
fondMc.tempsDeVol.text = "Temps de vol:" +0 + "h " + 0 + "min";
// Lorsque le curseur de la souris se déplace dans le fichier SWF, 

fondMc.onEnterFrame=function(){
//mouseListener.onMouseMove = function() {
	
	if (maDestination1 != mesDestinationsDep[monDep]) {
		//trace("ma desination1")
		fuseau1 = fuseauHoraire(mesDestinationsDep[monDep]);
		decala1H = decalage[fuseau1][0];
		decala1M = decalage[fuseau1][1];
		maDestination1 = mesDestinationsDep[monDep];
		
	}
	if (maDestination2 != mesDestinationsArr[monArr]) {
		//trace("ma desination2")
		fuseau2  = fuseauHoraire2(mesDestinationsArr[monArr]);
		decala2H = decalage[fuseau2][0];
		decala2M = decalage[fuseau2][1];
		maDestination2 = mesDestinationsDep[monArr];
		
	}
	
	decaH = decala2H - decala1H;
	decaM = decala2M - decala1M;
	
	maMontre.heureATrouver = decaH;
	maMontre.minuteATrouver = decaM;
	if (decaH > 0) {
		if (decaM == -30) {
			if (decaH<0){
				fondMc.decalageHoraire.text = "Décalage horaire: +" + (decaH) + "h " + "30min";
				decaM = -30;
				decaH = decaH;
			}else {
				fondMc.decalageHoraire.text = "Décalage horaire: +" + (decaH - 1) + "h " + "30min";
				decaM = -30;
				decaH = decaH-1;
			}
		}else if (decaM == 60) {
			if (decaH<0){
				fondMc.decalageHoraire.text = "Décalage horaire: +" + (decaH - 1) + "h";
				decaM = 0;
				decaH = decaH-1;
			}else {
				fondMc.decalageHoraire.text = "Décalage horaire: +" + (decaH + 1) + "h";
				decaM = 0;
				decaH = decaH+1;
			}
		}else if (decaM == 0){
			fondMc.decalageHoraire.text = "Décalage horaire: +" + (decaH) + "h ";
			decaM = 0;
			decaH = decaH;
		}else {
			fondMc.decalageHoraire.text = "Décalage horaire: +" + (decaH) + "h " + (decaM) + "min";
			decaM = decaM;
			decaH = decaH;
		}
	}else {
	

		if (decaM == -30) {
			if (decaH<0){
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decaH) + "h " + "30min";
				decaM = -30;
				decaH = decaH;
			}else {
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decaH - 1) + "h " + "30min";
				decaM = -30;
				decaH = decaH-1;
			}
		}else if (decaM == 60) {
			if (decaH<0){
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decaH - 1) + "h";
				decaM = 0;
				decaH = decaH-1;
			}else {
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decaH + 1) + "h";
				decaM = 0;
				decaH = decaH+1;
			}
		}else if (decaM == 0){
			fondMc.decalageHoraire.text = "Décalage horaire: " + (decaH) + "h ";
			decaM = 0;
			decaH = decaH;
		}else {
			fondMc.decalageHoraire.text = "Décalage horaire: " + (decaH) + "h " + (decaM) + "min";
			decaM = decaM;
			decaH = decaH;
		}
	}
	fondMc.tempsDeVol.text = "Temps de vol:" +tempsVol[fuseau1][fuseau2][0] + "h " + tempsVol[fuseau1][fuseau2][1] + "min";
	
	//trace("_level0.rep_juste" + _level0.rep_juste)
	//trace("heures"+fondMc.reponseH.text)
	
	positionS[0] = _xmouse;
	positionS[1] = _ymouse;
	maMontre.comportement(posCentre[0], posCentre[1], positionS);
	//maMontre2.comportement(posCentre2[0], posCentre2[1], positionS);
	//if(tempsVol[fuseau1][fuseau2][1] !=0 && tempsVol[fuseau1][fuseau2][0] != 0){
	//	_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decaM, decaH, 0, 0);
	//}
	//maMontre.reponse = _level0.rep_juste;
}
fondMc.reponseH.onChanged = function() {
	_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decaM, decaH, 0, 0);
	maMontre.reponse = _level0.rep_juste;
	//actionSolution();
}
fondMc.reponseM.onChanged = function() {
	_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decaM, decaH, 0, 0);
	maMontre.reponse = _level0.rep_juste;
}

function fuseauHoraire(choix):Number {
	var position:Number;
	var retour:Number;
	for (i = 0; i < mesDestinationsDep.length; i++){
		if (choix == mesDestinationsDep[i]) {
			position = i;
			retour = i;
			//maMontre.setTimeDecalage(decalage[position][0], decalage[position][1]);
		}
	}
	//trace("retourfh: "+retour)
	return retour;
}

function fuseauHoraire2(choix):Number {
	var position:Number;
	var retour:Number;
	for (i = 0; i < mesDestinationsArr.length; i++){
		if (choix == mesDestinationsArr[i]) {
			position = i;
			retour = i;
			//maMontre2.setTimeDecalage(decalage[position][0], decalage[position][1]);
		}
	}
	//trace("retourfh2: "+retour)
	return retour;
}

function analyse(min:Number, h:Number,monDecalageM:Number, mondecalageH:Number, monTempsM:Number,monTempsH:Number):Boolean {
	var minArr:Number = (maMontre.minDep + monDecalageM ) % 60;
	var hArr:Number = (maMontre.heureDep + mondecalageH + Math.floor((maMinute + monDecalageM) / 60)) % 24;
	var monRetour:Boolean = false;
	reponse[0] = minArr;
	reponse[1] = hArr;
	trace("maMinute" + maMontre.minDep)
	trace("monHeure" + maMontre.heureDep)
	trace("monDecalageM" + monDecalageM)
	trace("monDecalageH" + monDecalageH)
	trace("monTempsM" + monTempsM)
	trace("monTempsH" + monTempsH)
	trace("min" + min)
	trace("h" + h)
	trace("minArr" + minArr)
	trace("hArr" + hArr)

	//_level0.retour = reponse[1] + "h " + reponse[0] + "min";
	switch(true) {
		case (minArr == min && hArr == h):
			monRetour = true;
			//fondMc.felicitation._visible = true;
			//actionSolution();
			_level0.retour = "Bravo, il est bien \n "+hArr+"h "+minArr+"min.";
			break;
		case (minArr == min && hArr != h):
			_level0.retour = "Les heures sont fausses";
			//trace("les heures sont fausses")
			fondMc.felicitation._visible = false;
			break;
		case (minArr != min && hArr == h):
			_level0.retour = "Les minutes sont fausses";
			//trace("les minutes sont fausses")
			fondMc.felicitation._visible = false;
			break;
		default:
			//trace("default")
			_level0.retour = "Les heures et les minutes sont fausses.";
			fondMc.felicitation._visible = false;
			break;
	}
	trace("_level0.retour"+_level0.retour)
	return monRetour;
}

//actionSolution();
//maMontre.setTimeSol(2, 57);

function actionSolution() {
	trace("decaH"+decaH)
	trace("maMontre.heureDep + decaH" +(maMontre.heureDep + decaH) )
	trace("maMontre.minDep + decaM" +Number(maMontre.minDep) + decaM )
	delete fondMc.onEnterFrame;
	fondMc.reponseH.text = maMontre.heureDep + decaH;
	fondMc.reponseM.text = maMontre.minDep + decaM;
	maMontre.angleHeureMin = maMontre.heureAngleDeg(maMontre.heureDep + decaH, maMontre.minDep + decaM);//heureAngleDeg retourne l'angle en degres depuis le nord
	trace("angle heure min: "+maMontre.angleHeureMin)
	maMontre.angleValeurH = maMontre.angleHeureMin[0];//angle des Heures
	maMontre.angleValeurM = maMontre.angleHeureMin[1];//angle des minutes
	maMontre.posDep = maMontre.premiereBranche(maMontre.tailleAiguille, maMontre.posX, maMontre.posY, maMontre.angleValeurM, 5, 0x00000);//Aiguille des minutes
	maMontre.posArr = maMontre.deuxiemeBranche(maMontre.tailleAiguille, maMontre.posX, maMontre.posY, maMontre.angleValeurH, 5, 0x0ffff);//aiguille des heures
}