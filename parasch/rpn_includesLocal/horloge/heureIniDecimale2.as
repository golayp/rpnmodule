/**
 * ...
 * @author J-M.Luthi
 */
trace("etst ini")
import heureDecimale;
//On crée un fond
this.createEmptyMovieClip("fondMc", 1);
//Sur le fond, on met un clip qui contiendra l'angle
fondMc.createEmptyMovieClip("angleMc", 1)
var posCentre:Array = new Array();
posCentre[0] = 200;
posCentre[1] = 200;
//création aléatoire de l'heure:
var monHeure:Number = Math.round(Math.random() * 23);
//pour n'avoir que des dixièmes
var maMinute:Number = 6 * Math.round(Math.random() * 10);
//Pour avoir aussi des centièmes
var maMinute:Number = Math.round(Math.random() * 60);
var monHeureDecimale:Number = monHeure + maMinute / 60;
trace ("monHeureDecimale"+monHeureDecimale)
//trace("typeAngles"+typeAngles)
anglesMelanges = tirageAleatoire(typeAngles);
//trace("anglesMelanges: "+anglesMelanges)
if(_global.tirage.length < anglesMelanges.length){ 
	var monTypeAngle:String;
	var mesAnglesRestants:Array = new Array();
	mesAnglesRestants=anglesRestants(anglesMelanges,_global.tirage);
	monTypeAngle=mesAnglesRestants[Math.floor(Math.random() * mesAnglesRestants.length)];
	//On place le type d'angle dans le tableau de paraschool pour éviter les répetitions dans les modules.
	_global.tirage.push(monTypeAngle);
}else{
	_global.tirage=new Array();
	monTypeAngle=anglesMelanges[Math.floor(Math.random() * anglesMelanges.length)];
	_global.tirage.push(monTypeAngle);
}

var nombreTexte:Array=new Array("pile", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quart", "seize", "dix-sept", "dix-huit", "dix-neuf", 
								"vingt", "vingt et un", "vingt deux", "vingt trois", "vingt quatre", "vingt cinq", "vingt six", "vingt sept", "vingt huit", "vingt neuf", "et demi" );
var heureTexte:String = nombreTexte[monHeure];
switch (monHeure)
{
	case 0:
	heureTexte = "minuit";
	break;
	case 12:
	heureTexte = "midi";
	break;
	case 24:
	heureTexte = "minuit";
	break;
	case 15:
	heureTexte = "quinze";
	break;
}

var signe:String;
var minuteTexte:String;

if (maMinute>30){
	signe="moins";
	var monHeureReelle:Number=monHeure-1;
	if (maMinute==15){
		minuteTexte = " le " + nombreTexte[60-maMinute];
	}else{
		minuteTexte = signe +" " +nombreTexte[60-maMinute];
	}
}else {
	var monHeureReelle:Number=monHeure;
	signe ="";
	if (maMinute==15){
		minuteTexte = "et" + nombreTexte[maMinute];
	}else{
		minuteTexte = nombreTexte[maMinute];
	}
}
 
trace("tirage"+_global.tirage)
var maMontre:MovieClip = new heureDecimale(posCentre[0], posCentre[1], fondMc.angleMc, texteValeurH_fmt, texteValeurM_fmt, texteValeurTxt_fmt, texteSolution_fmt, dateMontre_fmt, [450, 360]);
maMontre.heureATrouver = monHeure;
maMontre.visibiliteHetMin(false);
//maMontre.heureATrouver=monHeureReelle;
//maMontre.minuteATrouver=maMinute;
fondMc.createEmptyMovieClip("fondTextMc", 2);
//Position si l'heure est en chiffres
fondMc.fondTextMc.createTextField("donneeDecimale", 1, posCentre[0]+150, posCentre[1]-170, 350, 100);
//Position si l'heure est en lettres
//fondMc.fondTextMc.createTextField("typeAngleTxt", 1, posCentre[0]+150, posCentre[1]-170, 250, 30);
fondMc.fondTextMc.donneeDecimale.selectable = false;
fondMc.fondTextMc.donneeDecimale.background = false;
fondMc.fondTextMc.donneeDecimale.multiline = true;
fondMc.fondTextMc.donneeDecimale.wordWrap = true;
fondMc.fondTextMc.donneeDecimale.backgroundcolor = 0xff9999;
fondMc.fondTextMc.donneeDecimale.setNewTextFormat(texteDonnee_fmt);

