﻿import mx.data.encoders.Num;
/**
 * ...
 * @author J-M.Luthi
 */

var positionS:Array = new Array();
var maDestination1:String = textMenuDefaut1;
var fuseau1:Number = -100;
var fuseau2:Number = -100;
trace ("maDestination1: " + maDestination1);
var maDestination2:String = textMenuDefaut2;
trace ("maDestination2: " + maDestination2);
/*var decala1H:Number = decalage[0][0];
var decala2H:Number = decalage[0][1];
var decala1M:Number = decalage[0][0];
var decala2M:Number = decalage[0][1];*/

var decala1H:Number = 0;
var decala2H:Number = 0;
var decala1M:Number = 0;
var decala2M:Number = 0;

var decalageH:Number = 0;
var decalageM:Number = 0;

fondMc.decalageHoraire.text = "Décalage horaire: " + "0" + "h " + "0min";
fondMc.tempsDeVol.text = "Temps de vol:" +0 + "h " + 0 + "min";

var reponse:Array = new Array();
//trace("temps de vol"+tempsVol0)
//fondMc.tempsDeVol.text = "Temps de vol:" +tempsVol[fuseau1][fuseau2][0] + "h " + tempsVol[fuseau1][fuseau2][1] + "min";
//fondMc.tempsDeVol.text = "Temps de vol: 0h 0min";
// Lorsque le curseur de la souris se déplace dans le fichier SWF, 
_level0.retour = "Tout est faux, tu n'as même pas séléctionnée les lieux de départ et d'arrivée!";
var reglage:Boolean = true;//Variable qui dit qu'on est en train de faire les réglages de la montre2 au départ (heure de départ + décalage)
fondMc.onEnterFrame=function(){
//mouse_level0.listener.onMouseMove = function() {
	
	if (maDestination1 != monMenu1.monRetour) {
		//trace("ma desination1")
		fuseau1 = fuseauHoraire(monMenu1.monRetour);
		decala1H = decalage[fuseau1][0];
		decala1M = decalage[fuseau1][1];
		maDestination1 = monMenu1.monRetour;
		trace ("maDestination1: " + maDestination1);
	}
	if (maDestination2 != monMenu2.monRetour) {
		//trace("ma desination2")
		 fuseau2  = fuseauHoraire2(monMenu2.monRetour);
		decala2H = decalage[fuseau2][0];
		decala2M = decalage[fuseau2][1];
		maDestination2 = monMenu2.monRetour;
		trace ("maDestination2: " + maDestination2);
	}
	
	decalageH = decala2H - decala1H;
	decalageM = decala2M - decala1M;
	
	
	
	if (fuseau1 >= 0 && fuseau2 >= 0){
		if (decalageM == -30) {
			if (decaH<0){
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decalageH) + "h " + "30min";
				decalageM = 30;
				decalageH = decaH;
			}else {
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decalageH - 1) + "h " + "30min";
				decalageM = 30;
				decalageH = decalageH-1;
			}
		}else if (decaM == 60) {
			if (decalageH<0){
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decalageH - 1) + "h";
				decalageM = 0;
				decalageH = decalageH-1;
			}else {
				fondMc.decalageHoraire.text = "Décalage horaire: " + (decalageH + 1) + "h";
				decalageM = 0;
				decalageH = decalageH+1;
			}
		}else if (decalageM == 0){
			fondMc.decalageHoraire.text = "Décalage horaire: " + (decalageH) + "h ";
			decalageM = 0;
			decalageH = decalageH;
		}else {
			fondMc.decalageHoraire.text = "Décalage horaire: " + (decalageH) + "h " + (decalageM) + "min";
			decalageM = decalageM;
			decalageH = decalageH;
		}
		fondMc.tempsDeVol.text = "Temps de vol: " +tempsVol[fuseau1][fuseau2][0] + "h " + tempsVol[fuseau1][fuseau2][1] + "min";
		
		if (reglage == true) {
			maMontre2.setTime(monHeure + decalageH, maMinute + decalageM);
			reglage = false;
		}
		fondMc.tempsDeVol.text = "Temps de vol:" +tempsVol[fuseau1][fuseau2][0] + "h " + tempsVol[fuseau1][fuseau2][1] + "min";
	}
	//
	
	//trace("_level0.rep_juste" + _level0.rep_juste)
	//trace("heures"+fondMc.reponseH.text)
	
	positionS[0] = _xmouse;
	positionS[1] = _ymouse;
	maMontre.comportement(posCentre[0], posCentre[1], positionS);
	maMontre2.comportement(posCentre2[0], posCentre2[1], positionS);
	//if(tempsVol[fuseau1][fuseau2][1] !=0 && tempsVol[fuseau1][fuseau2][0] != 0){
		//_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decaM, decaH, tempsVol[fuseau1][fuseau2][1], tempsVol[fuseau1][fuseau2][0], monMenu3.posDansMenu);
	//}
	//trace ("maDestination1: " + maDestination1);
	//trace ("maDestination2: " + maDestination1);
	//trace ("textMenuDefaut1: " + textMenuDefaut1);
	//trace ("textMenuDefaut2: " + textMenuDefaut2);