//Si on demande les heures en code 2 décimales
trace("Math.round(monHeureDecimale*100)/100"+Math.round(monHeureDecimale*100)/100)
if(Math.round(monHeureDecimale * 100) / 100 <= 1) {
	if (Math.floor((monHeureDecimale-monHeure) * 100)<10) {
		fondMc.fondTextMc.donneeDecimale.text = "Transforme " + monHeure + ",0" + (Math.floor((monHeureDecimale-monHeure) * 100)) + " heure\nen heure:minutes";
	}else{
		fondMc.fondTextMc.donneeDecimale.text = "Transforme " + monHeure + "," + (Math.floor((monHeureDecimale-monHeure) * 100)) + " heure\nen heure:minutes";
	}
	maMontre.minuteATrouver = Math.round(0.6 * Math.floor((monHeureDecimale-monHeure) * 100));
}else {
	if (Math.floor((monHeureDecimale-monHeure) * 100)<10) {
		fondMc.fondTextMc.donneeDecimale.text = "Transforme " + monHeure + ",0" + (Math.floor((monHeureDecimale-monHeure) * 100)) + " heures\nen heure:minutes";
	}else{
		fondMc.fondTextMc.donneeDecimale.text = "Transforme " + monHeure + "," + (Math.floor((monHeureDecimale-monHeure) * 100)) + " heures\nen heure:minutes";
	}
	maMontre.minuteATrouver = Math.round(0.6 * Math.floor((monHeureDecimale-monHeure) * 100));
}

fondMc.createEmptyMovieClip("fondTextHMc", 3);
//Position si l'heure est en chiffres
//fondMc.fondTextHMc.createTextField("typeHeureTxt", 2, posCentre[0]+250, posCentre[1]-140, 100, 50);
//Position si l'heure est en lettres
//fondMc.fondTextHMc.createTextField("typeHeureTxt", 1, posCentre[0]+150, posCentre[1]-140, 250, 50);
fondMc.fondTextHMc.typeHeureTxt.selectable = false;
fondMc.fondTextHMc.typeHeureTxt.background = false;
fondMc.fondTextHMc.typeHeureTxt.multiline = true;
fondMc.fondTextHMc.typeHeureTxt.wordWrap = true;
fondMc.fondTextHMc.typeHeureTxt.backgroundcolor = 0xff9999;
//Format si l'heure est en chiffres
fondMc.fondTextHMc.typeHeureTxt.setNewTextFormat(texteDonnee_fmt);
//Format si l'heure est en lettres
//fondMc.fondTextHMc.typeHeureTxt.setNewTextFormat(texteDonneeL_fmt);

//si on demande des heures en chiffres
switch (true){
	case (monHeure<10 && maMinute<10):
		fondMc.fondTextHMc.typeHeureTxt.text = "0"+monHeure+":0"+maMinute;
	break;
	case (monHeure<10 && maMinute>=10):
		fondMc.fondTextHMc.typeHeureTxt.text = "0"+monHeure+":"+maMinute;
	break;
	case (monHeure>=10 && maMinute<10):
		fondMc.fondTextHMc.typeHeureTxt.text = monHeure+":0"+maMinute;
	break;
	case (monHeure>=10 && maMinute>=10):
		fondMc.fondTextHMc.typeHeureTxt.text = monHeure+":"+maMinute;
	break;
}

/*
//Si on demande des heures en lettres
switch (monHeure){
	case 1:
	fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" heure "+minuteTexte;
	break;
	case 0:
	fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" "+minuteTexte;
	break;
	case 12:
	fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" "+minuteTexte;
	break;
	case 24:
	fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" "+minuteTexte;
	break;
	default:
	fondMc.fondTextHMc.typeHeureTxt.text = heureTexte+" heures "+minuteTexte;
	break;
}*/
//fondMc.createEmptyMovieClip("fondTextTestMc", 4);
fondMc.fondTextTestMc.createTextField("typeAngleTxt", 1, posCentre[0] + 280, posCentre[1] - 150, 170, 35);
fondMc.fondTextTestMc.typeAngleTxt.text = _global.tirage;

this.onEnterFrame = function() {
	//ON met dans rep_juste le résultat de l'analyse'
	_level0.rep_juste = maMontre.reponse;
	_level0.retour = maMontre.message;

}

stop();