/*	if (maDestination1==textMenuDefaut1 && maDestination2 == textMenuDefaut2) {
		//trace("tout est =0")
		fondMc.decalageHoraire.text = "Décalage horaire: " + "0" + "h " + "0min";
		fondMc.tempsDeVol.text = "Temps de vol:" +0 + "h " + 0 + "min";
	}else {
		//trace("maDestination2=?")
		fondMc.tempsDeVol.text = "Temps de vol:" +tempsVol[fuseau1][fuseau2][0] + "h " + tempsVol[fuseau1][fuseau2][1] + "min";
		_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decaM, decaH, tempsVol[fuseau1][fuseau2][1], tempsVol[fuseau1][fuseau2][0], monMenu3.posDansMenu);
	}
*/
	
	//trace("decalageM" + decalageM)
	//trace("decalageH" +decalageH )
	trace("monMenu3.selectionne"+monMenu3.selectionne)
	if (monMenu3.selectionne == true) {
		_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decalageM, decalageH, tempsVol[fuseau1][fuseau2][1], tempsVol[fuseau1][fuseau2][0], monMenu3.posDansMenu);
	}
	maMontre.reponse = _level0.rep_juste;
	//_level0.retour = maMontre.message;
}
fondMc.reponseM.onChanged = function() {
	_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decalageM, decalageH, tempsVol[fuseau1][fuseau2][1], tempsVol[fuseau1][fuseau2][0], monMenu3.posDansMenu);
}
fondMc.reponseH.onChanged = function() {
	_level0.rep_juste = analyse(fondMc.reponseM.text, fondMc.reponseH.text, decalageM, decalageH, tempsVol[fuseau1][fuseau2][1], tempsVol[fuseau1][fuseau2][0], monMenu3.posDansMenu);
}


function fuseauHoraire(choix):Number {
	var position:Number;
	var retour:Number;
	for (i = 0; i < mesDestinationsDep.length; i++){
		if (choix == mesDestinationsDep[i]) {
			position = i;
			retour = i;
			//maMontre.setTime(decalage[position][0], decalage[position][1]);
		}
	}
	
	return retour;
}

function fuseauHoraire2(choix):Number {
	var position:Number;
	var retour:Number;
	for (i = 0; i < mesDestinationsArr.length; i++){
		if (choix == mesDestinationsArr[i]) {
			position = i;
			retour = i;
			//maMontre2.setTime(decalage[position][0], decalage[position][1]);
		}
	}
	
	return retour;
}

function analyse(min:Number, h:Number,monDecalageM:Number, monDecalageH:Number, monTempsM:Number,monTempsH:Number, monJour:Number):Boolean {
	var minArr:Number = (maMinute + monDecalageM + monTempsM) % 60;
	var hArr:Number = (monHeure + mondecalageH + monTempsH + Math.floor((maMinute + monDecalageM + monTempsM) / 60)) % 24;
	var monRetour:Boolean = false;
	var jourRep:Number = 0;
	reponse[0] = minArr;
	reponse[1] = hArr;
	trace("analyse")
	trace("maMinute" + maMinute)
	trace("monHeure" + monHeure)
	trace("monDecalageM" + monDecalageM)
	trace("monDecalageH" + monDecalageH)
	trace("monTempsM" + monTempsM)
	trace("monTempsH" + monTempsH)
	trace("min" + min)
	trace("h" + h)
	trace("minArr" + minArr)
	trace("hArr" + hArr)

	//On va analyser le jour de l'arrivée
	var nbHeuresArr:Number = monHeure + mondecalageH + monTempsH + Math.floor((maMinute + monDecalageM + monTempsM) / 60);
	//trace("monJOur : " + monJour)
	
	jourRep = jourDecalage(nbHeuresArr);
	trace (jourRep)
	//_level0.retour = reponse[1] + "h " + reponse[0] + "min";
	switch(true) {
		case (minArr == min && hArr == h && monJour == jourRep):
			monRetour = true;
			//fondMc.felicitation._visible = true;
			//actionSolution();
			_level0.retour = "Bravo, on arrive bien "+jour[monJour-1]+"\nà "+hArr+"h "+minArr+"min.";
			break;
		case (minArr == min && hArr != h && monJour == jourRep):
			_level0.retour = "les heures sont fausses";
			fondMc.felicitation._visible = false;
			break;
		case (minArr != min && hArr == h && monJour == jourRep):
			_level0.retour = "les minutes sont fausses";
			fondMc.felicitation._visible = false;
			break;
		case (minArr != min && hArr != h && monJour == jourRep):
			_level0.retour = "les heures et les minutes sont fausses";
			fondMc.felicitation._visible = false;
			break;
		case (minArr == min && hArr == h && monJour != jourRep):
			_level0.retour = "le décalage des jours est faux";
			fondMc.felicitation._visible = false;
			break;
		case (minArr == min && hArr != h && monJour != jourRep):
			_level0.retour = "les heures et le décalage des jours sont faux";
			fondMc.felicitation._visible = false;
			break;
		case (minArr != min && hArr == h && monJour != jourRep):
			_level0.retour = "les minutes et le décalage des jours sont faux";
			fondMc.felicitation._visible = false;
			break;
		default:
			_level0.retour = "Tout est faux.\nAs-tu bien séléctionné les lieux de départ et d'arrivée? ";
			fondMc.felicitation._visible = false;
			break;
	}
	trace("_level0.retour: " + _level0.retour)
	return monRetour;
}
function jourDecalage(nbHeure:Number):Number {
	var retour:Number;
	switch (true) {
		case (nbHeure < 0):
			retour = 1;
			break;
		case (nbHeure >= 0 && nbHeure < 24):
			retour = 2;
			break;
		case (nbHeure >= 24 && nbHeure < 48):
			retour = 3;
			break;
		case (nbHeure >= 48 && nbHeure < 72):
			retour = 4;
			break;
		case (nbHeure >= 72):
			retour = 5;
			break;
	}
	return retour;
}

//actionSolution();

function actionSolution() {
	_level0.actionSfini = false;
	trace ("ON EST DANS ACTIONSOLUTION")
	delete fondMc.onEnterFrame;
	trace("action solution _level0.cadreMc.continuerBtn"+desactiverBouton(_level0.cadreMc.continuerBtn))
	_level0.desactiverBouton(_level0.cadreMc.continuerBtn);
	//_level0.cadreMc.continuerBtn.selectable = false;
	_level0.desactiverBouton(_level0.cadreMc.validerBtn);
	//_level0.cadreMc.validerBtn.selectable = false;
	_level0.desactiverBouton(_level0.cadreMc.suiteBtn);
	monMenu1.setValeur(mesDestinationsDep[monDep]);
	monMenu2.setValeur(mesDestinationsDep[monArr]);
	fuseau1 = fuseauHoraire(monMenu1.monRetour);
	fuseau2 = fuseauHoraire2(monMenu2.monRetour);
	
	decala1H = decalage[fuseau1][0];
	decala1M = decalage[fuseau1][1];
	decala2H = decalage[fuseau2][0];
	decala2M = decalage[fuseau2][1];
	
	var decaH:Number = decala2H - decala1H;
	var decaM:Number = decala2M - decala1M;
	
	//On va analyser le jour de l'arrivée
	var nbHeuresArr:Number = monHeure + decaH + tempsVol[fuseau1][fuseau2][0] + Math.floor((maMinute + decaM + tempsVol[fuseau1][fuseau2][1]) / 60);
	var jourDec:Number = jourDecalage(nbHeuresArr);
	trace(maMontre.mois[1])
	trace( "On compte le décalage des jours:\nOn est parti le " + maMontre.dateDep + " " + maMontre.mois[maMontre.moisDep][0] +
			"\nOn arrive le "+maMontre2.dateDep+" "+maMontre2.mois[maMOntre2.moisDep][0]+"\nCe qui fait "+jour[jourDec-1]);
	trace (jour[jourDec - 1])
	if (fuseau1 > 0 && fuseau2 > 0){
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
		fondMc.tempsDeVol.text = "Temps de vol:" +tempsVol[fuseau1][fuseau2][0] + "h " + tempsVol[fuseau1][fuseau2][1] + "min";
	}
	//On crée un clip qui contiendra la bulle avec le comportements différents pour le déplacement de la bulle et pour le release surle bouton suite
	//On crée un champ texte pour le commentaire
	fondMc.createEmptyMovieClip("maReponseClip", 20);
	fondMc.maReponseClip.attachMovie("bulleRouge", "maReponse", 0);
	fondMc.maReponseClip.maReponse._x = 180;
	fondMc.maReponseClip.maReponse._y = 105;
	fondMc.maReponseClip.maReponse._alpha = 85;
	fondMc.maReponseClip.maReponse.onPress = function() {
		startDrag(fondMc.maReponseClip,false,-200,-100,200,60);
	}
	fondMc.maReponseClip.maReponse.onRelease = function() {
		stopDrag();
	}
	fondMc.maReponseClip.maReponse.onReleaseOutside = function() {
		stopDrag();
	}
	fondMc.maReponseClip.maReponse.createTextField("maReponseTxt", 1, 20, 20, 260, 140);
	fondMc.maReponseClip.maReponse.maReponseTxt.multiline = true;
	fondMc.maReponseClip.maReponse.maReponseTxt.wordWrap = true;
	fondMc.maReponseClip.maReponse.maReponseTxt.setNewTextFormat(texteSolution_fmt);
	
	
	//On lui adjoint un bouton suite
	fondMc.maReponseClip.attachMovie("suite_btn", "suiteBtn", 2);
	fondMc.maReponseClip.suiteBtn._x = 330;
	fondMc.maReponseClip.suiteBtn._y = 280;
	fondMc.maReponseClip.suiteBtn._visible = false;
	
	fondMc.maReponseClip.suiteBtn.onRelease = function() {
		switch(partie) {
		case 1:
			partie = 2;
			fondMc.maReponseClip.suiteBtn._visible = false;
			fondMc.maReponseClip.maReponse.maReponseTxt.text = "On ajoute le décalage";
			break;
		case 2:
			partie = 3;
			fondMc.maReponseClip.suiteBtn._visible = false;
			fondMc.maReponseClip.maReponse.maReponseTxt.text = "On ajoute le temps de vol";
			break;
		case 3:
			partie = 4;
			fondMc.maReponseClip.suiteBtn._visible = false;
			fondMc.maReponseClip.maReponse.maReponseTxt.text = "On compte le décalage des jours:\nOn est parti le " + maMontre.dateDep + " " + maMontre.mois[maMontre.moisDep][0] +
			"\nOn arrive le "+maMontre2.dateDep+" "+maMontre2.mois[maMOntre2.moisDep][0]+"\nCe qui fait "+jour[jourDec-1];
			break;
		}
	}
	var partie:Number = 1;
	var hAiguille:Number = 0;
	var minAiguille:Number = 0;
	
		fondMc.onEnterFrame = function() {
		switch(partie) {
		//Heure de départ sur les 2 montres
		case 1:
			trace("1hAiguille"+hAiguille)
			fondMc.maReponseClip.maReponse.maReponseTxt.text = "On a l'heure de départ sur les 2 montres\n(heure de "+mesDestinationsDep[monDep]+")";
			//analyse(fondMc.reponseM.text, fondMc.reponseH.text, decaM, decaH, tempsVol[fuseau1][fuseau2][1], tempsVol[fuseau1][fuseau2][0]);
			if (hAiguille < monHeure) {
				
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On règle l'heure de départ sur les 2 montres";
				hAiguille = Math.round(hAiguille*100)/100 + 0.05;
				minAiguille = minAiguille + 3;
				//trace("hAiguille: "+hAiguille)
				//trace("minAiguille: "+minAiguille)

				if (minAiguille >=60) {
					minAiguille = 0;
					maMontre.setTime(Math.floor(hAiguille), minAiguille);
					maMontre2.setTime(Math.floor(hAiguille), minAiguille);
				}else{
					maMontre.setTime(Math.floor(hAiguille), minAiguille);
					maMontre2.setTime(Math.floor(hAiguille), minAiguille);
				}
				
				
				
				
				
			}else if (minAiguille < maMinute) {
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On se rappellera l'heure de départ sur la première montre";
				//hAiguille = hAiguille + minAiguille / 12;
				maMontre.setTime(monHeure, minAiguille);
				maMontre2.setTime(monHeure, minAiguille);
				minAiguille = minAiguille + 0.5;

			}else {
				trace("ON est dans else: "+hAiguille)
				//trace("")
				maMontre2.setTime(monHeure, maMinute);
				maMontre.setTime(monHeure, maMinute);
				//hAiguille = hAiguille + minAiguille / 60;
				//minAiguille = maMinute;
				hAiguille = monHeure;
				fondMc.maReponseClip.suiteBtn._visible = true;
			}
			break;
		//décalage horaire sur la 2e montre, on passe à l'action 3 s'il n'y a pas de décalage
		case 2:
			//hAiguille = monHeure;	
			if (decaH == 0 && decaM == 0) {
				partie = 3;
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On ajoute le temps de vol";
				fondMc.maReponseClip.suiteBtn._visible = false;
			}else if (decaH > 0 && hAiguille <= monHeure + decaH - 1) {
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On ajoute le décalage";
				//hAiguille = Math.round(hAiguille*100)/100 + 0.05;
				minAiguille = minAiguille + 3;
				trace("2+hAiguille: "+hAiguille)
				//trace("2+minAiguille: "+minAiguille)
				trace("2+monHeure+decaH: "+(monHeure+decaH))

				if (minAiguille >= 60) {
					
					minAiguille = 0;
					hAiguille = hAiguille + 1;
					maMontre2.setTime(hAiguille, minAiguille);
				}else{
					maMontre2.setTime(hAiguille, minAiguille);
				}
				
			}else if (decaH < 0 && hAiguille >= monHeure + decaH + 1) {
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On soustrait le décalage";
				//hAiguille = Math.round(hAiguille*100)/100 - 0.05;
				minAiguille = minAiguille - 3;
				trace("2-hAiguille: "+hAiguille)
				trace("2-minAiguille: "+minAiguille)

				if (minAiguille <=0) {
					minAiguille = 60;
					hAiguille = hAiguille - 1;
					maMontre2.setTime(hAiguille, minAiguille);
				}else{
					maMontre2.setTime(hAiguille, minAiguille);
				}
				
			}else if (minAiguille < maMinute + decaM ) {
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On ajoute le décalage";
				trace("On ajoute le décalage M")
				maMontre2.setTime(monHeure+decaH, minAiguille);
				minAiguille = minAiguille + 0.5;
				
			}else if (minAiguille > maMinute + decaM ) {
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On soustrait le décalage";
				trace("On soustrait le décalage M")
				maMontre2.setTime(monHeure+decaH, minAiguille);
				minAiguille = minAiguille - 0.5;	

			}else if (minAiguille == maMinute + decaM ){
				maMontre2.setTime(monHeure+decaH, minAiguille);
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On a tenu compte du décalage";
				fondMc.maReponseClip.suiteBtn._visible = true;
			}
			//maMontre2.setTime(monHeure + decaH, maMinute + decaM);
			break;
		//On ajoute le temps de vol sur la 2e montre et l'heure finale dans le champ texte
		case 3:
			if (hAiguille <= monHeure + decaH + tempsVol[fuseau1][fuseau2][0] - 1) {
				trace("3 hAiguille <= monHeure")
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On ajoute le temps de vol";
				trace("On ajoute le temps de vol H")
				minAiguille = minAiguille + 3;
				if (minAiguille >= 60) {
					minAiguille = 0;
					hAiguille = hAiguille + 1;
					maMontre2.setTime(hAiguille, minAiguille);
				}else{
					maMontre2.setTime(hAiguille, minAiguille);
				}
				
			}else if (minAiguille <= maMinute + decaM + tempsVol[fuseau1][fuseau2][1] - 1) {
				//trace("minAiguille <= maMinute")
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On ajoute le temps de vol";
				trace("On ajoute le temps de vol M")
				minAiguille = minAiguille + 0.5;
				maMontre2.setTime(monHeure+decaH+tempsVol[fuseau1][fuseau2][0], minAiguille);
				
				//hAiguille = hAiguille+minAiguille / 12;

			}else {
				//trace("a la fin on met l'heure d'arrivée exacte ")
				maMontre2.setTime(monHeure+decaH+tempsVol[fuseau1][fuseau2][0], maMinute+decaM+tempsVol[fuseau1][fuseau2][1]);
				fondMc.maReponseClip.suiteBtn._visible = false;
				fondMc.maReponseClip.maReponse.maReponseTxt.text = "On a ajouté le temps de vol";
				//delete fondMc.onEnterFrame;
				//var minArr:Number = (maMinute + monDecalageM + monTempsM) % 60;
				//var hArr:Number = (monHeure+decaH+tempsVol[fuseau1][fuseau2][0] + Math.floor((maMinute+decaM+tempsVol[fuseau1][fuseau2][1]) / 60)) % 24;
				fondMc.reponseM.text = (maMinute+decaM+tempsVol[fuseau1][fuseau2][1]) % 60
				fondMc.reponseH.text = (monHeure + decaH + tempsVol[fuseau1][fuseau2][0] + Math.floor((maMinute + decaM + tempsVol[fuseau1][fuseau2][1]) / 60)) % 24;
				fondMc.maReponseClip.suiteBtn._visible = true;
			}
			break;
		case 4:
			trace("cas 4")
			monMenu3.setValeur(jour[jourDec-1]);
			delete fondMc.onEnterFrame;
			fondMc.maReponseClip.maReponse.maReponseTxt.text = "On a tenu compte de la date";
			_level0.actionSfini = true;
			break;
		}
	}
}